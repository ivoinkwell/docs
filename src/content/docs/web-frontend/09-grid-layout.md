---
title: Grid布局
---
这个布局之前我在写微信小程序的时候是非常喜欢的一个，毕竟我是一个喜欢规整布局的人。所以一开始就学了不少`Grid`布局的属性，在`Flex`布局中我确实漏学了不少知识，但是`Grid`学下来却发现好像除了基础的术语，还真的学的差不多了。

## 概念

**`Grid`布局元素：**

- `Grid`容器：采用`Grid`布局的元素，作为父元素
- `Grid`项目：`Grid`布局内的子元素

**`Grid`容器中有以下两个基本的概念：**

- 块轴（`block axis`）：垂直方向
- 行内轴（`inline axis`）：水平方向

**`Grid`项目概念：**

`Grid`项目主要是操作项目在整个网格中的位置，很多整体布局都是使用这个方法快速搭建出一个页面，这样能保证在不同设备上看到的结构是完全等比例的。

## 容器

### 属性

- `grid-template`
- `gap`
- `justify-content`
- `align-content`

### 书写格式

#### `grid-template`

这个属性是一个复合属性，由两个属性组成的，分别是`grid-template-rows`和`grid-template-columns`组成，写法如下：

```css
.grid-container {
    grid-template: [grid-template-rows] / [grid-template-columns];
}
```

`grid-template-rows`和`grid-template-columns`的示例写法如下：

```css
.grid-container {
    grid-template-rows: 1fr 1fr 1fr; /* 均分三行，占满父容器 */
    grid-template-rows: repeat(3, 1fr); /* 与上面的写法等价 */
    grid-template-rows: 200px 1fr 1fr; /* 第一行200px，剩余空间均分两行，占满父容器 */
    grid-template-rows: 200px repeat(2, 1fr); /* 与上面的写法等价 */
}
```

```css
.grid-container {
    grid-template-columns: 1fr 1fr 1fr; /* 均分三行，占满父容器 */
    grid-template-columns: repeat(3, 1fr); /* 与上面的写法等价 */
    grid-template-columns: 200px 1fr 1fr; /* 第一列200px，剩余空间均分两列，占满父容器 */
    grid-template-columns: 200px repeat(2, 1fr); /* 与上面的写法等价 */
}
```

如果写一个3×3的网格布局可以有一下两种等价写法：

```css
.grid-container {
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
}
```

```css
.grid-container {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
}
```

#### `gap`

这也是一个复合属性，由两个属性组成的，分别是`row-gap`和`column-gap`组成，写法如下：

```css
.grid-container {
    gap: [row-gap] [column-gap];
}
```

`gap`控制行列间距都是10px的示例写法如下：

```css
.grid-container {
    gap: 10px 10px;
}
```

等价于以下写法：

```css
.grid-container {
    gap: 10px;
}
```

**`justify-content`和`align-content`属性与`Flex`布局一致**

## 项目

### 属性

- `grid-row`
- `grid-column`
- `grid-area`

### 书写格式

#### `grid-row`

这也是一个复合属性，由两个属性组成，分别是`grid-row-start`和`grid-row-end`组成，写法如下：

```css
.grid-item {
    grid-row: [grid-row-start] / [grid-row-end];
}
```

假设一个场景，控制一个项目宽2个单元格，起始为第三条网格线。

```css
.grid-item {
    grid-row-start: 3;
    grid-row-end: 5;
}
```

**等价于以下写法：**

```css
.grid-item {
    grid-row: 3 / 5;
}
```

#### `grid-column`

这也是一个复合属性，由两个属性组成，分别是`grid-column-start`和`grid-column-end`组成，写法如下：

```css
.grid-item {
    grid-column: [grid-column-start] / [grid-column-end];
}
```

假设一个场景，控制一个项目长3个单元格，起始为第三条网格线。

```css
.grid-item {
    grid-row-start: 3;
    grid-row-end: 6;
}
```

**等价于以下写法：**

```css
.grid-item {
    grid-column: 3 / 6;
}
```

#### `grid-area`

这也是一个复合属性，将`grid-row`和`grid-column`这两个属性合并到一起，写法如下：

```css
.grid-item {
    grid-area: [grid-row-start] / [grid-column-start] / [grid-row-end] / [grid-column-end];
}
```
