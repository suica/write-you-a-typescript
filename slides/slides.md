---
theme: default
class: text-center
highlighter: prism
lineNumbers: true
info: |
    ## Slidev Starter Template
    Presentation slides for developers.

    Learn more at [Sli.dev](https://sli.dev)
drawings:
    persist: false
title: 类型系统入门以及TypeScript中的类型系统
---

# 类型系统入门 (上)

吴登轲 高洁璇

---

# 课程签到问卷

<img border="rounded" src="/1/类型系统-签到问卷.jpg" class="w-1/4 my-20 mx-auto">

---
layout: section
---

# 第一节：类型系统简介

---
layout: statement
---

## 直觉中的类型

---
layout: statement
---

## 命题 1：自然数 997 是一个质数。

---
layout: statement
---

## 命题 2：自然数 997 是一个跑。

---

# 自然语言中的类型

在知道类型系统的定义之前，我们其实都已经是汉语这门自然语言中的「类型」专家了。

<!-- 汉语是一种自然语言。

- 汉语的词性包括：动词，名词，形容词，副词……它们其实就是「词语」组成的集合，它们是词语的类型。

- 第一句话是一个正确的命题。我们稍微修改一下这句话，得到第二句话。本应该是名词待的位置，却被替换成了动词，让这个句子失去了合法性。 -->

<br>

> 例 1：997 是一个质数。

> \*例 2：997 是一个跑。

<br>

-   如果我们来判断这句话第二句话是否正确，我们可以立刻下结论——它是错的——而不用去理解这个命题涉及的任何数学概念。因为这句话在**语法**上就是错的。这其实就是一种类型检查。

<!-- TODO: 从和编程语言的对应上来说，semantic-selection 其实才是类型检查……需要修改例子和文案 -->

<br>

那么，在编程语言这个形式系统里，我们是不是也可以有类似的快速「检查」？

——这样，我们可以用很低的成本来验证程序是否是对的，而不需要去跑程序本身。

---

# 编程语言中的类型

##

在一些编程语言中，变量的类型可以在运行程序之前就能确定下来。具有这种性质的语言，叫做静态类型语言；反之，则叫做动态类型语言。

```cpp
// CPP 是一门静态类型语言
bool a = true;
a = "test"; // 会在编译时报错
```

```js
// JavaScript 是一门动态类型语言
let a = true;
a = 'b'; // 完全合法
```

而有一些编程语言当中，表达式类型之间的转化需要显式地进行，锱铢必较。

这种语言，叫做强类型语言(Strongly-typed Languages)；

反之，那些类型之间的转化大都可以隐式进行的，叫做弱类型语言(Weakly-typed languages)。

> 注意：强弱类型其实是一个比较主观的概念，并没有非常严格的定义。

---
layout: statement
---

## 什么是类型系统？

---

# 类型系统的基本概念

-   一个**值 (Value)**，就是某个东西。它既可以是一个直观上的概念，也可以被解读为编程语言中的**项**。

-   一个**搜集 (Collection)**，就是一堆东西组成的整体。它是一个直观上的概念。

<!-- TODO: 注释一下为啥不用一个更严格的词 -->

-   一个**类型 (Type)**，就是一个由**值**组成的**搜集** [^ts] （你可以直观地认为类型就是一个值组成的**集合**)。

    -   在编程语言中，**一个表达式的类型**就是它在执行之时估计会取到的值形成的一个 **搜集** [^ts]。

## 什么是类型系统？

在编程语言中，**类型系统 (Type System)** 就是一个**类型规则的搜集**，这套规则能为语言中的结构（函数、表达式等）确定类型。

这些规则呈「如果 A，则 B」的形式。例如：如果`a: number, b: number`，那么`(a+b): number`。

<!-- # 类型系统背后的理论：类型论 -->
<!-- 编程语言是一种形式系统。而 **类型论 (Type Theory)** 作为编程语言的类型系统后的理论基础，则有更广的对象：它是关于所有形式系统中的项的类型的学术化的研究 [wiki]。 -->

<!-- ## 类型论的历史 -->

<!-- 类型论 (Type Theory) 从 20 世纪初期发端。…… -->

<!-- ## 什么是类型系统？

"A type system is a tractable syntactic method for proving the absence of certain program behaviors by classifying phrases according to the kinds of values they compute." - [^tapl] -->

