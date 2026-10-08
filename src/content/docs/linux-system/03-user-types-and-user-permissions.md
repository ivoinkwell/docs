---
title: '用户类型和用户权限'
---

我们拆解以下安装一个软件的命令，假设安装的软件叫作`vim`：

```bash
sudo apt install vim
```

里面`apt`是包管理器的名字，`install`是需要包管理器需要执行的操作，后面的`vim`是包名，如果去掉`sudo`，输入这个：

```bash
apt install vim
```

输入尝试一下，则返回：

```bash
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?
```

也就是提示我们权限不足
## `sudo`的用处

`sudo`是用于普通用户提权的操作，类似于Windows中使用管理员权限打开一个软件的时候弹出的UAC弹窗，只是一个进程临时获得了管理员权限

## 用户类型

`sudo`的用处是将普通用户的权限临时提升到和管理员一样，因此用户之间确实有类型之分。在Windows系统中，有`Administrator`用户，相当于Linux的`root`用户。但在Ubuntu Server这样的生产环境系统当中，默认禁用root用户登录，使用`sudo`来执行管理任务，保证安全性

## `sudo`与`sudoers`

现在我们新建一个用户，用户名是`test`，密码设置为`test@123`

```bash
# 新建用户
sudo useradd test

# 设置密码
sudo passwd test
```

现在关闭SSH登录界面，重新打开，并且登录`test`用户 ，执行更新命令

```bash
sudo apt update && sudo apt upgrade -y
```

执行之后不是开始自动更新，而是返回

```bash
[sudo] password for test:
test is not in the sudoers file.
```

简单翻译一下，意思就是`test`不在`sudoers`文件内


### `sudoers`配置文件

切回自己安装时候创建的用户，我们可以使用`cat`去看一下位于`/etc/`目录下的`sudoers`文件

```bash
sudo cat /etc/sudoers
```

出现了以下内容：

```bash
#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults        env_reset
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"

# This fixes CVE-2005-4890 and possibly breaks some versions of kdesu
# (#1011624, https://bugs.kde.org/show_bug.cgi?id=452532)
Defaults        use_pty

# This preserves proxy settings from user environments of root
# equivalent users (group sudo)
#Defaults:%sudo env_keep += "http_proxy https_proxy ftp_proxy all_proxy no_proxy"

# This allows running arbitrary commands, but so does ALL, and it means
# different sudoers have their choice of editor respected.
#Defaults:%sudo env_keep += "EDITOR"

# Completely harmless preservation of a user preference.
#Defaults:%sudo env_keep += "GREP_COLOR"

# While you shouldn't normally run git as root, you need to with etckeeper
#Defaults:%sudo env_keep += "GIT_AUTHOR_* GIT_COMMITTER_*"

# Per-user preferences; root won't have sensible values for them.
#Defaults:%sudo env_keep += "EMAIL DEBEMAIL DEBFULLNAME"

# "sudo scp" or "sudo rsync" should be able to use your SSH agent.
#Defaults:%sudo env_keep += "SSH_AGENT_PID SSH_AUTH_SOCK"

# Ditto for GPG agent
#Defaults:%sudo env_keep += "GPG_AGENT_INFO"

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification
root    ALL=(ALL:ALL) ALL

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# See sudoers(5) for more information on "@include" directives:

@includedir /etc/sudoers.d
```

可以着重看这样的两行：

```bash
# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL
```

`Allow members of group sudo to execute any command`这句话的意思也就是只有加入名为`sudo`的用户组才可以使用sudo获取管理员权限，所以我们需要将我们刚刚创建的用户添加到这个名为`sudo`的用户组去

```bash
sudo usermod -aG sudo test
```

这个时候我们再次切换回`test`用户登录，再次尝试一下更新

```bash
sudo apt update && sudo apt upgrade -y
```

**现在已经可以正常更新了**


### `sudo`的安全使用

一般服务中是将一个服务分配给一个用户，所以我们需要在`sudoers`文件中去新建规则，这就是经常说的**最小权限原则**。比如我这个`test`用户是专门用户控制系统的，那我需要给这个用户配置只允许重启和关机的权限，只需要在文件内添加以下语句：

```bash
test ALL=(ALL) /sbin/reboot, /sbin/shutdown
```

文件操作还涉及，后面会在一个安全章节讲述一些安全相关的配置方法

## 用户权限与更改

之前解决程序运行时用户权限不够的解决方案——`sudo`工具提权，但如果一个文件是服务器内用户公用，一般放在`/usr/local/bin/`目录下，现在模拟一下，我们前往这个目录并且创建一个`test.txt`文件

```bash
# 进入目录
cd /usr/local/bin/

# 创建文件
sudo touch test.txt
```

创建完成后，我们尝试写入，直接粘贴这个命令尝试运行，只看是否可以运行成功

```bash
echo "Hello World!" >> /usr/local/bin/test.txt
```

运行后发现

```bash
-bash: /usr/local/bin/test.txt: Permission denied
```

没有权限，或许能想到在前面加上一个`sudo`就能够完美解决，但是如果用户账户管理十分严格，但是这个文件又恰好要做所有用户都可以写入，那么就需要去改变这个文件的权限，现在就需要用到一个工具 **`chmod`**

### `chmod`

#### 格式

```bash
chmod 777 file
```


#### 数字

里面数字是最不好理解的，但是可以参考这张表格去尝试理解

**三个值代表的东西**

| 权限数值  | 权限名称             | 对应字母 | 实际含义           |
| :-----: | :----------------: | :----: | :--------------: |
| **4** | **读取 (Read)**    | `r`  | 可以查看内容（看）      |
| **2** | **写入 (Write)**   | `w`  | 可以修改或删除内容（改）   |
| **1** | **执行 (Execute)** | `x`  | 可以运行程序或进入目录（跑） |
| **0** | **无权限**          | `-`  | 没有任何操作权利       |

**每一个数值的来源**

|最终数字|计算逻辑|字母形式|权限说明|
|:---:|:---:|:---:|:---:|
|**7**|4 + 2 + 1|`rwx`|**全开**：读 + 写 + 执行|
|**6**|4 + 2 + 0|`rw-`|**读写**：能看能改，不能运行|
|**5**|4 + 0 + 1|`r-x`|**读执行**：能看能运行，不能改|
|**4**|4 + 0 + 0|`r--`|**只读**：只能看|
|**3**|0 + 2 + 1|`-wx`|**写执行**：极少见|
|**2**|0 + 2 + 0|`-w-`|**只写**：极少见|
|**1**|0 + 0 + 1|`--x`|**只执行**：只能运行|
|**0**|0 + 0 + 0|`---`|**全关**：没有任何权限|
#### 使用

回到刚刚的文件，我们一样可以使用`chmod`去更改文件的权限

```bash
sudo chmod 777 /usr/local/bin/test.txt
```

再次尝试写入

```bash
echo "Hello World!" >> /usr/local/bin/test.txt
```

这次没有再报错，看看是否成功写入

```bash
cat /usr/local/bin/test.txt
```

成功输出以下内容

```text
Hello World!
```
