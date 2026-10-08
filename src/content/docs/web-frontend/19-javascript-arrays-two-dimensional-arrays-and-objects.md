---
title: JavaScript 数组，二维数组与对象
---
相比其他的知识点，这个还是有点忘记了，甚至C语言上的写法也忘的差不多了。

## 数组

这个绝对忘不了，这个也是C上面最基本的存储单位，写法也和JavaScript上差不多

```javascript
var arr = [1, 2, 3]
```

## 二维数组

这个在C语言里面写法是这样的

```c
int arr[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

printf("%d", arr[1][1]);
```

JavaScript不知道能不能说理解上会更简单

```javascript
var arr = {
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
};

console.log(arr[1][1]);
```

## 对象

这个词似乎在C语言里面有一个很熟悉的东西 —— `结构体`。

可以简单理解就是给数组里面的东西取一个相对便于记忆的名字，方便直接进行读取

```javascript
var arr = {
	x: "apple",
	y: 17,
	z: "orange"
}

console.log(arr.x);
```
