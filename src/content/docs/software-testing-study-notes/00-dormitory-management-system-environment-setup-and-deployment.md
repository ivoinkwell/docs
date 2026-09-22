---
title: 宿舍管理系统环境搭建部署
---

这个算是一个从头开始的一个宿舍管理系统的部署搭建过程，整个过程使用 CentOS 7 作为部署的整个环境

## 所需素材

> - **[源码](https://dl.ivoinkwell.xyz/file/文档站资源/软件测试学习笔记/宿舍管理系统环境搭建部署/源码.7z)**
> - 完成安装 CentOS7 的 VMware Workstation 虚拟机


## 环境

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/00-dormitory-management-system-environment-setup-and-deployment/00-dormitory-management-system-environment-setup-and-deployment.webp)

根据图片上的显示，所需要的东西以及版本是这样的

> - Java - **8**
> - MySQL - **5.7**

而我给的源码只有 tomcat 以及导入数据库的 `.sql` 文件，所以我们需要自己在 CentOS 上面去安装

## 安装

### 更换阿里源

CentOS 7 的软件源官方早就404了，所以第一件事情是更换

首先，进入 `/etc/yum.repos.d/` 目录:

```bash
cd /etc/yum.repos.d/
```

下载阿里云的 CentOS 7 镜像源配置文件：

```bash
sudo wget -O CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

完成新配置文件的下载后，清理 yum 缓存，并生成新的缓存：

```css
sudo yum clean all
sudo yum makecache
```


最后，可以通过更新系统软件包来验证新的镜像源是否生效：

```sql
sudo yum update
```

在执行 `yum update` 时，你应该能够看到包下载速度的提升，并且下载地址应该是国内镜像源。

### 安装环境

安装 Java 1.8

```bash
yum install -y java-1.8.0-openjdk java-1.8.0-openjdk-devel
```

查看版本

```bash
java -version
```

安装 MySQL 源

```bash
# 下载
wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm

# 安装密钥
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# 安装 MySQL Server
yum install -y mysql-server
```

设置启动与自启

```bash
# 启动
systemctl start mysqld

# 自启动
systemctl enable mysqld

# 查看状态
systemctl status mysqld
```

### 环境配置

首先获取 MySQL 初始密码

```bash
grep 'temporary password' /var/log/mysqld.log
```

类似这样：

```text
A temporary password is generated for root@localhost: Abcd123456!
```

修改密码为 **`root`**，tomcat 里面配置可以自己扒，别问，问就是我自己扒出来的

```bash
# 登录 MySQL
mysql -uroot -p

# 降低 MySQL 策略
SET GLOBAL validate_password_policy=LOW;
SET GLOBAL validate_password_length=4;

# 修改密码为 root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
```

导入 `sql` 文件

```bash
mysql -uroot -p < /root/dormitory.sql
```

复制 tomcat至随意目录，我的是 `/root`

修改这个文件 `/root/tomcat/webapps/dormitory/WEB-INF/classes/db.properties`

第二句改成这个

```text
jdbc.url=jdbc:mysql://localhost:3306/dormitory?useUnicode=true&characterEncoding=utf-8&useSSL=false
```

本机访问虚拟机使用的不是本地回环地址，需要使用 `0.0.0.0` 监听，修改这个文件 `/root/tomcat/conf/server.xml`

```xml
<Connector port="8080" protocol="HTTP/1.1"
           address="0.0.0.0" # [!code ++]
           connectionTimeout="20000"
           redirectPort="8443" />
```

运行 `/bin/startup.sh`，访问 `8080` ，使用 `admin / admin` 进行登录

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/00-dormitory-management-system-environment-setup-and-deployment/00-dormitory-management-system-environment-setup-and-deployment-1.webp)

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/00-dormitory-management-system-environment-setup-and-deployment/00-dormitory-management-system-environment-setup-and-deployment-2.webp)

确保不报 `HTTP 500` 错误

### 设置自启动

```bash
vi /etc/systemd/system/tomcat.service
```

写入

```bash
[Unit]
Description=Tomcat
After=network.target

