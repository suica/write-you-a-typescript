---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
title: 类型系统入门
monaco: dev
---

# 类型系统入门

吴登轲 高洁璇

---
layout: section
---

# 第一节：类型系统简介

---
layout: statement
---

## 什么是类型？

---

# 自然语言中的类型

在知道类型系统的定义之前，我们其实都已经是汉语这门自然语言中的「类型」专家了。

汉语官话是一种自然语言。

- 它的词性包括：动词，名词，形容词，副词……它们其实就是「词语」组成的搜集，它们是词语的类型。

- 第一句话是一个正确的命题。我们稍微修改一下这句话，得到第二句话。本应该是名词待的位置，却被替换成了动词，让这个句子失去了合法性。

<br>

> 例1：997 是一个质数。

> *例2：997 是一个跑。

<br>

- 如果我们来判断这句话第二句话是否正确，我们可以立刻下结论——它是错的——而不用去理解这个命题涉及的任何数学概念。因为这句话在语法上就是错的。这其实就是一种类型检查。

<!-- TODO: 从和编程语言的对应上来说，semantic-selection 其实才是类型检查……需要修改例子和文案 -->

<br>

<Center>
那么，到编程语言这个形式系统上，我们是不是也可以有类似的快速「检查」？

——这样，我们可以用很低的成本来验证程序是否是对的。
</Center>

---

# 编程语言中的类型

##

在一些编程语言中，变量的类型可以在运行程序之前就能确定下来。这种

```cpp {monaco}
// CPP
int a = 10;
a = 'b'; // 会在编译时报错
```

```js
// JavaScript
let a = 10;
a = 'b'; // 完全合法
```

---
layout: statement
---

## 什么是类型系统？
## 为什么要用类型系统？

---

# 类型系统的基本概念

- 一个**值 (Value)**，就是某个东西。它是一个直观上的概念。

- 一个**搜集 (Collection)**，就是一堆东西组成的整体。它同样是一个直观上的概念。

<!-- TODO: 注释一下为啥不用一个更严格的词 -->

- 一个**类型 (Type)**，就是一个由**值**组成的**搜集** [^ts] （你可以直观地认为类型就是一个值组成的**集合**)。 

- 在编程语言中，**一个表达式的类型**就是它在执行之时估计会取到的值形成的一个 **搜集** [^ts]。

## 什么是类型系统？

在编程语言中，**类型系统 (Type System)** 就是一个**类型规则的搜集**，这种规则能为项确定类型。

<!-- # 类型系统背后的理论：类型论 -->
<!-- 编程语言是一种形式系统。而 **类型论 (Type Theory)** 作为编程语言的类型系统后的理论基础，则有更广的对象：它是关于所有形式系统中的项的类型的学术化的研究 [wiki]。 -->

<!-- ## 类型论的历史 -->

<!-- 类型论 (Type Theory) 从 20 世纪初期发端。…… -->

<!-- ## 什么是类型系统？

"A type system is a tractable syntactic method for proving the absence of certain program behaviors by classifying phrases according to the kinds of values they compute." - [^tapl] -->


---

# 为什么要使用类型系统？

##

- 在计算机科学和软件工程中，我们可以用形式化方法(formal methods)来检查一个软件或是硬件系统是否满足某种性质。例如：

  1. 将芯片设计抽象为模型(model)，使用模型检查器(model checker)证明它的行为符合规范[^tapl];

  2. 使用$\pi$-演算来描述一个并发系统的行为[^2]，证明它不会出现死锁；

  3. 使用证明助手Coq，来构建形式化的证明，从数学上证明星载实时操作系统SpaceOS的内核设计符合一些性质[^1]。

- 类型系统，以及类型检查，可以看成是一种轻量的形式化方法 (formal method)，它也是一种验证软件**性质**的手段[^tapl]。 我们想要的**性质**，一般就是程序不会出某些运行时错误。

[^tapl]: tapl
[^1]: 顾海博, 付明, 乔磊,等. SpaceOS中若干全局性质的形式化描述和验证[J]. 小型微型计算机系统, 2019, 40(1):8.
[^2]: 焦文品, 史忠植. 形式化多主体系统中的交互及交互协议[J]. 软件学报, 2001.

