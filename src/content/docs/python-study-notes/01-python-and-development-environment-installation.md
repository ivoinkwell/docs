---
title: Python及开发环境安装
---

Python 的开发环境由运行环境和编辑器或者 IDE 组成，所以首先需要安装 Python 的运行环境。

## 安装前准备

**Python：**

> - **网盘下载：** [01-Python及开发环境安装 | Inkwell Drive](https://drive.ivoinkwell.xyz/ImgBed%20%E7%BD%91%E7%9B%98/%E6%96%87%E6%A1%A3%E7%AB%99%E8%B5%84%E6%BA%90/Python%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/01-Python%E5%8F%8A%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E5%AE%89%E8%A3%85)
> - **官网下载：** [Python Releases for Windows | Python.org](https://www.python.org/downloads/windows/)

**PyCharm：**

> - **官网下载 ：** [Download PyCharm: The Python IDE for data science and web development by JetBrains](https://www.jetbrains.com/pycharm/download/?section=windows)

## 运行环境安装

Python版本分为 `bugfix` 和 `security` 两种维护方式，正常选择最新的 `bugfix` 版本或者 `release` 版本即可。截止 **2026.09.04** 网盘中两个 Python 安装包是最新的 `bugfix` 和 `security`。

双击运行，打开安装程序，按照图片示例勾选添加到环境变量

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/01-python-and-development-environment-installation/01-python-and-development-environment-installation.webp)

默认安装 Python 路径为 `C:\Users\[username]\AppData\Local\Programs\Python` ，如果想要自定义安装到其他位置可以所选择下面的安装方式

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/01-python-and-development-environment-installation/01-python-and-development-environment-installation-1.webp)

自定义安装会让选择安装时需要的 Python 组件，默认即可，如果需要最小化安装可以只勾选包管理器 `pip` ，后期需要的时候可以使用 `pip` 进行安装即可

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/01-python-and-development-environment-installation/01-python-and-development-environment-installation-2.webp)

接下来便可以去进行自定义安装路径

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/01-python-and-development-environment-installation/01-python-and-development-environment-installation-3.webp)

点击 `Install` 之后即可开始安装

## Editor & IDE 安装

每个人都自己的开发习惯，但是相较于 IDE ，Editor 的入门门槛会比较高，所以类似于 PyCharm 这样的 IDE 会更容易上手去专注于完成代码的编写工作。Editor 中比较出名的就是 VSCode，这里也会提到，我的工作流就是 `VSCode + Debian - WSL `。

### IDE

正常情况下，都是使用 PyCharm，之前 PyCharm 分为 `Profession` - 专业版 和 `Community` - 社区版。在 2025 年左右，社区版和专业版整合成为一个安装包，当你登录你的 JetBrains 账号之后，如果进行购买则有专业版授权，否则就都是免费使用的社区版。

安装过程中没用什么值得说的，如果默认安装 C 盘就全部默认即可，需要的可以更换到其他盘，如果是分区的用户建议安装到 D 盘， PyCharm 是使用 Java 写的，所以性能差的同时资源占用很大，正常安装完成磁盘占用在 1G 左右，随着项目索引会逐步增加，要留至少 2G 的冗余磁盘空间左右。

PyCharm会要求添加 Defender 的排除项，如果不添加会让 IDE 的性能进一步下降。

### Editor - VSCode

VSCode 很轻量，但是想要达到 PyCharm 相同的效果，相对来说配置会有很多。

首先在默认安装完成后需要安装插件

![](https://pic.ivoinkwell.xyz/file/docs/python-study-notes/01-python-and-development-environment-installation/01-python-and-development-environment-installation-4.webp)

除了插件，在新建项目的时候还要手动创建 `venv` 虚拟环境

```bash
# Linux
python3 -m venv .venv
source ./.venv/bin/activate

# Windows
python -m venv .venv
source .venv\Scripts\activate.bat
```