[Service]
Type=forking
ExecStart=/root/tomcat/bin/startup.sh
ExecStop=/root/tomcat/bin/shutdown.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

设置立即启动与自启动

```bash
# 启动
systemctl start tomcat.service

# 自启动
systemctl enable tomcat.service
```

确保重启可以登录即可

## 更改 VMware 虚拟机网卡，使局域网机器访问

在教学环节教师机与学生机是一个连接内网，所以学生机可以访问教师机，如果虚拟机部署在教师机器上，除了教师机本机，其他机器是无法访问虚拟机的，现在目前有这样的两种方案：

> - **虚拟机加入局域网：** 将网卡改为桥接模式并且分配未用到的 IP 地址
> - **端口转发：** 在 VMware 中设置将虚拟机的端口转发到教师机上

### 虚拟机加入局域网

首先是更改虚拟机的网络连接模式

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/00-dormitory-management-system-environment-setup-and-deployment/00-dormitory-management-system-environment-setup-and-deployment-3.webp)

更改完成之后需要给虚拟机分配一个固定 IP

查看网卡名

```bash
ifconfig
```

编辑网络配置文件

```bash
vim /etc/sysconfig/network-scripts/ifcfg-你的网卡名字
```

找到类似配置进行更改

```bash
BOOTPROTO="static" # 使用静态IP地址，默认为dhcp   
IPADDR="192.168.1.251" # 设置的静态IP地址
NETMASK="255.255.255.0" # 子网掩码 
GATEWAY="192.168.1.1" # 网关地址 
DNS1="223.5.5.5" # DNS服务器（此设置没有用到，所以我的里面没有添加）

ONBOOT=yes  #设置网卡启动方式为 开机启动 并且可以通过系统服务管理器 systemctl 控制网卡
```

重新导入网络配置

```bash
/etc/init.d/network reload
```

重启网卡服务

```bash
systemctl restart network.service
```

### 端口转发

首先还是要更改一个静态 IP ，确保 DHCP 不会因为租期到期而改变

查看网卡名

```bash
ifconfig
```

编辑网络配置文件

```bash
vim /etc/sysconfig/network-scripts/ifcfg-你的网卡名字
```

找到类似配置，按照自己 VMware 网卡设置进行更改

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/00-dormitory-management-system-environment-setup-and-deployment/00-dormitory-management-system-environment-setup-and-deployment-4.webp)

```bash
BOOTPROTO="static" # 使用静态IP地址，默认为dhcp   
IPADDR="192.168.24.251" # 设置的静态IP地址
NETMASK="255.255.255.0" # 子网掩码 
GATEWAY="192.168.23.2" # 网关地址 
DNS1="223.5.5.5" # DNS服务器（此设置没有用到，所以我的里面没有添加）

ONBOOT=yes  #设置网卡启动方式为 开机启动 并且可以通过系统服务管理器 systemctl 控制网卡
```

重新导入网络配置

```bash
/etc/init.d/network reload
```

重启网卡服务

```bash
systemctl restart network.service
```

开启端口转发

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/00-dormitory-management-system-environment-setup-and-deployment/00-dormitory-management-system-environment-setup-and-deployment-5.webp)

在打开界面操作

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/00-dormitory-management-system-environment-setup-and-deployment/00-dormitory-management-system-environment-setup-and-deployment-6.webp)

在接下来打开窗口操作

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/00-dormitory-management-system-environment-setup-and-deployment/00-dormitory-management-system-environment-setup-and-deployment-7.webp)

下面创建端口转发

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/00-dormitory-management-system-environment-setup-and-deployment/00-dormitory-management-system-environment-setup-and-deployment-8.webp)

填写完成保存即可完成，在同局域网访问即可