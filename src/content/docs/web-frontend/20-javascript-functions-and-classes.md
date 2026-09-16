---
title: Javascript 函数与类
---

函数和类这个东西其实挺神奇的，一个是封装过程，一个封装属性从而服务过程，但是往往很多傻子非常喜欢往 `function()` 里面套类的 `this` 方法还讲出来，还在讲构造函数这种东西，所以这么老的东西拿出来讲也是少见多怪了……

## 函数

函数是用来封装执行过程的东西，这个用法也非常常见，就像计算器的加减乘除我在后面的主函数当中要进行调用，毋庸置疑是封装函数最方便，所以简单写一写就是这样

```javascript
function add(add1, add2){
	return Number(add1) + Number(add2);
}
```

所以我们还需要进行调用

```javascript
console.log(add(1, 2))
```

这样就能够输出返回值。

## 构造函数

当时应该是 ES5 更早的时候，JavaScript 根本没有 `class()` 这个概念，面向对象就是使用构造函数，在 2015年的时候 ES6 出来，`class` 这样的类定义方法在 C++ 和 Python 中广泛使用，后面已经基本见不到构造函数在程序当中的影子了

```javascript
function ball(x, y){
	this.x = x;
	this.y = y;
}
```

看看，有没有觉得哪里熟悉？

```python
class Ball():
	def __init__(x, y):
		this.x = x
		this.y = y
	def ball():
		return this.x + this.y
```

这里的 `this` 方法相较于 Python 中的 class 是否有些无病呻吟的感觉？是的，`this` 本身可以做变量与全局隔离，但是现在更多是为了快捷调用的写法，都已经在 `function()` 内隔离了，你调用方法不写里面不行，写里面你还怎么 `new` 呢？

## class 类

刚刚也说了类的作用，直接给一个生成小球的案例吧

```html
<html>
    <head>
        <meta charset="utf-8">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
    </head>
    <body>
        <script>
            // 10个小球，从左到右排列，每个小球正中间显示数字

            let balls = [];        // 存放小球对象
            const ballCount = 10;  // 小球数量

            // 小球类//
            class Ball {
                constructor(x, y, color, diameter, number) {
                    this.x = x;               // 圆心 x
                    this.y = y;
                    this.color = color;               // 圆心 y
                    this.diameter = diameter; // 直径
                    this.number = number;     // 小球上的数字
                }

                // 显示小球
                draw() {
                    // 画小球
                    fill(this.color);
                    noStroke();
                    circle(this.x, this.y, this.diameter);

                    // 小球正中间显示数字（水平、垂直都居中）
                    fill(255);
                    noStroke();
                    textAlign(CENTER, CENTER); // 文字水平和垂直居中
                    textSize(24);
                    text(this.number, this.x, this.y);
                }
            }

            function setup() {
                createCanvas(800, 200);
                background("aliceblue");

                const diameter = 60;   // 小球直径
                const color = "red";

                // 计算从左到右均匀分布的圆心位置
                let x = 80;                 // 第一个圆心的 x

                for (let i = 0; i < ballCount; i++) {
                    balls.push(new Ball(x, 100, color, diameter, i + 1));
                    x = x + 80;
                }

                // 直接在这里画出所有小球
                for (let ball of balls) {
                    ball.draw();
                }
            }
        </script>
    </body>
</html>
```

## 总结

简单说一下，想要学好，就没有必要按照一些老师的思路去走，他们误人子弟可以，但前提不能是我们，要不然我们还怎么面对微软给你维护这么长时间的 GitHub 呢？

不知道真正喜欢编码，能看到这个文章的职校学子有多少，但是我还是希望你们能记住我在 blog 上挂着的乔布斯的话：`Don’t let the noise of others’ opinions drown out your own inner voice.`，这条路上傻逼注定很多，可能更多的是你的老师，你要学会学习，明辨是非，善用AI，还有不要在意他人的声音，他们的评价只是你在他们看来。就像鱼的骨头在你看来也不过只是鱼刺罢了，所以真正要学好，要能自己融会贯通。