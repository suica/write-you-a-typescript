import * as ts from 'byots'

// TypeScript has a singleton scanner
const scanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ true);

// That is initialized using a function `initializeState` similar to
function initializeState(text: string) {
    scanner.setText(text);
    scanner.setOnError((message: ts.DiagnosticMessage, length: number) => {
        console.error(message);
    });
    scanner.setScriptTarget(ts.ScriptTarget.ES5);
    scanner.setLanguageVariant(ts.LanguageVariant.Standard);
}

// Sample usage
initializeState(`
type A = 122 + 2;
`.trim());

function readToEOF(scanner: ts.Scanner) {
    let token = scanner.scan();
    const result: ts.SyntaxKind[] = [];
    while (token != ts.SyntaxKind.EndOfFileToken) {
        result.push(token);
        token = scanner.scan();
    }
    return result;
}

const wwww = readToEOF(scanner);
console.log(wwww.map(ts.Debug.formatSyntaxKind));