import { Node, TSTypeAnnotation } from '@babel/types';
import { assert } from '../utils/common';
import { isEqual } from 'lodash';
import { AST } from '../types/ast';
import {
    isTypeEqual,
    NodeTypeMap,
    TATBoolType,
    TATNumType,
    TATStrType,
    TATType,
    TATTypeEnum,
    TATUnitType,
} from './TATTypes';
import { type } from 'os';

class Checker {
    typeMap: NodeTypeMap = new WeakMap();
    diagnostics = new Array<string>();
    getTypeAnnotationAsTATType(tsTypeAnnotation: TSTypeAnnotation): TATType | undefined {
        const typeReference = tsTypeAnnotation.typeAnnotation;
        if (typeReference.type === 'TSTypeReference') {
            const entityName = typeReference.typeName;
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
                }
            }
        }
        return undefined;
    }
    check(node: Node, context: Record<string, TATType> = Object.create(null)): TATType | undefined {
        const typeMap = this.typeMap;
        switch (node.type) {
            case 'ExpressionStatement': {
                const exprType = this.check(node.expression, context);
                typeMap.set(node, exprType);
                break;
            }
            case 'UnaryExpression': {
                if (node.operator === '!') {
                    typeMap.set(node, TATBoolType);
                } else {
                    throw new Error(`not implemented for unary operator ${node.operator}`);
                }
                break;
            }
            case 'BinaryExpression': {
                const leftType = this.check(node.left, context)!;
                const rightType = this.check(node.right, context);
                if (
                    node.operator === '!=' ||
                    node.operator === '!==' ||
                    node.operator === '==' ||
                    node.operator === '==='
                ) {
                    // assert left and right are of the same type
                    if (leftType && rightType && isTypeEqual(leftType, rightType)) {
                        typeMap.set(node, TATBoolType);
                    } else {
                        // TODO add diagnostics
                    }
                } else if (
                    node.operator === '<' ||
                    node.operator === '>' ||
                    node.operator === '<=' ||
                    node.operator === '>='
                ) {
                    if (
                        leftType &&
                        rightType &&
                        isTypeEqual(leftType, TATNumType) &&
                        isTypeEqual(rightType, TATNumType)
                    ) {
                        typeMap.set(node, TATBoolType);
                    } else {
                        // TODO add diagnostics
                    }
                } else {
                    // FIXME fix for + - * /
                    if (
                        leftType &&
                        rightType &&
                        isTypeEqual(leftType, rightType) &&
                        !isTypeEqual(leftType, TATBoolType)
                    ) {
                        typeMap.set(node, leftType);
                    } else {
                        // TODO add diagnostics
                    }
                }
                break;
            }
            case 'NumericLiteral': {
                typeMap.set(node, TATNumType);
                break;
            }
            case 'BooleanLiteral': {
                typeMap.set(node, TATBoolType);
                break;
            }
            case 'StringLiteral': {
                typeMap.set(node, TATStrType);
                break;
            }
            case 'LogicalExpression': {
                const leftType = this.check(node.left, context);
                const rightType = this.check(node.right, context);
                if (
                    leftType &&
                    rightType &&
                    isTypeEqual(leftType, TATBoolType) &&
                    isTypeEqual(rightType, TATBoolType)
                ) {
                    typeMap.set(node, TATBoolType);
                } else {
                    throw new Error('TODO add diagnostics');
                }
                break;
            }
            case 'ConditionalExpression': {
                const testType = this.check(node.test, context);
                assert(testType?.type === TATTypeEnum.Bool);
                const consequentType = this.check(node.consequent, context);
                const alternateType = this.check(node.alternate, context);
                // TODO add diagnostics
                assert(consequentType === alternateType);
                typeMap.set(node, consequentType);
                break;
            }
            case 'Directive': {
                typeMap.set(node, TATStrType);
                break;
            }
            case 'Identifier': {
                typeMap.set(node, context[node.name]);
                break;
            }
            case 'CallExpression': {
                const calleeType = this.check(node.callee, context);
                const argumentTypeList = node.arguments.map((argument) => {
                    return this.check(argument, context);
                });
                if (calleeType?.type === TATTypeEnum.Fun && isEqual(calleeType.from, argumentTypeList)) {
                    typeMap.set(node, calleeType.to);
                } else {
                    // TODO add diagnostics
                }
                break;
            }
            case 'ReturnStatement': {
                if (node.argument) {
                    const argumentType = this.check(node.argument, context);
                    typeMap.set(node, argumentType);
                } else {
                    // no argument
                    typeMap.set(node, TATUnitType);
                }
                break;
            }
            case 'BlockStatement': {
                const returnStatements = node.body.filter((statement) => {
                    // only support unnested return statement
                    return statement.type === 'ReturnStatement';
                });
                if (returnStatements.length) {
                    const returnStatementsTypes = returnStatements.map((stat) => {
                        return this.check(stat, context);
                    });
                    const isAllReturnTypesEqual = returnStatementsTypes.every((returnType) => {
                        return (
                            returnType && returnStatementsTypes[0] && isTypeEqual(returnType, returnStatementsTypes[0])
                        );
                    });
                    if (isAllReturnTypesEqual) {
                        // Ok. All returned type are identical
                        typeMap.set(node, returnStatementsTypes[0]);
                    } else {
                        // Not ok. Some returned type are different, hence diagnostics are needed
                        // TODO add diagnostics
                    }
                } else {
                    typeMap.set(node, TATUnitType);
                }
                break;
            }
            case 'ArrowFunctionExpression': {
                const params = node.params;
                const body = node.body;
                const newContext = { ...context };
                const paramTypeList: TATType[] = [];
                params.forEach((param) => {
                    if (param.type === 'Identifier' && param.typeAnnotation?.type === 'TSTypeAnnotation') {
                        const tatType = this.getTypeAnnotationAsTATType(param.typeAnnotation);
                        if (tatType) {
                            newContext[param.name] = tatType;
                            paramTypeList.push(tatType);
                        }
                    } else {
                        throw new Error('not implemented');
                    }
                });
                let annotatedReturnType = undefined;
                if (node.returnType?.type === 'TSTypeAnnotation') {
                    annotatedReturnType = this.getTypeAnnotationAsTATType(node.returnType);
                    const bodyType = this.check(body, newContext);
                    if (annotatedReturnType && bodyType && isTypeEqual(annotatedReturnType, bodyType)) {
                        // annotated return type is identical to real return type
                        typeMap.set(node, {
                            type: TATTypeEnum.Fun,
                            from: paramTypeList,
                            to: annotatedReturnType,
                        });
                    } else {
                        // TODO add diagnostics
                        throw new Error('different return type annotation and body');
                    }
                } else {
                    // TODO add diagnostics
                    throw new Error('no return type annotation');
                }
                break;
            }
            default: {
                throw new Error(`uncovered case: ${node.type}`);
            }
        }
        return typeMap.get(node);
    }
    clearDiagnostics() {
        this.diagnostics = [];
    }
}

export function checkerSTLC(parsedFile: AST) {
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
