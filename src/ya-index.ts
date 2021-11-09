import { parse, AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { readFileSync } from 'fs';

async function main(path:string) {
    const code = readFileSync(path).toString();
    const ast = parse(code, {
        loc: true,
        range: true,
    });
    console.log(JSON.stringify(ast));
    

    ast.body.forEach((statement) => {
        switch (statement.type) {
            case AST_NODE_TYPES.VariableDeclaration:
                // console.log('variable declare');
                // console.log(statement.declarations[0]);
                break;
            case AST_NODE_TYPES.TSTypeAliasDeclaration:
                // console.log('alias declare');
                break;
        }
    });
}

main("./src/test/1.ts");
