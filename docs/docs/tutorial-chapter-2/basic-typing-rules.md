---
sidebar_position: 4
---

# 建立基础定型规则

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