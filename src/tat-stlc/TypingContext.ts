import { cloneDeep } from 'lodash';
import { TATType } from './TATTypes';
import { notImplemented } from './utils';

export type Identifier = string;

export type Scope = {
    valueSpace: Record<Identifier, TATType>;
    typeSpace: Record<Identifier, { subTypeOf: TATType }>;
};

export class TypingContext {
    // stack of scopes
    scopes: Scope[] = [
        {
            typeSpace: {},
            valueSpace: {},
        },
    ];
    constructor() {}

    get lastScope() {
        // will not be undefined
        return this.scopes.at(-1)!;
    }

    appendScope() {}
    popScope() {
        if (this.scopes.length) {
            this.scopes.pop();
        } else {
            throw new Error('trying to pop all scopes');
        }
    }
    addTypeVariable({}: { identifier: string; subTypeOf: TATType }) {
        notImplemented();
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
