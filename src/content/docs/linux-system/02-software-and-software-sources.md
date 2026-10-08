---
title: '软件与软件源'
---

## 软件安装

相比于Windows和Mac OS平常安装软件的方式，Linux安装软件的方式会快速与便捷，但是也需要注意自己的发行版，使用正确的包管理器

## 包管理器

### 包管理器作用

在Linux安装软件上与Windows不同，大多数软件都是以`软件包`的形式出现的，各派系发行版为了能够方便的去管理软件包，都为自家的发行版安装了各自派系的软件包管理器，简称包管理器。常见的包管理器有Debian系的`apt`，Red Hat系的`dnf`以及Arch系的`pacman`


### 包管理器使用

包管理器的类型很多，这里只针对Ubuntu Server以及Debian系发行版的`apt`包管理器进行说明

软件包的包名多半是软件的名字，可以尝试填入软件名


#### 安装

```bash
sudo apt install [软件包名]
```


#### 卸载

```bash
sudo apt remove [软件包名]
```


#### 卸载并自动清除依赖

```bash
sudo apt autoremove
```

在Debian这个发行版当中有一个专门安装本地包的包管理器`dpkg`，安装本地的`.deb`包可以使用这个包管理器


#### 安装

```bash
sudo dpkg -i [本地软件包]
```


#### 卸载

```bash
sudo dpkg -r [软件包名]
```

## 软件获取与软件源

这些软件我们只需要输入简单的命令就可以轻松的下载并且安装，其实这得益于Ubuntu在安装时候的基础配置中让我们配置了软件源

软件源可以理解为一个Linux操作系统官方放在服务器上的软件包仓库，这些软件包都是官方经过测试，安装后不会影响系统稳定的软件包。但是官方的服务器一般都不会遍布全球各地，所以许多热门的发行版，许多高校会自己去搭建镜像源，在本地就能够提升软件包的下载速度

## 文件位置与配置

一般来说，正常的Debian发行版，软件源的文件位置都在`etc/apt/sources.list`文件内，一般格式为

```bash
# Debian 13 USTC

# 默认注释了源码仓库，如有需要可自行取消注释
deb http://mirrors.ustc.edu.cn/debian trixie main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie main contrib non-free non-free-firmware
deb http://mirrors.ustc.edu.cn/debian trixie-updates main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie-updates main contrib non-free non-free-firmware

# backports 软件源，请按需启用
# deb http://mirrors.ustc.edu.cn/debian trixie-backports main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie-backports main contrib non-free non-free-firmware

```

但是你应该发现，这里赫然写着`Debian`，所以`Ubuntu Server`的是这个样子的

```bash
# Ubuntu sources have moved to /etc/apt/sources.list.d/ubuntu.sources
```

**这就是第二种情况**

软件源的配置格式一般有两种，常见的位于`etc/apt/sources.list`的格式称之为`sources.list`格式，`Ubuntu Server`现在使用的这种格式则是`DEB822`格式，`DEB822`格式这种格式结构更优，扩展性更强

一般来说位置是位于`/etc/apt/sources.list.d/`这个目录下的，一般格式为

```bash
Types: deb
URIs: https://mirrors.ustc.edu.cn/ubuntu/
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```
