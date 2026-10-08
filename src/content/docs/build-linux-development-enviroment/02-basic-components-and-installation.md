---
title: '基础组件与安装'
---

和开发系统相比，Linux 基础系统当中会有很多软件包的缺失，这些缺失是需要我们自己去安装

## 需要安装软件梳理

回想一下在刚安装玩Windows系统之后需要做什么 —— 打驱动，也就是安装驱动程序，这些程序在Linux当中是和桌面环境一起安装上的，但是因为我们这里并没有安装桌面环境，这些需要和桌面组件一起进行安装

### 驱动程序

一般这些驱动程序只有实体机需要进行安装，后面的都是包名，可以直接进行安装

> - **网络管理**：`network-manager-gnome`
> - **蓝牙管理**：`blueman`
> - **声音控制**：`volumeicon-alsa`
> - **电源管理器**：`xfce4-power-manager`


### 桌面环境安装

我们使用的桌面环境是窗口管理器`i3-wm`，但是这仅仅只是一个**窗口管理器**，其他还有很多组件，例如`i3-gaps`，`i3lock`和`i3stauts`等软件，直接安装`i3`就可以。电脑在开机进入系统的时候需要输入用户名密码，这个就需要**登录管理器**。

> - **窗口管理器以及其配套组件**：`i3`
> - **登录管理器**：`lightdm`

:::details
Linux 不同桌面环境都有自己的登录管理器，像是 KDE 的 `sddm` 和 Gnome 的 `gdm` 都是非常好用的登录管理器，但是为了最轻量选择 `lightdm` ，如果有其他需要也可以自己去安装其他的登录管理器
:::


### 其他软件包

在之前用户权限中有提到过提权的软件`sudo`，如果已经是第二次安装，可以安装一些自己需要的软件

> - **权限控制**：`sudo`

## 更换软件源

登录系统的 root 账号，更换`/etc/apt/sources.list`文件中的软件源

:::details
``` bash
# USTC

# 默认注释了源码仓库，如有需要可自行取消注释
deb http://mirrors.ustc.edu.cn/debian trixie main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie main contrib non-free non-free-firmware
deb http://mirrors.ustc.edu.cn/debian trixie-updates main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie-updates main contrib non-free non-free-firmware

# backports 软件源，请按需启用
# deb http://mirrors.ustc.edu.cn/debian trixie-backports main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie-backports main contrib non-free non-free-firmware
```
:::

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/02-basic-components-and-installation/02-basic-components-and-installation.webp)

最后更新一下软件源，出现`ustc`字样即为成功

## 安装所需软件

之前梳理了三个板块，**驱动程序**，**桌面环境**以及**附加**的相关软件包，但是虚拟机是可以省略驱动程序相关的安装的


### 实体机安装命令参考

```bash
apt install network-manager-gnome blueman volumeicon-alsa xfce4-power-manager i3 lightdm sudo
```


### 虚拟机安装命令参考

```bash
apt install network-manager-gnome i3 lightdm sudo
```


![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/02-basic-components-and-installation/02-basic-components-and-installation-1.webp)

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/02-basic-components-and-installation/02-basic-components-and-installation-2.webp)

按`y`后等待安装完成

## 配置sudo

将我们刚刚添加的用户加入`sudo`用户组

```bash
sudo usermod -aG sudo [username]
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/02-basic-components-and-installation/02-basic-components-and-installation-3.webp)

## 重启进入系统

输入`reboot`进行重启，重启后即可进入 `LightDM` 登录管理器，界面如下

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/02-basic-components-and-installation/02-basic-components-and-installation-4.webp)

输入用户名进入系统

## `i3-wm`初配置

进入桌面后会有一个初始配置环节

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/02-basic-components-and-installation/02-basic-components-and-installation-5.webp)

这里是是否在用户目录创建`i3-wm`的配置，这样用户的配置和系统不会冲突，按下`Enter`键即可创建用户自己的配置文件

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/02-basic-components-and-installation/02-basic-components-and-installation-6.webp)

这里需要确认`Mod`按键，让你选择 `Alt` 和 `Win` 两个按键中任意一个作为都可以，我喜欢 `Win`

**按下 `Enter` 后就正式进入 `i3-wm` 了，恭喜你成功完成安装！**
