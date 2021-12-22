import generate from '@babel/generator';
import { AST } from '../types/ast';
import { eraseTypeOnAST } from './tat-parser';

export function generateJavaScript(ast: AST, eraseType?: boolean) {
    if (eraseType) {
        eraseTypeOnAST(ast);
    }
    return generate(ast).code;
}
