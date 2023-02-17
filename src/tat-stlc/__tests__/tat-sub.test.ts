import { TATNumType, TATTopType } from '../TATTypes';
import { checkAsTATSTLC } from '../utils';

describe('TAT-sub', () => {
    it('should work for top type', () => {
        expect(checkAsTATSTLC(`((x: Top): Top => x)(1)`)).toEqual([TATTopType]);
    });
    it('should include safe substitution principle', () => {
        expect(checkAsTATSTLC(`((x: {a: Num}): Num =>{return x.a;})({a:1, b:2});`)).toEqual([TATNumType]);
    });
});
