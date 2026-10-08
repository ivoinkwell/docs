---
title: '安装 Debian 13'
---

Debian 13本身安装并不复杂，但是也有很多方面可以细说。

## Grub 引导界面

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13.webp)

:::note
`Graphical Install` 和 `Install` 是有区别的，`Graphical Install` 字面翻译就是图形化安装，进入的这个界面是可以使用鼠标进行操作的，下面的`Install`则是文本化界面，只能使用键盘进行操作，如果内存空间大，可以选择使用`Graphical Install`，简洁直观
:::
 
## 语言选择

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-1.webp)

:::note
这里的语言选择会直接影响到你的用户目录，和Windows一样，用户目录下一般有桌面，文档等东西，选择中文，这些目录也会是中文，实体机之后进入目录会无法进入
:::

## 地区

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-2.webp)

:::note
地区选择China，这样时区也就变成`Asia/Shanghai`了，不需要手动去调整了
:::

## 字符集

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-3.webp)

:::note
默认和你选择的语言匹配
:::

## 键盘布局选择

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-4.webp)

:::note
一般中国国内的电脑都是美式键盘布局也就是`QWERT`
:::

## 主机名

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-5.webp)

:::note
经过镜像加载会进入机器名称选择，可以自行自定义
:::

## 域名

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-6.webp)

:::note
家用机器不需要这些，直接继续
:::

## Root账号

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-7.webp)

:::note
后面安装需要使用管理员权限，但是当时普通用户是没有`sudo`权限的，所以这里需要先设置Root账号的密码，便于我们登录Root账号，后面可以选择禁用
:::

## 创建用户

用户名分为三个地方需要填写


### 全名

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-8.webp)

:::note
作为姓名全程这个地方是可以填写大写字母的
:::


### 用户名

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-9.webp)

:::
这个用户名会出现在`/home`目录下的文件夹，名字只能小写
:::


### 密码

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-10.webp)

:::note
随意自行填写即可
:::

## 设置磁盘

磁盘有类型和分区方式等内容，一般使用基础的即可


### 选择磁盘类型

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-11.webp)

:::note
是否创建LVM逻辑卷，这个逻辑卷可以将物理硬盘融为一个逻辑卷，可以灵活操作硬盘空间，如果硬盘少可以不去做选择，一般正常安装默认第一个即可
:::


### 选择磁盘

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-12.webp)

:::note
安装系统的磁盘尽量选择SSD，系统运行速度会快很多
:::


### 分区

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-13.webp)

:::note
Linux的文件管理是以文件树的形式存在的，而这里的分区就是更改文件树是存在于一块硬盘还是由多块硬盘组成

> - **Separate `/home` partition**：将`/home`分区单独作为一个磁盘进行挂载，类似于Windows的D盘
> - **Separate `/home` , `/var`, `/tmp`partition**：相同意思，将这几个分区分别作为一块磁盘进行挂载

剩下的部分后面有详细的用途解释，选一个适合自己用途的即可
:::


### 完成分区确认

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-14.webp)

:::note
这个时候会出现分区表，确保分区表中显示的内容没有问题，确认并下一步即可
:::

## 驱动选择与安装

完成确认后会自动分盘并安装基础系统，之后需要向用户确认是否安装第三方软件


### 媒体驱动

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-15.webp)

:::
DVD驱动一般家用电脑以及虚拟机都是没有的，一般来说都是不需要的
:::


### 配置网络镜像源

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-16.webp)

:::
我这里是使用DVD镜像进行本地安装的，如果是使用Netist镜像进行安装是默认必须联网的
:::


### 软件包流行度调查

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-17.webp)

:::
这个随意，按照自己喜好即可
:::

## 桌面软件包安装

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-18.webp)

:::
我们选择的环境是`i3wm`，所以只需要勾选基础系统工具，也就是`standard system utilities`即可，`SSH Server`虚拟机可以选择安装
:::

## Grub引导界面安装

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-19.webp)

:::
没有引导我们没有办法进入系统，这里选择`Yes`
:::


![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-20.webp)

:::
选择安装系统的那个磁盘
:::

## 完成安装

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/01-install-debian-13/01-install-debian-13-21.webp)

:::
当出现这个界面重启进入进入系统即可完成安装
:::
