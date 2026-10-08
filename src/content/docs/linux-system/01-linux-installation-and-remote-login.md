---
title: 'Linux 安装与远程登录'
---

## Linux 系统类型

**Linux 系统主要分两大主线和若干独立发行版：**

- **Debian**：开源组织，包管理器为`apt`，本地包安装器为`dpkg`，默认使用`systemd`
- **Red Hat**：企业常用，包管理器为`yum`逐步转向`dnf`，本地包安装器为`rpm`，默认推广和使用`systemd`
- **Arch/Gentoo/NixOS/Alpine**：作为个人桌面系统较多，包管理器分别是`pacman`、`portage`、`nix`，除Alpine以外，默认使用`systemd`

## Ubuntu Server 24.04.3 LTS 安装

在安装配置方面，Debian的配置没有Ubuntu方便，现在也有很多的操作系统，例如飞牛FnOS等系统选择使用Debian作为自己衍生发行的基础，所以选择Ubuntu Server这个服务器系统作为演示系统。Ubuntu Server在出现问题时有更庞大的社区作为支撑，能够更快的解决问题，软件包也相对来说更新，兼容性也会提高。

现在主要的安装方式分为两种，虚拟机和实体机都是可行的。虚拟机建议选择VMware Workstation，和我这里使用的ESXi是相同的平台，成本会更低一点。

### 创建虚拟机

创建虚拟机的时候可以参考我的配置，如果宿主机的配置比较高也可以再多给一些配置：

- **Memory(内存)**: 2GB / 推荐4GB
- **Hard Disk(磁盘)**: 8GB
- **CPU**：1核


### 引导与启动

在虚拟机菜单中点击开机按键开启虚拟机，开机后进入`GRUB`界面，出现三个选项：

- **Try or Install Ubuntu Server**：尝试和安装Ubuntu Server
- **Ubuntu Server with the HWE kernel**：用HWE内核启动Ubuntu Server
- **Test Memory**：测试内存

**虚拟机正常选择`Try or Install Ubuntu Server`即可**

:::details

在Linux内核当中常见的现在有三种类型：

- **HWE**：支持新硬件内核
- **GA**：一般默认内核就是，稳定
- **Zen**：这个内核多见于Arch等操作系统上面，主要优化桌面操作体验

:::


### 安装配置

#### 语言

语言在选择上`English`最好，在目录和报错方面都会更标准，更容易检查错误


#### 安装类型

一共有两种类型可以进行选择：

- **Ubuntu Server**：基础安装
- **Ubuntu Server (minimized)**: 最小化安装

还会有一个选项`Search for third-party drivers`这个是用于安装第三方驱动，虚拟机忽略即可


#### 网络配置

网络的连接方式一共是两种：

- **DHCP**：动态IP，机器自动获取IP地址
- **Static**：静态IP，需要手动分配，尽量避免分配`DHCP`池里的地址

选择方面，如果你是**本地VMware软件安装机器选择DHCP即可**，如果和我一样是**物理机或者PVE等虚拟化平台安装选择静态并且手动配置IP**

静态IP配置：

- **Subnet**：网段，假设家里网络是`192.168.1.xxx`填写`192.168.1.0/24`，其中`24`是子网掩码长度（前缀长度），对应子网掩码`255.255.255.0`
- **Address**：本机IP地址，填写一个不在`DHCP`地址池中的IP地址即可
- **Gateway**：网关，就是和光猫连接的路由的IP地址，一般为`192.168.1.1`
- **Name Servers**：DNS服务器，用于将域名解析成IP地址，一般使用阿里的`223.5.5.5`

IPv6：

现在很多家庭会有这样的一个地址，相较于IPv4，IPv6可以做到一台设备一个地址，但是由于目前支持较弱，很多的公共网络甚至没有办法使用IPv6进行连接。虚拟机软件使用的是独立网络，所以选择禁用IPv6，选择IPv4连接。


#### 代理设置

现在有镜像站进行安装，代理一般是不需要的，跳过即可


#### 更换软件源

华东地区可以试试 **中国科学技术大学(USTC)** 的，速度和稳定性都还可以

```
https://mirrors.ustc.edu.cn/ubuntu/
```


#### 磁盘分区

两种分区方式：

- **Use an entire disk**：使用整块磁盘
- **Custom Storage layout**：手动分区

:::details
- **LVM**：动态存储池划分，可以灵活调整大小

- **LUKS**：磁盘加密，数据隐私保护

:::

虚拟机选择使用整块硬盘，可以取消LVM逻辑卷的选择


#### 用户名密码

正常创建即可


#### Ubuntu Pro

这是一个Ubuntu的服务订阅计划，如果说后期需要长期服务，个人注册账号绑定机器就可以享受了，这里暂时跳过就行


#### SSH 服务

会让你选择OpenSSH服务，建议安装，如果不安装，后期也可以安装


#### Featured server snap

快速安装容器，环境。虚拟机可以不装跳过

**接下来等待安装完成……**

## SSH 远程登录

SSH是一个非常常见的远程登录方式，要说最方便的，我觉得还是剪切和粘贴了，虽然安装VMware Tools也可以解决这个问题

### 推荐客户端软件

尽管有`Xshell`这些工具，但是我还是推荐使用`MobaXterm`，他的SFTP是一个非常好用的文件管理工具

### 连接使用方法

1. 打开软件，单击左上角有`Session`
2. 单击SSH，在`Remote Host`输入虚拟机或者物理机的IP
3. 单击OK，输入账号以及密码登录

### 常见问题

**root用户无法使用SSH登录：**

编辑配置文件`/etc/ssh/sshd_config`

编辑这一行为以下内容：

```bash
PermitRootLogin yes
```

:::danger
生产环境建议禁用root直接登录，使用普通用户 + `sudo`的方式操作，同时优先使用密钥认证替代密码认证。
:::

输入`systemctl restart sshd`，重启ssh服务，再尝试连接
