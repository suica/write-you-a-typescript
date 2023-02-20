import { cloneDeep } from 'lodash';
import { TATBoolType, TATNumType, TATStrType, TATTopType, TATType, TATUnitType } from './TATTypes';

export type Identifier = string;

type VariableBindingRecord = Record<Identifier, TATType>;
type TypeVariableBindingRecord = Record<Identifier, { subTypeOf: TATType; isReference?: boolean }>;

export type Scope = {
    valueSpace: VariableBindingRecord;
    typeSpace: TypeVariableBindingRecord;
};

export class TypingContext {
    // stack of scopes
    scopes: Scope[] = [
        {
            typeSpace: {
                Top: { subTypeOf: TATTopType },
                Num: { subTypeOf: TATNumType },
                Str: { subTypeOf: TATStrType },
                Bool: { subTypeOf: TATBoolType },
                Unit: { subTypeOf: TATUnitType },
            },
            valueSpace: {},
        },
    ];
    constructor() {
        // push an empty scope
        this.appendScope();
    }

    get lastScope() {
        // will never be undefined
        return this.scopes.at(-1)!;
    }

    appendScope() {
        this.scopes.push({ typeSpace: {}, valueSpace: {} });
    }
    popScope() {
        if (this.scopes.length) {
            this.scopes.pop();
        } else {
            throw new Error('trying to pop all scopes');
        }
    }
    addTypeVariable({ identifier, subTypeOf }: { identifier: string; subTypeOf: TATType }) {
        this.lastScope.typeSpace[identifier] = { subTypeOf, isReference: true };
        return this;
    }
    addVariable({ identifier, type }: { identifier: string; type: TATType }) {
        this.lastScope.valueSpace[identifier] = type;
        return this;
    }
    findInTypeSpace(id: Identifier): Scope['typeSpace'][Identifier] | undefined {
        return this.scopes.map((x) => x.typeSpace).findLast((x) => id in x)?.[id];
    }
    findInValueSpace(id: Identifier): Scope['valueSpace'][Identifier] | undefined {
        return this.scopes.map((x) => x.valueSpace).findLast((x) => id in x)?.[id];
    }
    copy() {
        return cloneDeep(this);
    }
}
