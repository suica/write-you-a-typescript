# write-you-a-typescript （实现一个自己的类TypeScript类型检查器）

## Introduction

This project contains a toy implementation of TypeScript-like type checker for a subset of JavaScript, namely the TAT language.

Also, the project contains the slides of a course about the type theory and how to implement the TAT type checker.

If you want to have an old Chinese version of slides, you can visit [this](https://github.com/suica/write-you-a-typescript/blob/main/slides/%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pdf).

如果你想要一份旧的中文讲义，请访问[此处](https://github.com/suica/write-you-a-typescript/blob/main/slides/%E7%B1%BB%E5%9E%8B%E7%B3%BB%E7%BB%9F%E5%85%A5%E9%97%A8.pdf)。

## Doc

The original lecture slides will be revised and be carefully reorganized in the form of tutorial articles, in the doc website.

You can visit the [Github Pages](suica.github.io/write-you-a-typescript/) or the [Vercel app]() to see the tutorial articles.

> WARNING: the website of this project is currently under construction.

## How to serve the slides

### To serve the slides locally

1. Install dependencies

```bash
yarn && cd slides && yarn
```

2. Run slides server

You can choose to run the slides server locally (cannot be accessed by other), or in remote mode. Under remote mode, remote control will be enabled and slides server is exposed to other computers under the same network.

- To run slides in local mode, you need to run
```bash
yarn slides
```

- To run slides in remote mode, you need to run

```bash
cd slides && yarn remote
```

## TODOs

- [x] Create a document site from the slides
- [x] Deploy the site to Github Pages & Vercel
- [ ] Revise the document, fix errors/typos
- [ ] Revise the README.md for better introduction
- [ ] Implement the test cases for TAT-F
- [ ] Implement TAT-F
- [ ] Implement the test cases and code for TAT-Sub-F
- [ ] Implement TAT-Sub-F
- [ ] Translate the site to English