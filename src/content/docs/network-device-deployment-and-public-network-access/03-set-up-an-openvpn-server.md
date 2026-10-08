---
title: '搭建 OpenVPN 服务器'
---

我的搭建方案是基于已经拥有一个 IPv4 地址的家庭网络环境下，实现方案是 `IPv4 + DDNS` 的方式，如果家庭中没有，可以尝试使用 `IPv6 + DDNS` 的方式进行部署，但是这个方案的资源占用就会有所升高了……

## 安装基础 Linux 系统

这里也会涉及到一个选择的问题，很多学这方面的人他们会从 `CentOS 7` 这个系统去讲，但是这样比较老旧的系统一般很难使用脚本的方式，更考验配置的能力

**部署上面 [Pigteacher的飞书文档](https://t0urjzduqym.feishu.cn/docx/IG75dN7esooDzIxrJnucCXPCnTe) 写的比我更好**

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/03-set-up-an-openvpn-server/03-set-up-an-openvpn-server.webp)

所以我这里安装的就是基础的 Debian 13 系统，相较于传统的安装方式，我会推荐一种更快速的安装方式 —— **[openvpn-install 脚本](https://github.com/angristan/openvpn-install)**

## 使用并解决脚本部分问题

**使用声明：文中使用的脚本是 2025.12.27 日下载的，截止 2026.07.23 脚本更新位于3个月前，可能相较旧版有不同程度的修复，如遇到相同问题，文中步骤可以参考**

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/03-set-up-an-openvpn-server/03-set-up-an-openvpn-server-1.webp)

首先条件是我们安装的系统要满足这样的条件

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/03-set-up-an-openvpn-server/03-set-up-an-openvpn-server-2.webp)

**实现方案为`IPv4 + DDNS`，脚本中填写的端口需要主路由做转发，`DDNS` 可以选择在飞牛上实现，也可以尝试自家主路由固件是否支持**

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/03-set-up-an-openvpn-server/03-set-up-an-openvpn-server-3.webp)

脚本部署完成之后如果遇到以下问题，可以使用下面的方法进行解决，部署完成，测试没有问题之后建议不要轻易重启，除已经确定增加自启动服务。

**如果觉得开放SSH的22端口不安全完全可以根据自己的SSH配置更改开放端口或者选择直接禁用SSH，不修改防火墙策略**

```bash
# 启用服务自启动
systemctl enable openvpn-server@server.service

# 编辑配置文件
nano /etc/systemd/system/openvpn-iptables.service
# 添加语句
ExecStart=$iptables_path -w 5 -I INPUT -p tcp --dport 22 -j ACCEPT
```

## 尝试外网连接

使用外网可以正常拨号进入家庭内网即可。

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/03-set-up-an-openvpn-server/03-set-up-an-openvpn-server-4.webp)

## 修改配置文件

这个是我的配置文件，需要的可以参照修改，根据自己家里实际网络情况进行即可

```bash
# /etc/openvpn/server/server.conf

# push "dhcp-option DNS 223.5.5.5"
# push "dhcp-option DNS 223.6.6.6"
# push "block-outside-dns"
keepalive 10 120
user nobody
group nogroup
persist-key
persist-tun
verb 3
crl-verify crl.pem
explicit-exit-notify

# 用户认证
plugin /usr/lib/openvpn/openvpn-plugin-auth-pam.so login
username-as-common-name
# 强制验证客户端证书
verify-client-cert require
remote-cert-tls client
```
