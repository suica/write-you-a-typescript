import { parseTAT } from '../../utils/tat-parser';
import { checkerSTLC } from '../checker';
import { TATBoolType, TATNumType, TATStrType } from '../TATTypes';

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
    });
});
