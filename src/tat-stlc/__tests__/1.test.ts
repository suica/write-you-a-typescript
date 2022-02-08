import { parseTAT } from '../../utils/tat-parser';
import { checkerSTLC } from '../checker';
import { TATBoolType, TATNumType, TATStrType, TATTypeEnum } from '../TATTypes';

describe('TAT-STLC on simple literals and expressions', () => {
    it('should work for numeric literals', () => {
        const parsed = parseTAT('1.0;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
        expect(checkedType).toBe(TATNumType);
    });
    it('should work for numeric expressions', () => {
        const parsed = parseTAT('1.0 + 2;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
        expect(checkedType).toBe(TATNumType);
    });
    it('should work for boolean literals', () => {
        const parsed = parseTAT('true;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
        expect(checkedType).toBe(TATBoolType);
    });
    it('should work for boolean expressions', () => {
        const parsed = parseTAT('!!2 ? "1" : "2";');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
        expect(checkedType).toBe(TATStrType);
    });
    it('should work for simple comparison operators', () => {
        const parsed = parseTAT(`1 < 2`);
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
        expect(checkedType).toBe(TATBoolType);
    });
    it('should work for boolean operators & comparison operators', () => {
        const parsed = parseTAT(`(1 < 2) || !(3 - 2 > 1) && !233`);
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
        expect(checkedType).toBe(TATBoolType);
    });
    it('should work for trinary operator', () => {
        const parsed = parseTAT('false ? 1 + 2 : 0;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
        expect(checkedType).toBe(TATNumType);
    });
    it('should work for string literals', () => {
        const parsed = parseTAT('"test";');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.directives[0]);
        expect(checkedType).toBe(TATStrType);
    });
    it('should work for string expressions', () => {
        const parsed = parseTAT('"test" + "test";');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
        expect(checkedType).toBe(TATStrType);
    });
    it.skip('should fail for trinary operator', () => {
        const parsed = parseTAT('false ? 1 + 2 : "test";');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
    });
});

describe('TAT-STLC on simple functions', () => {
    it('should work for abstraction', () => {
        const parsed = parseTAT('(a: Num, b:Bool): Num => a + 1;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
        expect(checkedType).toEqual({ type: TATTypeEnum.Fun, from: [TATNumType, TATBoolType], to: TATNumType });
    });
    it('should work for application', () => {
        const parsed = parseTAT('((a: Num, b:Bool): Num => a + 1)(1, true);');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[0]);
        expect(checkedType).toBe(TATNumType);
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
