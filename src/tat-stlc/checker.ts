import { Node, TSTypeAnnotation, TSTypeLiteral } from '@babel/types';
import { ParsedFile } from '../types/parsed-types';
import { assert } from '../utils/common';
import {
    NodeTypeMap,
    TATBoolType,
    TATNumType,
    TATStrType,
    TATTopType,
    TATType,
    TATTypeEnum,
    TATUnitType,
    isTypeEqual,
} from './TATTypes';
import { TypingContext } from './TypingContext';

function assertGetIdentifierName(node: Node): string {
    if (node.type === 'Identifier') {
        return node.name;
    } else {
        throw new Error('assertion failed');
    }
}

function todoAddDiagnostics(msg: string = '') {
    throw new Error(msg || 'TODO: add diagnostics');
}

class Checker {
    typeMap: NodeTypeMap = new WeakMap();
    diagnostics = new Array<string>();
    getTypeLiteralAsTATType(typeLiteral: TSTypeLiteral, context: TypingContext): TATType | undefined {
        // try to construct it as a TAT Obj Type
        const mapping: Record<string, TATType> = Object.create(null);
        typeLiteral.members.forEach((typeElement) => {
            if (typeElement.type === 'TSPropertySignature') {
                const annotation = typeElement.typeAnnotation;
                if (annotation) {
                    const tatType = this.getTypeAnnotationAsTATType(annotation, context);
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
    getTypeAnnotationAsTATType(tsTypeAnnotation: TSTypeAnnotation, context: TypingContext): TATType | undefined {
        const typeAnnotation = tsTypeAnnotation.typeAnnotation;
        if (typeAnnotation.type === 'TSTypeReference') {
            const entityName = typeAnnotation.typeName;
            if (entityName.type === 'Identifier') {
                // find id-type pair in type space of typing context
                const id = entityName.name;
                return context.findInTypeSpace(id)?.subTypeOf ?? TATTopType;
            }
        } else if (typeAnnotation.type === 'TSTypeLiteral') {
            return this.getTypeLiteralAsTATType(typeAnnotation, context);
        }
        todoAddDiagnostics('not recognized type annotation');
    }
    check(node: Node, context?: TypingContext): TATType | undefined {
        context ??= new TypingContext();
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
                    todoAddDiagnostics();
                }
                break;
            }
            case 'ConditionalExpression': {
                const testType = this.check(node.test, context);
                assert(testType?.type === TATTypeEnum.Bool);
                const consequentType = this.check(node.consequent, context);
                const alternateType = this.check(node.alternate, context);
                if (consequentType && alternateType && isTypeEqual(consequentType, alternateType)) {
                    typeMap.set(node, consequentType);
                } else {
                    todoAddDiagnostics();
                }
                break;
            }
            case 'Directive': {
                typeMap.set(node, TATStrType);
                break;
            }
            case 'Identifier': {
                const valueType = context.findInValueSpace(node.name);
                if (valueType) {
                    typeMap.set(node, valueType);
                } else {
                    todoAddDiagnostics('identifier not found');
                }
                break;
            }
            case 'CallExpression': {
                const calleeType = this.check(node.callee, context);
                const argumentTypeList = node.arguments.map((argument) => {
                    return this.check(argument, context);
                });

                const isNotNil = <T>(x: T): x is NonNullable<T> => {
                    return !(x == null);
                };

                const isListSubtypeOf = (s: (TATType | undefined)[], t: (TATType | undefined)[]) => {
                    const nonNilS = s.filter(isNotNil);
                    const nonNilT = t.filter(isNotNil);
                    if (nonNilT.length !== t.length || nonNilS.length !== s.length) {
                        return false;
                    }
                    if (nonNilS.length === t.length) {
                        return nonNilS.every((typ, index) => {
                            return isSubtypeOf(typ, nonNilT[index]);
                        });
                    }
                    return false;
                };
                const isSubtypeOf = (s: TATType, t: TATType): boolean => {
                    // 判断一下s是否是t的子类型
                    if (t.type === TATTypeEnum.Top) {
                        return true;
                    } else if (s.type === TATTypeEnum.Fun && t.type === TATTypeEnum.Fun) {
                        // 是函数！
                        const s1 = s.from;
                        const s2 = s.to;
                        const t1 = t.from;
                        const t2 = t.to;
                        return isListSubtypeOf(t1, s1) && isSubtypeOf(s2, t2);
                    } else if (t.type === TATTypeEnum.Obj && s.type === TATTypeEnum.Obj) {
                        return Object.keys(t.mapping).every((key) => {
                            if (s.mapping[key]) {
                                return isSubtypeOf(s.mapping[key], t.mapping[key]);
                            }
                            return false;
                        });
                    }
                    return isTypeEqual(s, t);
                };
                if (calleeType?.type === TATTypeEnum.Fun && isListSubtypeOf(argumentTypeList, calleeType.from)) {
                    // console.log(argumentTypeList,calleeType.from);
                    typeMap.set(node, calleeType.to);
                } else {
                    todoAddDiagnostics();
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
                        todoAddDiagnostics();
                    }
                } else {
                    typeMap.set(node, TATUnitType);
                }
                break;
            }
            case 'ObjectExpression': {
                const mapping: Record<string, TATType> = Object.create(null);
                node.properties.forEach((property) => {
                    if (property.type === 'ObjectProperty') {
                        const keyName = assertGetIdentifierName(property.key);
                        const valueType = this.check(property.value, context);
                        if (valueType) {
                            mapping[keyName] = valueType;
                        }
                    }
                });
                typeMap.set(node, { type: TATTypeEnum.Obj, mapping });
                break;
            }
            case 'MemberExpression': {
                const objectType = this.check(node.object, context);
                if (objectType?.type === TATTypeEnum.Obj) {
                    const key = assertGetIdentifierName(node.property);
                    const tatType = objectType.mapping[key];
                    typeMap.set(node, tatType);
                } else {
                    todoAddDiagnostics();
                }
                break;
            }
            case 'ArrowFunctionExpression': {
                const params = node.params;
                const body = node.body;
                const newContext = context.copy();
                const typeParameters = node.typeParameters;
                if (typeParameters) {
                    if (typeParameters.type === 'TSTypeParameterDeclaration') {
                        typeParameters.params.forEach((typeParameter) => {
                            const subTypeOf = newContext.findInTypeSpace(typeParameter.name);
                            if (subTypeOf) {
                                todoAddDiagnostics('type parameter already declared');
                            } else {
                                newContext.addTypeVariable({ identifier: typeParameter.name, subTypeOf: TATTopType });
                            }
                        });
                    } else {
                        todoAddDiagnostics('cannot support this type parameter declaration');
                    }
                }
                const paramTypeList: TATType[] = [];
                params.forEach((param) => {
                    if (param.type === 'Identifier' && param.typeAnnotation?.type === 'TSTypeAnnotation') {
                        const type = this.getTypeAnnotationAsTATType(param.typeAnnotation, newContext);
                        const identifier = param.name;
                        if (type) {
                            newContext.addVariable({ identifier, type });
                            paramTypeList.push(type);
                        } else {
                            todoAddDiagnostics('cannot infer type of this identifier');
                        }
                    } else {
                        todoAddDiagnostics('arrow function only support identifiers as its params');
                    }
                });
                let annotatedReturnType = undefined;
                if (node.returnType?.type === 'TSTypeAnnotation') {
                    annotatedReturnType = this.getTypeAnnotationAsTATType(node.returnType, newContext);
                    const bodyType = this.check(body, newContext);
                    if (annotatedReturnType && bodyType && isTypeEqual(annotatedReturnType, bodyType)) {
                        // annotated return type is identical to real return type
                        typeMap.set(node, {
                            type: TATTypeEnum.Fun,
                            from: paramTypeList,
                            to: annotatedReturnType,
                        });
                    } else {
                        todoAddDiagnostics('different return type annotation and body');
                    }
                } else {
                    todoAddDiagnostics('no return type annotation');
                }
                break;
            }
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
    const checker = new Checker();
    // TODO need to remove?
    // const body = parsedFile.program.body;
    // const directives = parsedFile.program.directives;
    return { parsedFile, checker };
}
