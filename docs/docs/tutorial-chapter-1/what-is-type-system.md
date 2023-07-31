---
sidebar_position: 2
---

# 什么是类型系统

## 类型系统的基本概念

一个**值 (Value)**，就是某个东西。它既可以是一个直观上的概念，也可以被解读为编程语言中的**项**。

一个**搜集 (Collection)**，就是一堆东西组成的整体。它是一个直观上的概念。

一个**类型 (Type)**，就是一个由**值**组成的**搜集** [^ts] （你可以直观地认为类型就是一个值组成的**集合**)。

在编程语言中，**一个表达式的类型**就是它在执行之时估计会取到的值形成的一个 **搜集** [^ts]。

## 类型系统的定义

> "A type system is a tractable syntactic method for proving the absence of certain program behaviors by classifying phrases according to the kinds of values they compute." - [^tapl]

在编程语言中，**类型系统 (Type System)** 就是一个**类型规则的搜集**，这套规则能为语言中的结构（函数、表达式等）确定类型。

这些规则呈「如果 A，则 B」的形式。例如：如果`a: number, b: number`，那么`(a+b): number`。

[^ts]: [Type Systems](http://lucacardelli.name/papers/typesystems.pdf)
