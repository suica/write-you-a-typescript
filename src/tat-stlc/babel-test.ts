import generate from '@babel/generator';
import { eraseTypeOnAST, parseTAT } from '../utils/tat-parser';

export function compile(inputCode: string) {
    const ast = parseTAT(inputCode);
    eraseTypeOnAST(ast);
    const { code: generatedCode } = generate(ast);
    return generatedCode;
}