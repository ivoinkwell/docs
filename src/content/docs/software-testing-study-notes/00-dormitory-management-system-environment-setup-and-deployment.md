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