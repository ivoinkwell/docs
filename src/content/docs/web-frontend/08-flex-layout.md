---
title: Flex布局
---
之前在暑假的时候自己写过一段事件的小程序，当时对于`Flex`布局有过初步的了解，当时在写完小程序之后我还记得我说过，布局只要有`Flex`和`Grid`其他的都不重要。当时觉得这个布局十分的好用，但是并没有深入的去了解，但是经过深度学习之后，感觉比自己去摸索懂得会更透彻一些。

## 概念

**`Flex`布局元素：**

- `Flex`容器：采用`Flex`布局的元素，作为父元素
- `Flex`项目：`Flex`布局内的子元素

**`Flex`容器中有以下两个基本的概念：**

- 主轴（`main axis`）：控制项目顺序的轴，方向根据`flex-direction`改变
- 交叉轴（`cross axis`）：与主轴水平垂直的轴

## 容器的属性

- `flex-direction`
- `flex-wrap`
- `flex-flow`
- `justify-content`
- `align-items`
- `align-cotent`

### `flex-direction`

- `row`（**默认值**）：主轴为水平方向，起点在左端
- `row-reverse`：主轴为水平方向，起点在右端
- `column`：主轴为垂直方向，起点在上方
- `column-reverse`：主轴为垂直方向，起点在下方

### `flex-wrap`

- `nowrap`（**默认值**）：不换行
- `wrap`：自动换行，第一行在开头
- `wrap-reverse`：自动换行，第一行在末尾

### `justify-content`

- `flex-start`（默认值）：左对齐
- `flex-end`：右对齐
- `center`：居中
- `space-between`：两端贴边，项目之间的间隔都相等
- `space-around`：每个项目两侧的间隔相等，项目到边距的间距是两个项目的一半
- `space-evenly`：每个项目之间，项目和边距之间相等

### `align-items`

- `stretch`（**默认值**）：默认拉伸填满整个容器
- `flex-start`：交叉轴的起点对齐
- `flex-end`：交叉轴的终点对齐
- `center`：交叉轴的中点对齐
- `baseline`：项目的第一行文字的基线对齐

### `align-content`（只有设置`flex-wrap`属性之后才会生效）

- `flex-start`：与交叉轴的起点对齐
- `flex-end`：与交叉轴的终点对齐
- `cneter`：与交叉轴的中点对齐
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
- `space-evenly`：每行之间，边上两行到边距的距离都相等

### `flex-flow`（`flex-direction`属性和`flex-wrap`属性的简写形式）

- 格式：`flex-flow: <flex-direction> <flex-wrap>`

## 项目的属性

- `order`：设置排序顺序

[**更多见Reference教程**](https://ref.lylebox.dpdns.org:8443/docs/css.html#css-flexbox)
