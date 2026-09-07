---
title: Python输入输出与变量
---

程序想要与热进行交互就少不了输入与输出这两个方式，但是伴随着输入与输出，就要牵扯到很多的字符以及变量的相关问题。

## 输出

在 Python 中输出和 C 这些语言还是很不一样的，相对来说会更好理解一些，按照所有语言学习的往常惯例，都要先向这个世界问好：

```python
print('Hello World!')
```

字符串都是使用引号引起来的，那是不是双引号和单引号没有区别呢？

```python
print("Hello World!")
```

事实证明两个程序运行起来是没有任何问题的

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/02-python-input-output-and-variables/02-python-input-output-and-variables.webp)

那就要知道为什么会同时存在两个这样的输出方法了。英语中其实需要使用到这种特殊标点的语句其实很多的，就像 **`I'm a student`** 这样的语句你要是想要在单引号中进行输出，必然会遇到单引号闭合的问题

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/02-python-input-output-and-variables/02-python-input-output-and-variables-1.webp)

出现这样的错误提示：**`未停止字符串字面量`**

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/02-python-input-output-and-variables/02-python-input-output-and-variables-2.webp)

说人话就是这个本身字符串只包含 **`I`** 这个字母，后面的直接就是问题语句，想要解决，那就要用到双引号进行解决

```python
print("I'm a student")
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/02-python-input-output-and-variables/02-python-input-output-and-variables-3.webp)

这样就完成了结果的输出

但是我现在就是要在 **`' '`** 中间输出 **`I'm a student`** ，既然能写到这里，必定还是有办法的，也就是之前在 C 语言中会最早被提及的一个重要概念 —— **`转义字符`** 。转义字符顾名思义就是有一个字符专门改变有一些特殊字符的固定用处，使其成为普通文本，这个字符就是

```python
\
```

所以也可以写成这样

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/02-python-input-output-and-variables/02-python-input-output-and-variables-4.webp)

## 输入与变量

输入和变量本质上是绑定的关系。就像 Word 文档必须依托硬盘才能持久存储，变量也必须依托内存才有意义——它本质上是一个指向内存块起始地址的引用，通过它我们才能定位和访问数据。

所以首先需要能够获取一个输入

```python
input("请输入一个数字：")
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/02-python-input-output-and-variables/02-python-input-output-and-variables-5.webp)

能进行输入之后我们要能够存放并且将其随时取用，就需要定义一个变量，并且将其打印出来

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/02-python-input-output-and-variables/02-python-input-output-and-variables-6.webp)

### 案例 - 电话号码缴费

首先需要顾客输入自己的手机号，还有缴费金额，最后输出这些反馈给顾客

```python
phoneNumber = input("请输入你的手机号：")
recharge = input("请输入你需要充值的金额：")

print("手机号", phoneNumber, "充值", recharge, "元")
# 同等写法
print("手机号"+phoneNumber+"充值"+recharge+"元")
```

最终效果这样即可

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/02-python-input-output-and-variables/02-python-input-output-and-variables-7.webp)