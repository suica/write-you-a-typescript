---
sidebar_position: 6
---

# TAT-Sub的设计和实现

---

## TAT-Sub

TAT-Sub是基于TAT-STLC的类型检查器，具有前者的全部功能，因此保留所有TAT-STLC的类型规则。

此外，还增加了子类型的定型规则。

---

## 子类型定型规则

自反性。
$$
{S<:S} \tag{S-Refl}
$$

传递性。
$$
{ S <: U \quad U <: T
\over
S <: T
} \tag{S-Trans}
$$

我们还引入了顶类型。

$$
{S<:\text{Top}} \tag{S-Top}
$$

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

## 作业

1. 实现TAT-Sub，通过所有的测试用例。