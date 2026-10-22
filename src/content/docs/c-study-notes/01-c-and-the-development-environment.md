---
title: C 与开发环境
---

C 语言有很多不同的编译器，还有编辑器与 IDE，不同的人也能组成不同的工作区，只要顺手，都是可以的

## 编译器

编译器在 Windows 上有三个：

> - MSVC
> - GCC
> - Clang

### MSVC

这个是微软随 Visual Studio 提供的 Windows 原生编译器工具链，在 Windows 最简单编写 C 语言的方案就是直接安装 Visual Studio 这个 IDE，MSVC 也会自动安装。

### GCC

GCC 这个编译器准确来说是移植过来的，GCC 全程是 **GNU C Compiler**，虽然说现在已经变成一个集合并更名为 **GNU Compiler Collection**，但是移植到 Windows 上的 GCC 9 依旧只是一个 C 语言编译器。

像是经常听到的一个 IDE —— Dev C++的默认编译器就是 GCC 。

### Clang

Clang 是 LLVM 的前端，通常不自带完整 C++ 标准库和 Windows SDK，在 Windows 上需要配合 MSVC 或 MinGW-w64 使用；对初学者来说不如 MSVC 省事，但在工具链和编辑器体验方面很常见。

## 开发环境

Windows 上面可以直接使用 Visual Studio 这个 IDE 来做学习，如果体积过大，可以考虑使用 Dev C++ 因为首要任务是程序的编写，而不是环境的搭建。

## 示例中开发环境

我在所有的笔记中使用 WSL 的 Debian 13  作为环境，理论上和 Dev C++ 的编译环境相似。后面应该不会使用非常新的标准库或者新标准语法，如果出现我会在文章当中标注。