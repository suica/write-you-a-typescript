import { parseTAT } from '../../utils/tat-parser';
import { TATNumType } from '../TATTypes';
import { checkerSTLC } from '../checker';

describe('TAT-omega', () => {
    it('should work for type alias declaration', () => {
        const parsed = parseTAT('type A = Num; const a: A = 1;');
        const { parsedFile, checker } = checkerSTLC(parsed);
        const checkedType = checker.check(parsedFile.program.body[1]);
        expect(checkedType).toBe(TATNumType);
    });
    it.todo('should work for interface declaration');
});
