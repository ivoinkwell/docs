---
title: transfrom属性是元素位移及形变
---
## transform格式

**函数功能**

- `translate`：**控制元素平移**
- `scale`：**控制元素缩放大小**
- `rotate`：**控制元素旋转，在2D下默认是Z轴**
- `skew`：**控制元素倾斜角度**
- `translate3d`：**控制元素平移**
- `scale3d`：**控制元素缩放大小**
- `rotate3d`：**控制元素旋转**
- `skew3d`：**控制元素倾斜角度**

**函数用法**

```css
.element {
    transform: translate(X轴移动位置, Y轴移动位置) scale(缩放比例，1为基础) rotate(角度) skew(相对于X轴的倾斜角度, 相对于Y轴的倾斜角度);
}
```

**3d会比普通的的多一个Y值，最后一项是旋转角度，前面的X,Y,Z则是方向**

使用transition制作元素外观之间的简单变换动画，但是类似于图形的移动，形变等并不太方便通过原本属性进行变换的则可以使用transform属性进行变换。其中形变可以使用3D的一些效果，就分为2D和3D两个部分

### 2D

**实现（translate为例，其他根据用法带入即可）**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>transform属性</title>
		<style>
			.box {
				width: 100px;
				height: 100px;
				background-color: tomato;
				transition: transform 1s;
			}
			.box:hover {
				transform: translate(50%);
			}
		</style>
	</head>
	<body>
		<div class="box"></div>
	</body>
</html>
```

### 3D

需要在父元素中创建3D效果展示区域，便于展示

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>transform3D属性</title>
		<style>
			.container {
				transform-style: preserve-3d;
				perspective: 800px;
			}
			.box {
				width: 100px;
				height: 100px;
				background-color: tomato;
				transition: transform 1s;
			}
			.box:hover {
				transform: rotate3d(1, 0, -1, 30deg); /* 或者是transform: rotateX(30deg) rotateZ(-30deg) */
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="box"></div>
		</div>
	</body>
</html>
```
