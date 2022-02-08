import { parseTAT } from '../../utils/tat-parser';
import { checkerSTLC } from '../checker';
import { TATBoolType, TATNumType, TATStrType, TATTypeEnum } from '../TATTypes';

function checkAsTATSTLC(code: string) {
    const parsed = parseTAT(code);
    const { parsedFile, checker } = checkerSTLC(parsed);
    return parsedFile.program.body.map((statement) => {
        return checker.check(statement);
    });
}

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
    it.skip('should fail for trinary operator', () => {
        const parsed = parseTAT('false ? 1 + 2 : "test";');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
    });
});

describe('TAT-STLC on simple functions', () => {
    it('should work for abstraction', () => {
        expect(checkAsTATSTLC('(a: Num, b:Bool): Num => a + 1;')).toStrictEqual([
            { type: TATTypeEnum.Fun, from: [TATNumType, TATBoolType], to: TATNumType },
        ]);
    });
    it('should work for application', () => {
        expect(checkAsTATSTLC('((a: Num, b:Bool): Num => a + 1)(1, true);')).toStrictEqual([TATNumType]);
    });
});

describe('TAT-STLC on context & binding', () => {
    it('should work for predefined variable binding', () => {
        const parsed = parseTAT('a + 1;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0], { a: TATNumType });
        expect(checkedType).toBe(TATNumType);
    });
    it.skip('should fail for free variable', () => {
        const parsed = parseTAT('a + 1;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
    });
    it('should work for two independent const declarations', () => {
        const parsed = parseTAT('const a: Num = 1 + 1; const b:Bool = false;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const [firstDeclaration, secondDeclaration] = parsedFile.program.body.map((statement) => {
            return checker.check(statement);
        });
        expect(firstDeclaration).toBe(TATNumType);
        expect(secondDeclaration).toBe(TATBoolType);
    });
    it.skip('should work for two related const declarations', () => {
        const parsed = parseTAT('const a: Num = 1 + 1; const b:Num = a + 2;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const [firstDeclaration, secondDeclaration] = parsedFile.program.body.map((statement) => {
            return checker.check(statement);
        });
        expect(firstDeclaration).toBe(TATNumType);
        expect(secondDeclaration).toBe(TATNumType);
    });
    it.skip('should work for nested const declarations', () => {
        const parsed = parseTAT(`
        const a: Num = 1 + 1;
        {
            const a: Bool = false;
            const b: Bool = a && 2;
        }
        const b:Num = a + 2;
        `);
        const { parsedFile, checker } = checkerSTLC(parsed);
        const [firstDeclaration, secondDeclaration] = parsedFile.program.body.map((statement) => {
            return checker.check(statement);
        });
        expect(firstDeclaration).toBe(TATNumType);
        expect(secondDeclaration).toBe(TATNumType);
    });
});
