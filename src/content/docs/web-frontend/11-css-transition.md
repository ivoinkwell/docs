---
title: transition属性制作CSS交互动画
---
动画在生活中很常见，手机的APP打开就是从本来规定的图标形状变化到屏幕全屏的形状，中间时间的所有变化都是动画。在手机上就成为过渡动画，这个动画的本质目的其实就是让人脑有一个来回过程的显示，更便于其理解。这种理解的本意就是知其何来，知其何去。虽然有不少的人会觉得这种动画在Windows，Linux系统上就是增加硬件的负担，降低硬件性能，但是也是因为有来有回，而且动画使用特定的曲线让苹果在桌面系统中获得一席之地。

## transition属性的属性值

- `transition-property`：参与变换的属性（**默认值：/**）
- `transition-duration`：变化的时间长度（**默认值：0**）
- `transition-timing-function`：过渡动画的贝塞尔曲线设置（**默认值：ease**）
- `transition-delay`：动画开始之前的等待时间（**默认值：0**）

## 效果展示

这几个属性便可以分开去写（**效果：鼠标放在图形上时，正方形在1秒之内使用ease的贝塞尔曲线值转变成圆形**）：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <style>
            .box {
                width: 100px;
                height: 100px;
                background-color: tomato;
                margin: 50px auto;

                transition-property: border-radius;
                transition-duration: 1s;
                transition-timing-function: ease;
                transition-delay: 0s;
            }

            .box:hover {
                border-radius: 50%;
            }
        </style>
    </head>
    <body>
        <div class="box"></div>
    </body>
</html>
```

**将其整合成`transtion`一个属性：**

格式：

`transtion: 变化属性 变化时间 变化时使用的贝塞尔曲线 开始动画前的等待时间, 变化属性 变化时间 变化时使用的贝塞尔曲线 开始动画前的等待时间`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <style>
            .box {
                width: 100px;
                height: 100px;
                background-color: tomato;
                margin: 50px auto;
                
                transition: border-radius 1s ease;
            }

            .box:hover {
                border-radius: 50%;
            }
        </style>
    </head>
    <body>
        <div class="box"></div>
    </body>
</html>
```

**同时操作两个属性一起变化**（效果：鼠标放在图形上时，正方形在1秒之内使用ease的贝塞尔曲线值转变成圆形，**同时宽度增加100px**）：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <style>
            .box {
                width: 100px;
                height: 100px;
                background-color: tomato;
                margin: 50px auto;

                transition: all 1s ease;
            }

            .box:hover {
                width: 200px;
                border-radius: 50%;
            }
        </style>
    </head>
    <body>
        <div class="box"></div>
    </body>
</html>
```
