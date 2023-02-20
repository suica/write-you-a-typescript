import { TATNumType, TATStrType, TATTypeEnum } from '../TATTypes';
import { checkAsTATSTLC } from '../utils';

describe('TAT-Sub-F', () => {
    it('should infer the type variable', () => {
        expect(checkAsTATSTLC(`(<T>(x: T): T => x)(1)`)).toEqual([TATNumType]);
        // recursively replace variables
        expect(checkAsTATSTLC(`(<T>(key: T): { key: T } => ({ key: key }))("test")`)).toEqual([
            {
                type: TATTypeEnum.Obj,
                mapping: {
                    key: TATStrType,
                },
            },
        ]);
    });
    it('should reject invalid usage', () => {
        expect(() => {
            checkAsTATSTLC(`(<T>(x: T): T => x + x + 1)(1)`);
        }).toThrowErrorMatchingInlineSnapshot(`"num type expected"`);
    });
    it('should support extends syntax', () => {
        expect(checkAsTATSTLC(`(<T extends Num>(x: T): Num => x + x + 1)(1)`)).toEqual([TATNumType]);
        expect(checkAsTATSTLC(`(<T extends {key: Str}>(x: T): Str => x.key)({key: "test"})`)).toEqual([TATNumType]);
    });
});

const testCase1 = (<T>(x: T): T => x)(1);
const haha = (<T>(key: T): { key: T } => ({ key: key }))('test');

const id = <T>(x: T): T => x;
const testNum = id<number>(1);
// @ts-expect-error
const testStr = id<number>('str');

interface Lengthwise {
    length: number;
}

const loggingIdentity = <Type extends Lengthwise>(arg: Type): number => {
    return arg.length;
};
