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

## 列表元素方法

### 添加元素 - `append()`

首先要定义一个数组

```python
list1 = [0, 1, 2, 3]
```

先看一下说明

```python
help(list.append)
```

```text
Help on method_descriptor:

append(self, object, /) unbound builtins.list method
    Append object to the end of the list.
...skipping...
Help on method_descriptor:

append(self, object, /) unbound builtins.list method
    Append object to the end of the list.
```

也就是将要加入的内容填入函数当中的参数

```python
list1.append(4)
print(list1)
```

看一下结果

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/07-list/07-list-5.webp)

已经将 `4` 添加进去了

如果想依次添加多个，例如 `[0, 1, 2, 3, 4, [5, 6, 7, 8, 9]]`

```python
list1.append([5, 6, 7, 8, 9])
print(list1)
```

但是我现在不想要这个大括号

```python
for i in range(4, 10):
    list1.append(i)
print(list1)
```

### 将元素逐一添加至末尾 - `extend()`

再定义一个列表

```python
list2 = []
```

先看一下 `extend()` 函数的参数

```text
extend(self, iterable, /) unbound builtins.list method
    Extend list by appending elements from the iterable.
```

里面是要一个可以迭代的参数，比如单词

```python
word = 'Python'
list2.extend(word)
print(list2)
```

看一下结果

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/07-list/07-list-6.webp)

已经将文字元素分开加入列表

### 列表中插入 - `insert()` 

再定义一个列表

```python
list3 = ['I', 'Python']
```

现在想要插入一个 `love`

```python
list3.insert(1, 'love')
print(list3)
```

运行结果如下

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/07-list/07-list-7.webp)

### 删除 - del

删除列表一个元素

```python
del list3[1]
```

删除一个列表

```python
del list3
```

### 删除某个元素的第一个 - `remove()`

```python
list2.remove('P')
print(list2)
```

结果如下

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/07-list/07-list-8.webp)