import { Node, TSTypeAnnotation } from '@babel/types';
import { assert } from 'console';
import { isEqual } from 'lodash';
import { AST } from '../types/ast';
import { isTypeEqual, NodeTypeMap, TATBoolType, TATNumType, TATStrType, TATType, TATTypeEnum } from './TATTypes';

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
                this.check(node.left, context);
                this.check(node.right, context);
                const leftType = typeMap.get(node.left)!;
                const rightType = typeMap.get(node.right);
                assert(leftType === rightType);
                typeMap.set(node, leftType);
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
