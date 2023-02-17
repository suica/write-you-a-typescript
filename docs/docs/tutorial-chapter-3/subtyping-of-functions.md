---
sidebar_position: 5
---

# 函数的子类型

## 函数之间产生子类型关系的条件

令`f: (x: T1) => T2`， `g: (x: S1) => S2`，不妨令`g`是`f`的子类型，且`x: T1`。

我们接下来分析此时`T1, T2, S1, S2`需要满足什么必要条件。我们从函数参数和返回值两个角度来分析。

- 函数参数。

`g`是`f`的子类型，所以，`g`应当能够安全替换所有`f`的使用处。对于`x: T1`时的任何取值，计算`f(x)`不会出错，那计算`g(x)`也不应该出错。

而`g`的参数类型又是`S1`，那么就知道，`T1`类型需要可以出现在任何`S1`出现的位置。

这等价于需有`T1<:S1`这个条件。

- 返回值。

`g`是`f`的子类型，所以`g`应当能够安全替换所有`f`的使用处。

也就是如`f(x): T2`的使用处，都能被`g(x): S2`安全替换。这就是`T2`类型都需要能被`S2`类型安全替换。

这等价于需有`S2<:T2`这个条件。

---

## 函数的子类型规则

根据我们刚才的推导，我们得到了函数之间产生子类型关系的必要条件。
我们可以验证发现，这个必要条件同时也是充分条件。

那么就可以得出完整的函数的子类型规则：

$$
{ T_1 <: S_1 \quad S_2 <: T_2
\over
S_1 \Rightarrow S_2 <: T_1 \Rightarrow T_2
} \tag{S-Arrow}
$$

若是理解了上面这个式子，就理解了函数的子类型关系。 

---

## 类型构造器

函数类型，其实是一种 **类型构造器**。

这个说法可能有点陌生，但是大家应该都知道TypeScript`Array`这个类型吧。

你不能通过`const a: Array = []`来使用`Array`，因为你还必须给`Array`传上一个 **类型参数**，比如

```ts
const a: Array<number> = [];
```

这种接受若干类型，吐出另外一个类型的 **类型**，就叫做类型构造器(Type Constructor)，也叫做类型算子(Type Operator)。

函数类型，其实也是一个类型构造器。它接受两个类型参数：入参的类型，函数返回值的类型，吐出一个函数类型。之所以我们察觉不到，是因为函数类型的标注用了箭头来当语法糖，例如，`(x:number)=>string`。

其实完全可以把函数类型的形式做得和`Array`一样，比如用`Func<number,string>`来表示`(x:number)=>string`。

你可以把类型构造器，看成类型版本的函数。它接受类型返回类型，本身也是类型；正如函数接受数值返回数值，本身也是数值。只是，它们所在的层次不同，前者在类型的世界里，后者在项的世界里。

---

## 函数类型构造器的逆变、协变

对于每一个类型构造器，我们都需要定义其子类型规则。 一般来说，我们会根据这个类型构造器在语言中的语义来确定。

比如，我们刚刚就确定了函数类型的子类型规则：

$$
{ T_1 <: S_1 \quad S_2 <: T_2
\over
S_1 \Rightarrow S_2 <: T_1 \Rightarrow T_2
} \tag{S-Arrow}
$$

我们说函数类型对参数是逆变(Contravariant)的——它反转了子类型关系的方向，对返回值是协变(Covariant)的——它维持了子类型关系的方向。

例如在TypeScript中，有：

```ts
number=>unknown <: 1 => unknown // 参数逆变
number=>string <: 1 => unknown // 参数逆变+返回值协变
number=>string <: number => unknown // 返回值协变
```

注：若无特别指出，关于TypeScript的结论都是开启`--strictFunctionTypes`开关的结果。若不开启此开关，函数是双变的。

---

## 函数类型构造器的双变

所谓双变(Bivariant)，就是既逆变，也协变。试看如下代码：

```ts {monaco}
declare let f1: (x: {}) => void;
declare let f2: (x: {dog:true}) => void;
declare let f3: (x: {cat:true}) => void;
f1 = f2; // Error with --strictFunctionTypes
f2 = f1; // Ok
f2 = f3; // Error
```

若不开启`--strictFunctionTypes`，TypeScript函数的参数位置是双变的。

---

## 数组类型构造器的协变和不变

我们考察了TypeScript中的函数类型构造器，再来考察一下TypeScript对`Array`这个类型构造器的设计。

`Array`是协变的，因为有：
```ts
Array<number> <: Array<unknown>
```

但是，TypeScript采用的这个设计是不安全的，如下代码所示， `c`这个变量，推导出的类型是`number`。但是运行时的值是个`string`。

```ts {monaco}
const a: Array<number> = [];
const b: Array<unknown> = a;
b.push("haha string!");
const c = a[0]; // 这里实际获得了一个string类型的值
```

因此，对于可变数组来说，协变是不安全的，应当使用不变(Invariant)。

不变是指，`Array<S>`和`Array<T>`之间若`S`和`T`不同，则没有子类型关系，不能互相替代。但是这会使得数组使用起来不够方便，因此TypeScript也作出了妥协。 不可变数组`ReadonlyArray`的协变则是安全的。