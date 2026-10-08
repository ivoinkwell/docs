---
title: '安装部署PVE虚拟化平台'
---

**Proxmox Virtual Environment (PVE)** 是一款基于 **Debian** 开发的开源虚拟化平台，集成了 **KVM** 和 **LXC** 两种虚拟化技术，支持虚拟机和容器的运行。PVE 提供了计算、网络和存储的一体化解决方案，适用于个人用户、中小企业以及生产环境中的服务器集群部署。在家庭网络环境下搭建一定是用不全其众多功能的。


## 安装

1. 前往 **[PVE官网](https://pve.proxmox.com/wiki/Downloads)** 下载适合自己设备的版本即可。
2. 制作 PE 启动盘后进入、磁盘镜像之前，尽量将启动模式改为 **UEFI** ，我第一次启动的时候使用的是 Leagecy ，但是没能成功进入，将启动模式换成 UEFI 之后成功进入系统的安装界面
3. 安装时会出现邮箱的填写，随便填写即可，所需填写的密码属于 **root** 账户，也是唯一的超级管理员账户，密码需要牢记

## 系统配置

基于 **Debian** 的 Linux 虚拟化平台，首要的事情就是换源，PVE 中一共有四个源，分别是：

- **`Debian 仓库源`**
- **`PVE 源`**
- **`Ceph 源`**
- **`CT 模板源`**

以下更换的所有国内源都是 **中国科学技术大学(USTC)** 的官方网站中的命令


### 更换 `Debian 仓库源`

我们可以检测一下自己的 PVE 主机的软件源格式

```bash
# sources.list格式 - 查看是否存在 sources.list 文件
cd /etc/apt
ls -list
```

```bash
# DEB822格式 - 查看 sources.list.d 文件夹内是否存在 *.source文件
cd /etc/apt/sources.list.d
ls -list
```

以我安装的过程上看，自从 PVE  9.0 之后所有的版本，软件源都是使用 DEB822 格式，所以使用官网中提供的 DEB822 格式换源命令

```bash
sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources
```


### 更换 `PVE 源`

同样使用 DEB822 格式的换源命令，这里只放上 9.0 的更换命令，其他的可自行去 **[中科大PVE软件源]([Proxmox - USTC Mirror Help](https://mirrors.ustc.edu.cn/help/proxmox.html)** 中查看

```bash
cat > /etc/apt/sources.list.d/pve-no-subscription.sources <<EOF
Types: deb
URIs: https://mirrors.ustc.edu.cn/proxmox/debian/pve
Suites: trixie
Components: pve-no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
EOF
```


### 更换 `Ceph 仓库源`

PVE 8 之后默认安装 Ceph 仓库源文件

```bash
if [ -f /etc/apt/sources.list.d/ceph.sources ]; then
  CEPH_CODENAME=`ceph -v | grep ceph | awk '{print $(NF-1)}'`
  source /etc/os-release
  cat > /etc/apt/sources.list.d/ceph.sources <<EOF
Types: deb
URIs: https://mirrors.ustc.edu.cn/proxmox/debian/ceph-$CEPH_CODENAME
Suites: $VERSION_CODENAME
Components: no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
EOF
fi
```


### 更换 `CT 模板源`

直接使用官网文档中的命令即可

```bash
sed -i.bak 's|http://download.proxmox.com|https://mirrors.ustc.edu.cn/proxmox|g' /usr/share/perl5/PVE/APLInfo.pm
```

## 用户权限配置

虚拟化平台，是一个大家都在使用的平台，虚拟机与权限的分配就显得格外的重要，尤其是在多人使用的场景下，相比 ESXi 这个平台，PVE 的各项功能的实现与方法可能会更复杂一些


### 创建用户

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/01-install-and-deploy-the-pve-virtualization-platform.webp)

这里我已经创建了两个用户，分别是 `Ivo` 和 `flashmailbox`。

创建用户的时候，验证方式要如图所选，在登陆界面也要选择相同的认证方式

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/01-install-and-deploy-the-pve-virtualization-platform-1.webp)


### 用户资源池创建

如图所示创建用户的资源池，资源池名字随意，使用用户名字可维护性应该会更高

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/01-install-and-deploy-the-pve-virtualization-platform-2.webp)

此时左侧会出现这样的两个标签，这两个标签就是新建的资源池

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/01-install-and-deploy-the-pve-virtualization-platform-3.webp)


### 资源池赋权

根据提示依次点击

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/01-install-and-deploy-the-pve-virtualization-platform-4.webp)

在点击 `Add` 之后会出现这样的选择

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/01-install-and-deploy-the-pve-virtualization-platform-5.webp)

这里的两种权限，一个是针对用户组，一个是针对单个用户，我们日常使用情况下不可能有两个人需要使用的虚拟机以及权限完全相同的情况，所以直接选择 `User Permission` 即可

选择好用户名字之后，根据截图选择相对应的权限

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/01-install-and-deploy-the-pve-virtualization-platform-6.webp)


### 添加虚拟机进入资源池

如图所示，添加虚拟机

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/01-install-and-deploy-the-pve-virtualization-platform-7.webp)

添加完成后记住已经添加的虚拟机，退出 `root` 账号，登录用户账户，Realm选择参考截图

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/01-install-and-deploy-the-pve-virtualization-platform-8.webp)

查看拥有的虚拟机

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/01-install-and-deploy-the-pve-virtualization-platform/01-install-and-deploy-the-pve-virtualization-platform-9.webp)

另一个用户也是相同的道理……
