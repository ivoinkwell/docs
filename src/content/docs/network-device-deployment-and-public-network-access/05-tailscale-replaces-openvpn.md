---
title: 'Tailscale 平替 OpenVPN'
---

OpenVPN 这个工具不仅流量包特征明显，还有一个最不好满足的条件，就是拥有一个公网 IPv4 ，虽然说现在 IPv6 的普及程度已经非常的高了，但是像企业这样的地方依旧是不会给每一个设备开放 IPv6 地址，这就导致使用公网 IPv6 的 OpenVPN 无法进行连接，为了最佳的兼容性还是只能选择 IPv4。

## 情况假设

现在我如果既没有一个公网 IPv4，我也不想要每一个需要访问的设备都进行组网，但是同时又可以像 OpenVPN 一样连接上之后访问家里内网的整个网段，这个时候有一个词在我和 AI 的讨论中出现 —— 子网路由，最终我找到了这个软件 —— Tailscale。

## Tailscale 的部署与安装

在 Tailscale 的官方下载网站上有一个可以一键安装的bash脚本，所以我们可以直接进行安装，但是安装之前有一个小小的注意事项：

> - **一定要使用 KVM 虚拟机进行安装**

Tailscale 想要正常启动以及做子网路由，需要一个完整的网络环境，所以 LXC 的精简部分正好就没有办法很好的胜任这个工作。

创建一个全新的 KVM 虚拟机之后，更换适合国内的软件源，之后安装 `curl` 软件包，去官网输入bash 命令

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

安装完成之后，根据提示启动并且登录即可在后台看到设备

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/05-tailscale-replaces-openvpn/05-tailscale-replaces-openvpn.webp)

## Tailscale 设置子网路由

想要达到 OpenVPN 的效果，子网路由是一个很好的方案，但是需要在安装 Tailscale 的机器上开启 IPv4 的一个转发服务

```bash
echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.conf
sysctl -p
```

开启子网路由与选择网段，`192.168.1.0/24`这个是我家的内网网段，替换成自己的即可

```bash
tailscale up --advertise-routes=192.168.1.0/24
```

最后在网页端开启转发

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/05-tailscale-replaces-openvpn/05-tailscale-replaces-openvpn-1.webp)

保存之后即可在手机端尝试使用 Tailscale 连接内网NAS

首先加入同一个账号

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/05-tailscale-replaces-openvpn/05-tailscale-replaces-openvpn-2.webp)

打开 VPN 连接即可看到所有加入的设备

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/05-tailscale-replaces-openvpn/05-tailscale-replaces-openvpn-3.webp)

尝试连接 NAS 设备

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/05-tailscale-replaces-openvpn/05-tailscale-replaces-openvpn-4.webp)

成功连接即可。
