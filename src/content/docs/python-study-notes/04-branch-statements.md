---
title: 分支语句
---

好的逻辑是对情况进行尽可能精简的划分，想要完成划分，必不可少的就是分支语句

## Python 中的分支语句

语句格式是这样的：

```python
if 条件1:
	代码块1
elif 条件2:
	代码块2
else:
	代码块3
```

我不知道是因为接触太早还是什么原因，有一个问题我从来没有去质疑过 —— `代码块缩进是显示从属关系还是语句权重`，不过现在已经可以确定是从属关系。

## 案例

题目：

```text
我国快递行业通过引入新技术和创新业务模式，目前已经成为全球最大、最活跃的快递市场之一。快递行业的高速发展，使得我们邮寄物品变得方便快捷。某快递点提供华东地区、华南地区、华北地区的寄件服务，其中华东地区编号为01、华南地区编号为02、华北地区编号为03。该快递点寄件价目表具体如表所示。
```

| 地区编号     | 首重寄件价目（<=2kg） | 续重寄件价目（元/kg） |
| -------- | ------------- | ------------ |
| 华东地区（01） | 13元           | 3            |
| 华南地区（02) | 12元           | 2            |
| 华北地区（03） | 14元           | 4            |

解题思路首先就是要把 if 层级整明白，先对地区进行判断，内部再写寄件重量计算价格的程序，我就直接按照函数去写了，毕竟我不喜欢嵌套太多东西，看着不舒服，大概理解一下这个判断嵌套，函数什么的就不用管了

```python
address = input("请输入地区编号：")
weight = int(input("请输入寄件重量(kg)："))

def number1(weight):
    add_weight = float(float(weight)*3)

    if weight <= 2:
        return 13
    else:
        return 13 + add_weight

def number2(weight):
    add_weight = float(float(weight)*2)

    if weight <= 2:
        return 12
    else:
        return 12 + add_weight

def number3(weight):
    add_weight = float(float(weight)*4)

    if weight <= 2:
        return 14
    else:
        return 14 + add_weight

if __name__ == "__main__":
    if address == "01":
        print("价格是：", number1(weight), "元")
    elif address == "02":
        print("价格是：", number2(weight), "元")
    else:
        print("价格是：", number3(weight), "元")
```