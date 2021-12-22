import { traverse } from '@babel/core';
import { parse } from '@babel/parser';
import { AST } from '../types/ast';

export function parseTAT(code: string) {
    return parse(code, {
        plugins: [['typescript', {}]],
    });
}

export function eraseTypeOnAST(ast: AST) {
    traverse(ast, {
        TSTypeAnnotation(path) {
            path.remove();
        },
    });
}
