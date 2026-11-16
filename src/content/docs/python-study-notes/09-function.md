---
title: 函数
---

函数这个东西终于是讲到了，这个东西是我学习编程以来最爱不释手的一个东西，也是对于当时刚刚接触编程最难的一个槛……

## 创建一个函数

函数这个东西放在 C 语言上应该会更容易理解，但是 Python 已经面向对象，也舍弃了对于面向过程的很多特点，就比如 `main()` 函数。

函数是一个用来封装过程的一个东西，其主要目的是这个过程的多次使用，就像我现在要输出矩阵的 `*` 号，也就是这样的一个代码

```python
for i in range(2):
    for j in range(2):
        print("*", end=" ")
    print(" ")
```

然后我现在想要这个代码重复执行3遍，但是不允许用任何的循环语句，还能有什么方法 —— 复制，也就是给这堆代码复制三遍。

那现在想象这样的一个场景，就是数学填空题，我写出一道题目，最终答案是一个数字，可能过程有10行，但是同学抄答案只需要抄最后的结果就可以，也就是有几份作业，就只需要抄几遍那个数字就可以了，那我们是不是也可以这样做呢？

过程已经写出来，我们只需要将这个过程声明成一个函数，便可以直接调用

```python
def drawStar():
    for i in range(2):
        for j in range(2):
            print("*", end=" ")
        print(" ")
```

## 函数的调用

现在是函数了，但是似乎并不会自己执行，这个原因从 C 语言的结构上讲会更好一点

```c
#include<stdio.h>

int main(){
}
```

上面是 C 的一个基本框架，如果我想写代码，也都是写在 `main()` 函数里面的，但是 Python 当中没有 `main()` 函数，那我们就模拟一个

```python
if __name__ == "__main__":
```

现在写这些

```python
if __name__ == "__main__":
    print("Hello World!")
```

运行一下发现，正常输出

那就可以先简化一下，不在 `if __name__ == "__main__":` 的程序是不可以运行的，而我们刚刚写的似乎不在里面

```python
def drawStar():
    for i in range(2):
        for j in range(2):
            print("*", end=" ")
        print(" ")

if __name__ == "__main__":
```

那我们就需要在里面去声明我要执行函数内的代码

```python
def drawStar():
    for i in range(2):
        for j in range(2):
            print("*", end=" ")
        print(" ")

if __name__ == "__main__":
    drawStar()
```

这就是函数的调用

## 函数传参

上面的程序只能生成 2 * 2 的，那我想要4 * 4

```python
def drawStar():
    for i in range(4):
        for j in range(4):
            print("*", end=" ")
        print(" ")

if __name__ == "__main__":
    drawStar()
```

所以就要一直这样去改里面的值？

没这个必要我只要给这些需要变形的做成变量声明就好了

```python
def drawStar(x, y):
    for i in range(x):
        for j in range(y):
            print("*", end=" ")
        print(" ")

if __name__ == "__main__":
    drawStar(4, 4)
```