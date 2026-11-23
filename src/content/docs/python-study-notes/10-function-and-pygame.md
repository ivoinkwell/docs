---
title: 函数与pygame包
---

会了函数之后就可以开始尝试使用函数去做出一些东西

## 环境安装

最近开发环境迁移到 Windows 之后，我因为安装的是最新的 `Python 3.15` 安装依赖的时候出现编译问题，所以就解决了一下：

### 正常安装

正常安装的情况下在创建完虚拟环境之后就可以直接安装两个包：`pygame` 和 `pgzero`

```bash
pip install pygame pgzero
```

### 新版本安装

但是在新版本上面需要自己去凑包，所以就要自己去安装

> - **`pygame-ce`**
> - **`numpy`**
> - **`pgzero`**

首先先把前两个安装上

```bash
python -m pip install pygame-ce numpy --only-binary=:all:
```

然后安装 **`pgzero`**

```bash
python -m pip install pgzero --no-deps
```

## 了解程序工作原理

首先先看这样的一个程序

```python
import pgzrun

def draw():
    screen.draw.circle((300, 250), 60, "red")
    
pgzrun.go()
```

运行一下，结果是这样的

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/10-function-and-pygame/10-function-and-pygame.webp)

但是你去观察整个代码，也会发现一个很神奇的事情，就是我的代码全部写在 `draw()` 这个函数内部，我并没有进行调用，程序就已经执行了。

所以只有一种解释，就是 `pgzrun` 模块当中的 `go` 函数在运行的时候会直接执行 `draw()` 这样一个固定名字的函数，也就是钩子函数。

## 利用钩子函数实现简单功能

还有一个实现页面更新功能的钩子函数 `update()`，可以通过这个函数进行一些数据等东西的更新，也就是可以实现圆形放大的一个效果

```python
import pgzrun

r = 1

def draw():
    screen.clear()
    screen.draw.circle((300, 250), r, "red")

def update():
    global r
    r += 1
    
pgzrun.go()
```