<style>
.footnotes-sep {
  @apply mt-0 opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>

---
layout: statement
---
## 类型系统有哪些好处？


---

# 类型系统能帮我们发现错误

<br>

<div grid="~ cols-2 gap-2">

```ts {monaco}
type Status = 'finished' | 'unfinished';

const StatusDisplayDict: Record<Status, string> = {
  finished: "已完成",
  unfinished: "未完成",
}
```

```ts {monaco}
type Status = 'finished' | 'unfinished' | 'processing';

const StatusDisplayDict: Record<Status, string> = {
  finished: "已完成",
  unfinished: "未完成",
}
```

</div>

---

# 类型系统能帮我们发现错误（续）


```ts {monaco}
type MyEvent = | {kind:'resize'; hw: [number,number]} 
               | {kind: 'select', keys?: string[]};
// @ts-expect-error
function badHandleEvent(e){
  // 这里不小心少考虑了几种情况……
  const keysHash = [...e.keys].sort().join('#');
  console.log(`keys' hash is: ${keysHash}`);
}
function goodHandleEvent(e: MyEvent){
  if(e.kind === 'resize'){
    const [h,w] = e.hw;
    console.log(`area: ${h*w}`);
  }else if(e.kind === 'select'){
    if(e.keys){
      const keysHash = [...e.keys].sort().join('#');
      console.log(`keys' hash is: ${keysHash}`);
    }else{
      console.error('selected, but nothing selected!');
    }
  }
}
```

<style>
iframe{
  height: 380px !important;
}
</style>

---

# 类型系统能提供抽象机制

类型系统不止可以用于发现错误。

- 不同的模块之间产生交互时，只需用约定接口类型，即可各自开发。

- 可以快速地通过模块导出的类型了解模块的功能。

---

# 类型系统能提供文档能力
类型就是比自然语言更加精确的文档。

不必写注释明说如何使用`add`函数。用心去感受……
```ts {monaco}
function add<A extends string, B extends string>(first: A, second: B): `${A}${B}`;
function add(first: number, second: number): number;
function add(first: unknown, second: unknown): unknown {
  return first as any + second as any;
}


add("1",2);             // 类型错误
add("1",2 as string);   // 类型错误
add("1","2");           // 正确
add(1,2);               // 正确
```
<style>
iframe{
  height: 380px !important;
}
</style>

---

# 类型系统能提供文档能力（续）
类型就是比自然语言更加精确的文档。

可以用类型系统做流程控制。例如，限制代码必须无lint错误才能提交。
```ts {monaco}
type Code = { fileList: string[]; addedTime: Date }
declare const LintInternalSymbol: unique symbol
type Linted<T> = T & { [LintInternalSymbol]: undefined }
declare function lint<T extends Code>(code: T): Linted<Code>
declare function commit(code: Linted<Code>): Promise<void>

declare const code: Code

commit(code)

commit(lint(code))
```

<br>
往对象上添加元信息的这种技巧俗称"打标"(Tagging)。

<style>
iframe{
  height: 280px !important;
}
</style>

---

# 类型系统能提供语言安全性

<!-- TODO -->

---
layout: statement
---

## 为什么要学习类型系统？

---

# 为什么要学习类型系统？

- 提高理论水平

- 对TypeScript的类型系统产生更深的理解

- 写一个自己的类型检查器

- 写出质量更高的程序

---

# 课程路线图

---

# 类型论的大图景

##

类型论(Type Theory)是类型系统背后的理论。它也是理论计算机科学编程语言理论的一个重要组成成分。

<img border="rounded" src="public/lambda-cube.jpeg" class="w-1/2 mx-auto">

<!-- lambda cube -->
<!-- https://twitter.com/cattheory/status/984976270772654080 -->

---

# TypeScript的类型系统

## TypeScript中的类型概览

在TypeScript 4.5中，我们有`number`, `boolean`, `string`, `bigint`, `symbol`，以及`undefined`, `null`[^1]这7个**原始类型(Primitive Type)**，还有`Array`, `Object`, `Function`等等**引用类型**。

[^1]: `null`和`undefined`可以解释为字面量类型，但是这里还是按照JavaScript的提法，将其同样认为是原始类型。

---

# 语言的分类

```ts {monaco}
type LanguageTaxonomy = ['动态定型' | '静态定型', '强类型' | '弱类型'];
const CPP: LanguageTaxonomy = ['静态定型', '强类型'];
const JavaScript: LanguageTaxonomy = ['动态定型', '弱类型'];
```

---

## 参考文献

<!-- TODO: 处理一下参考文献的问题。 -->

[ts]: http://lucacardelli.name/papers/typesystems.pdf


---

## 延伸阅读

[Lambda cube and dependent types](https://www.math.nagoya-u.ac.jp/~garrigue/lecture/2018_tenbo/dependent.pdf)

---
layout: section
---
# 第二节：类型系统的基础


---

# What is Slidev?

Slidev is a slides maker and presenter designed for developers, consist of the following features

- 📝 **Text-based** - focus on the content with Markdown, and then style them later
- 🎨 **Themable** - theme can be shared and used with npm packages
- 🧑‍💻 **Developer Friendly** - code highlighting, live coding with autocompletion
- 🤹 **Interactive** - embedding Vue components to enhance your expressions
- 🎥 **Recording** - built-in recording and camera view
- 📤 **Portable** - export into PDF, PNGs, or even a hostable SPA
- 🛠 **Hackable** - anything possible on a webpage

<br>

Read more about [Why Slidev?](https://sli.dev/guide/why)

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
}
</style>

---

# Navigation

Hover on the bottom-left corner to see the navigation's controls panel, [learn more](https://sli.dev/guide/navigation.html)

### Keyboard Shortcuts

|     |     |
| --- | --- |
| <kbd>right</kbd> / <kbd>space</kbd>| next animation or slide |
| <kbd>left</kbd>  / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd> | previous slide |
| <kbd>down</kbd> | next slide |

<!-- https://sli.dev/guide/animations.html#click-animations -->
<img
  v-click
  class="absolute -bottom-9 -left-7 w-80 opacity-50"
  src="https://sli.dev/assets/arrow-bottom-left.svg"
/>
<p v-after class="absolute bottom-23 left-45 opacity-30 transform -rotate-10">Here!</p>

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# Code

Use code snippets and get the highlighting directly![^1]

```ts {all|2|1-6|9|all}
interface User {
  id: number
  firstName: string
  lastName: string
  role: string
}

