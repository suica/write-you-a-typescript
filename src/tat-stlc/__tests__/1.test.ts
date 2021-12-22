import { compile } from '../babel-test';

describe('TAT-STLC', () => {
    test('babelTest', () => {
        const code = compile('const a:number = 1; //test');
        expect(code).toBe('const a = 1; //test');
    });
});
