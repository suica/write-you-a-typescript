import { compileAsJS } from './babel-test';

describe('compileAsJS', () => {
    it('should work for simple code', () => {
        const code = compileAsJS('const a:number = 1; //test');
        expect(code).toBe('const a = 1; //test');
    });
});
