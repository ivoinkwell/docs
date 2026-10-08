---
title: 2026.09.24 参赛反思笔记
---

CTF 是一个非常复杂的比赛项目，并非一朝一夕就能完成的事情，所以就以我 C 和 Python 那点薄弱的基础也就能够勉强应付最前面 200 分的选择题了……

## 选择题

选择题对于编程的基础考的非常狠大概有这样几个例子：

### `__test__`

这个问题就是上面是个什么东西，感觉想要考的就是这个 Python 有没有写过：

```python
if __name__ -- "__main__":
```

这个东西更多的应该是 C 语言带过来的，对于 Python 开发可能没什么用，但是 `def` 函数封装多了，可能可以更快的看到主要执行程序在那哪里，也就是起一个标志的作用，应该都不能算作开发规范。

## `def`

函数定义关键字是什么，也就是问你如何定义一个函数

```python
def test():
```

也就是这样就定义了一个 `test()` 函数

## 程序是否输出1……100

其实就是两个循环语句的考查，`while` 和 `for` 以及边界值是否取值的记忆

```python
# While
i = 0
while i < 100:
	print(i)
	i += i

# for 不取最后一个值
for i in range(1, 101):
	print(i)
```

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/20260924-reflection-notes/20260924-reflection-notes.webp)

## 题目 Bug

没错，题目还有 Bug ，RDP 的标准端口是 `3389`，题目中的只有 `3399`，或许只是数值打错

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/20260924-reflection-notes/20260924-reflection-notes-1.webp)

## 实操

这次有两个实操题，第一个就是常规的流量分析，Web安全去找 flag ，但是有一个很邪门，Web 是要对服务进行黑盒测试，其实能明显感觉出来就是网页交互是有 bug 的，通过 bug 就可以完成数据库账号密码，可惜自动化 Python 脚本没有写过，也没在上面浪费时间

密码学主要是 XOR 这些算法，实话说就是忘了，Python 脚本会写，但是没有外网 XOR 公式完全没有背过，Python 代码我也没能写出来

后面有一个渗透的大题，很神奇在于这个里面有拓扑图，里面有 WAF ，我可能只能知道 WAF 是干什么的，但是家庭内网我什么都没有搭建过，所以并不能知道这个 Kali 是应该如何能访问到 Server，所以尝试使用 `160wafwin7mgr` 这个机器的时候想着用 WAF 的账号密码 `admin / admin123` 去登录，网络波动，按到了右下角关机按钮，耽误了时间，后面通过 WAF 访问到 `ServerEmp`，但是这个时候都是队友在做，所以我也完全忘记了这个是渗透攻击，都没有尝试去登录然后找注入点，明明我还在 **9月14日** 的笔记中写了。

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/20260924-reflection-notes/20260924-reflection-notes-2.webp)

## 总结

我觉得还是对概念不够清晰，要是我能对于网络攻击这些和 C，Python 这些代码熟悉程度一样，也不至于分数这么难看，至少第三项不会是 0 分，所以以后的所有比赛开始之前应该把所有的方法或是知识点列出来，在脑子里想一边，至少留一个印象，这样或许能够早一点反应过来。