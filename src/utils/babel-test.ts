import generate from '@babel/generator';
import { eraseTypeOnAST, parseTAT } from './tat-parser';

export function compileAsJS(inputCode: string) {
    const ast = parseTAT(inputCode);
    eraseTypeOnAST(ast);
    const { code: generatedCode } = generate(ast);
    return generatedCode;
}