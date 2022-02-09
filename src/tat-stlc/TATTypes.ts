import { isEqual } from 'lodash';

export enum TATTypeEnum {
    Num = 'Num',
    Str = 'Str',
    Bool = 'Bool',
    Fun = 'Fun',
    Unit = 'Unit',
    Obj = 'Obj',
}

export type TATType =
    | { type: TATTypeEnum.Num }
    | { type: TATTypeEnum.Bool }
    | { type: TATTypeEnum.Str }
    | { type: TATTypeEnum.Unit }
    | { type: TATTypeEnum.Obj; mapping: Record<string, TATType> }
    | {
          type: TATTypeEnum.Fun;
          from: TATType[];
          to: TATType;
      };

export function isTypeEqual(type1: TATType, type2: TATType): boolean {
    return isEqual(type1, type2);
}

export const TATBoolType: TATType = { type: TATTypeEnum.Bool };
export const TATNumType: TATType = { type: TATTypeEnum.Num };
export const TATStrType: TATType = { type: TATTypeEnum.Str };
export const TATUnitType: TATType = { type: TATTypeEnum.Str };

export type NodeTypeMap = WeakMap<{}, TATType | undefined>;
