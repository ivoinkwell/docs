---
title: Python 输入输出与变量案例练习
---

思考过程应该是在案例练习中不可或缺的东西，所以我准备按照思考方式去写这些

## 案例

现在有这样的一个场景：垃圾分类回收可以换取积分，垃圾有废纸，旧电池和塑料瓶，分别是5分，12分和15分，现在需要知道回收之后的总积分

## 程序编写

程序编写之前首先要把这个程序的整体进行过程与所需要的量给理清楚

### 思路

首先这个程序是一个套公式计算的，所以要先把公式给写出来：

```text
总分 = 废纸 * 5 + 旧电池 * 12 + 塑料垃圾 * 15
```

而里面 **废纸**，**旧电池**，**塑料瓶** 只是一个文字描述，没有一个具体的量，所以些量是需要与用户交互输入的，那这些就是 **变量**。

如果在公式里直接写 **5**，**12**，**15** 谁能知道这个是什么东西，一旦后面我想每个废品积分都统一加10分，是不是还要找到这个计算公式去更改，这样会很不方便，这样固定的量就是 **常量**

### 定义变量与常量

变量需要与用户进行交互，所以需要使用 `input()` 函数

```python
wastePaper = input("请输入废纸重量：")
batteries = input("请输入电池的个数：")
plasticBottle = input("请输入塑料瓶个数：")
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/03-python-input-output-and-variable-case-studies/03-python-input-output-and-variable-case-studies.webp)

执行一下看看能不能运行

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/03-python-input-output-and-variable-case-studies/03-python-input-output-and-variable-case-studies-1.webp)

定义变量完成之后就是常量的定义，常量有一个定义方法，就是全大写，这是一个书写规范，没有什么特殊意义，这样写也能提升代码的可读性

```python
WASTE_PAPER_SCORE = 5
BATTERIES_SCORE = 12
PLASTIC_BOTTLE_SCORE = 15
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/03-python-input-output-and-variable-case-studies/03-python-input-output-and-variable-case-studies-2.webp)

### 编写计算公式

按照之前写的公式直接进行套用

```python
score = wastePaper*WASTE_PAPER_SCORE + batteries* BATTERIES_SCORE + plasticBottle*PLASTIC_BOTTLE_SCORE
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/03-python-input-output-and-variable-case-studies/03-python-input-output-and-variable-case-studies-3.webp)

只需要加上打印并运行，理论上是能出结果的

```python
print(score)
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/03-python-input-output-and-variable-case-studies/03-python-input-output-and-variable-case-studies-4.webp)

但是现在结果似乎并不是我们想要的，这里就牵扯到了一个东西 —— 数据类型。

数据类型在 `C` 这些底层语言上面是在定义变量的时候就出现的，但是 `Python`，`JavaScript` 这样动态变量的语言就没有这些讲究，毕竟想要什么都能保存的就是字符串，人家又不能知道你用的是数据还是字符串。

首先先看看 `C` 里面是如何定义这些量的

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/03-python-input-output-and-variable-case-studies/03-python-input-output-and-variable-case-studies-5.webp)

`C` 在输入输出上与 `Python` 不太一样，所以这些不牵扯，只看变量的定义，你会发现多了前面的红色关键字 `int` 和 `float`：这两个就是整型与浮点型变量的定义。

在 Python 里是直接使用 `int()` 和 `float()` 函数进行直接的转换（ps: 在下方另外写一条转换语句和我这样直接嵌套结果一致，我需要突出一条语句的作用，所以做了结合）

```python
wastePaper = int(input("请输入废纸重量："))
batteries = int(input("请输入电池的个数："))
plasticBottle = int(input("请输入塑料瓶个数："))

WASTE_PAPER_SCORE = 5
BATTERIES_SCORE = 12
PLASTIC_BOTTLE_SCORE = 15

score = float(wastePaper*WASTE_PAPER_SCORE + batteries* BATTERIES_SCORE + plasticBottle*PLASTIC_BOTTLE_SCORE)

print(score)
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/03-python-input-output-and-variable-case-studies/03-python-input-output-and-variable-case-studies-6.webp)

运行一下看看结果是否正常

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/03-python-input-output-and-variable-case-studies/03-python-input-output-and-variable-case-studies-7.webp)

已经是一个数据输出了。