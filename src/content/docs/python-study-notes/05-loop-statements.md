---
title: 循环语句
---

批量做一些事情的时候，自己手动还有一种方式就是让程序自己执行，想要让程序能够自己执行就需要用到 **循环语句**

## `while` 循环

如果让你描述使用 `print()` 函数打印 `1 - 100` 这件事情，你会如何用语言去描述：

```text
当一个数字小于100的时候，打印这个数字
```

换成编程相关的东西就是这样：

```text
当i小于100的时候，print(i)
```

Python 中可以达到这个关键字的只有一个—— `while`。

将刚刚的那句话用 `while` 重写一遍就是

```text
while i < 100, print(i)
```

如果把刚刚的语句转换成 Python 应该有的格式就是这样

```python
while i < 100:
	print(i)
```

但是你会发现这个程序可以一直执行下去，根本停不下来，根据判断条件我们知道，`i` 是控制这个程序的根源，所以我们检查代码可以发现 `i` 在程序执行中似乎没有发生过改变，所以我们应该要给 `i` 加上一点改变

```python
while i < 100:
	print(i)
	i += 1 # 或者 i = i + 1
```

运行一下出现报错

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/05-loop-statements/05-loop-statements.webp)

**`NameError: name 'i' is not defined. Did you mean: 'id'?`** 这个报错的意思就是他不知道所谓的 `i` 是个什么东西，我们没有定义他，所以我们需要去定义一下

```python
i = 0
while i < 100:
	print(i)
	i += 1 # 或者 i = i + 1
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/05-loop-statements/05-loop-statements-1.webp)

现在是可以运行了，但是结果似乎有点不一样，最后一个数字是 `99` ，我们重新分析一下这个程序的逻辑

> 1. 我们使用 `i` 这个变量做循环控制
> 2. 随着 `i` 的递增我们输出 `i` 在循环的每一次赋值，达到输出 `1 - 100` 这件事情

所以重新梳理我们刚刚写的循环语句，我们定义 `i` 从 0 开始计数，当 `i` 等于 100 的时候停止输出，也就是这样的一个区间：**`0 <= i < 100`**

但是我们需要的区间是这个：**`1 <= i <= 100`**

所以我们需要对数值进行微调，得到以下程序

```python
i = 1
while i <= 100:
	print(i)
	i += 1 # 或者 i = i + 1
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/05-loop-statements/05-loop-statements-2.webp)

现在就能正常输出 `1 - 100` 了

但是如果我就不动起始值，就是 `0` ，能不能也直接输出 `1 - 100` ，可以简单梳理一下思路

> 1. 起始值是 `0` ，进入循环之后要先加上 `1` ，然后输出 `1`
> 2. 最后一次循环的时候，`i` 的值是 `99` ，小于 `100` 所以进入循环，进入后因为先 `+1` 的关系于是输出的是 `100`

所以根据这个思路，只需要将 `print()` 和下面的 `i += 1` 进行调换即可解决这个问题

```python
i = 0
while i < 100:
	i += 1 # 或者 i = i + 1
	print(i)
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/05-loop-statements/05-loop-statements-3.webp)

输出一切正常

## `for` 循环

每一次都需要在循环外面定义一个变量，如果我想让这个变量只在这个循环语句里面自行消化不影响全局变量，这个时候就需要使用到 `for` 循环。

Python 中的 `for` 循环和 C 语言这些不同，在 Python 里面需要去了解一个关键字 `in` 和函数 `range()`。

### `in` 关键字

`in` 关键字在 Python 中非常常用，而且统一程度是要高于其他语言，`in` 在目前可以理解为遍历，这里可以举一个简单的数组的例子

```python
arr = [1, 2, 3]
for i in arr:
	print("数字是：", i)
```

也就是每一次去出数组中一个数字给 `i` 这个变量，这样就可以进行拼接输出

### `range()` 函数

Python 中有了这个函数，可以使 `for` 循环的语句更简洁直观，不会像 JavaScript 一样混乱

```javascript
for(i=0; i<100; i++)
```

```python
for i in range(0, 100)
```

但是 `range()` 函数有自己的书写规范，需要按照指定的顺序去填写参数

 ```text
 range(起始值, 结束值, 步长)
 ```

其中规定，取值的时候是不取结束值的，也就是这样：`起始值 <= i < 结束值`

### 使用 `for` 循环改写

之前使用 `while` 写了输出 `1 - 100`，使用 `for` 的语句重新书写一遍

```python
for i in range(1, 101):
	print(i)
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/05-loop-statements/05-loop-statements-4.webp)

成功打印出 `1 - 100` 的结果

## 案例：输出斐波那契数列

斐波那契数列是从 `0` 和 `1` 开始，从第三项开始，每一个数为前两位数字之和的一个数组，现在有这样的一个需求 —— 要求输入一个整数 `n`，输出斐波那契数列的前 `n` 项。

### 思路梳理

首先需要梳理清楚整个输出的过程，首先会定义两个变量分别是斐波那契数列的开始两个数字 `0`  和 `1`，随着变量 `n`  的输入，进入循环，先输出第一个数字 `0`  的变量，下面将后面值为 `1` 的变量的值赋值给 `0` 的这个变量，但是这样没有办法继续输出下一个数字了，因为这一轮两个变量的值没有被记住，所以在这一轮赋值之前需要再创建一个变量进行相加赋值，所以程序应该是这样的

### 代码编写

```python
n = int(input("请输入n: "))

a = 0
b = 1

for i in range(n):
	print(a)
	c = a + b
	a = b
	b = c
```

可以看到结果已经正常输出

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/05-loop-statements/05-loop-statements-5.webp)

## 嵌套

嵌套在之前的 `if else` 语句中出现过，嵌套的目的其实就是两个方向的控制。就像你在坐标系中画正方形，你必须控制 X 轴和 Y 轴一样，才能保证这个图形是正方形。

目前，很多的教材上都是用输出 `99乘法表` 来展示这样的控制

### 大致思路

首先我们需要让其能够输出 `1*1=1` 这样横着的格式

```python
for j in range(1, 10):
	result = 1*j
	print(1, "*", j, "=", result)
```

然后要把这个 `1` 也换成可以变化的变量，所以就会得到下面的代码

### 代码编写

```python
for i in range(1, 10):
    for j in range(1, 10):
        result = i*j
        print(i, "*", j, "=", result, end=" ")
    print("\n")
```

其中的 `end=" "` 实际效果是在每一次打印完 `i, "*", j, "=", result` 后在后方输入一个空格，是为了保证不会换行的存在，没有什么实际的意义。

输出的效果大致是这样的

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/05-loop-statements/05-loop-statements-6.webp)