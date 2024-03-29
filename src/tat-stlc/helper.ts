import { parseTAT } from '../utils/tat-parser';
import { checkerSTLC } from './checker';

export function checkAsTATSTLC(code: string) {
    const parsed = parseTAT(code);
    const { parsedFile, checker } = checkerSTLC(parsed);
    return parsedFile.program.body.map((statement) => {
        return checker.check(statement);
    });
}
