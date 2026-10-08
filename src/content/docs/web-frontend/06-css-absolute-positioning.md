---
title: 绝对定位
---
在使用相对定位对元素进行微调之后，在相对定位的元素内就可以对内部的组件进行很轻易的左右对齐和上下移动等等操作。但是相较于相对定位，在很多概念上面其实并不是非常一致，例如普通文档流中和定位上下文（包含块）等。

## 概念

|                   相对定位                   |                           绝对定位                           |
| :------------------------------------------: | :----------------------------------------------------------: |
|          相对于元素自己本身的位置。          | 相对于非`static`（静态）的父元素进行移动，若没有父元素或所有父元素均为`static`（静态），则默认相对于浏览器窗口进行移动。 |
| 原本的元素会继续保持在原本文档流的位置不动。 |   原内容会脱离正常的文档流，会对后面的元素产生一定的影响。   |

## 语法格式

### 属性

- `position`：默认值是`static`，绝对定位则是`absolute`
- `top`：**正值**：相对于父元素的上边框增加多少距离（向下移动）；**负值**：相对于父元素的上边框减少多少距离（向上移动）；**优先级高于`bottom`**
- `left`：**正值**：相对于父元素的左边框增加多少距离（向右移动）；**负值**：相对于父元素的左边框减少多少距离（向左移动）；**优先级高于`right`**
- `bottom`：**正值**：相对于父元素的下边框增加多少距离（向上移动）；**负值**：相对于父元素的下边框减少多少距离（向下移动）
- `right`：**正值**：相对于父元素的右边框增加多少距离（向左移动）；**负值**：相对于父元素的右边框减少多少距离（向右移动）
- `z-index`：层级顺序，**绝对定位元素高于普通文档流中元素**
- **当元素宽`width`和高`height`未定义的时候两个元素同时生效，无优先级之分**

### 格式

```css
.elements {
    position: relative;
}
.elements-container {
	position: absolute;
    top: 10px;
    left: 20px;
}
```

## 案例

我认为最实用的还是下拉菜单这样的功能，于是选取这一个。

**以下是源码：**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .dropdown {
            position: relative;
            display: inline-block;
            margin: 20px;
        }
        
        .dropbtn {
            background: #3498db;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        
        .dropdown-content {
            position: absolute;
            top: 100%;
            left: 0;
            min-width: 160px;
            background: white;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            opacity: 0;
			transform: translate(0, -20px);
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .dropdown-content a {
            display: block;
            padding: 12px 16px;
            text-decoration: none;
            color: #333;
            border-bottom: 1px solid #eee;
        }
        
        .dropdown-content a:hover {
            background: #f5f5f5;
        }
        
        .dropdown:hover .dropdown-content {
            opacity: 1;
			transform: translate(0, 0);
            visibility: visible;
        }
    </style>
</head>
<body>
    <div class="dropdown">
        <button class="dropbtn">下拉菜单</button>
        <div class="dropdown-content">
            <a href="#">菜单项 1</a>
            <a href="#">菜单项 2</a>
            <a href="#">菜单项 3</a>
            <a href="#">菜单项 4</a>
        </div>
    </div>
</body>
</html>
```
