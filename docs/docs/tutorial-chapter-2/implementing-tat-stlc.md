---
sidebar_position: 7
---

# TAT-STLC 的实现

## TAT 的类型检查和转译

### 经典编译流程

$$
\begin{aligned}
& \text{源代码} & \\
& \quad \Downarrow & {\cdots \small \text{分词器(Tokenizer)}} \\
& \text{符号流} & \\
& \quad \Downarrow & {\cdots \small \text{解析器(Parser)}}  \\
& \hspace{-0.9em} \text{抽象语法树} & \\
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
& \hspace{-0.9em} \text{抽象语法树} & \\
& \quad \Downarrow & {\cdots \small \text{类型检查(Type Checking)}} \\
& \hspace{-2.4em} \text{有类型信息的语法树} & \\
& \quad \Downarrow & {\cdots \small \text{类型擦除(Type Erasing)}} \\
& \hspace{-1.5em} \text{JavaScript代码} & \\
\end{aligned}
$$


---

### TAT代码的执行

TAT源代码，经过转译为JavaScript之后，在node环境或者浏览器环境解释执行。

> 注意：在原则上，我们可以实现自己的TAT解析器和解释器。但是本课程中主要关注的是类型系统的部分，因此解析和求值的工作就全部交给现成的工具来做了，而不在课程内进行详细介绍。如果你对实现一个自己的解析器和解释器有兴趣，可以联系我们探讨更多细节。

转译的过程，就是类型擦除的过程。我们把TAT代码上的类型标注全部递归地擦去，就得到了可执行的JavaScript代码。

## 作业

课程仓库：[https://github.com/suica/write-you-a-typescript](https://github.com/suica/write-you-a-typescript)

1. 根据课程仓库中提供的TAT-STLC的测试用例，定义对象字面量类型的定型规则。
2. 实现TAT-STLC的类型检查，通过所有测试用例。