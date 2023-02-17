---
sidebar_position: 3
---

# 描写类型系统的工具

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

- 带有"元"这个前缀，是因为它不存在于对象语言之中，而存在于元语言中。`<Digit>`不是一个算术表达式。


- 叫做"变量"，是因为它可以被"赋值为"它所指代的任何一个对象语言符号，而不是特定的对象语言符号。



---

## 熟悉元语言和元变量（续）



2. `Array.prototype.reduce`语法的描述语言。我们将其语法高亮着色：其中<span class="text-rose-400">粉色</span>的是元变量，<span class="text-blue-400">蓝色</span>的是居于辅助地位的元变量。而剩下的是对象语言的符号。

    <code>
        <span class="text-rose-400">arr</span>.reduce(<span class="text-blue-400"><span class="text-rose-400">callback</span>(<span class="text-rose-400">accumulator</span></span>, <span class="text-blue-400"><span class="text-rose-400">currentValue</span>[,<span class="text-rose-400">index</span>[, <span class="text-rose-400">array</span>]])[, <span class="text-rose-400">initialValue</span>]</span>)
    </code>


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



- $:=$ 符号是一种特殊的等号，它表示将这个等式的左边的表达式定义为右边的表达式。

- $\{ n : n\in \N \}$是 $\{n\mid n\in \N\}$的另外一种写法，也是一种可接受的集合记号。它用$:$代替了$\mid$，书写更加方便，我们会全部使用前者。

---
 

## 二元关系（续）

<iframe src="https://q.uiver.app/?q=WzAsNSxbMSwwLCIxIl0sWzIsMCwiMiJdLFszLDAsIjMiXSxbMCwwLCIwIl0sWzQsMCwiXFxjZG90cyJdLFswLDFdLFszLDBdLFsxLDJdLFszLDEsIiIsMCx7ImN1cnZlIjotMn1dLFswLDIsIiIsMSx7ImN1cnZlIjotMn1dLFszLDIsIiIsMSx7ImN1cnZlIjotNX1dLFsyLDRdLFsxLDQsIiIsMSx7ImN1cnZlIjoyfV0sWzMsNCwiIiwxLHsib2Zmc2V0IjoyLCJjdXJ2ZSI6NX1dLFswLDQsIiIsMSx7ImN1cnZlIjo0fV1d&embed" width="788" height="286" style={{'borderRadius': '8px', 'border': 'none', 'transform':'scale(0.8)'}}></iframe>

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

练习：请各举出一个二元关系和四元关系的例子。

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
 
