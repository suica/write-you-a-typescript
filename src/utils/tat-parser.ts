import { traverse } from '@babel/core';
import { parse } from '@babel/parser';
import { ParsedFile } from '../types/parsed-types';

export function parseTAT(code: string) {
    return parse(code, {
        plugins: [['typescript', {}]],
    });
}

export function eraseTypeOnAST(ast: ParsedFile) {
    traverse(ast, {
        TSTypeAnnotation(path) {
            path.remove();
        },
    });
}
