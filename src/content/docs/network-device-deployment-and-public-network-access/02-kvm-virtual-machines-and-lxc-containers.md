---
title: 'KVM虚拟机与LXC容器'
---

KVM 虚拟机，可以简单的理解为运行在 PVE 上面的 VMware 虚拟机，而 LXC 容器可以理解为一个和宿主机使用相同内核的虚拟机。

## KVM 虚拟机安装 FnOS

在所有的 AIO (All in One) 方案当中，NAS 都是必不可少的一项，但是在虚拟机中安装，可以选择的系统有很多，像飞牛的 FnOS，或者很多人非常喜欢的群晖系统镜像所做的的黑群晖。但是在很多场景下，飞牛的系统已经非常完善，也没有必要去使用一个不稳定且官方不认可的系统，况且飞牛的相册和OPPO已经达成合作，可以在OPPO的相册中直接进行照片备份，相较于一直在后台挂着飞牛APP，或者在家里偶尔打开APP来说，相册中直接的备份是最好的方案了。

打开 **[FnOS官网下载页面](https://fnnas.com/download)**，下载 ISO 系统磁盘镜像，新建一个4G运行内存的虚拟机，开机后正常安装即可

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/02-kvm-virtual-machines-and-lxc-containers/02-kvm-virtual-machines-and-lxc-containers.webp)


### 挂载硬盘

查找磁盘

```bash
ls -l /dev/disk/by-id/
```

挂载硬盘

```bash
qm set 200 -scsi2 /dev/disk/by-id/ata-ST3160815AS_6RA37M17
```

## LXC 容器作为开发机

我觉得这个算是一个在资源配置有限的情况下的一个最优解，我之前的旧笔记本内存只有8G，运行多台可以作为开发环境的机器设备，资源配置是远远不够的，所以在这个基础上，我看上了差不多使用状况，但是资源占用相比 KVM 小很大一截的 LXC 容器。


### 下载 CT 模板

根据下图的提示，依次点击

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/02-kvm-virtual-machines-and-lxc-containers/02-kvm-virtual-machines-and-lxc-containers-1.webp)

选择一个适合作为开发机的模板即可，一般开发使用 `Debian Stable` 即可，如果有红帽的开发需求，也可以选择 `Rocky Linux` 。

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/02-kvm-virtual-machines-and-lxc-containers/02-kvm-virtual-machines-and-lxc-containers-2.webp)


### 创建 LXC 容器

按照图片点击左上角的 `Create CT`，创建新的 LXC 容器

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/02-kvm-virtual-machines-and-lxc-containers/02-kvm-virtual-machines-and-lxc-containers-3.webp)

资源池如果不需要分配给用户可以选择不选择

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/02-kvm-virtual-machines-and-lxc-containers/02-kvm-virtual-machines-and-lxc-containers-4.webp)

在这个地方便可以选择 LXC 容器的系统

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/02-kvm-virtual-machines-and-lxc-containers/02-kvm-virtual-machines-and-lxc-containers-5.webp)

后面的一次根据自己的需要进行选择并创建这个 LXC 容器。

**注：下图选择内存的地方一定要选择 swap，而不要将其设置为 `0`**

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/02-kvm-virtual-machines-and-lxc-containers/02-kvm-virtual-machines-and-lxc-containers-6.webp)


### 配置 LXC 容器 TUN

为什么会讲到这个东西，其实原因很简单，就是在做项目开发的时候需要使用 `Git` 进行推送，但是我家的网络配置也确实没有办法像 **[云泽](https://zeyun.org/use_wireguard_home_to_home.html)** 那样部署一个独立 VLAN 去使用，所以我选择在开发机上安装 **[clashctl](https://github.com/nelvko/clash-for-linux-install)** 但是 LXC 容器想要使用 TUN 还是需要一些手段的

```text
pct set [编号] -features nesting=1
pct set [编号] -dev0 /dev/net/tun
pct restart [编号]
```

按照这个格式在 PVE 节点的 shell 里执行一遍，TUN 模式就能够成功开启
