import * as ts from 'byots'
import { Scanner } from 'byots';

// TypeScript has a singleton scanner
const scanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ true);

// That is initialized using a function `initializeState` similar to
function initializeState(scanner:Scanner,text: string) {
    scanner.setText(text);
    scanner.setOnError((message: ts.DiagnosticMessage, length: number) => {
        console.error(message);
    });
    scanner.setScriptTarget(ts.ScriptTarget.ES5);
    scanner.setLanguageVariant(ts.LanguageVariant.Standard);
}


function readToEOF(scanner: ts.Scanner) {
    let token = scanner.scan();
    const result: ts.SyntaxKind[] = [];
    while (token != ts.SyntaxKind.EndOfFileToken) {
        result.push(token);
        token = scanner.scan();
    }
    return result;
}

import { readFileSync } from 'fs';

const content = readFileSync('./src/examples/test.ts').toString();
initializeState(scanner,content);

const wwww = readToEOF(scanner);
console.log(wwww.map(ts.Debug.formatSyntaxKind));