[^ts]: [Type Systems](http://lucacardelli.name/papers/typesystems.pdf)

---
layout: statement
---

## 为什么要用类型系统？

---

# 为什么要使用类型系统？

##

-   在计算机科学和软件工程中，我们可以用形式化方法(formal methods)来检查一个软件或是硬件系统是否满足某种性质。例如：

    1. 将芯片设计抽象为模型(model)，使用模型检查器(model checker)证明它的行为符合一系列的命题[^tapl];

    2. 使用$\pi$-演算来描述一个并发系统的行为[^2]，证明它不会出现死锁；

    3. 使用证明助手 Coq 来构建形式化的证明，从数学上证明星载实时操作系统 SpaceOS 的内核设计符合一些性质[^1]。

-   类型系统，以及类型检查，可以看成是一种轻量的形式化方法 (formal method)，它也是一种验证软件**性质**的手段[^tapl]。 我们想要的**性质**，一般就是程序不会出某些运行时错误。

[^tapl]: [Benjamin C. Pierce. 2002. Types and Programming Languages (1st. ed.). The MIT Press.](https://dl.acm.org/doi/book/10.5555/509043)
[^1]: 顾海博, 付明, 乔磊,等. SpaceOS 中若干全局性质的形式化描述和验证[J]. 小型微型计算机系统, 2019, 40(1):8.
[^2]: 焦文品, 史忠植. 形式化多主体系统中的交互及交互协议[J]. 软件学报, 2001.

<style>
.footnotes-sep {
  @apply mt-0 opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>

---
layout: statement
---

## 类型系统有哪些好处？

---

# 类型系统能帮我们发现错误

<br>

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

---

# 类型系统能帮我们发现错误（续）

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

<style>
iframe{
  height: 380px !important;
}
</style>

---

# 类型系统能提供抽象机制

类型系统不止可以用于发现错误。

## 建立模块抽象

-   不同的模块之间产生交互时，只需用约定接口类型，即可各自开发。

-   可以快速地通过模块导出的类型了解模块的功能。

## 建立领域模型

可参考前一页的代码。「**类型、领域、代码同构**」。类型其实也是一种对领域进行建模、对业务进行建模的手段。

---

# 类型系统能提供文档能力

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

<style>
iframe {
  height: 380px !important;
}
</style>

---

# 类型系统能提供文档能力（续）

类型就是比自然语言更加精确的文档。

可以用类型系统做流程控制。例如，限制代码必须无 lint 错误才能提交。

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

<br>

在 TypeScript 的结构化定型的类型系统中，往对象上添加元信息来模拟 **名义类型** (Nominal Type)的这种技巧俗称"打标"(Tagging)。

<style>
iframe{
  height: 280px !important;
}
</style>

---
layout: statement
---

## 为什么要学习类型系统？

---

# 为什么要学习类型系统？

-   入门类型论，提高理论水平，为之后在类型系统以及编程语言上的探索打下基础；

-   俯瞰各个语言的类型系统；

-   对 TypeScript 的类型系统产生更深的理解，在日常工作中，写出质量更高的程序；

-   写一个自己的类型检查器，并且能够添加自己想要的特性；

-   ...

---

# 课程介绍

-   本课程主要面向有一定经验的 TypeScript 用户，对于没有 TypeScript 经验的学习者，可以在先学完基本的 TypeScript 课程再来学习本课程。

-   本课程不预设学习者有特别的数学背景，尽量简化用到的数学知识，并会对学习者可能不熟悉的数学知识进行及时的介绍。但是，学习者应当熟悉高中数学涉及到的命题逻辑(比如，$\land$, $\lor$, $\lnot$, $\forall$)以及简单的集合论等相关知识。

-   本课程的一大特色就是**产出导向**。每一节课后，都设有需要动手编码的小作业。如果你完成了每节课后的作业，那么你最终就能得到一个属于自己的类TypeScript的类型检查器，并且对TypeScript的类型系统产生较为深入的理解。

-   课程仓库：[https://github.com/suica/write-you-a-typescript](https://github.com/suica/write-you-a-typescript)
    - 在这里你可以找到课程幻灯片的源码，和类型检查器的代码。 

---

# 课程路线图

### 第二节：类型检查器基础

-   $\lambda$-演算；类型；类型的集合模型；函数类型；元语言和目标语言；定型；定型环境；二元关系；定型关系；定型规则；自然推演。
-   在这一节，你会实现一个有着布尔值、数字值、字符串值、单位值等基础类型，和函数类型的类型检查器。

### 第三节：子类型理论以及实现

-   子类型关系；安全替换原则；子类型的集合模型；函数的逆变、协变、不变。
-   这一节你将往类型检查器中加入子类型这个特性。

### 第四节：多态理论以及实现

-   泛型；子类型多态；特设多态；参数多态；顶类型和底类型；全称量词和全称类型。
-   这一节你将往类型检查器中加入泛型。

---

# 课程路线图（续）

### 第五节：TAT类型检查器与TypeScript的类型编程

-   类型检查器成品回顾；TypeScript 的「类型体操」以及例子；柯里霍华德同构。
-   在这一节，你将使用你自己写的类型检查器和TypeScript解决一系列有挑战性的问题，并了解这个玩具类型检查器还有什么特性可以添加，和TypeScript的类型检查器的差距在哪里。

## 课程时间安排
第一节、第二节的时间：2022年2月17日 14:00~16:00。

第三节、第四节、第五节的时间：2022年2月24日 14:00~16:00。


---
layout: statement
---

## 我们在哪里？

---

# 类型论的大图景

##

类型论(Type Theory, TT)是类型系统背后的理论。

在理论计算机科学(Theoretical Computer Science, TCS)的编程语言理论(Programming Language Theory, PLT)中，它是一个重要话题。

TCS 中的 TT 主要有两个分支：

1. TT 在编程语言中的应用。这表现为编程语言的类型系统。TypeScript 就是一个类型系统的非常好的应用；
2. 纯类型系统(Pure Type System, PTS)。这个分支比较偏向理论，并不关注它在工业界的应用。但是编程语言的设计也时常能够从中汲取一些营养。

<!-- # 纯类型系统

##

PTS主要研究有类型$\lambda$-演算。在简单类型$\lambda$-演算(Simply Typed Lambda Calculus, STLC)的基础上，组合三种正交的特性，我们可以得到8种不同的$\lambda$-演算的变体，从而画出如下类似立方体的图案。它叫做$\lambda$-cube。

<img border="rounded" src="/1/lambda-cube.jpeg" class="w-1/3 mx-auto">

这三种能力分别是：多态($\uparrow$)，类型操作符($\nearrow$)， 依值类型($\rightarrow$)。我们在这个课程中，将要构建出有其中两种特性（和TypeScript相同）的类型检查器，对应图中的$\lambda\omega$。 -->

<!-- lambda cube -->
<!-- https://twitter.com/cattheory/status/984976270772654080 -->

---

## 参考文献

- [Type Systems](http://lucacardelli.name/papers/typesystems.pdf)

如果你想了解更多关于类型系统的知识，可以参考这篇综述。

- [Benjamin C. Pierce. 2002. Types and Programming Languages (1st. ed.). The MIT Press.](https://dl.acm.org/doi/book/10.5555/509043)

如果你想了解更多关于类型系统的数学细节，可以参考这本书。

- [Lambda cube and dependent types](https://www.math.nagoya-u.ac.jp/~garrigue/lecture/2018_tenbo/dependent.pdf)

如果你想了解更多的PTS，可以参考这篇文章。

---
layout: section
---

# 第二节：类型系统的基础

---

# 本节路线图

<div class="mt-1.5rem -ml-3rem">

```mermaid {scale: 0.9}
flowchart LR
  subgraph Part1[第一部分: 类型检查器的基础知识]
    direction TB
    ArrowFunction[JavaScript箭头函数] --> UTLC[无类型Lambda演算]
    UTLC --> STLC --> 宇宙的层级
    BinaryRelation[二元关系] --> TypingRelation[定型关系]
    TypingRelation --> TypingContext[定型环境和定型规则]
    TypingContext --> STLC[简单类型Lambda演算]
    MetaLanguage[元语言和对象语言] --> NaturalDeduction[自然推演]
    NaturalDeduction --> TypingContext
  end

  subgraph Part2[第二部分: 类型检查器TAT-STLC]
    direction TB
    TATRules[TAT-STLC的类型系统设计] --> TATFrameWork[类型检查器的实现框架]
    TATFrameWork --> TATTypeScriptImpl[TAT-STLC的实现]
  end

  Start(从这里开始!) --> Part1 --> Part2
  style Start fill:none,stroke:none

```

</div>

---


## 目标类型检查器：TAT

### 名字的由来

在这个课程中，我们会实现一个自己的类型检查器，我们把它叫做**TAT**(发音:/tæt/)。没有什么特别的原因，只是因为它像一个哭脸的颜文字 😭，而且是个回文串，非常有意思。

### 它的特性

它的基本类型命名会尽量避免和JavaScript已经有的类型名字冲突。比如，我们会用`Num`来表示TAT中的数字类型，而不是`number`。`number`会用来特指JavaScript或者TypeScript中的数字类型。

它是JavaScript的一个超集，且它在语法上是TypeScript的一个子集。

### 建构的方式

在本节的第一部分，我们会提到TAT的一些特性，局部地讨论一些TAT的定型规则。

并且在第二部分，我们会正式开始介绍TAT的实现框架，和它在根据本节课程裁剪后的变体：TAT-STLC的具体设计和实现。

---
layout: statement
---

## 第一部分：类型检查器的基础知识

---
layout: statement
---

## 熟悉描写类型系统的工具

---

## 元语言和对象语言

我们可以广义地将一些带有规则的元素称为语言。而我们在研究形式语言的时候，经常需要用另外一种语言描述所研究的那门语言。
研究编程语言时，我们更是经常需要用另外一套记号，来描述编程语言本身。

下面，是MDN上关于JavaScript中`Array.prototype.reduce`的语法的描述。

```js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

下面这些记号，都不是JavaScript的一部分，而只是起到了描述语法模式的作用：
- `arr, callback, accumulator, currentValue, index, array, initialValue`；
- 用来表示可选的`[]`，以及`callback`中用来表示函数参数的`()`。

之所以说它是模式描述，是因为我们在真实调用的时候，不一定非得传入完全相同的名字的参数，只要匹配上了这个模式就行。比如，这样也是完全可以的：

```js
[1,2,3].reduce((acc, cur, ind,) => acc + cur + ind, -1)
```
像这样用来描述一种语言的语言，是**元语言**(Meta Language)。被描述的语言，则是**对象语言**(Object Language)。

---

## 熟悉元语言和元变量

"元语言"和"对象语言"这两个词，只是对于语言在发挥其作用时，所处的地位的描述。

下面是几个元语言的例子。

1. BNF(Backus-Naur Form，或Backus Normal Form)。
  BNF是一种上下文无关的形式语言，它可以用来描写任何一种上下文无关语言的语法——包括它自己。

  下面，我们用BNF定义了简单的算术表达式语言。此时BNF是元语言，被刻画的算术表达式语言是对象语言。

```bnf
<Digit> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
<Expr>  ::= <Expr> "-" <Expr> | <Expr> "+" <Expr> | "(" <Expr> ")" | <Digit>
```

`0`, `1+2`, `(1+2)`, `1-(2-3)`, `(1-2)-3`都是合法的表达式。

像`<Digit>`和`<Expr>`这样的，能指代一系列对象语言符号中的元语言符号，也被称为**元变量**(Meta Variable)或者**非终止符**(Nonterminal)。

<div v-click>

- 带有"元"这个前缀，是因为它不存在于对象语言之中，而存在于元语言中。`<Digit>`不是一个算术表达式。
</div>

<div v-click>

- 叫做"变量"，是因为它可以被"赋值为"它所指代的任何一个对象语言符号，而不是特定的对象语言符号。
</div>


---

## 熟悉元语言和元变量（续）

<div class="mt-10px"></div>

2. `Array.prototype.reduce`语法的描述语言。我们将其语法高亮着色：其中<span class="text-rose-400">粉色</span>的是元变量，<span class="text-blue-400">蓝色</span>的是居于辅助地位的元变量。而剩下的是对象语言的符号。

<div class="mt-10px mb-20px">
<code>
<span class="text-rose-400">arr</span>.reduce(<span class="text-blue-400"><span class="text-rose-400">callback</span>(<span class="text-rose-400">accumulator</span></span>, <span class="text-blue-400"><span class="text-rose-400">currentValue</span>[,<span class="text-rose-400">index</span>[, <span class="text-rose-400">array</span>]])[, <span class="text-rose-400">initialValue</span>]</span>)
</code>
</div>

3. 汉语。我们用汉语谈论JavaScript语法或者TAT的语法的时候，汉语就是元语言，被谈论的语言就是对象语言。在用汉语谈论汉语本身的时候，汉语即是元语言也是对象语言。比如，"形容词"这个术语就是一个元变量。

特别注意：元变量一般会避免取为对象语言中的符号，否则会给读者带来混乱。

---

## 二元关系

在刻画集合内的元素之间的关联的时候，**关系**(Relation)是一个有力的工具。

定义：若集合$R$满足$R\subseteq S\times S$，那么$R$就是一种集合$S$上的二元关系(Binary Relation)。

二元关系的例子：自然数集$\N$上的**小于**关系$R$，即我们通常所知的"$<$"。

$$
\begin{align}
R & := \{(0, 1), (0, 2), \dots, (1, 2), \dots \}, 或等价地 \\
R & := \{ (n, n+m) : n\in \N, m\in \N^+ \}
\end{align}
$$

关于记号的一些说明：

<div v-click>

- $:=$ 符号是一种特殊的等号，它表示将这个等式的左边的表达式定义为右边的表达式。
 </div>
 <div v-click>

- $\{ n : n\in \N \}$是 $\{n\mid n\in \N\}$的另外一种写法，也是一种可接受的集合记号。它用$:$代替了$\mid$，书写更加方便，我们会全部使用前者。
 </div>

---

## 二元关系（续）

<iframe class="w-full" src="https://q.uiver.app/?q=WzAsNSxbMSwwLCIxIl0sWzIsMCwiMiJdLFszLDAsIjMiXSxbMCwwLCIwIl0sWzQsMCwiXFxjZG90cyJdLFswLDFdLFszLDBdLFsxLDJdLFszLDEsIiIsMCx7ImN1cnZlIjotMn1dLFswLDIsIiIsMSx7ImN1cnZlIjotMn1dLFszLDIsIiIsMSx7ImN1cnZlIjotNX1dLFsyLDRdLFsxLDQsIiIsMSx7ImN1cnZlIjoyfV0sWzMsNCwiIiwxLHsib2Zmc2V0IjoyLCJjdXJ2ZSI6NX1dLFswLDQsIiIsMSx7ImN1cnZlIjo0fV1d&embed" width="788" height="286" style="border-radius: 8px; border: none;transform:scale(0.8);"></iframe>

自然数集上的小于关系，$R := \{ (n, n+m) : n\in \N, m\in \N^+ \}$
可以省略地画成这样。

1. 可以看到，有小于关系的两个数$x, y$都有一根有向箭头连接。
2. 我们会说$(0, 1)\in R$或者使用**中缀**的写法，写成$0R1$。

---

# $n$元关系

##

二元关系其实只是$n$元关系($n\in \N$)的特例。而关系也可以定义在**自然数个集合**之上。

-   二元关系。整除关系。

    $$
    \text{Divides} := \{ (n, m) : n\in \N^+, m\in \N, m\bmod n = 0 \}，其中 \\
    $$

    $x\bmod y = k$ 表示 $x$ 被 $y$ 除余 $k$。

-   一元关系。是否是偶数。

    $$
    \begin{align}
    \text{IsEven}:=\{0,2,4,6 \dots\}=\{n: n\in \N, 2\ \text{Divides}\ n\} \subset \N
    \end{align}
    $$

    一元关系也叫做一元**谓词**(Predicate)。谓词也可以看成是接受若干个元素，返回`true`或者`false`的函数。

---

# $n$元关系（续）

<!-- - 三元关系。
$$
\begin{align}
\text{SumEquals} & := \{(0,0,0), (0,1,1), (0, 2, 2), \dots, (1, 0, 1), \dots \} \\
                 & = \{(n, m, k) : n\in \N, m\in \N, k\in \N, n+m=k\}
\end{align}
$$ -->

-   三元关系。
    $$
    \text{ASCII} = \{(\texttt{A}, 65, \text{0x41}), (\texttt{B}, 66, \text{0x42}),\dots \} \subset \text{Letter}\times \Z \times \text{HexNumber}
    $$

在本课程中，我们会主要使用二元关系和三元关系。它们是我们刻画**项**、**类型**、**定型环境**之间关系的有力工具。

注意：关系的数学本质仅仅是一个集合。定义哪些元素之间存在关系的时候完全是任意的。不必像我们刚刚看的那些例子一样，非得将每个关系都解释出现实意义不可。

<div v-click class="my-10 text-center">
练习：请各举出一个二元关系和四元关系的例子。
</div>

---

## 作为二元关系的定型关系

如同我们在 TypeScript 中做的那样，在类型系统的文献中，我们会将一个项$t$以及这个项的类型$T$的关系，记做一个中缀表达式

$$
t:T
$$

其中，"$:$"是一个将项和类型连接的符号。 这里的$t$是一个元变量，它指代的是类型系统中的某一个项；$T$也是一个元变量，它指代的是类型系统中的一个类型。

因为这个关系涉及项和类型两个元素，因此它是一个二元关系。这个关系就是**定型关系**(Typing Relation)。

我们通常会把定型关系解读为「项$t$是一个类型$T$」(term $t$ is of type $T$, or $t$ is a $T$)。比如$\text{🍎}: 水果$就可以解读为，🍎是一个水果，或者是🍎是一个水果类型的实例。

「水果」可以看成是一个集合，其中包含了一切水果，因此我们也可以说

$$\text{🍎} \in \text{水果}$$

---
layout: section
---

## 建立基础定型规则

---

## 用自然推演来书写定型规则

接下来，我们开始逐渐往TAT中添加类型，丰富这个类型系统。 我们首先加入`Num`这种类型。

对于二元的加法`+`来说，我们有：

$$
{x: \mathbf{Num},\ y: \mathbf{Num} \over x + y : \mathbf{Num} }\ (\text{N-Add})
$$

- 每个推演规则，都由横线上下分割。

- 在横线之上的，是使用这条规则的前提；横线之下的，是在前提满足的情况下，使用这条规则能得到的结论。

- 横线右边的，是出于便于讨论的目的，给这条规则取的名字。这条规则叫做`N-Add`。


`N-Add`这个规则的意思是说：若`x`的类型是`Num`，`y`的类型是`Num`，那么`x+y`也是`Num`。

这种写法，叫做**自然推演**(Natural Deduction)。

---

# 使用自然推演来构造导出树

##

### 问题

若已知 `x: Num`, `z: Num`，`y: Num`, 那么`x+z+y`是什么类型呢？

### 思路

1. 我们的`+`如同JavaScript中的`+`一样是左结合的，也就是说$x+z+y$等价于$(x+z)+y$。
2. 那么，我们只需要知道$x+z$是什么类型，就可以知道$x+z+y$是什么类型……

### 解法

$$
\frac{
  \frac{ \displaystyle x:\ \mathbf{Num}, z:\ \mathbf{Num}}{ \displaystyle x+z:\ \mathbf{Num} } \qquad {y:\ \mathbf{Num}}
} {
  (x+z)+y:\ \mathbf{Num}
}
$$

可以看到，我们将多次应用规则$\text{N-Add}$和其他已知前提，最终得到`x+z+y: Num`的推演过程组织成了一棵树。
它叫做导出树(Derivation Tree)。同时，因为这棵树也构成了一个对`x+z+y: Num`的证明，因此它也叫做证明树(Proof Tree)。
**类型检查，就是隐式地构造这棵导出树，或者检查这个导出树是否正确**。

---

# 类型系统中缺少的一环

##

### 问题

N-Add 规则告诉我们，如果我们知道`+`的两个操作数的类型都为`Num`，那么我们就知道这个表达式的结果也为`Num`。
但是，这个规则并没有告诉我们，TAT 中什么样的项，才是`Num`类型的实例。

$$
{x: \mathbf{Num},\ y: \mathbf{Num} \over x + y : \mathbf{Num} }\ (\text{N-Add})
$$


形式化地来说，下面这个式子横线之上的`???`部分，需要填上些什么呢？

$$
{??? \over x: \mathbf{Num}}
$$

<!-- 我们都知道，`1`和`2.0`乃至`-1e15`都是 JavaScript 中的`number`类型的实例。我们希望 TAT 中的`Num`类型和 JavaScript`number`类型相同，那么`1`和`2.0`乃至`-1e15`也都是`Num`类型的实例。 -->

### 思路

我们尚未有任何根据来判断在TAT中一个项是不是`Num`类型！ 在TAT中，我们可以说对JavaScript的语法一无所知，而一个项是否是`number`的实例，却正与JavaScript语法紧密相关。或许我们应该去求助JavaScript的语法？

---

## 利用类型系统之外的结构来定义基础类型

### 解法

而在JavaScript当中，通过语法分析得到的AST节点恰好有NumericLiteral (数字字面量)这种语法类别(Syntax Kind)，完全符合JavaScript对`number`类型实例的定义。
因此，我们可以将具有NumericLiteral这种类型的节点对应的项，`Num`类型的实例。

若`x`为TAT中的项，$\bar{x}$是这个项对应的语法树上的节点，$\text{IsNumericLiteral}$是parser提供的判断一个语法树节点是否为NumericLiteral的谓词，那么`x: Num`的规则如下。由此规则，我们可以得到`1: Num`，`0.2: Num`，`-1e15: Num`等等结果。

$$
{\text{IsNumericLiteral}(\bar{x}) \over x: \mathbf{Num}}
$$


---

# 类比
##

同样地，我们可以利用AST上的节点的语法类别，继续扩张TAT的基本类型：

- 定义布尔值字面量为`Bool`类型；
- 字符串字面量为`Str`类型；
- 函数为`Func`类型……？似乎没有那么简单！

---
layout: section
---

## 定义函数类型

---

## 如何定义函数类型？

问：TAT的函数类型，就叫做`Func`好了，我们要如何从语法上定义这个类型？

### 思路

<div v-click>

- 尝试1：**继续用语法树上的节点语法类别来判断**。节点语法类别有数字字面量、布尔值字面量、字符串字面量，当然也有函数。能不能将函数节点对应的项，认为是`Func`类型的实例呢？

$$
{\text{IsFunction}(\bar{x}) \over x: \mathbf{Func}}
$$
</div>

<div v-click>

- 失败1：如果有`f: Func, x: Num`，那么试回答：`f`有几个参数，各自的类型是什么，能够接受一个`x: Num`吗？`f(x)`的类型又是什么呢？

  答案是：不知道！ 因为`Func`丢失了我们希望保留的函数入参的类型，和返回值类型。我们无从判断。如果我们接受这种规则，TAT对函数调用的类型正确与否就几乎起不到任何检查作用了。

  所以，若是仅仅只定义一个`Func`类型，而没有关于函数入参和返回值的细节，这种函数类型几乎没有用处。

</div>

---

## 如何定义函数类型？（续）

问：TAT的函数类型，就叫做`Func`好了，我们要如何从语法上定义这个类型？

### 思路

- 尝试2：那么我们只需要把函数多个的参数类型、返回值类型全部放到一个函数实例的类型中就行了。JavaScript的箭头函数语法简洁而优美，我们可以对箭头函数的语法略微修改，用来标记一个函数的类型。这条路似乎能行！对于`x => x + 1`来说，我们可以给`x`这个变量手动标注上类型，得到`(x: Num) => x + 1`。

- 出问题了：`x + 1`中，`x`的类型是什么？ 我们其实并不知道变量`x`的类型！我们现在只知道类似`1: Num`、`0.2: Num`这样光从语法层面就能得到的结果，尚未把这种针对变量的手工类型标注引入成为已知条件。

为了**引入**变量的手工类型标注，我们需要从根本上修改定型关系，使得TAT能够把`x: Num`这个手工类型标注，看做已知条件。


---

## 定型环境

在引入了函数之后，TAT中出现了变量的概念。比如：

```typescript
(x: Num) => (y: Str) => x + y
```

这里的`x`就是变量，而不是形如`1`这样的常量。`x: Num`意味着在运行的时候，这个`x`会被赋值为一个`Num`类型的实例，同理`y`就会被赋值为一个`Str`类型的实例。

为此，我们需要引入 **定型环境(Typing Environment)** 这个概念。
所谓的定型环境，就是一个存储当前作用域内变量的类型的一个列表。

一般来说，它会是形如$x: X$的类型信息形成的列表，只不过这个列表在书写的时候和我们在JavaScript里见到的形式有点区别，它没有方括号包裹。例如，在检查`x + y`这个表达式的时候，定型环境 $\Gamma$ (Gamma) 可以是：

$$
\Gamma =
  x: \text{Num},
  y: \text{Str}
$$

空的定型环境用$\varnothing$(空集符号，$\LaTeX$:`\varnothing`)表示；定型环境之间、单个二元定型关系之间，可以用逗号连接，形成新的定型环境。比如$\Gamma, z: \text{Num}$就等于$x: \text{Num},y: \text{Str}, z: \text{Num}$。

---

## 作为三元关系的定型关系

有了定型环境，我们也要对二元定型关系作些许的修改，将它们转换成三元定型关系：

$$
\Gamma \vdash t: T
$$

"$\vdash$" ($\LaTeX$:`\vdash`) 的左边是一些前提，右边是形如$t: T$的结论。
它的意思是说，**在定型环境$\Gamma$下，我们可以通过应用一些推演规则，推演出项$t$的类型是$T$这个结论**。

$\vdash$的左侧为$\varnothing$时，通常略去不写，如：

$$
\vdash 1: \text{Num}
$$

$\vdash$也可以在一行内连续使用，比如：

$$
\vdash 1: \text{Num} \vdash \text{true}: \text{Bool}
$$

上面这个式子，等价于在说$\vdash 1: \text{Num}$且$1: \text{Num}\vdash \text{true}: \text{Bool}$。

---

## 无类型$\lambda$-演算：JavaScript函数背后的理论模型

现代编程语言的函数，本质上其实是对$\lambda$-演算的一种模仿。自从20世纪30年代Alonzo Church发明了$\lambda$-演算之后，它的简洁、优美、深刻，吸引了无数人。下面是$\lambda$-演算的一个例子，计算两个变量的平方和：

$$
\lambda x.\lambda y. x^2 + y^2
$$

在现代编程语言中，$\lambda$-演算摇身一变，成为了Lambda 表达式。Lambda 表达式能让函数的定义变得简洁而优美，这使得包括Java, C++, C#, Python, Ruby, Rust, GoLang在内的各路编程语言纷纷引入了它。
而JavaScript也不例外。Lambda表达式在ES6中正式引入，叫做箭头函数。

通过研究一个最小化的模型，我们更容易地可以建立起对更加复杂的事物的原理的深刻认识。
类型系统中函数的研究，离不开$\lambda$-演算这个最小化的计算模型。
有类型$\lambda$-演算，构成了类型论研究的基石。 而为了更好地定义TAT的函数类型，我们需要研究一下最基本的$\lambda$-演算，及其有类型的变体：

<div v-click>

- 无类型$\lambda$-演算，
</div>

<div v-click>

- 简单类型$\lambda$-演算。
</div>

---


## 初识无类型$\lambda$-演算

**无类型$\lambda$-演算**(UTLC, Untyped Lambda Calculus)，是一种非常重要的、图灵完备的计算模型。
**无类型**指的是我们现在考虑的$\lambda$-演算还没有类型系统。UTLC的主要概念如下：

1. 变量(Variable)。$x$, $y$, $z$……等等，任何字母都可以作为变量名。

2. 抽象(Abstraction)。构造一个函数，并且以变量为参数。其中`.`之前的$x$就是函数的参数，也可以没有参数。`.`之后的就是函数体，函数体中的$x$被函数参数抓住，称为约束变量；反之若不被参数抓住，则称为自由变量。这个例子定义了一个返回值为入参加1的函数。

$$
\lambda x. x+1
$$

3. 应用(Application)。定义了函数，自然就可以调用。如下，将2作为这个函数的参数调用。函数的返回值是3。

$$
(\lambda x. x+1)\ 2
$$

在这门课程中，我们不会对$\lambda$-演算的语法下一个形式定义，你只需要将它的语法和计算方式类比成 JavaScript 中的箭头函数即可。因为箭头函数就是对$\lambda$-演算的模仿，积累下来的关于箭头函数的直觉大都适用于$\lambda$-演算。

---

## JavaScript 口味的无类型$\lambda$-演算

下面是一些$\lambda$-演算的式子，在JavaScript 中的对应的箭头函数的例子。

> 提示： JavaScript中的`=>`的记号，会对右边部分绑定更紧(它不是操作符，因此很难说它是右结合的)。
>
> 因此`x => y => x + y`等价于`x => (y => x + y)`。

<div grid="~ cols-2 gap-2">

```php
λx.x+1
λx.λy.x+y
(λx.λy.x+y) 1 // 得到一个函数 λy.y+1
(λx.λy.x+y) 1 2 // 得到 3
```

```js
x => x + 1;
x => y => x + y;
(x => y => x + y)(1); // 等价于 y=>y+1
(x => y => x + y)(1)(2); // 3
```

</div>

---

## 无类型$\lambda$-演算的问题

无类型$\lambda$-演算因为没有类型系统，我们只能在运行的时候判断是否有错误。

比如

$$
(\lambda x. x + 1)\ ``字符串"
$$

就会使得$\lambda$-演算的解释器去求值

$$
1 + ``字符串"
$$

而$\lambda$-演算是没有定义如何把数字和字符串加起来的！这会使得它陷入Stuck状态：语言标准没有定义解释器遇到这种情况应该怎么从错误中恢复，只能抛出异常。

当程序规模增大的时候，一些错误就只能通过运行程序发现了，成本较高。这个问题，其实只是无类型编程语言的通病。

为了解决这个问题，可以往$\lambda$-演算中引入一个简单类型系统； 这和我们往JavaScript中引入类型系统的动机相同。

---

## 简单类型$\lambda$-演算

简单类型$\lambda$-演算(STLC, Simply Typed Lambda Calculus)中的简单二字，指的是它的类型系统是简单的，只有**函数类型**($\to$类型)和一些无关紧要的**基本类型**，没有子类型、多态、递归类型等等其他特性。

只要对函数的变量的类型进行标注即可。下面就是一个合法的STLC表达式：

$$
\lambda x: \text{Num}.\ x + 1
$$

而下面这个就不是一个合法的STLC表达式，因为我们无法为$x+y$这个子表达式确定类型。

$$
\lambda x: \text{Num}.\ \lambda y: \text{Str}.\ x+y
$$

函数还能作为另一个函数的参数，构造高阶函数。这使得我们需要标注函数的类型。我们可以使用$\to$来标注函数的类型。

$$
\lambda f: \text{Num}\to \text{Str}.\ \lambda x: \text{Num}.\ f\ x
$$

其中，$f: \text{Num}\to \text{Str}$描述了这样一个类型：**接受一个$\text{Num}$类型的值，返回一个$\text{Str}$类型的值的函数**。

---

## TypeScript 口味的简单类型$\lambda$-演算

我们先回顾一下，在TypeScript中是如何标注一个箭头函数的类型的。

```typescript
((x: number) => x + 1)(1);
((x: number) => (y: number) => x + y)(2)(3);
```

`number`类型对应着TAT中的`Num`类型。因此，只需要简单地替换TypeScript类型至TAT类型，我们就得到的合法的TAT代码：

```typescript
((x: Num) => x + 1)(1);
((x: Num) => (y: Num) => x + y)(2)(3);
```

下面这两行代码，就不能通过TAT的类型检查了：
```typescript
((x: Num) => x + 1)("1");
((x: Num) => (y: Num) => x + y)(2)("3");
```


---
layout: section
---
## 第二部分：类型检查器TAT-STLC的设计与实现
---
layout: section
---

## TAT-STLC的类型系统设计

---

## 函数的定型规则: T-Var

我们来设计函数的定型规则。

1. TAT中，一个变量的类型，就是定型环境中所存储的类型。

$$
{v: T\in \Gamma \over \Gamma \vdash v: T} \tag{\text{T-Var}}
$$

我们在这里，用了集合论语言(即$v: T\in \Gamma$)来描述前提。

例如，`(x: Num) => x + 1`中，就有$\Gamma = x: \mathbf{Num}$。那么有：

$$
{x: \mathbf{Num} \in \Gamma \over \Gamma \vdash x: \mathbf{Num}}
$$

---

## 函数的定型规则: T-Abs

2. TAT中，定义函数时，需要其参数存在于定型环境之中。只有这样才能保证参数和返回值的类型都存在，最终推出函数实例的类型。

$$
{\Gamma, x: T_1 \vdash t_2: T_2 \over \Gamma \vdash (x: T_1) \Rightarrow t_2 : ({\color{magenta}k}: T_1) \Rightarrow T_2} \tag{T-Abs}
$$

需要注意的是，函数类型中的参数名$\color{magenta}k$是任意的。这是因为：

- ($\beta$-等价)在$\lambda$-演算中或是TAT中，对一个函数所约束的变量进行无冲突的统一换名，得到的新函数本质上和原来的函数相等。这也是IDE的重命名功能背后的原理。

  比如，`(x: Num)=>x+1`就其计算的功能上等价于`(y: Num)=>y+1`。

  因此，光看这两个函数的调用(应用)结果，是没法区分它们的。在这个意义上，它们等价。

---

## 函数的定型规则: T-App

3. 函数应用，也需要入参类型和实际传入的参数类型匹配。

$$
{ \Gamma \vdash t_1: T_{11} \Rightarrow T_{12} \quad \Gamma \vdash t_2: T_{11}
\over
\Gamma \vdash t_1(t_2) : T_{12}
} \tag{T-App}
$$

---

## 数字类型

还记得我们一开始如何定义数字类型的吗？我们使用了JavaScript语法树节点的类型是否是NumericLiteral来判断一个项是否是数字常量，并把所有数字常量作为`Num`类型的基本元素。

那个时候，我们将规则写成

$$
{\text{IsNumericLiteral}(\bar{x}) \over x: \mathbf{Num}}
$$

<div v-click>

但是，我们发现，前提部分其实用到了元语言（JavaScript的语法）中的谓词：`IsNumericLiteral`。换句话说，我们从类型系统之外引入了关于JavaScript语法的知识。而这种知识，在类型系统（对象语言）内是很难表示出来的。

对这种情况，出于简单起见，我们将关于JavaScript语法的先验知识作为“公理”——即不言自明，无需任何前提就能得出的结论。

这个改动反映在定型规则上，就是对所有的常量，将其前提去除，且一切定型环境下都可以直接得到它的类型。

</div>

<div v-click>

由此，我们有如下导出树，对一切$\Gamma$都成立：

$$
{\over \Gamma \vdash 1: \mathbf{Num}}和 {\over \Gamma \vdash 0.2: \mathbf{Num}} 还有 {\over \Gamma \vdash -1e15: \mathbf{Num}}
$$
</div>

---

## 数字类型上的运算符

我们先定义`+-*/`等二元运算的定型规则。因为它们十分相似，我们在描述这四个运算符的时候，令op为元变量，指代`+-*/`之中的任意一个。

$$
{\Gamma \vdash t_1:\mathbf{Num} \quad \Gamma \vdash t_2:\mathbf{Num} \over \Gamma \vdash t_1\ \text{op}\ t_2 : \mathbf{Num}} \tag{N-BinOp}
$$

`+-`还有一元运算符的性质。令op为元变量，指代`+-`之中的任意一个。

$$
{\Gamma \vdash t_1:\mathbf{Num} \over \Gamma \vdash \text{op}\ t_1\ : \mathbf{Num}} \tag{N-UnOp}
$$

---

## 字符串类型

出于同样的考虑，我们也将字符串常量的定型规则写成公理。那么就有如下导出树：

$$
{ \over \Gamma \vdash \mathtt{""}: \mathbf{Str}}
$$
还有：
$$
{\over\Gamma \vdash \mathtt{"abc"}: \mathbf{Str}}
$$
等等。

对于字符串连接意义上的`+`运算，我们有：

$$
{\Gamma \vdash t_1: \mathbf{Str} \quad \Gamma \vdash t_2: \mathbf{Str}\over\Gamma \vdash t_1 + t_2 : \mathbf{Str}} \tag{S-Concat}
$$


---

## 布尔类型

布尔类型`Bool`，可以看成是一个只有两个元素的集合

$$
\mathbb{B}:= \{\mathtt{true}, \mathtt{false}\}
$$

同样，我们有`&&`和`||`两个常用二元布尔运算符的定型规则。令op为元变量，指代`&&`或`||`之中的任意一个。

$$
{\Gamma \vdash t_1:\mathbf{Bool} \quad \Gamma \vdash t_2:\mathbf{Bool}
\over
\Gamma \vdash t_1\ \text{op} \ t_2 : \mathbf{Bool}} \tag{B-BinOp}
$$

需要注意的是，我们这个定型规则和TypeScript相比更加严格，强制要求两个操作数都是`Bool`类型的。而在TypeScript中，可以写出`1 && true`这样无类型错误的表达式。这就是为什么TAT是TypeScript的一个子集。

当然，也不能忘记一元布尔运算符取非`!`。根据JavaScript中的定义，它可以将任何类型转化为布尔类型。

$$
{\Gamma \vdash t_1: T_1 \over \Gamma \vdash \text{!}\ t_1 : \mathbf{Bool}} \tag{B-Not}
$$


---

## 布尔类型上的条件运算符

我们还能为布尔类型上的三元条件运算符，即`?:`作出定型。

$$
{
  \Gamma \vdash t_1:\mathbf{Bool} \quad \Gamma \vdash t_2: T \quad \Gamma \vdash t_3: T
  \over
  \Gamma \vdash (t_1\ ?\ t_2\ \text{:}\ t_3) : T \tag{B-Cond}
}
$$

可以看到，这个定型规则要求三元条件运算符的两个条件分支的类型必须相同。因为我们没有TypeScript那样的并类型(Union Type)来描写这种情况所需要的类型。


---

## 定型规则的使用

为了更好理解这些定型规则的使用，我们来看一个比较复杂的根据TAT表达式来构造导出树的例子。

请注意，为一个表达式构造导出树的过程，其实就是对这个表达式做类型检查的过程。一旦其中有一个子表达式的类型无法得到，那么这个表达式就包含类型错误，不是一个合法的TAT表达式。

`(x: Num) => (y: Str) => ((!x && !y) ? 1 : 2)`

为了使表达式缩短，我们在这里使得 $\Gamma = x: \mathbf{Num}, y: \mathbf{Str}$。那么就有

$$
{
    \displaystyle
  {
    \displaystyle
    {
        \displaystyle
      {
        \displaystyle
        {
            \displaystyle
          {
            \displaystyle
            x: \mathbf{Num} \in \Gamma
            \over
            \Gamma \vdash x: \mathbf{Num}
          }
        \over
        \Gamma \vdash !x: \mathbf{Bool}
        }
        {
            \displaystyle
          {
            \displaystyle
            y: \mathbf{Str} \in \Gamma
            \over
            \Gamma \vdash y: \mathbf{Str}
          }
        \over
        \Gamma \vdash !y: \mathbf{Bool}
        }
        \over
        \Gamma \vdash (!x \mathtt{\&\& } !y): \mathbf{Bool}
      }
    \quad
    {
      \over
      \Gamma \vdash 1: \mathbf{Num}
    }
    \quad
    {
      \over
      \Gamma \vdash 2: \mathbf{Num}
    }
    \over
    \Gamma \vdash
    ((!x\ \mathtt{\&\&}\ !y)\ ?\ 1 : 2): \mathbf{Num}
    }
    \over
    x: \mathbf{Num} \vdash
(y: \mathbf{Str}) \Rightarrow ((!x\ \mathtt{\&\&}\ !y)\ ?\ 1 : 2): (y: \mathbf{Str}) \Rightarrow \mathbf{Num}
  }
  \over
  \vdash (x: \mathbf{Num}) \Rightarrow (y: \mathbf{Str}) \Rightarrow ((!x\ \mathtt{\&\&}\ !y)\ ?\ 1 : 2): (x: \mathbf{Num}) \Rightarrow (y: \mathbf{Str}) \Rightarrow \mathbf{Num}
}
$$


---
layout: section
---

## TAT-STLC 的实现

---

## TAT 的类型检查和转译

### 经典编译流程

$$
\begin{aligned}
& 源代码 & \\
& \quad \Downarrow & {\cdots \small \text{分词器(Tokenizer)}} \\
& 符号流 & \\
& \quad \Downarrow & {\cdots \small \text{解析器(Parser)}}  \\
& \hspace{-0.9em} 抽象语法树 & \\
& \quad \Downarrow & {\cdots \small \text{\color{magenta}语义分析(Semantic Analysis)}} \\
& \hspace{1.5em} \vdots &
\end{aligned}
$$

而类型检查(Type Checking)在经典的编译流程中，属于语义分析的一部分。

---

## TAT 的类型检查和转译（续）

在本课程中的TAT实现里，TAT是依附于JavaScript的一门语言。它和TypeScript类似，同样需要在类型擦除后生成为JavaScript代码，才能借助JavaScript解释器进行执行。因此，它的编译流程和经典流程有些微不同。

### TAT 的编译流程

$$
\begin{aligned}
& \hspace{-1em} \text{TAT源代码} & \\
& \quad \Downarrow & {\cdots \small \text{Babel TypeScript解析器(Babel TypeScript Parser)}} \\
& \hspace{-0.9em} 抽象语法树 & \\
& \quad \Downarrow & {\cdots \small \text{类型检查(Type Checking)}} \\
& \hspace{-2.4em} 有类型信息的语法树 & \\
& \quad \Downarrow & {\cdots \small \text{类型擦除(Type Erasing)}} \\
& \hspace{-1.5em} \text{JavaScript代码} & \\
\end{aligned}
$$


---

### TAT代码的执行

TAT源代码，经过转译为JavaScript之后，在node环境或者浏览器环境解释执行。

> 注意：在原则上，我们可以实现自己的TAT解析器和解释器。但是本课程中主要关注的是类型系统的部分，因此解析和求值的工作就全部交给现成的工具来做了，而不在课程内进行详细介绍。如果你对实现一个自己的解析器和解释器有兴趣，可以联系我们探讨更多细节。

转译的过程，就是类型擦除的过程。我们把TAT代码上的类型标注全部递归地擦去，就得到了可执行的JavaScript代码。

---

## 实现TAT-STLC的类型检查

---

## 作业

课程仓库：[https://github.com/suica/write-you-a-typescript](https://github.com/suica/write-you-a-typescript)

1. 根据课程仓库中提供的TAT-STLC的测试用例，定义对象字面量类型的定型规则。
2. 实现TAT-STLC的类型检查，通过所有测试用例。

---
layout: statement
---

## 俯瞰编程语言：宇宙的层级

---

## 宇宙的层级：从字符串宇宙下行

我们不是在讨论天文学。只是，在讨论某个系统的时候，我们会把这个系统中的一切事物形成的那个搜集，叫做**宇宙**(Universe)。讨论宇宙及宇宙之间的联系和转化，可以使得我们对我们所研究的东西（类型系统和编程语言）有更深刻的认识。

- 字符串宇宙。可被一切可枚举的字母表上的所有字符串构成的宇宙；
- 形式语言宇宙。字符串宇宙中，一切可依据某种形式语言的语法规则产生的字符串构成的宇宙；
- JavaScript程序宇宙。形式语言宇宙中，可被特定JavaScript语言规范所定义的语法解析的字符串形成的宇宙；
- 在运行时不会报错的JavaScript程序宇宙；
- 可被重建出TypeScript类型的JavaScript程序宇宙；
- ……

---

## 宇宙的层级：从常量宇宙上行，有限关系宇宙

在一开始，我们只有常量可用。我们用常量构建表达式，进行计算。计算都是一次性的，不能够复用。

- 常量宇宙。比如，`1`，`"test"`等等一切常量形成的宇宙。

<div v-click>

没过多久，我们开始写真正意义上的程序。

- **有限关系**宇宙。有限关系，指的是关系中的元素是有限的。

  现在，我们可以通过穷尽描写常量之间的对应关系，把计算结果存下来，进行复用。这样，我们就能写有现实意义的程序，比如计算Fibonacci数的程序可以是一个有限的预处理好的表：

$$
F = \{(0,0), (1,1), (2, 1), (3, 2), (4, 3), (5, 5)\}
$$

$F(0)$输出$0$，$F(1)$输出$1$……

这也是一种硬编码。但是，这种描写方式所能处理的关系是有限的。你没法通过这种方式，写一个能够把**所有**自然数转换为其对应的Fibonacci数的程序。哪怕是只是硬编码$0\sim 100$都非常痛苦，而且对一些不在表中的输入，没法动态地计算答案。我们必须往上走。

</div>

---

## 宇宙的层级：函数宇宙

于是，我们将常量语言作为对象语言进行扩张，发明了函数语言。


- 函数宇宙(项宇宙)。为了扩张有限关系宇宙中的每个关系，使得我们能够（在原则上）支持无穷集之间的关系，我们引入了函数来对这种关系做抽象，并且第一次通过在线的计算，而不是去查预处理好的表来得到答案。

<div v-click>

我们可以写出

$$
F(0) = 0\\
F(1) = 1\\
F(x) = F(x-1) + F(x-2)
$$

来进行计算。

我们发现函数不够安全。$F(-1)$或者$F(``0")$都会导致这个函数**发散**（即，计算不出结果，不会停机）。我们需要一个工具来对函数、以及表达式进行约束。

</div>

---

## 宇宙的层级：类型宇宙

- 类型(Type)宇宙。为了得到用以对函数进行约束的工具，我们发明了类型。

  我们可以类型来为常量分类。于是，我们定义了自然数集$\N$，整数集$\Z$和实数集$\R$，还有字符串集合。字符串集合和数集不相交。

  我们可以用函数类型$\to$来描写函数的定义域(Domain)、陪域(Codomain)，对不符合类型的函数体或者函数调用，予以拒绝。

  比如，通过定义$F$和加号减号的类型为

  $$
  F: \N \to \N, \\
  +: \N \to \N \to \N, \\
  -: \N \to \N \to \N
  $$

  并让减号最后的返回值出现负数时截断为0，
  来拒绝不合法的调用。

---

## 宇宙的层级：二阶类型宇宙和高阶类型宇宙

- 二阶类型(Kind)宇宙。如果把$\to$视作是一种在类型宇宙中的函数，接受两个类型参数，返回一个新的类型，那么我们也可以给$\to$定义其二阶类型(Kind，没有很好的中文翻译，试译作二阶类型)。

我们再次将类型语言作为对象语言进行扩张，引入新的记号，得到了二阶类型语言。

$$
\to\ :: * \Rightarrow *
$$

其中，$::$是$:$的升级版，$\Rightarrow$是$\to$的升级版，一般都只用在高阶类型上面。

- 三阶类型宇宙(类型的类型的类型宇宙)。构造高阶类型的这个过程可以一直持续下去……但是我们一般只走到二阶类型宇宙为止，更高阶的类型，通常会纳入二阶类型语言的框架中进行描写。


---

## 扩展阅读

如果你想进一步了解$\lambda$-演算...

- [让我们来谈谈$\lambda$演算](https://github.com/txyyss/Lambda-Calculus/releases/download/v1.0/lambda.pdf)

---

# 课程反馈问卷

<img border="rounded" src="/1/类型系统-反馈问卷.png" class="w-1/4 my-20 mx-auto">

---
layout: section
---

# 类型系统入门 (下)

吴登轲 高洁璇

---

# 课程签到问卷

<img border="rounded" src="/5/类型系统（下）签到二维码.jpg" class="w-1/4 my-20 mx-auto">

---
layout: section
---

# 第三节：子类型

---


## 本节路线图

- 第一部分：子类型基础知识
  - 为何要引入子类型
  - 初识子类型关系
  - TypeScript中的子类型(类型构造器的逆变/协变/双变/不变)
- 第二部分：TAT-Sub的设计和实现
  - TAT-Sub的定型规则
  - TAT-Sub的实现

---
layout: section
---
## 第一部分：子类型基础知识

---
layout: section
---
## 为何要引入子类型

---

## 如果没有子类型
第二节中，我们讲过了TAT-STLC的定型规则 T-App

$$
{ \Gamma \vdash t_1: T_{11} \Rightarrow T_{12} \quad \Gamma \vdash t_2: T_{11}
\over
\Gamma \vdash t_1(t_2) : T_{12}
} \tag{T-App}
$$

问题来了：
以下调用是否能够通过类型检查？

```ts
((x:{a: Num}): {a: Num} => x.a)({a:1, b:2});
```

答案是：不行。
明明执行这段代码不会产生运行时错误，但是TAT-STLC仍然拒绝了这种调用。

原因在于，我们的定型规则，要求传入参数的类型和函数的类型 **完全一致**。也就是要求$\{a: \text{Num}\}$和

$$
\{a: \text{Num}, b: \text{Num}\}，
$$

也就是 $\{a:1, b:2\}$ 的类型完全一致。

但是事实上，这种严苛的要求是不必要的，因为即便是不一致，也有可能不会产生运行时错误。
这种限制给我们写程序带来了不便，因此我们需要研究一下对象的行为，接着修改一下我们的类型系统！

<!-- ## 类型和行为

1. 我们为什么需要使用类型来区分不同的值？因为，这些值有 **不同** 的预期行为。

> 例如，我们可以把两个数字类型的值加起来得到它们的数字和；但是我们不能把两个字符串类型的值加起来，然后预期得到它们的数字和。字符串的行为告诉我们，这只会得到一个新的字符串。字符串值和数字值的行为不同，因此我们需要类型来避免在写出非预期的行为。

2. 我们为什么能够使用类型来将一些值归为一类？因为，这些值具有 **共同** 的预期行为。

> 例如，在TypeScript中我们可以对一切数字值调用`.toFixed()`方法。因此，若是我们知道了一个变量是数字类型的，我们就可以调用它的`.toFixed()`方法。

那么对象的行为预期，应该是什么呢？ -->

---
layout: section
---

## 初识子类型关系

---

## 安全替换原则

在TAT中，一个变量`x`的类型若为`{a: Num}`，你能够对它做的唯一特殊的操作，就是`x.a`。
`x.a`这个操作预期得到一个`Num`类型的变量而不会发生运行时错误。
因此，若在一个期望类型为`{a: Num}`的地方，传入一个要求更高的值`{a: 1, b: 2}`，也完全符合"得到一个`Num`类型而不会发生运行时错误"的预期。

那么，`{a:1, b:2}`也就成为了一个合法的`{a: Num}`。

我们把这种对替换的直觉，归纳成为子类型的安全替换原则。如下：

> 若我们可以将任何$T$类型的值替换为$S$类型的值而安全使用，那么我们称$S$ 是 $T$的子类型，记做$S <: T$。

这里说的安全使用，可以理解成不产生运行时错误。

这里用的子类型关系记号`<:`，其实也是在暗示这种关系是一种特殊的"大小关系"（用数学一点的说法来说，是一种序关系）。
你可以将它类比为集合的$\subseteq$关系，或是数字的$\leq$关系。

---

## 形式化子类型关系

我们在TAT的类型系统中，扩展一下定型规则，使其引入子类型。

$$
{ \Gamma \vdash t: S \quad S<: T
\over
\Gamma \vdash t : T
} \tag{T-Sub}
$$

这个规则的意思是说，若$S$是$T$的子类型，那么$S$类型的项也是$T$类型的项。

类型 $S$ 和类型 $T$ 的关系如下：
- $S$ 是 $T$ 的子类型。
- $S$ 比 $T$ 信息更丰富、要求更高。

例如，直觉上来看，类型$\{a:\text{Num}, b: \text{Num}\}$ 比类型 $\{a:\text{Num}\}$ 更严格、实例数量更少、要求更高。

若将类型看成一个集合，类型$\{a:\text{Num}, b: \text{Num}\}$ 是类型 $\{a:\text{Num}\}$ 的真子集。前者的所有元素都是后者的元素。

---

## 子类型关系
基于安全替换原则，我们可以形式化定义子类型关系的一些代数性质：

子类型的自反性。即，类型$S$是$S$自己的子类型。
$${S<:S} \tag{S-Refl} $$

子类型的传递性。即，若$S<:U$，且$U<:T$，就有$S<:T$。

$$
{ S <: U \quad U <: T
\over
S <: T
} \tag{S-Trans}
$$

---
layout: section
---

## TypeScript中的子类型

---

## TypeScript的结构类型系统

常见的面向对象语言，如Java、C#，使用的是名义类型系统，即类型之间的子类关系是用户使用继承显式定义的。
但是在TypeScript中，子类型关系却是根据对象的结构来定义的。

<!-- 在 TAT 中，我们也希望实现结构类型系统。即类型之间的子类关系是系统自动推出的 -->

在 TypeScript 中的类型系统，是基于结构子类型的，如下。

```typescript
interface Named {
    name: string;
}
class Person {
    name: string;
}
let p: Named;
// 不会有类型错误，因为使用了结构类型系统
p = new Person();
```
在使用基于名义类型的语言，比如 C# 或 Java 中，这段代码会报错，因为 Person 类没有明确说明其实现了 Named 接口。
TypeScript 的结构性子类型是根据 JavaScript 代码的典型写法来设计的。因为 JavaScript 里广泛地使用函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更符合JavaScript开发者的直觉。这个设计决策使得TypeScript更容易为JavaScript开发者所接受。

---

## 顶类型和底类型

在TypeScript中，有`unknown`和`never`两个很特殊的类型：

- 对一切类型$S$，都有$S<:$`unknown`。`unknown`叫做顶类型。
- 对一切类型$S$，都有`never`$<:S$。`never`叫做底类型。

若我们使用一个有向图来表示TypeScript中的这种子类型关系，就有：

<div class="ml-15vw">

```mermaid {scale: 0.8}
flowchart TB
  unknown --> string --> never
  unknown --> number --> never
  unknown --> object --> never
  unknown --> boolean --> never
  unknown --> others --> never

```

</div>

之所以将`unknown`叫做顶类型，把`never`叫做底类型，是因为：
它们在子类型关系中分别居于所有类型的顶端和底端。

---

## 函数之间产生子类型关系的条件

令`f: (x: T1) => T2`， `g: (x: S1) => S2`，不妨令`g`是`f`的子类型，且`x: T1`。

我们接下来分析此时`T1, T2, S1, S2`需要满足什么必要条件。我们从函数参数和返回值两个角度来分析。

- 函数参数。

`g`是`f`的子类型，所以，`g`应当能够安全替换所有`f`的使用处。对于`x: T1`时的任何取值，计算`f(x)`不会出错，那计算`g(x)`也不应该出错。

而`g`的参数类型又是`S1`，那么就知道，`T1`类型需要可以出现在任何`S1`出现的位置。

这等价于需有`T1<:S1`这个条件。

- 返回值。

`g`是`f`的子类型，所以`g`应当能够安全替换所有`f`的使用处。

也就是如`f(x): T2`的使用处，都能被`g(x): S2`安全替换。这就是`T2`类型都需要能被`S2`类型安全替换。

这等价于需有`S2<:T2`这个条件。

---

## 函数的子类型规则

根据我们刚才的推导，我们得到了函数之间产生子类型关系的必要条件。
我们可以验证发现，这个必要条件同时也是充分条件。

那么就可以得出完整的函数的子类型规则：

$$
{ T_1 <: S_1 \quad S_2 <: T_2
\over
S_1 \Rightarrow S_2 <: T_1 \Rightarrow T_2
} \tag{S-Arrow}
$$

若是理解了上面这个式子，就理解了函数的子类型关系。 

---

## 类型构造器

函数类型，其实是一种 **类型构造器**。

这个说法可能有点陌生，但是大家应该都知道TypeScript`Array`这个类型吧。

你不能通过`const a: Array = []`来使用`Array`，因为你还必须给`Array`传上一个 **类型参数**，比如

```ts
const a: Array<number> = [];
```

这种接受若干类型，吐出另外一个类型的 **类型**，就叫做类型构造器(Type Constructor)，也叫做类型算子(Type Operator)。

函数类型，其实也是一个类型构造器。它接受两个类型参数：入参的类型，函数返回值的类型，吐出一个函数类型。之所以我们察觉不到，是因为函数类型的标注用了箭头来当语法糖，例如，`(x:number)=>string`。

其实完全可以把函数类型的形式做得和`Array`一样，比如用`Func<number,string>`来表示`(x:number)=>string`。

你可以把类型构造器，看成类型版本的函数。它接受类型返回类型，本身也是类型；正如函数接受数值返回数值，本身也是数值。只是，它们所在的层次不同，前者在类型的世界里，后者在项的世界里。

---

## 函数类型构造器的逆变、协变

对于每一个类型构造器，我们都需要定义其子类型规则。 一般来说，我们会根据这个类型构造器在语言中的语义来确定。

比如，我们刚刚就确定了函数类型的子类型规则：

$$
{ T_1 <: S_1 \quad S_2 <: T_2
\over
S_1 \Rightarrow S_2 <: T_1 \Rightarrow T_2
} \tag{S-Arrow}
$$

我们说函数类型对参数是逆变(Contravariant)的——它反转了子类型关系的方向，对返回值是协变(Covariant)的——它维持了子类型关系的方向。

例如在TypeScript中，有：

```ts
number=>unknown <: 1 => unknown // 参数逆变
number=>string <: 1 => unknown // 参数逆变+返回值协变
number=>string <: number => unknown // 返回值协变
```

注：若无特别指出，关于TypeScript的结论都是开启`--strictFunctionTypes`开关的结果。若不开启此开关，函数是双变的。

---

## 函数类型构造器的双变

所谓双变(Bivariant)，就是既逆变，也协变。试看如下代码：

```ts {monaco}
declare let f1: (x: {}) => void;
declare let f2: (x: {dog:true}) => void;
declare let f3: (x: {cat:true}) => void;
f1 = f2; // Error with --strictFunctionTypes
f2 = f1; // Ok
f2 = f3; // Error
```

若不开启`--strictFunctionTypes`，TypeScript函数的参数位置是双变的。

---

## 数组类型构造器的协变和不变

我们考察了TypeScript中的函数类型构造器，再来考察一下TypeScript对`Array`这个类型构造器的设计。

`Array`是协变的，因为有：
```ts
Array<number> <: Array<unknown>
```

但是，TypeScript采用的这个设计是不安全的，如下代码所示， `c`这个变量，推导出的类型是`number`。但是运行时的值是个`string`。

```ts {monaco}
const a: Array<number> = [];
const b: Array<unknown> = a;
b.push("haha string!");
const c = a[0]; // 这里实际获得了一个string类型的值
```

因此，对于可变数组来说，协变是不安全的，应当使用不变(Invariant)。

不变是指，`Array<S>`和`Array<T>`之间若`S`和`T`不同，则没有子类型关系，不能互相替代。但是这会使得数组使用起来不够方便，因此TypeScript也作出了妥协。 不可变数组`ReadonlyArray`的协变则是安全的。

---
layout: section
---

## 第二部分：TAT-Sub的实现

---

## TAT-Sub

TAT-Sub是基于TAT-STLC的类型检查器，具有前者的全部功能，因此保留所有TAT-STLC的类型规则。

此外，还增加了子类型的定型规则。

---

## 子类型定型规则

自反性。
$${S<:S} \tag{S-Refl} $$

传递性。
$$
{ S <: U \quad U <: T
\over
S <: T
} \tag{S-Trans}
$$

我们还引入了顶类型。

$${S<:\text{Top}} \tag{S-Top} $$

关于函数类型，我们使用之前推导出来的定型规则。

$$
{ T1 <: S1 \quad S2 <: T2
\over
S1 \Rightarrow S2 <: T1 \Rightarrow T2
} \tag{S-Arrow}
$$

---

## 子类型定型规则（续）

这是我们使用的对象类型的子类型定型规则，它引入了结构子类型。

$$
\{l_i\quad^{i\in 1..n}\}⊆\{k_j\quad^{j\in 1..m}\}
\\
\\
{ k_j = l_i \quad implies \quad S_j <: T_i
\over
\{k_j:S_j\quad ^{j\in 1..m}\} <: \{l_i:T_i\quad ^{i\in 1..n}\}
} \tag{S-Obj}
$$

这个规则下，我们有：

```ts
{a:Num, b:{c:Str}} <: {a:Num}
{a:Num, b:{c:Str}} <: {a:Num, b:{c:Top}}
```

我们还需要往我们的类型系统中加入安全替换原则。

$$
{ \Gamma \vdash t: S \quad S<: T
\over
\Gamma \vdash t : T
} \tag{T-Sub}
$$

---

## TAT-Sub的代码实现

Live coding!

---

## 作业

1. 实现TAT-Sub，通过所有的测试用例。

---
layout: section
---
# 第四节：多态

---

## 本节路线图

- 第一部分：多态的基础知识
  - 有哪些多态
    - 子类型多态
    - 参数多态
    - 特设多态
  - 将参数多态引入类型系统
    - 多态性$\lambda$-演算(System F)
    - 全称类型
- 第二部分：TAT-Sub-F的实现
  - TAT-Sub-F的编码实现

---
layout: section
---

## 有哪些多态

---

## 什么是多态

多态(Polymorphism)这个词，可以拆解为poly(多种)-morph(形态)-ism(后缀，指示这是一个名词)。

所谓多态，大意就是指同一份代码能够有多种行为、多种类型。

接下来，我们会看到如下几种多态的例子：

- 子类型多态
- 参数多态
- 特设多态

---

## 子类型多态

在谈论面向对象编程的时候，我们通常用多态来指代用子类型实例替换父类型实例，并且能够通过将子类型的实例转型成父类型，然后动态调用父类型方法的现象。 

但是，这其实只是类型系统中各种多态当中的一种。在类型系统的理论中，它叫做 **子类型多态**(Subtype Polymorphism)。
在Java中，我们有如下子类型多态的例子：


```java {monaco}
class Shape {
    void draw() {}
}
class Square extends Shape {
    void draw() {
        System.out.println("Square.draw()");
    }
}
///main函数
Shape shape1 = new Square();
shape1.draw(); // Square.draw();
```

关于这种多态，我们其实已经在第三节：子类型中讲过并且实现了。

---

## 参数多态

参数多态(Parametric Polymorphism)有另外一个我们所熟知的名字：泛型(Generics)。在函数式编程的语境中，我们一般用多态这个词来指代参数多态。

试看如下TypeScript代码：

```ts {monaco}
function printEach<T>(list:T[]){
  for(const item of list){
    console.log(item);
  }
}
const numberArr: number[] = [1,2,3];
const stringArr: string[] = ["test1","test2"];
printEach(numberArr);
printEach(stringArr);
printEach<unknown>([]);
```

参数多态，使得同一份代码能够适用于不同类型的参数，我们只需要隐式或显式地传入"类型"，让这些类型填上函数签名中所要求的类型参数即可。

---

## 特设多态

特设多态(Ad-hoc Polymorphism)，指的是一些编程语言中的重载(Overloading)机制。

还记得我们在第一节:类型系统简介中遇到的那个`add`函数的例子吗？

```ts {monaco}
function add<A extends string, B extends string>(first: A, second: B): `${A}${B}`;
function add(first: number, second: number): number;
function add(first: unknown, second: unknown): unknown {
    return ((first as any) + second) as any;
}
add("1",1);
add("1","1");
add(1,1);
```

我们手动写了两个`add`函数的类型签名，告诉TypeScript这个函数所能支持的两种不同形式的调用。

我们要支持多少种特殊的调用，就需要写多少个类型签名。这种写签名的方式，是 **特设**(Ad-hoc)的。特设的意思是，针对每一种特殊的情形，都需要单独处理。

---
layout: section
---

## 将多态引入类型系统

---

## 目标类型系统: TAT-Sub-F

我们刚刚提到了三种多态：子类型多态、参数多态和特设多态。

我们其实已经在TAT-Sub中实现了子类型多态，而特设多态没有特别大的理论意义，因此我们会将参数多态引入TAT-Sub的类型系统，得到一个新的类型检查器: TAT-Sub-F。

接下来，我们看看为了引入参数多态，我们需要做哪些改动。先从观察TypeScript的行为出发。

---

## 类型变量

首先，观察TypeScript的泛型函数的形式，我们发现它需要填写泛型参数，如下：

```ts {monaco}
function printEach<T>(list:T[]){
  for(const item of list){
    console.log(item);
  }
}
```

其中的`T`就是泛型参数。也叫做类型变量，因为这个 **变量的取值是类型系统中的各种类型**；这如同普通的变量的取值是编程语言层面的各种值。

`< >`记号将泛型参数包裹起来，用以在语法上标志其中的内容是类型变量。

---

## 类型变量（续）

泛型参数，会在函数被调用的时候，被一个实际的类型替换，之后再进行类型检查。

这是说，如果进行
```ts
printEach<number>([1,2,3]);
```
这样的调用，相当于就是对
```ts {monaco}
function printEach(list:number[]){
  for(const item of list){
    console.log(item);
  }
}
printEach([1,2,3]);
```

这样的TypeScript代码做类型检查。注意，其中的类型变量`T`被一个实际的类型`number`替换了。

因此，我们现在的主要工作，就是在TAT-Sub的类型系统中引入类型变量。

---

## 多态性$\lambda$-演算(System F)

通过在TAT-Sub中引入类型变量，我们就能得到和多态性$\lambda$-演算(Polymorphic lambda-calculus)相同的参数多态能力。
多态性$\lambda$-演算，也有另外一个来自证明论的名字：System F。这也是TAT-Sub-F中F的来源。

具体来说，我们在原本的T-Abs(创建函数)和T-App(调用函数)规则之外，加入两条新规则T-TAbs(创建泛型函数)和T-TApp(调用泛型函数)：

$$
{\Gamma, X \vdash t_2: T_2 \over \Gamma \vdash\quad \langle X\rangle(x: T_1):T_2 \Rightarrow t_2 : \forall X.\ T_1 \Rightarrow T_2} \tag{T-TAbs}
$$

其中，带有泛型参数的函数的类型，我们记成$\forall X.\ T_1 \Rightarrow T_2$，其中$X$可以是任意类型变量。

$$
{ \Gamma \vdash t_1:\forall K. T_{11} \Rightarrow T_{12}
\over
\Gamma \vdash\quad t_1\langle X\rangle : [K\mapsto X] T_{11}\Rightarrow [K\mapsto X] T_{12}
} \tag{T-TApp}
$$

<!-- $$
{ \Gamma \vdash t_1:\forall K. T_{11} \Rightarrow T_{12} \quad \Gamma \vdash t_2: [K\mapsto X] T_{11}
\over
\Gamma \vdash\quad t_1\langle X\rangle(t_2) : [K\mapsto X] T_{12}
} \tag{T-TApp}
$$ -->

其中，$[K\mapsto X] T_{11}$表示将$T_{11}$中的类型变量$K$(如果有)替换为$X$。若$X$是$\text{Num}$，$T_{11}$是$\{a: K\}$，那么这个替换的结果就是一个新的类型$\{a: \text{Num}\}$。

这两条规则，和TAT-Sub的规则并不冲突。

---

## 全称类型和柯里霍华德同构

大家可能有这样的疑惑，为什么需要将多态的函数类型记成$\forall X. T_1\Rightarrow T_2$的样子呢？

它的原因是，类型系统的推理规则，其实本质上和一个逻辑上的公理系统的推理规则是一样的。

我们可以把一个命题，例如$A\to B$看成是一个类型$A\Rightarrow B$。

他们具有类似的推理规则，即分离规则(有$A$和$A\to B$,则有$B$)和函数应用规则(有$A$类型的实例和$A\Rightarrow B$ 类型的函数, 则可以通过调用函数得到$B$类型的实例)。

类型和命题可以一一对应，因此他们是同构的，这种同构叫做柯里霍华德同构(Curry-Howard Isomorphism)。

逻辑学上的二阶直觉主义逻辑中的$\forall$量词，正和多态的类型同构。

因此，带有类型参数的函数类型，也叫做全称类型。

---

## TAT-Sub-F的实现

Live coding!

实现思路：

1. 根据Babel的AST，提取出泛型函数的参数。
2. 实现类型的递归替换函数。

---

## 作业

1. 实现TAT-Sub-F，通过所有测试用例。

---
layout: section
---

## 第五节：TAT类型检查器与TypeScript的类型编程

---

## 本节路线图

- 回顾TAT类型检查器:TAT-Sub-F
  - 能力模型: Lambda Cube
  - 和TypeScript的差距
- TypeScript的类型编程
  - 在类型上编码计算过程
  - 在类型上实现自然数
  - TypeScript的类型系统是图灵完备的
  - 类型体操问题集：Type Challenges
  - 类型体操问题集：Type Gymnastics

---

## 能力模型：Lambda Cube

关于类型系统的能力，我们有一个来自纯类型系统(PTS)的能力模型，叫做Lambda Cube。

它有三个维度：是否支持多态(Polymorphism)，是否支持类型算子(Type Operator)，是否支持依值类型(Dependent Type)。

根据类型检查器在STLC的基础之上又增加了哪些能力，我们以STLC为原点，一共可以得到8个顶点，每个顶点代表一类类型检查器的能力。需要注意的是，子类型其实不在Lambda Cube的能力考察范围中。


<img border="rounded" src="/1/lambda-cube.jpeg" class="w-1/3 mx-auto">

从Lambda Cube的角度出发，TAT-Sub-F现在处于$\lambda2$这个位置，TypeScript处于$\lambda \omega$。

---

## TAT类型检查器回顾

我们收获了什么：

1. 实现了基本的函数类型检查。
2. 实现了子类型。
3. 实现了参数多态。
4. 得到了关于类型系统的入门知识。

TAT和TypeScript的差距:
1. 缺乏有意义的诊断信息（类型报错信息），导致没有办法精确定位类型错误发生的位置。
2. 缺少LSP（语言服务），导致没有办法在编辑器中进行实时的类型检查和语言提示。
3. 缺少类型操作符(例如，`Array`这个一元类型算子)的能力。
4. 缺少隐式的类型推断。

---

## TypeScript的类型编程

Live coding!

1. 如何在类型上编码计算过程
2. 在类型上实现自然数
3. TypeScript的类型系统是图灵完备的!

---

## 类型体操问题集：Type Challenges

仓库地址：https://github.com/type-challenges/type-challenges

这里的题做得越多，你对TypeScript的掌控力就越强。推荐先通读TypeScript的官方手册再进行解题。

## 类型体操问题集 Type Gymnastics

仓库地址：https://github.com/g-plane/type-gymnastics

这里有一些高难度的TypeScript类型编程问题，供进阶者挑战。

## 类型体操的本质

注意：TypeScript类型编程从本质上来说，就是使用类型系统这种非常受限的编程语言来解答问题。它和我们在运行时编程，没有本质的区别；此外，在日常的编程工作中，需要适当使用类型体操的技巧，在追求效率的工程实践和追求优雅的审美过程之间达成平衡。

---

## 作业

1. 完成3道Type Challenges上的Medium难度的题目；
2. 实现一个TypeScript有，但是TAT-Sub-F还没有的功能。
  - 步骤：选定功能，确定定型规则，实现单测，实现功能。

---

# 课程反馈问卷

您的反馈能帮助我们更好地优化课程，非常期待您的反馈。

<img border="rounded" src="/5/类型系统（下）反馈二维码.png" class="w-1/4 my-20 mx-auto">
