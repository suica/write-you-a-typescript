---
sidebar_position: 1
---

# 0. 课程介绍

-   本课程主要面向有一定经验的 TypeScript 用户，对于没有 TypeScript 经验的学习者，可以在先学完基本的 TypeScript 课程再来学习本课程。

-   本课程不预设学习者有特别的数学背景，尽量简化用到的数学知识，并会对学习者可能不熟悉的数学知识进行及时的介绍。但是，学习者应当熟悉高中数学涉及到的命题逻辑(比如，$\land$, $\lor$, $\lnot$, $\forall$)以及简单的集合论等相关知识。

-   本课程的一大特色就是**产出导向**。每一节课后，都设有需要动手编码的小作业。如果你完成了每节课后的作业，那么你最终就能得到一个属于自己的类TypeScript的类型检查器，并且对TypeScript的类型系统产生较为深入的理解。

-   课程仓库：[https://github.com/suica/write-you-a-typescript](https://github.com/suica/write-you-a-typescript)
    - 在这里你可以找到课程幻灯片的源码，和类型检查器的代码。 

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

### 第五节：TAT类型检查器与TypeScript的类型编程

-   类型检查器成品回顾；TypeScript 的「类型体操」以及例子；柯里霍华德同构。
-   在这一节，你将使用你自己写的类型检查器和TypeScript解决一系列有挑战性的问题，并了解这个玩具类型检查器还有什么特性可以添加，和TypeScript的类型检查器的差距在哪里。


## 参考文献

[Type Systems](http://lucacardelli.name/papers/typesystems.pdf)

> 如果你想了解更多关于类型系统的知识，可以参考这篇综述。

[Benjamin C. Pierce. 2002. Types and Programming Languages (1st. ed.). The MIT Press.](https://dl.acm.org/doi/book/10.5555/509043) 

> 如果你想了解更多关于类型系统的数学细节，可以参考这本书。

[Lambda cube and dependent types](https://www.math.nagoya-u.ac.jp/~garrigue/lecture/2018_tenbo/dependent.pdf) 

> 如果你想了解更多的PTS，可以参考这篇文章。