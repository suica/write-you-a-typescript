---
sidebar_position: 2
---

# 为何要引入子类型

## 如果没有子类型...
第二节中，我们讲过了TAT-STLC的定型规则 T-App

$$
{ \Gamma \vdash t_1: T_{11} \Rightarrow T_{12} \quad \Gamma \vdash t_2: T_{11}
\over
\Gamma \vdash t_1(t_2) : T_{12}
} \tag{T-App}
$$

问题来了：
以下调用是否能够通过类型检查？

```ts
((x:{a: Num}): {a: Num} => x.a)({a:1, b:2});
```

答案是：不行。
明明执行这段代码不会产生运行时错误，但是TAT-STLC仍然拒绝了这种调用。

原因在于，我们的定型规则，要求传入参数的类型和函数的类型 **完全一致**。也就是要求$\{a: \text{Num}\}$和

$$
\{a: \text{Num}, b: \text{Num}\}，
$$

也就是 $\{a:1, b:2\}$ 的类型完全一致。

但是事实上，这种严苛的要求是不必要的，因为即便是不一致，也有可能不会产生运行时错误。
这种限制给我们写程序带来了不便，因此我们需要研究一下对象的行为，接着修改一下我们的类型系统！