import { Node, TSTypeAnnotation, TSTypeLiteral } from '@babel/types';
import { assert } from '../utils/common';
import { isEqual } from 'lodash';
import { ParsedFile } from '../types/parsed-types';
import {
    isTypeEqual,
    NodeTypeMap,
    TATBoolType,
    TATNumType,
    TATStrType,
    TATTopType,
    TATType,
    TATTypeEnum,
    TATUnitType,
} from './TATTypes';
import _ from 'lodash';

function assertGetIdentifierName(node: Node): string {
    if (node.type === 'Identifier') {
        return node.name;
    } else {
        throw new Error('assertion failed');
    }
}

function todoAddDiagnostics(msg: string = '') {
    // throw new Error(msg || 'TODO: add diagnostics');
}

class Checker {
    typeMap: NodeTypeMap = new WeakMap();
    diagnostics = new Array<string>();
    getTypeLiteralAsTATType(typeLiteral: TSTypeLiteral): TATType | undefined {
        // try to construct it as a TAT Obj Type
        const mapping: Record<string, TATType> = Object.create(null);
        typeLiteral.members.forEach((typeElement) => {
            if (typeElement.type === 'TSPropertySignature') {
                const annotation = typeElement.typeAnnotation;
                if (annotation) {
                    const tatType = this.getTypeAnnotationAsTATType(annotation);
                    if (tatType) {
                        const identifierName = assertGetIdentifierName(typeElement.key);
                        mapping[identifierName] = tatType;
                    }
                }
            } else {
                throw new Error(`not implemented for ${typeElement.type}`);
            }
        });
        return { type: TATTypeEnum.Obj, mapping };
    }
    getTypeAnnotationAsTATType(tsTypeAnnotation: TSTypeAnnotation): TATType | undefined {
        const typeAnnotation = tsTypeAnnotation.typeAnnotation;
        if (typeAnnotation.type === 'TSTypeReference') {
            const entityName = typeAnnotation.typeName;
            if (entityName.type === 'Identifier') {
                const targetName = entityName.name;
                if (targetName === 'Num') {
                    return TATNumType;
                } else if (targetName === 'Bool') {
                    return TATBoolType;
                } else if (targetName === 'Str') {
                    return TATStrType;
                } else if (targetName === 'Unit') {
                    return TATUnitType;
                } else if (targetName === 'Top') {
                    return TATTopType;
                }
            }
        } else if (typeAnnotation.type === 'TSTypeLiteral') {
            return this.getTypeLiteralAsTATType(typeAnnotation);
        }
        todoAddDiagnostics('not recognized type annotation');
    }
    check(node: Node, context: Record<string, TATType> = Object.create(null)): TATType | undefined {
        const typeMap = this.typeMap;
        switch (node.type) {
            default: {
                todoAddDiagnostics(
                    `uncovered case: ${node.type}, implement it in the type checker if you want to use this syntax`
                );
            }
        }
        return typeMap.get(node);
    }
    clearDiagnostics() {
        this.diagnostics = [];
    }
}

export function checkerSTLC(parsedFile: ParsedFile) {
    const body = parsedFile.program.body;
    const checker = new Checker();
    body.forEach((statement) => {
        checker.check(statement);
    });
    const directives = parsedFile.program.directives;
    directives.forEach((directive) => {
        checker.check(directive);
    });
    return { parsedFile, checker };
}
