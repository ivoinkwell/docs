---
title: JavaScript条件语句与循环语句
---
## 概述

其实没什么可讲的也就是语句使用的规范性了，无非就是重温了在力扣刷过的算法题，还是在乘法表上面实践的。

## 条件语句

### if……else

这个几乎是一致的写法，不像多写了

```javascript
let score = 59;
if (score >= 60) {
  console.log("及格");
} else {
  console.log("不及格");
}
```

### switch

其实也半斤八两

```javascript
let week = "周一";
switch (week) {
  case "周一": // case为字符串，JS支持
    console.log("工作日");
    break;
  case "周日":
    console.log("休息日");
    break;
  default:
    console.log("其他日期");
}
```

## 循环语句

### for()

这个或许要注意的就有了

> [!Tip] 语句条件之间的间隔
> C语言是`,`，但是JavaScript是`;`

```javascript
// 经典案例：九九乘法表（JS嵌套for循环）
console.log("JS 九九乘法表：");
for (let i = 1; i <= 9; i++) { // 外层控制行数
  let line = "";
  for (let j = 1; j <= i; j++) { // 内层控制列数
    line += `${j}×${i}=${i*j}\t`;
  }
  console.log(line);
}
```

### While()和do……while()

没啥变化，都是相同的差别，但是

> [!Tip]
>
> 一个先判断再执行，一个先执行再判断
