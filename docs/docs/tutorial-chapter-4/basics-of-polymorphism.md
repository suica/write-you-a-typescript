---
sidebar_position: 2
---

# 多态的基础知识

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
function printEach<T>(list: T[]) {
  for (const item of list) {
    console.log(item);
  }
}
const numberArr: number[] = [1, 2, 3];
const stringArr: string[] = ['test1', 'test2'];
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
add('1', 1);
add('1', '1');
add(1, 1);
```

我们手动写了两个`add`函数的类型签名，告诉TypeScript这个函数所能支持的两种不同形式的调用。

我们要支持多少种特殊的调用，就需要写多少个类型签名。这种写签名的方式，是 **特设**(Ad-hoc)的。特设的意思是，针对每一种特殊的情形，都需要单独处理。
