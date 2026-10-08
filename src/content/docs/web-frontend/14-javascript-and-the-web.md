---
title: 网页与JavaScript
---
之前一直在写前端的页面，包括一些小程序，似乎很多的文字相关的内容并不是直接放在HTML的框架里面的，所以学习JavaScript其实是很有必要的一件事情，但是我一直是非常排斥与不理解Python，Java以及JavaScript这样面向对象的语言，一直没有去进行学习。但因为最近这段时间外部的不可抗因素的原因也必须要开始学习，就趁着这个机会去学一学JavaScript和JQuery框架。

## 在网页中加入JavaScript

其实和CSS是一样的，内嵌和外链两种形式都有，但是会多一个行内式，我估计不知道哪天会在我博客的Markdown文章中用一下，所以就是几乎不用。

### 行内式

没啥用，也就是Markdown博客会用到，项目里面不会用的，记不住后面直接搜索就行。

```html
<button onclick="alert('你点我啦！')">点我</button>
```

### 内嵌式

```html
<script>
  // 内部脚本
  console.log("我是内部 JS");
  document.write("页面直接输出内容");
</script>
```

### 外链式

```html
<script src="main.js"></script>
```

**依稀记得异步加载代码也是出现在这里的，后面有了再说吧！**

## 输入与输出

### 输入

在写C语言的时候输入输出也是第一个学的，类似于`printf()`和`scanf()`等函数都是经常用的。不过似乎JavaScript东西会更多一点，毕竟是浏览器窗口。

**`document.write()`**

也就是最基础的页面打印函数，后面可以接字符串与变量。

变量：

```javascript
var arr1 = "apple";
document.write(arr1);
```

字符串：

```javascript
document.write("apple");
```

**`alert()`**

浏览器对话框弹出，提示效果会更明显一点，函数整体逻辑可以直接照搬`document.write()`的了

变量：

```javascript
var arr1 = "apple";
alert(arr1);
```

字符串：

```javascript
alert("apple");
```

**`console.log()`**

这个我算是用的比较多的，之前写小程序，很多东西是否运行完成全部都是终端输出来辨别的，整体函数写法还是照搬之前的两个。

变量：

```javascript
var arr1 = "apple";
console.log(arr1);
```

字符串：

```javascript
console.log("apple");
```

### 输入

输入就相对简单很多，也就是弹出的弹窗。

**`prompt()`**

这个函数有两个参数，一个是提示输入语句，另一个就是输入默认值，示例如下：

```javascript
prompt("[提示输入语句]","[输入默认值]");
```
