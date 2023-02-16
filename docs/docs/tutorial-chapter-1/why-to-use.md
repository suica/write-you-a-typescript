---
sidebar_position: 3
---

# 为什么需要类型系统

在计算机科学和软件工程中，我们可以用形式化方法(formal methods)来检查一个软件或是硬件系统是否满足某种性质。例如：

    1. 将芯片设计抽象为模型(model)，使用模型检查器(model checker)证明它的行为符合一系列的命题[^tapl];

    2. 使用$\pi$-演算来描述一个并发系统的行为[^2]，证明它不会出现死锁；

    3. 使用证明助手 Coq 来构建形式化的证明，从数学上证明星载实时操作系统 SpaceOS 的内核设计符合一些性质[^1]。

类型系统，以及类型检查，可以看成是一种轻量的形式化方法 (formal method)，它也是一种验证软件**性质**的手段[^tapl]。

通常，我们想要的**性质**就是程序不会出现某些运行时错误。

[^tapl]: [Benjamin C. Pierce. 2002. Types and Programming Languages (1st. ed.). The MIT Press.](https://dl.acm.org/doi/book/10.5555/509043)
[^1]: 顾海博, 付明, 乔磊,等. SpaceOS 中若干全局性质的形式化描述和验证[J]. 小型微型计算机系统, 2019, 40(1):8.
[^2]: 焦文品, 史忠植. 形式化多主体系统中的交互及交互协议[J]. 软件学报, 2001.

## 类型系统有哪些好处？

### 类型系统能帮我们发现错误

<div grid="~ cols-2 gap-2">

```ts {monaco}
type Status = 'finished' | 'unfinished';

const StatusDisplayDict: Record<Status, string> = {
    finished: '已完成',
    unfinished: '未完成',
};
```

```ts {monaco}
type Status = 'finished' | 'unfinished' | 'processing';

const StatusDisplayDict: Record<Status, string> = {
    finished: '已完成',
    unfinished: '未完成',
};
```

</div>

```ts {monaco}
type MyEvent = { kind: 'resize'; hw: [number, number] } | { kind: 'select'; keys?: string[] };
// @ts-expect-error
function badHandleEvent(e) {
    // 这里不小心少考虑了几种情况……
    const keysHash = [...e.keys].sort().join('#');
    console.log(`keys' hash is: ${keysHash}`);
}
function goodHandleEvent(e: MyEvent) {
    if (e.kind === 'resize') {
        const [h, w] = e.hw;
        console.log(`area: ${h * w}`);
    } else if (e.kind === 'select') {
        if (e.keys) {
            const keysHash = [...e.keys].sort().join('#');
            console.log(`keys' hash is: ${keysHash}`);
        } else {
            console.error('selected, but nothing selected!');
        }
    }
}
```

### 类型系统能提供抽象机制

类型系统不止可以用于发现错误。

#### 建立模块抽象

- 不同的模块之间产生交互时，只需用约定接口类型，即可各自开发。

- 可以快速地通过模块导出的类型了解模块的功能。

#### 建立领域模型

可参考前一页的代码。「**类型、领域、代码同构**」。类型其实也是一种对领域进行建模、对业务进行建模的手段。

---

### 类型系统能提供文档能力

类型就是比自然语言更加精确的文档。

不必写注释明说如何使用`add`函数。用心去感受……

```ts {monaco}
function add<A extends string, B extends string>(first: A, second: B): `${A}${B}`;
function add(first: number, second: number): number;
function add(first: unknown, second: unknown): unknown {
    return ((first as any) + second) as any;
}

add('1', 2); // 类型错误
add('1', 2 as string); // 类型错误
add('1', '2'); // 正确
add(1, 2); // 正确
```

还可以用类型系统做流程控制。例如，限制代码必须无 lint 错误才能提交。

```ts {monaco}
type Code = { fileList: string[]; addedTime: Date };
declare const LintInternalSymbol: unique symbol;
type Linted<T> = T & { [LintInternalSymbol]: undefined };
declare function lint<T extends Code>(code: T): Linted<Code>;
declare function commit(code: Linted<Code>): Promise<void>;

declare const code: Code;

commit(code);

commit(lint(code));
```

在 TypeScript 的结构化定型的类型系统中，往对象上添加元信息来模拟 **名义类型** (Nominal Type)的这种技巧俗称"打标"(Tagging)。