---
sidebar_position: 6
---

# TAT-STLC的类型系统设计

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