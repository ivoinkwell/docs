---
title: 'frp - 一个无需公网IP的内网穿透方式'
---

如果说我现在想要将内网 `102.168.1.253:5666` 的飞牛 NAS 放到公网去访问，按照之前需要一个公网 IP 去绑定一个域名，这样就可以使用域名对默认的标准端口进行直接访问，但是如果一个服务直接买一个 IP 的所有端口一定不划算，所以在 `frp` 协议出来之后，很多的内网穿透服务提供商也就出现了，他们购买一个稳定 IP 之后会自己开放端口给内网穿透进行购买，一个端口一个月也就10块钱左右，价格根据流量的多少决定。

下面是 `frp` 协议的原理示意图：

![](https://pic.ivoinkwell.xyz/file/docs/network-device-deployment-and-public-network-access/04-frp-a-method-for-intranet-penetration-that-does-not-require-a-public-ip/04-frp-a-method-for-intranet-penetration-that-does-not-require-a-public-ip.webp)

## `frpc` 配置

一般放家庭内网的多数都是 PVE 当中的虚拟机，资源不需要很大，正常 LXC 容器的兼容性足以应
对，所以我选择的是 Debian 12 为基础的这样一个 LXC 容器。

### 安装

首先是要下载基础的文件

```bash
wget -O frp.tar.gz https://github.com/fatedier/frp/releases/download/v0.70.1/frp_0.70.1_linux_amd64.tar.gz
```

这个是目前最新的版本，链接可以去 [latest](https://github.com/fatedier/frp/releases/latest) 上面复制最新的版本链接

下载后进行解压

```bash
tar -zxvf frp.tar.gz
```

移动到统一的系统程序目录

```bash
# 进入frp目录
cd frp*

# 创建程序目录
mkdir -p /etc/frp

# 复制进目录
cp frpc /etc/frp/
```

创建 `systemd` 后台服务

```bash
nano /etc/systemd/system/frpc.service
```

复制进去

```bash
[Unit]
Description=Frp Client Service
After=network.target

[Service]
Type=simple
ExecStart=/etc/frp/frpc -c /etc/frp/frpc.toml
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

重载系统服务

```bash
systemctl daemon-reload
```

### 购买 frp 服务

我这里推荐购买 frp 服务，相比云服务器或者 VPS 会更划算，类似于 Passnet 这样的平台，购买后，创建对应的隧道，即可获取相对应的配置文件。

编辑配置文件

```bash
nano /etc/frp/frpc.toml
```

将获取的配置文件复制进去即可

## 启动服务

输入以下命令启动服务，并且去相对应的后台查看是否有客户端连接

```bash
systemctl start frpc.service
```

确认没问题后开启开机自启动

```bash
systemctl enable frpc.service
```
