import generate from '@babel/generator';
import { ParsedFile } from '../types/parsed-types';
import { eraseTypeOnAST } from './tat-parser';

export function generateJavaScript(ast: ParsedFile, eraseType?: boolean) {
    if (eraseType) {
        eraseTypeOnAST(ast);
    }
    return generate(ast).code;
}
