---
title: 掌握盒子模型
---
## 前言：欢迎来到前端开发的世界！

你好，未来的前端开发者！无论你是想转行进入技术领域，还是想为自己的项目创建精美网页，这个系列教程都将带你从零开始，一步步掌握网页开发的核心技能。今天，我们从最基础的HTML开始，一起搭建你的第一个网页！

---

## 第一部分：HTML - 网页的骨架

### 什么是HTML？

HTML（超文本标记语言）是构建所有网页的基础。它就像建筑物的钢筋骨架，定义了网页的结构和内容。

### 创建你的第一个HTML文件

1. 在你的电脑上新建一个文本文件
2. 将文件名改为 `index.html`
3. 用文本编辑器（如VS Code、Sublime或记事本）打开它

### HTML文档的基本结构

每个HTML文档都遵循这个基础结构：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个网页</title>
</head>
<body>
    <!-- 这里放网页内容 -->
</body>
</html>
```

- `<!DOCTYPE html>` 告诉浏览器这是HTML5文档
- `<html>` 是整个页面的根元素
- `<head>` 包含元信息，不会显示在页面上
- `<body>` 包含所有可见内容

### 常用HTML标签详解

#### 标题标签：`<h1>`到`<h6>`

标题标签用于创建不同级别的标题：

```html
<h1>这是主标题</h1>
<h2>这是二级标题</h2>
<h3>这是三级标题</h3>
```

#### 段落标签：`<p>`

用于创建文本段落：

```html
<p>这是一个段落，包含一些文本内容。</p>
<p>这是另一个段落，包含更多文本。</p>
```

#### 链接标签：`<a>`

创建超链接，连接其他页面或资源：

```html
<a href="https://www.example.com">访问示例网站</a>
```

#### 图像标签：`<img>`

在页面中嵌入图片：

```html
<img src="image.jpg" alt="图片描述" width="300">
```

- `src` 属性指定图片路径
- `alt` 属性提供替代文本（对可访问性很重要）

#### 容器标签：`<div>`和`<span>`

用于组织和分组内容：

```html
<div>
    <h2>产品介绍</h2>
    <p>这是我们最新发布的产品...</p>
</div>

<p>这是<span style="color:red">红色</span>的文本</p>
```

- `<div>` 是块级元素（自动换行）
- `<span>` 是行内元素（不换行）

---

## 第二部分：CSS - 为网页添加样式

### 什么是CSS？

CSS（层叠样式表）是用于描述网页外观的语言。如果说HTML是骨架，CSS就是皮肤和衣服，让网页变得美观。

### 三种添加CSS的方式

1. **内联样式**（直接写在HTML标签中）：
   
   ```html
   <p style="color: blue; font-size: 16px;">蓝色文本</p>
   ```

2. **内部样式表**（写在`<head>`的`<style>`标签中）：
   
   ```html
   <head>
     <style>
       p {
         color: green;
         font-size: 18px;
       }
     </style>
   </head>
   ```

3. **外部样式表**（最佳实践）：
   
   ```html
   <head>
     <link rel="stylesheet" href="styles.css">
   </head>
   ```

### CSS基础语法

CSS规则由**选择器**和**声明块**组成：

```css
selector {
  property: value;
  property: value;
}
```

示例：

```css
h1 {
  color: navy;
  text-align: center;
  font-family: Arial, sans-serif;
}
```

### 常用CSS属性

| 属性                 | 描述   | 示例值                              |
| ------------------ | ---- | -------------------------------- |
| `color`            | 文本颜色 | `red`, `#ff0000`, `rgb(255,0,0)` |
| `font-size`        | 字体大小 | `16px`, `1.2em`, `120%`          |
| `background-color` | 背景颜色 | `lightblue`, `#f0f0f0`           |
| `text-align`       | 文本对齐 | `left`, `center`, `right`        |
| `font-family`      | 字体   | `Arial`, `"Times New Roman"`     |
| `margin`           | 外边距  | `10px`, `1em 2em`                |
| `padding`          | 内边距  | `5px 10px`                       |

---

## 动手实践：创建你的第一个网页

让我们把学到的知识付诸实践！创建一个包含以下元素的个人简介页面：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的个人简介</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }

        header {
            text-align: center;
            background-color: #4a86e8;
            color: white;
            padding: 20px;
            border-radius: 10px;
        }

        .profile-img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 5px solid white;
            margin: 0 auto;
            display: block;
            background-color: #ddd; /* 图片占位色 */
        }

        section {
            background-color: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        h2 {
            color: #4a86e8;
            border-bottom: 2px solid #4a86e8;
            padding-bottom: 5px;
        }

        ul {
            padding-left: 20px;
        }

        li {
            margin-bottom: 8px;
        }

        footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
        }
    </style>
</head>
<body>
    <header>
        <div class="profile-img"></div>
        <h1>张明</h1>
        <p>前端开发学习者 | 网页设计爱好者</p>
    </header>

    <section>
        <h2>关于我</h2>
        <p>你好！我是一名前端开发初学者，对网页设计和用户体验充满热情。我正在学习HTML、CSS和JavaScript，目标是成为一名专业的前端工程师。</p>
    </section>

    <section>
        <h2>技能</h2>
        <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>响应式设计</li>
            <li>基础JavaScript</li>
        </ul>
    </section>

    <section>
        <h2>联系我</h2>
        <p>邮箱: <a href="mailto:zhangming@example.com">zhangming@example.com</a></p>
        <p>GitHub: <a href="https://github.com/zhangming">github.com/zhangming</a></p>
    </section>

    <footer>
        <p>© 2023 我的个人简介页面</p>
    </footer>
</body>
</html>
```

### 实践任务

1. 将上面的代码复制到你的`index.html`文件中
2. 在浏览器中打开文件查看效果
3. 尝试以下修改：
   - 更改标题颜色（修改`header`的`background-color`）
   - 调整个人照片大小（修改`.profile-img`的`width`和`height`）
   - 添加一个新的技能到技能列表
   - 修改整个页面的背景色（修改`body`的`background-color`）

---

## 总结与预告

今天，我们学习了：

- HTML文档的基本结构
- 常用HTML标签及其用法
- CSS的三种引入方式
- 基础CSS选择器和属性
- 创建了一个简单的个人简介页面

在下一篇文章中，我们将深入探讨：

1. CSS选择器的进阶用法
2. 文本和背景的样式细节
3. 元素显示类型（块级与行内）
4. 为你的页面添加更多样式细节

**挑战任务**：在今天的个人简介页面上，尝试添加一个"项目经历"部分，包含项目名称、描述和使用的技术栈。

记住，学习编程最好的方式就是动手实践！不要害怕犯错，浏览器的开发者工具（按F12打开）是你的好朋友，可以帮助你调试代码。

期待在下一篇文章中与你继续前端之旅！🚀
