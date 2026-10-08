---
title: JavaScript switch语句
---
## 概述

之前本来想和其他的语句一起一笔带过，但是现在上过之后发现还是有很多值得去记录一下的。这个语句的语法和C语言几乎是一样的，但是在这里对于JavaScript中有一个点我觉得十分有意思，还会是十分有必要去讲一讲的。

## switch语句

框架大体是相同的：

```javascript
switch (变量) {
    case 值1:
        // 代码
        break;
    case 值2:
        // 代码
        break;
    case 值3:
        // 代码
        break;
    default:
        // 默认处理
        break;
}
```

但是里面有一个点在使用的时候不知道是没有学到，还是C语言的处理比JavaScript好，导致我几乎忘记`default`条件的存在。

**问题及解决：**

根据输入数字，判断等级：

```javascript
var inputNumber = prompt("请输入一个数字");
inputNumber = Number(inputNumber);
switch(inputNumber){
    case 1:
        document.write("一级");
        break;
    case 2:
        deocument.write("二级");
        break;
}
```

现在如果说是什么都不输入或者输入的类型不对会无法判断，这个时候如果条件都不满足，肯定是这样：

```javascript
var inputNubmer = prompt("请输入一个数字");
inputNumber = Number(inputNumber);
switch(inputNumber){
    case 1:
        document.write("一级");
        break;
    case 2:
        document.write("二级");
        break;
}
document.write("请输入的是一个数值");
```

到那时这么写，任选结果又不能用了，所以，只有使用`default`关键字：

```javascript
var inputNumber = prompt("请输入一个数字");
inputNumber = Number(inputNumber);
switch(inputNumber){
    case 1:
        document.write("一级");
        break;
    case 2:
        document.write("二级");
        break;
    default:
        document.write("请输入的是一个数值");
        break;
}
```

## 判断与数据类型

接触到JavaScript之后，在了解变量类型之后我才发现都说简单的JavaScript和Python的数据类型都是动态类型，所以我之前一直觉得不严谨的语言在数据类型定义上面还是会更复杂一点。

**还是以这个为例子：**

```javascript
var inputNumber = prompt("请输入一个数字");
inputNumber = Number(inputNumber);
switch(inputNumber){
    case 1:
        document.write("一级");
        break;
    case 2:
        document.write("二级");
        break;
    default:
        document.write("请输入的是一个数值");
        break;
}
```

在这个里面我写的是`inputNumber = Number(inputNumber);`去强制与转换数据类型，而不是在`case`的条件中加上`''`来转换数值类型为字符类型。

### 多分支语句

在多分支语句当中，在`if……else`语句里面是有判断的，将刚刚的`switch`语句先转换成`if……else`语句：

```javascript
var inputNumber = prompt("请输入一个数字");
inputNumber = Number(inputNumber);

if(inputNumber === 1){
    document.write("一级");
} else if(inputNumber === 2){
    document.write("二级");
} else {
    document.write("请输入的是一个数值");
}
```

这里面的判断十分有意思，`==`是等于的判断，`===`是数据类型加上内容的判断。

## 总结

语句对于我来说其实已经不算是关注点了，重要的其实是数据类型。现在才知道，在动态数据类型的语言中`===`会比`==`更严谨，之前看不上Python或许很大原因也是数据类型的严谨性并没有看到。
