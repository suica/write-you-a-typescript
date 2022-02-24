import { parseTAT } from '../../utils/tat-parser';
import { checkerSTLC } from '../checker';
import { TATBoolType, TATNumType, TATStrType, TATTopType, TATTypeEnum, TATUnitType } from '../TATTypes';

function checkAsTATSTLC(code: string) {
    const parsed = parseTAT(code);
    const { parsedFile, checker } = checkerSTLC(parsed);
    return parsedFile.program.body.map((statement) => {
        return checker.check(statement);
    });
}

describe('TAT-sub', () => {
    it('should work for top type', () => {
        expect(checkAsTATSTLC(`((x: Top): Top => x)(1)`)).toEqual([
            TATTopType
        ]);
    });
    it('should include safe substitution principle', () => {
        expect(checkAsTATSTLC(`((x: {a: Num}): Num =>{return x.a;})({a:1, b:2});`)).toEqual([
            TATNumType
        ]);
    });
});
