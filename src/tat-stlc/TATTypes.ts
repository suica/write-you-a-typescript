import { isEqual } from 'lodash';
import { isNotNil } from '../utils/common';

export enum TATTypeEnum {
    Num = 'Num',
    Str = 'Str',
    Bool = 'Bool',
    Fun = 'Fun',
    Unit = 'Unit',
    Obj = 'Obj',
    Top = 'Top',
    Reference = 'Reference',
}

export type TATTypeParameter = {
    subtypeOf: TATType;
    name: string;
    type: TATTypeEnum.Reference;
};

export type TATFuncType = {
    type: TATTypeEnum.Fun;
    from: TATType[];
    to: TATType;
    typeParameters: TATTypeParameter[];
};

export type TATType =
    | { type: TATTypeEnum.Top }
    | { type: TATTypeEnum.Num }
    | { type: TATTypeEnum.Bool }
    | { type: TATTypeEnum.Str }
    | { type: TATTypeEnum.Unit }
    | { type: TATTypeEnum.Obj; mapping: Record<string, TATType> }
    | TATTypeParameter
    | TATFuncType;

export function isTypeEqual(type1: TATType, type2: TATType): boolean {
    return isEqual(type1, type2);
}

export const isListSubtypeOf = (s: (TATType | undefined)[], t: (TATType | undefined)[]) => {
    const nonNilS = s.filter(isNotNil);
    const nonNilT = t.filter(isNotNil);
    if (nonNilT.length !== t.length || nonNilS.length !== s.length) {
        return false;
    }
    if (nonNilS.length === t.length) {
        return nonNilS.every((typ, index) => {
            return isSubtypeOf(typ, nonNilT[index]);
        });
    }
    return false;
};

/**
 * s 是否是 t 的子类型
 * @param s
 * @param t
 * @returns
 */
export const isSubtypeOf = (s: TATType, t: TATType): boolean => {
    // s必定是Top的子类型
    if (t.type === TATTypeEnum.Top) {
        return true;
    } else if (s.type === TATTypeEnum.Fun && t.type === TATTypeEnum.Fun) {
        // s和t都是函数，使用函数的子类型规则
        const s1 = s.from;
        const s2 = s.to;
        const t1 = t.from;
        const t2 = t.to;
        return isListSubtypeOf(t1, s1) && isSubtypeOf(s2, t2);
    } else if (t.type === TATTypeEnum.Obj && s.type === TATTypeEnum.Obj) {
        // s和t都是对象，使用结构化子类型规则
        return Object.keys(t.mapping).every((key) => {
            if (s.mapping[key]) {
                return isSubtypeOf(s.mapping[key], t.mapping[key]);
            }
            return false;
        });
    } else if (s.type === TATTypeEnum.Reference && isSubtypeOf(s.subtypeOf, t)) {
        // s是类型引用，看看s的上界是否是t的子类型
        return true;
    }
    // 其他情形：判断s和t是否相等
    return isTypeEqual(s, t);
};

export const TATBoolType: TATType = { type: TATTypeEnum.Bool };
export const TATNumType: TATType = { type: TATTypeEnum.Num };
export const TATStrType: TATType = { type: TATTypeEnum.Str };
export const TATUnitType: TATType = { type: TATTypeEnum.Unit };
export const TATTopType: TATType = { type: TATTypeEnum.Top };
export type NodeTypeMap = WeakMap<{}, TATType | undefined>;
