---
title: JavaScript变量与运算
---
## 变量

### `var`与`let`的区别

**定义变量**

声明一个变量例如以下两个方式：

```javascript
var number;
```

```javascript
let number;
```

**相同与不同**

以前我也不知道，但是以前学习的语言，像是C会更注重底层的数据类型，但是这里不是，更注重的是作用位置。

所以现在要明白两个概念：

- 全局作用域
- 块级作用域

按照书上观点`{}`中的是块级作用域，我觉得麻烦，简单一点理解，如下：

- `var`：用于声明所有不管在哪里都要使用的变量
- `let`：函数内暂时使用的变量使用其进行声明

### 数据类型

上面说过不注重数据类型，但是只是不会像C一样那么注意数据类型对于内存等硬件的占用去做最合理的数据类型分配，但是数据类型还是要注重的。

**数据类型转换**

- `isNaN()`：判断是否是数值型
- `Number()`：转换为数值型
- `parseInt()`：转换为整型
- `parseFloat()`：转换为浮点型
- `String()`：转换为字符型
- `toString()`：转换为字符型，如果跟上参数，则转变为参数所对应的进制
- `typeof`：检查数据类型关键字，写法：`console.log(typeof 123);`

## 运算

### 个人案例

我之前写过Python，也就理所当然了：

```javascript
var number1 = prompt("请输入第一个数字");
var number2 = prompt("请输入第二个数字");
document.write("结果是" + number1 + number2);
```

我在两个弹窗中输入的数字分别是1和2。猜猜结果，输出的是`结果是12`

在JavaScript里面`+`是连接，我算好直接放入不就行了？

```javascript
var number1 = prompt("请输入第一个数字");
var number2 = prompt("请输入第二个数字");
var number3 = number1 + number2;
document.write("结果是" + number3);
```

其实输出不变，输出的是`结果是12`

也就是说，在JavaScript里面数据在做运算前最好是要用`Number()`函数框一下的，避免出现加法这样的问题。

```javascript
var number1 = prompt("请输入第一个数字");
var number2 = prompt("请输入第二个数字");
document.write("结果是" + Number(number1) + Number(number2));
```

```javascript
var number1 = prompt("请输入第一个数字");
var number2 = prompt("请输入第二个数字");
var number3 = Number(number1) + Number(number2);
document.write("结果是" + number3);
```

两种算法都没有错，但是要注意语法。不过其他计算方法可能就不需要，加上也是保险。

### 转义字符

这个小点在浏览器这种展示的地方容易栽，这个其实所有语言基本相同，就是有的地方要注意，比如输出`I'm Lyle`。

```javascript
document.write("I'm Lyle");
```

```javascript
document.write("I\'m Lyle");
```

这两个试一下就知道啥意思了。

---

| 转义符 | 含义           |
| ------ | -------------- |
| `\n`   | 换行           |
| `\t`   | 制表符（Tab）  |
| `\\`   | 输出一个反斜杠 |
| `\'`   | 单引号         |
| `\"`   | 双引号         |
| `\b`   | 退格           |
| `\r`   | 回车           |

**这些基本上通用的。**
