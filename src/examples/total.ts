let a: number = 2;
console.log(1,2,3);
let b: string = '3';
let c: undefined = undefined;
let double = (n:number):number => {
    if (n === 1) {
        return 1;
    }
    return 2+double(n-1);
}
let d: 2 | 1 = true ? 1 : 2;
let sb = b[0] ? 1 : 3;
let arrayTest: Array<number> = [1,2,3];
let len = arrayTest.length;

type Counter<Target, Result extends number[] = []> =
    { keepGoing: Counter<Target,[...Result, 1]>, end: Result }[Target extends Result['length'] ? "end" : "keepGoing"];
type C = Counter<94>;