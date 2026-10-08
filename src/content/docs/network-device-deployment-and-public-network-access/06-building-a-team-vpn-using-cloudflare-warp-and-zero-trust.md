---
title: '使用 Cloudflare Warp 与 Zero Trust 搭建团队 VPN'
---

对于团队来说，方便人员管理是最重要的，尽管 Tailscale `P2P` 打洞的性能一定比走 Cloudflare 边缘节点速度更快，连接也会更稳定，但是用户数量与管理上面 Tailscale 不如 Warp 的人数多，与云端配置文件好用，所以我选择使用 Warp 作为多人使用的访问方案。

## 部署Cloudflared连接器与添加CIDR路由

和 Tailscale 的子网路由一样，首先需要去部署连接器，但是相较于 Tailscale 的资源占用，Cloudflared 的资源占用更小，也可以使用相对更轻便的 LXC 容器进行部署。

```bash
# Add cloudflare gpg key
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-public-v2.gpg | sudo tee /usr/share/keyrings/cloudflare-public-v2.gpg >/dev/null

# Add this repo to your apt repositories
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-public-v2.gpg] https://pkg.cloudflare.com/cloudflared any main' | sudo tee /etc/apt/sources.list.d/cloudflared.list

# install cloudflared
sudo apt-get update && sudo apt-get install cloudflared
```

最后在官网上会显示出这样的一个连接命令，粘贴进去即可

```bash
sudo cloudflared service install [你的token]
```

连接后即可看到 CIDR 路由菜单的选项

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust.webp)

随后选择新建一个 CIDR 路由

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust-1.webp)

填写需要转发的内网网段即可

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust-2.webp)

## 编辑 Cloudflare One VPN 配置文件

按照图片路径打开选项卡

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust-3.webp)

选择编辑默认配置文件

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust-4.webp)

着重修改分流，一定要包括你所输入的网段

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust-5.webp)

选择 Manage 进行编辑

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust-6.webp)

加入内网网段即可

## 安装与连接 VPN 客户端

打开 1.1.1.1 网页，下载对应系统客户端

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust-7.webp)

下载客户端之后使用 Cloudflare One 登录，登录之后选择连接后即可尝试内网访问

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust/06-building-a-team-vpn-using-cloudflare-warp-and-zero-trust-8.webp)