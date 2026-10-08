---
title: 相对定位
---
之前调整元素的位置只能使用`margin`,`padding`这些属性对其进行调整，例如元素的位置和周围的元素看起来高度不协调，一定是使用类似`margin-top: 2px`这样的方法去调整高度。但是这样必定会出现一个问题 — 如果存在父级元素，父级元素会受到这样移动的影响。如果想要达到移动的同时可以解决对父级元素的影响，相对定位一定是一个很好的解决方案。

## 概念

相对定位的相对是相对于元素自己本身的位置，所以其原本的元素会继续保持在原本文档流的位置不动，只是显示的图片，文字等信息会进行位置的移动。

## 语法格式

### 属性

- `position`：默认值是`static`，相对定位则是`relative`
- `top`：**正值**：相对于原有的上边框增加多少距离（向下移动）；**负值**：相对于原有的上边框减少多少距离（向上移动）；**优先级高于`bottom`**
- `left`：**正值**：相对于原有的左边框增加多少距离（向右移动）；**负值**：相对于原有的左边框减少多少距离（向左移动）；**优先级高于`right`**
- `bottom`：**正值**：相对于原有的下边框增加多少距离（向上移动）；**负值**：相对于原有的下边框减少多少距离（向下移动）
- `right`：**正值**：相对于原有的右边框增加多少距离（向左移动）；**负值**：相对于原有的右边框减少多少距离（向右移动）
- `z-index`：层级顺序，**层级顺序相同时，书写位置靠后的默认层级更高**

### 格式

```css
.elements {
    position: relative;
    top: 10px;
    left: 20px;
}
```

`注：top和，left层级高，写法就以这两个属性来写，另外两种的属性皆可实现相同效果`

## 案例

我觉得对话框这样的一个案例是其中可以写的东西最多的，于是只使用了这一个

**以下是源码：**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>对话框</title>
		<style>
			* {
				margin: 0;
			}
			.tip {
				width: 150px;
				height: 80px;
				border: 4px solid red;
				border-radius: 6px;
				margin: 50px auto;
			}
			.triangle {
				width: 10px;
				height: 10px;
				border: 4px solid red;
				position: relative;
				left: 50%;
				top: -10px;
				transform: translate(-50%) rotate(45deg);
				border-bottom: none;
				border-right: none;
				background-color: #fff;
			}
		</style>
	</head>
	<body>
		<div class="tip">
			<div class="triangle"></div>
		</div>
	</body>
</html>
```
