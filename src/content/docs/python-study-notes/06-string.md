---
title: 字符串
---

说到字符串里面逃不掉的两个概念就是格式化输出和字符串的基础函数使用，其实这个里面有很多是不常见到的，但是总归是要简单了解一下的

## 格式化输出

一共有三种表达形式：**`printf-style formatting`**，**`str.fromatting`** 和 **`f-string`**

### `printf-style formatting`

我接触计算机的第一个自学语言就是 C 语言，其实很意外的一点就是 Python 竟然会有类似 C 语言的输出方式，当然，这个肯定是最不方便的输出方式，毕竟一个脚本语言更多是用于简单脚本而非像 C 语言更偏向底层而需要的稳定，自然浅显易懂和方便书写会更重要，但是这种输出格式也是有必要去记录一下的

首先要知道数据类型的对应写法

| 数据类型            | 格式符         | 示例                 | 结果             |
| --------------- | ----------- | ------------------ | -------------- |
| `int`           | `%d`        | `"%d" % 10`        | `10`           |
| `int`           | `%i`        | `"%i" % 10`        | `10`           |
| `int`（八进制）      | `%o`        | `"%o" % 8`         | `10`           |
| `int`（十六进制）     | `%x` / `%X` | `"%x" % 255`       | `ff`           |
| `float`         | `%f`        | `"%f" % 3.14`      | `3.140000`     |
| `float`（保留 2 位） | `%.2f`      | `"%.2f" % 3.14159` | `3.14`         |
| `float`（科学计数）   | `%e`        | `"%e" % 12345.6`   | `1.234560e+04` |
| `float`（自动格式）   | `%g`        | `"%g" % 0.00001`   | `1e-05`        |
| `str`           | `%s`        | `"%s" % "abc"`     | `abc`          |
| `str`（repr）     | `%r`        | `"%r" % "abc"`     | `'abc'`        |
| `str`（单字符）      | `%c`        | `"%c" % "A"`       | `A`            |
| `bool`          | `%s`        | `"%s" % True`      | `True`         |
| 百分号             | `%%`        | `"%d%%" % 90`      | `90%`          |

```python
name = 'ivoinkwell'
age = 17
print("姓名是：%s, 年龄是：%d" % (name, age))
```

学过 C 的都知道，C 语言里面的输出一般是这样写的

```c
#include <stdio.h>

int main(void) {
    const char name[] = "ivoinkwell";
    int age = 17;

    printf("姓名是：%s, 年龄是：%d\n", name, age);

    return 0;
}
```

可能需要记忆的就是输出的一个格式问题

### `str.fromatting`

这个相对之前的，写法会更宽泛一些，他的占位符已经不再是 `%d` 这样的数据类型，而是更好理解的 `{}`，所以可以写成这样

```python
print("姓名是：{}, 年龄是：{}".format(name, age))
```

那如果我就喜欢乱传参数，就需要规定如何去取参数了，这里就可以用索引序列

```python
print("姓名是：{1}, 年龄是：{0}".format(age, name))
```

如果参数多，这数字很乱，那可以借助函数当中惯用的形参进行赋值进行解决

```python
print("姓名是：{name}, 年龄是：{age}".format(name=name, age=age))
```

调换顺序也同样适用

```python
print("姓名是：{name}, 年龄是：{age}".format(age=age, name=name))
```

### `f-string`

这个格式也是现在 AI 最喜欢用的，也就是吃的语料中最多的形式，占位符也就是变量，就像是这样

```python
print(f"姓名是：{name}, 年龄是：{age}")
```

## 字符串的常见操作

相比于其他的语言的实现方式，Python 会更简单，不需要理解类似于 **`遍历`** 这样的非常专业的东西就可以达到自己想要达到的目的

### 案例

我想以 **`replace()`** 这个函数的作用来做一个例子，例如这样一句话

```text
All things Are difficult before they Are easy.
```

对于正常语言的实现逻辑就是遍历并将其转移至新的字符串

```python
def fix_capitalization(sentence):
    """
    将句子中不该大写的单词转换为小写
    规则：句首单词首字母大写，其余单词全部小写
    """
    result = ""
    word_start = 0          # 当前单词的起始位置
    word_count = 0          # 记录这是第几个单词
    i = 0
    n = len(sentence)
    
    while i <= n:
        # 遇到空格或到达末尾，说明一个单词结束
        if i == n or sentence[i] == ' ':
            if i > word_start:  # 确保不是连续空格
                word = sentence[word_start:i]
                word_count += 1
                
                if word_count == 1:
                    # 第一个单词：首字母大写，其余小写
                    new_word = to_upper(word[0]) + to_lower(word[1:])
                else:
                    # 其他单词：全部小写
                    new_word = to_lower(word)
                
                result += new_word
            
            if i < n:
                result += ' '  # 保留空格
            word_start = i + 1
        i += 1
    
    return result


def to_lower(s):
    """将字符串中所有大写字母转为小写（不使用 lower()）"""
    result = ""
    for ch in s:
        # 利用 ASCII 码：'A'=65, 'Z'=90, 大小写相差 32
        if 'A' <= ch <= 'Z':
            result += chr(ord(ch) + 32)
        else:
            result += ch
    return result


def to_upper(ch):
    """将单个字符转为大写（不使用 upper()）"""
    if 'a' <= ch <= 'z':
        return chr(ord(ch) - 32)
    return ch


# 测试
sentence = "All things Are difficult before they Are easy."
print("原句:", sentence)
print("修正:", fix_capitalization(sentence))
```

但是有了内置函数，就会非常的简单

```python
s = 'All things Are difficult before they Are easy.'
print(s.replace('Are', 'are'))
```

所以这些内置函数非常有必要去记录以下，会比不使用省时省力很多

### `find()`

根据这个函数的名字也可以知道，**`find()`** 函数是用于字符串的查找，其中有三个参数

```python
str.find([需要查找的字符串], [起始索引的索引值], [结束索引的索引值])
```

其中 **`str`** 是一个字符串，`起始索引的索引值` 和 `结束索引的索引值` 为参数的可选项

### `replace()`

同样根据名字，翻译过来也就是替换的意思，所以 **`replace()`** 函数是用于字符串替换的

```python
str.replace([被替换的旧子串], [替换成的新子串], [最大替换次数])
```

其中 **`最大替换次数`** 有默认值，也就是全部替换，如果要指定次数才需要填写这个参数

### `split()`

根据名字，翻译过来也就是分割的意思，所以 **`split()`** 函数是用于字符串分割的

```python
str.split([分隔符], [最大分割次数])
```

其中 **`最大分割次数`** 和 `replace()` 的是一样的，也是可选项，只有在需要指定次数的时候才需要填写

### `join()`

名字翻译过来也就是添加的意思，所以 **`join()`** 函数是用于字符串拼接的

```python
[连接符].join([可迭代对象])
```

可以理解为在 **`可迭代对象`** 中插入 **`连接符`**，所以都是必要的值