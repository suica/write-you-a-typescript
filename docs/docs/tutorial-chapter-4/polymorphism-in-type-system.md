---
sidebar_position: 3
---

# 将多态引入类型系统

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