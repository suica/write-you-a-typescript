import { Node } from '@babel/types';
import _ from 'lodash';
import { ParsedFile } from '../types/parsed-types';
import { assert, isNotNil } from '../utils/common';
import {
    NodeTypeMap,
    TATBoolType,
    TATFuncType,
    TATNumType,
    TATStrType,
    TATTopType,
    TATType,
    TATTypeEnum,
    TATTypeParameter,
    TATUnitType,
    isListSubtypeOf,
    isSubtypeOf,
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

function todoAddDiagnostics(msg: string = ''): never {
    throw new Error(msg || 'TODO: add diagnostics');
}

class Checker {
    typeMap: NodeTypeMap = new WeakMap();
    diagnostics = new Array<string>();
    check(node: Node, context?: TypingContext): TATType {
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
                const leftType = this.check(node.left, context);
                const rightType = this.check(node.right, context);
                if (
                    node.operator === '!=' ||
                    node.operator === '!==' ||
                    node.operator === '==' ||
                    node.operator === '==='
                ) {
                    // assert left and right are of the same type
                    if (isTypeEqual(leftType, rightType)) {
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
                    if (isTypeEqual(leftType, TATNumType) && isTypeEqual(rightType, TATNumType)) {
                        typeMap.set(node, TATBoolType);
                    } else {
                        todoAddDiagnostics('only num type can be compared');
                    }
                } else if ('+-*/'.includes(node.operator)) {
                    // handle str concat
                    if (
                        node.operator === '+' &&
                        isSubtypeOf(leftType, TATStrType) &&
                        isSubtypeOf(rightType, TATStrType)
                    ) {
                        typeMap.set(node, TATStrType);
                        break;
                    }
                    if (isSubtypeOf(leftType, TATNumType) && isSubtypeOf(rightType, TATNumType)) {
                        typeMap.set(node, TATNumType);
                    } else {
                        todoAddDiagnostics(`num type expected`);
                    }
                } else {
                    todoAddDiagnostics(`not support operator: "${node.operator}"`);
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
                if (isSubtypeOf(leftType, TATBoolType) && isSubtypeOf(rightType, TATBoolType)) {
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
                if (isTypeEqual(consequentType, alternateType)) {
                    typeMap.set(node, consequentType);
                } else {
                    todoAddDiagnostics('mismatched types in branches of trinary operator');
                }
                break;
            }
            case 'VariableDeclaration': {
                if (node.kind !== 'const') {
                    todoAddDiagnostics(`declare variable with ${node.kind} is not allowed`);
                }
                const ctx = context;
                node.declarations.forEach((declaration) => {
                    const identifier = declaration.id;
                    if (identifier.type === 'Identifier') {
                        if (declaration.init) {
                            let inferredType = this.check(declaration.init, ctx);
                            if (identifier.typeAnnotation) {
                                // if annotated with type
                                const annotatedType = this.check(identifier.typeAnnotation, ctx);
                                if (!isSubtypeOf(inferredType, annotatedType)) {
                                    todoAddDiagnostics(
                                        `${inferredType.type} is not a subtype of ${annotatedType.type}`
                                    );
                                }
                                inferredType = annotatedType;
                            }
                            // consider the type of variable declaration stmt as the last declared variable
                            ctx.addVariable({ identifier: identifier.name, type: inferredType });
                            typeMap.set(node, inferredType);
                        } else {
                            todoAddDiagnostics('const variable not initialized');
                        }
                    } else {
                        todoAddDiagnostics('other left values are not supported');
                    }
                });
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

                const argumentTypeList = node.arguments
                    .map((argument) => {
                        return this.check(argument, context);
                    })
                    .filter(isNotNil);

                const instantiate = (func: TATFuncType, replaceMap: Record<string, TATType>): TATFuncType => {
                    const replaceReference = (type: TATType): TATType => {
                        if (type.type === TATTypeEnum.Reference && replaceMap[type.name]) {
                            return replaceMap[type.name];
                        } else if (type.type === TATTypeEnum.Obj) {
                            // replace, recursively
                            return {
                                ...type,
                                mapping: _.mapValues(type.mapping, replaceReference),
                            };
                        }
                        return type;
                    };
                    // replace from / to, according to the replaceMap
                    return {
                        ...func,
                        from: func.from.map(replaceReference),
                        to: replaceReference(func.to),
                    };
                };

                // when the called function has type parameter, try to infer the real type with regard to the passed arguments type
                const inferMappingFromArguments = (
                    func: TATFuncType,
                    argumentTypes: TATType[]
                ): Record<string, TATType> => {
                    const mapping: Record<string, TATType> = Object.create(null);
                    func.from.forEach((tatType, index) => {
                        if (tatType.type === TATTypeEnum.Reference) {
                            const argumentType = argumentTypes[index];
                            // TODO check inconsistent inference
                            mapping[tatType.name] = argumentType;
                        }
                    });
                    return mapping;
                };

                if (calleeType?.type === TATTypeEnum.Fun) {
                    const map = inferMappingFromArguments(calleeType, argumentTypeList);
                    const instantiatedFuncType = instantiate(calleeType, map);
                    if (isListSubtypeOf(argumentTypeList, instantiatedFuncType.from)) {
                        typeMap.set(node, instantiatedFuncType.to);
                    } else {
                        todoAddDiagnostics('arguments mismatched');
                    }
                } else {
                    todoAddDiagnostics('trying to call a non-function type');
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
                let objectType = this.check(node.object, context);
                if (objectType?.type === TATTypeEnum.Reference) {
                    objectType = objectType.subtypeOf;
                }
                if (objectType?.type === TATTypeEnum.Obj) {
                    const key = assertGetIdentifierName(node.property);
                    const tatType = objectType.mapping[key];
                    typeMap.set(node, tatType);
                } else {
                    todoAddDiagnostics();
                }
                break;
            }
            case 'TSTypeReference': {
                const typeName = node.typeName;
                if (typeName.type === 'Identifier') {
                    const type = context.findInTypeSpace(typeName.name);
                    if (type) {
                        typeMap.set(node, {
                            type: TATTypeEnum.Reference,
                            subtypeOf: type.subTypeOf,
                            name: typeName.name,
                        });
                    } else {
                        todoAddDiagnostics('type reference cannot be resolved');
                    }
                } else {
                    const type = this.check(typeName, context);
                    if (type) {
                        typeMap.set(node, type);
                    }
                }
                break;
            }
            case 'TSTypeLiteral': {
                // try to construct it as a TAT Obj Type
                const mapping: Record<string, TATType> = Object.create(null);
                node.members.forEach((typeElement) => {
                    if (typeElement.type === 'TSPropertySignature') {
                        const annotation = typeElement.typeAnnotation;
                        if (annotation) {
                            const tatType = this.check(annotation, context);
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
            case 'TSTypeAnnotation': {
                const typeAnnotation = node.typeAnnotation;
                let type: TATType | undefined = undefined;
                if (typeAnnotation.type === 'TSTypeReference') {
                    const entityName = typeAnnotation.typeName;
                    if (entityName.type === 'Identifier') {
                        // find id-type pair in type space of typing context
                        const id = entityName.name;
                        const typeSpaceItem = context.findInTypeSpace(id);
                        if (typeSpaceItem?.isReference) {
                            type = { type: TATTypeEnum.Reference, name: id, subtypeOf: typeSpaceItem.subTypeOf };
                        } else {
                            type = typeSpaceItem?.subTypeOf;
                        }
                    }
                } else if (typeAnnotation.type === 'TSTypeLiteral') {
                    type = this.check(typeAnnotation, context);
                } else {
                    todoAddDiagnostics('not recognized type annotation');
                }
                typeMap.set(node, type);
                break;
            }
            case 'ArrowFunctionExpression': {
                const params = node.params;
                const body = node.body;
                const newContext = context.copy();
                const typeParametersNode = node.typeParameters;
                const typeParameters: TATTypeParameter[] = [];
                if (typeParametersNode) {
                    if (typeParametersNode.type === 'TSTypeParameterDeclaration') {
                        typeParametersNode.params.forEach((typeParameter) => {
                            if (newContext.findInTypeSpace(typeParameter.name)) {
                                todoAddDiagnostics('type parameter already declared');
                            } else {
                                let subTypeOf = TATTopType;
                                if (typeParameter.constraint) {
                                    const constraintType = this.check(typeParameter.constraint);
                                    if (constraintType) {
                                        subTypeOf = constraintType;
                                    } else {
                                        todoAddDiagnostics('cannot check constraint type');
                                    }
                                }
                                newContext.addTypeVariable({ identifier: typeParameter.name, subTypeOf });
                                typeParameters?.push({
                                    name: typeParameter.name,
                                    subtypeOf: subTypeOf,
                                    type: TATTypeEnum.Reference,
                                });
                            }
                        });
                    } else {
                        todoAddDiagnostics('cannot support this type parameter declaration');
                    }
                }
                const paramTypeList: TATType[] = [];
                params.forEach((param) => {
                    if (param.type === 'Identifier' && param.typeAnnotation?.type === 'TSTypeAnnotation') {
                        const type = this.check(param.typeAnnotation, newContext);
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
                    annotatedReturnType = this.check(node.returnType, newContext);
                    const bodyType = this.check(body, newContext);
                    if (annotatedReturnType && bodyType && isTypeEqual(annotatedReturnType, bodyType)) {
                        // annotated return type is identical to real return type
                        typeMap.set(node, {
                            type: TATTypeEnum.Fun,
                            from: paramTypeList,
                            to: annotatedReturnType,
                            typeParameters,
                        });
                    } else {
                        todoAddDiagnostics('different return type annotation and body');
                    }
                } else {
                    todoAddDiagnostics('no return type annotation. auto inference not implemented.');
                }
                break;
            }
            default: {
                todoAddDiagnostics(
                    `uncovered case: ${node.type}, implement it in the type checker if you want to use this syntax`
                );
            }
        }
        return typeMap.get(node) ?? TATTopType;
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
