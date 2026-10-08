---
title: '应用软件'
---

相比于桌面环境，`i3-wm` 中软件更少更简洁，所以在安装后要自己补充，这样虽然麻烦，但是自由度会比较的高

## 文件管理器

文件管理上面总是使用 `ls`，`cd` 这样的命令效率肯定是没有图形界面的速度快的，但是不同人使用的都不一样，所以还是推荐两种文件管理器


### 图形界面 - `Thunar`

这个文件管理器是 `Xfce` 桌面环境默认使用饿文件管理器，有图形化界面，可以使用鼠标直接点击，上手程度会低很多

#### 安装

软件源中有这个软件，可以直接进行安装

```bash
sudo apt install thunar
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation.webp)

安装之后则可以在 `dmenu` 中找到这个文件管理器


#### 界面

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-1.webp)

这个文件管理器最好的一点就是左侧栏，里面可以直接对 U盘 等设备进行直接挂载，图形化界面更容易理解界面交互


### 终端文件管理器  - `Ranger`

这里我没选择 `Yazi` 不是因为热度等问题，单纯是上手的时候使用的就是 `Ranger` ，所以有一些快捷键习惯不想去改变了，如果还没有还是使用，想要尝试的可以对比一下 `Ranger` 和 `Yazi` 再选择一个适合自己的


#### 安装

软件源中有这个软件，可以直接进行安装

```bash
sudo apt install ranger
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-2.webp)

安装后 `dmenu` 中同样可以找到，但是我更喜欢直接在终端输入 `ranger` 进行打开

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-3.webp)


#### 配置

进入配置的文件夹，`ranger` 的却没有文件，就像这样

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-4.webp)

输入这个命令，`ranger` 会把自己的配置文件复制到用户目录下

```bash
ranger --copy-config=all
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-5.webp)

左侧文件夹内文件出现，自行编辑即可 


#### 使用

我之前使用的时候十分喜欢使用 `vim` ，所以也一直使用 `h`，`j`，`k`，`l` 来操作上下左右，使用 `:` 输入命令等等，可能也就是在键盘上使用会方便很多

## 提权认证

我们可以尝试安装并打开磁盘工具 `Gparted` ，你会发现完全打不开

:::danger
磁盘分区工具需要以root身份去运行，而我们使用 `rofi` 进行打开会因为向用户所要授权软件的缺失而失败
:::

可以验证一下，在终端输入

```bash
sudo gparted
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-6.webp)

发现这样是可以打开的


### 安装提权软件 - lxpolkit

软件源中含有，可以直接安装

```bash
sudo apt install lxpolkit
```


### 添加自启动

在 `$HOME/.config/i3/config` 添加以下内容

```ini
exec --no-startup-id lxpolkit
```

重启后再打开 `Gparted`


### 效果

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-7.webp)

已经成功出现提权窗口

## 中文输入法

一开始使用的时候的确是不重要的，但是要将其作为开发机之后回复微信和QQ还是需要，所以可以选择安装一下，我更偏向于使用 `Fcitx` 框架


### 安装

软件源中已经自带需要的组件

```bash
sudo apt install fcitx5 fcitx5-chinese-addons
```

安装后可以在 `dmenu` 菜单中看见

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-8.webp)


### 配置输入法自启动

在 `$HOME/.config/i3/config` 添加以下内容

```ini
exec --no-startup-id fcitx
```

重启之后在面板上即可看到一个企鹅图标，或者和我这样的`en`字母

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-9.webp)


### 配置中文输入法

打开配置界面，在搜索框中输入 `pinyin` 进行检索并加入输入法

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-10.webp)

终端中尝试输入，确保没有问题

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-11.webp)


### 输入法美化

之前使用 Deepin 看到社区有一个人的美化主题非常不错，但是这个帖子我没有收藏，所以我只能把这个主题的 GitHub 仓库放上面，里面已经有详细的使用方法

**[fcitx5-themes-candlelight](https://github.com/thep0y/fcitx5-themes-candlelight)**

## 应用商店

包管理器当中并不是常用的软件全部包含的，但是如果去使用deb安装包自己去打依赖还是很麻烦，所以国内出了一个补全 Linux 国内应用的应用商店，安装过后直接进行安装软件即可，这个商店有自己的名字 —— Spark Store，星火商店

**[星火商店官网](https://www.spark-app.store/download)**

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/05-application-software-recommendation/05-application-software-recommendation-12.webp)

:::note[重逢]
依稀记得我最后一次使用这个应用商店已经是两年之前了，这个商店还是一个完全靠爱发电的模式，现在已经开始出现商业版本，官网更加精美了。之前一直看不起国内对于 Linux 操作系统的魔改， DDE 套着 GTK 和 QT 两个图形框架下窗口还使用 KDE 的 KWin，导致整个系统异常的卡顿，但是看着软件发展越来越好，也忠心祝愿国内 Linux 生态能够发展起来
:::

