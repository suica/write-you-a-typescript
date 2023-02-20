import { TATNumType, TATStrType, TATTopType } from '../TATTypes';
import { checkAsTATSTLC } from '../helper';

describe('TAT-STLC with variable declaration', () => {
    it('should work for const/let', () => {
        expect(checkAsTATSTLC(`const a = 1;`)).toStrictEqual([TATNumType]);
        expect(() => checkAsTATSTLC(`const a: Num = 'test';`)).toThrowErrorMatchingInlineSnapshot(
            `"Str is not a subtype of Num"`
        );
        expect(checkAsTATSTLC(`const a: Top = 'test'; const b: Num = 233;`)).toStrictEqual([TATTopType, TATNumType]);
    });
});