function updateUser(id: number, update: User) {
  const user = getUser(id)
  const newUser = {...user, ...update}  
  saveUser(id, newUser)
}
```

<arrow v-click="3" x1="400" y1="420" x2="230" y2="330" color="#564" width="3" arrowSize="1" />

[^1]: [Learn More](https://sli.dev/guide/syntax.html#line-highlighting)

<style>
.footnotes-sep {
  @apply mt-20 opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>

---

# Components

<div grid="~ cols-2 gap-4">
<div>

You can use Vue components directly inside your slides.

We have provided a few built-in components like `<Tweet/>` and `<Youtube/>` that you can use directly. And adding your custom components is also super easy.

```html
<Counter :count="10" />
```

<!-- ./components/Counter.vue -->
<Counter :count="10" m="t-4" />

Check out [the guides](https://sli.dev/builtin/components.html) for more.

</div>
<div>

```html
<Tweet id="1390115482657726468" />
```

<Tweet id="1390115482657726468" scale="0.65" />

</div>
</div>

---
class: px-20
---

# Themes

Slidev comes with powerful theming support. Themes can provide styles, layouts, components, or even configurations for tools. Switching between themes by just **one edit** in your frontmatter:

<div grid="~ cols-2 gap-2" m="-t-2">

```yaml
---
theme: default
---
```

```yaml
---
theme: seriph
---
```

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-default/01.png?raw=true">

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-seriph/01.png?raw=true">

</div>

Read more about [How to use a theme](https://sli.dev/themes/use.html) and
check out the [Awesome Themes Gallery](https://sli.dev/themes/gallery.html).

---
preload: false
---

# Animations

Animations are powered by [@vueuse/motion](https://motion.vueuse.org/).

```html
<div
  v-motion
  :initial="{ x: -80 }"
  :enter="{ x: 0 }">
  Slidev
</div>
```

<div class="w-60 relative mt-6">
  <div class="relative w-40 h-40">
    <img
      v-motion
      :initial="{ x: 800, y: -100, scale: 1.5, rotate: -50 }"
      :enter="final"
      class="absolute top-0 left-0 right-0 bottom-0"
      src="https://sli.dev/logo-square.png"
    />
    <img
      v-motion
      :initial="{ y: 500, x: -100, scale: 2 }"
      :enter="final"
      class="absolute top-0 left-0 right-0 bottom-0"
      src="https://sli.dev/logo-circle.png"
    />
    <img
      v-motion
      :initial="{ x: 600, y: 400, scale: 2, rotate: 100 }"
      :enter="final"
      class="absolute top-0 left-0 right-0 bottom-0"
      src="https://sli.dev/logo-triangle.png"
    />
  </div>

  <div 
    class="text-5xl absolute top-14 left-40 text-[#2B90B6] -z-1"
    v-motion
    :initial="{ x: -80, opacity: 0}"
    :enter="{ x: 0, opacity: 1, transition: { delay: 2000, duration: 1000 } }">
    Slidev
  </div>
</div>

<!-- vue script setup scripts can be directly used in markdown, and will only affects current page -->
<script setup lang="ts">
const final = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 20,
    mass: 2
  }
}
</script>

<div
  v-motion
  :initial="{ x:35, y: 40, opacity: 0}"
  :enter="{ y: 0, opacity: 1, transition: { delay: 3500 } }">

[Learn More](https://sli.dev/guide/animations.html#motion)

</div>

---

# LaTeX

LaTeX is supported out-of-box powered by [KaTeX](https://katex.org/).

<br>

Inline $\sqrt{3x-1}+(1+x)^2$

Block
$$
\begin{array}{c}

\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &
= \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\

\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\

\nabla \cdot \vec{\mathbf{B}} & = 0

\end{array}
$$

<br>

[Learn more](https://sli.dev/guide/syntax#latex)

---

# Diagrams

You can create diagrams / graphs from textual descriptions, directly in your Markdown.

<div class="grid grid-cols-2 gap-10 pt-4 -mb-6">

```mermaid {scale: 0.9}
sequenceDiagram
    Alice->John: Hello John, how are you?
    Note over Alice,John: A typical interaction
```

```mermaid {theme: 'neutral', scale: 0.8}
graph TD
B[Text] --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```

</div>

[Learn More](https://sli.dev/guide/syntax.html#diagrams)

---
layout: center
class: text-center
---

# Learn More

[Documentations](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev) · [Showcases](https://sli.dev/showcases.html)