---
title: 列表
---

列表这东西，类似于 C 语言里面的数组，但是功能和限制应该会比单纯的数组更自由一点。

## 列表的示例

列表的样子大概是这样的

```python
["A", 2, 1.5]
```

其中可以存放不同数据类型的数据。

## 创建一个列表

按照 Python 的惯用逻辑，直接赋值就好了

```python
list = ["I", "like", "Python"]
```

打印一下看看

```python
print(list)
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/07-list/07-list.webp)

### `list()` 函数

如果现在有这样的一个情况，我想要做批量的切分，比如把 `'Python'` 切分成 `['P', 'y', 't', 'h', 'o', 'n']`，这个时候就可以使用 `list()` 这个函数

```python
word = "Python"
chars = list(word)
print(chars)
```

运行结果如下

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/07-list/07-list-1.webp)

## 使用索引查询

之前在查询字符串的时候也用过索引去查询，这里也是一样的逻辑

```python
print(chars[0])
```

最后也是输出第一个字母 `P`

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/07-list/07-list-2.webp)

## 不可更改

说一个很有意思，但是我以前从来不注意也没有注意过的东西 —— 内容是否可更改。

看看这段代码：

```python
words = ["I", "like", "Python"]

words[0] = "abc"
print(words[0])
```

运行结果如下

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/07-list/07-list-3.webp)

但是如果你更改字符串就不行了

```python
string = "Python"
string[0] = "T"
print(string)
```

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/07-list/07-list-4.webp)