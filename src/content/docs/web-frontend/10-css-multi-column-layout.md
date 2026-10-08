---
title: 多列布局
---
在写微信小程序的时候就非常喜欢使用多列的布局模式，当时觉得`flex`布局不好看，特地在里面嵌套了一个`grid`布局让其更整洁。但是现在学了多列布局，虽然整体上不如`flex` 和`grid` 写的舒服和快捷，但是我还是觉得这个布局还是有一定的用武之处，比如考试。

## 概念
多列布局其实就是我们经常看见报纸，书籍上面常见的分栏方式，缺点也是非常明显，在标题行上面没有办法指定合并行数，所以`grid` 目前还是我认为的最优解。

## 语法格式
### 属性
* `column-count`：规定列数的属性
* `column-gap`：规定每列之间间距的属性
* `column-rule`：每列之间间隔的线样式的属性
* `column-width`：每列的宽度，可以和`column-count`同时使用
* `column-span`：用于横跨列的属性。只有两个值,`none`不横跨任何列，`all`横跨所有行

### 格式
```css
.elements {
    column-count: 3;
    column-gap: 3px;
    column-rule: 1px solid red;
    column-span: all;
}
```
