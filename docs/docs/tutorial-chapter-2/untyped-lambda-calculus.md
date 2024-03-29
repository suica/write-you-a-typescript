---
sidebar_position: 5
---

# 无类型λ-演算

现代编程语言的函数，本质上其实是对$\lambda$-演算的一种模仿。自从20世纪30年代Alonzo Church发明了$\lambda$-演算之后，它的简洁、优美、深刻，吸引了无数人。下面是$\lambda$-演算的一个例子，计算两个变量的平方和：

$$
\lambda x.\lambda y. x^2 + y^2
$$

在现代编程语言中，$\lambda$-演算摇身一变，成为了Lambda 表达式。Lambda 表达式能让函数的定义变得简洁而优美，这使得包括Java, C++, C#, Python, Ruby, Rust, GoLang在内的各路编程语言纷纷引入了它。
而JavaScript也不例外。Lambda表达式在ES6中正式引入，叫做箭头函数。

通过研究一个最小化的模型，我们更容易地可以建立起对更加复杂的事物的原理的深刻认识。
类型系统中函数的研究，离不开$\lambda$-演算这个最小化的计算模型。
有类型$\lambda$-演算，构成了类型论研究的基石。 而为了更好地定义TAT的函数类型，我们需要研究一下最基本的$\lambda$-演算，及其有类型的变体：

- 无类型$\lambda$-演算，

- 简单类型$\lambda$-演算。

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
(x) => x + 1;
(x) => (y) => x + y;
(
  (x) => (y) =>
    x + y
)(1); // 等价于 y=>y+1
(
  (x) => (y) =>
    x + y
)(1)(2); // 3
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
(
  (x: number) => (y: number) =>
    x + y
)(2)(3);
```

`number`类型对应着TAT中的`Num`类型。因此，只需要简单地替换TypeScript类型至TAT类型，我们就得到的合法的TAT代码：

```typescript
((x: Num) => x + 1)(1);
(
  (x: Num) => (y: Num) =>
    x + y
)(2)(3);
```

下面这两行代码，就不能通过TAT的类型检查了：

```typescript
((x: Num) => x + 1)('1');
(
  (x: Num) => (y: Num) =>
    x + y
)(2)('3');
```
