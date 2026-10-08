---
title: 使用animation实现复杂形态过渡动画
---
之前使用`transition`属性确实是让元素在变换的时候有了过渡的动画效果，但是如果想要实现一个属性的三次甚至多次变换，就需要使用另外一个动画属性`animation`。

## `animation`属性组成

> 1. **定义** - 移动时间中每一个部分需要变换的属性
> 2. **应用** - 将定义的动画应用到元素上

### 定义

**格式：**

```css
@keyframes {
    0% {
        
    }
    50% {
        
    }
    100% {
        
    }
}
```

**写法：**

> - 其中间可以是1-99的任意值，`50%`仅为格式示意
> - 在大括号内直接写属性需要实现的效果

定义开始和结尾，可以使用上面的格式也可以使用下面的格式，虽然正确，但是统一性不强

```css
@keyframes {
    from {
        
    }
    50% {
        
    }
    to {
        
    }
}
```

### 应用

**格式：**

```css
.element {
    animation: name(名称) duration(动画时间) timing-function(速度曲线) fill-mode(等待或者停止时显示的样式) delay(延迟时间) iteration-count(动画播放次数);
    animation-play-state(动画暂停或者播放): ;
}
```

**写法：**

> - `animation-play-state`要单独写（**例：**不要直接使用`animation: paused;`进行暂停）
> - animation属性值需要按照顺序摆放，如果有**不需要的直接不写即可**

## `animation`进度条

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>进度条动画</title>
		<style>
			.progressContainer {
				margin: 20px auto;
				width: 600px;
				height: 20px;
				background-color: grey;
				border-radius: 20px;
			}
			.progressBar {
				/* width: 200px; */
				height: 20px;
				background-color: green;
				border-radius: 20px;
				animation: fill 3s ease-in-out infinite;
			}
			@keyframes fill {
				0% {
					width: 0;
				}
				100% {
					width: 600px;
				}
			}
		</style>
	</head>
	<body>
		<div class="progressContainer">
			<div class="progressBar"></div>
		</div>
	</body>
</html>
```
