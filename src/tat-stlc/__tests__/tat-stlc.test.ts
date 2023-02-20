import { parseTAT } from '../../utils/tat-parser';
import { checkerSTLC } from '../checker';
import { TATBoolType, TATNumType, TATStrType, TATTypeEnum, TATUnitType } from '../TATTypes';
import { TypingContext } from '../TypingContext';
import { checkAsTATSTLC } from '../helper';

describe('TAT-STLC on simple literals and expressions', () => {
    it('should work for numeric literals', () => {
        expect(checkAsTATSTLC(`1.0;`)).toStrictEqual([TATNumType]);
    });
    it('should work for numeric expressions', () => {
        expect(checkAsTATSTLC('1.0 + 2;')).toStrictEqual([TATNumType]);
    });
    it('should work for boolean literals', () => {
        expect(checkAsTATSTLC(`true;`)).toStrictEqual([TATBoolType]);
    });
    it('should work for boolean expressions', () => {
        expect(checkAsTATSTLC('!!2 ? "1" : "2";')).toStrictEqual([TATStrType]);
    });
    it('should work for simple comparison operators', () => {
        expect(checkAsTATSTLC(`1<2`)).toStrictEqual([TATBoolType]);
    });
    it('should work for boolean operators & comparison operators', () => {
        expect(checkAsTATSTLC(`(1 < 2) || !(3 - 2 > 1) && !233`)).toStrictEqual([TATBoolType]);
    });
    it('should work for trinary operator', () => {
        expect(checkAsTATSTLC('false ? 1 + 2 : 0;')).toStrictEqual([TATNumType]);
    });
    it('should work for string literals', () => {
        const parsed = parseTAT('"test";');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.directives[0]);
        expect(checkedType).toBe(TATStrType);
    });
    it('should work for string expressions', () => {
        expect(checkAsTATSTLC('"test" + "test";')).toStrictEqual([TATStrType]);
    });
    it('should fail for trinary operator', () => {
        expect(() => checkAsTATSTLC('false ? 1 + 2 : "test";')).toThrowErrorMatchingInlineSnapshot(
            `"mismatched types in branches of trinary operator"`
        );
    });
});

describe('TAT-STLC on simple functions', () => {
    it('should work for abstraction', () => {
        expect(checkAsTATSTLC('(a: Num, b:Bool): Num => a + 1;')).toMatchObject([
            { type: TATTypeEnum.Fun, from: [TATNumType, TATBoolType], to: TATNumType },
        ]);
    });
    it('should work for application', () => {
        expect(checkAsTATSTLC('((a: Num, b:Bool): Num => a + 1)(1, true);')).toStrictEqual([TATNumType]);
    });
    it('should work for unit return type', () => {
        expect(
            checkAsTATSTLC(`(a: Num, b:Bool): Unit => {
            return; 
        }`)
        ).toMatchObject([{ type: TATTypeEnum.Fun, from: [TATNumType, TATBoolType], to: TATUnitType }]);
    });
    it('should work for abstraction with block statement & return', () => {
        expect(
            checkAsTATSTLC(`(a: Num, b:Bool): Num => {
            return a + 1; 
        }`)
        ).toMatchObject([{ type: TATTypeEnum.Fun, from: [TATNumType, TATBoolType], to: TATNumType }]);
    });
});

describe('TAT-STLC on context & binding', () => {
    it('should work for predefined variable binding', () => {
        const parsed = parseTAT('a + 1;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const context = new TypingContext().addVariable({ identifier: 'a', type: TATNumType });
        const checkedType = checker.check(parsedFile.program.body[0], context);
        expect(checkedType).toBe(TATNumType);
    });
    it('should fail for free variable', () => {
        expect(() => {
            checkAsTATSTLC(`a+1;`);
        }).toThrowErrorMatchingInlineSnapshot(`"identifier not found"`);
    });
});

describe('TAT-STLC with object', () => {
    it('should work for simple object', () => {
        expect(
            checkAsTATSTLC(`(a: Num, b: {c:Num; d: Bool}): Num => {
            return a + a;
    };`)
        ).toMatchObject([
            {
                from: [TATNumType, { type: TATTypeEnum.Obj, mapping: { c: TATNumType, d: TATBoolType } }],
                type: TATTypeEnum.Fun,
                to: TATNumType,
            },
        ]);
    });
    it('should work for object', () => {
        expect(
            checkAsTATSTLC(`(a: Num, b: {c:Num; d: Bool}): {test: Bool} => {
            return { test: !!a || !!b.c && b.d };
    }`)
        ).toMatchObject([
            {
                type: TATTypeEnum.Fun,
                from: [
                    TATNumType,
                    {
                        type: TATTypeEnum.Obj,
                        mapping: {
                            c: TATNumType,
                            d: TATBoolType,
                        },
                    },
                ],
                to: {
                    type: TATTypeEnum.Obj,
                    mapping: {
                        test: TATBoolType,
                    },
                },
            },
        ]);
    });
});
