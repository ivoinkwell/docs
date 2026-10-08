---
title: '系统与服务'
---

日常使用操作系统，服务这个概念很少有人会去提起，但是在操作系统当中是一个非常重要的角色，不论是Windows还是Linux

## 自启动

这是一个在Linux里面非常典型的案例，现在我们可以尝试这样一个案例来证明service在自启动当中的用处——使用bash脚本对文件内容进行输入

## 脚本编写与测试

这里需要讲到一个bash脚本的基础语法`echo`，这个命令可以对文件内容进行改写，添加等操作，可以参考这个结构了解语法

```bash
echo "需要增加的内容" >> [文件路径以及名称]
```

**示例如下**

```bash
echo "Hello World！" >> $HOME/test.txt
```


### 脚本的编写

在我们的用户目录创建与编辑一个脚本

```bash
vim $HOME/test.sh
```

将刚刚的内容写下

```bash
echo "Autorun service is enabled" >> $HOME/test.txt
```

但是bash脚本有自己的标准写法，需要在开头加上`#!/bin/bash`，所以写成下面这个样子

```bash
#!/bin/bash
echo "Autorun service is enabled " >> /home/teach/test.txt
```

输出内容都可以随意填写


### 脚本运行测试

运行脚本，输入

```bash
bash $HOME/test.sh
```

查看结果

```bash
cat $HOME/test.txt
```

下方出现刚刚输入的字符串

## 服务文件

Windows的服务有自己的服务管理器，但是Linux不一样，这个服务文件存在于`/etc/systemd/system`文件夹下，以`.service`文件的形式存在，`.service`文件也有自己的编写规则

## 服务文件的编写

服务文件有自己的写法

```ini
# /etc/systemd/system/你的服务名.service

[Unit]
Description=服务描述
Documentation=文档地址
After=network.target          # 在什么之后启动
Wants=                        # 弱依赖，不影响启动
Requires=                     # 强依赖，失败则不启动

[Service]
Type=simple                   # simple | forking | oneshot | notify | exec
ExecStart=/path/to/你的脚本   # 启动命令
ExecStop=                     # 停止命令（可选）
ExecReload=                   # 重载命令（可选）
Restart=on-failure            # no | on-success | on-failure | on-abnormal | always
RestartSec=5                  # 重启间隔秒数
User=root                     # 运行用户
Group=root                    # 运行用户组
WorkingDirectory=/opt         # 工作目录
Environment=KEY=value         # 环境变量
EnvironmentFile=/etc/default/你的服务  # 环境变量文件

# 输出日志自动写入 journal
StandardOutput=journal
StandardError=journal

# 资源限制
MemoryMax=512M
CPUQuota=50%

[Install]
WantedBy=multi-user.target    # 多用户模式启动（Server 用这个）
# WantedBy=graphical.target   # 图形界面启动（桌面用这个）
```

我们只需要使用几个基础的就可以了，可以参考我的文件

```ini
[Unit]
Description=auto_start
After=multi-user.target

[Service]
Type=oneshot
ExecStart=/bin/bash /home/teach/test.sh

[Install]
WantedBy=multi-user.target
```


让服务文件生效需要开启自启动

```bash
sudo systemctl enable test
```

## 效果查看

现在重启查看效果

```bash
cat $HOME/test.txt
```

最后应该会多出一行输出你使用脚本输入的内容

## 服务的管理与排错

所有的服务不是每一个都可以这么顺利的运行的，所以我们需要学会查看状态，对服务进行手动的控制，这样也有助于错误的排除


### 服务状态查看

之前我们允许服务自启动的时候使用的命令结构不变，只需要记住状态的关键字`status`，也就需要将命令改成这样

```bash
sudo systemctl status test
```

这个时候Linux会像我们返回如下的内容

```bash
○ test.service - auto_start
     Loaded: loaded (/etc/systemd/system/test.service; enabled; preset: enabled)
     Active: inactive (dead) since Thu 2026-04-23 02:47:41 UTC; 56s ago
    Process: 680 ExecStart=/bin/bash /home/teach/test.sh (code=exited, status=0/SUCCESS)
   Main PID: 680 (code=exited, status=0/SUCCESS)
        CPU: 9ms

Apr 23 02:47:41 teach-server systemd[1]: Starting test.service - auto_start...
Apr 23 02:47:41 teach-server systemd[1]: test.service: Deactivated successfully.
Apr 23 02:47:41 teach-server systemd[1]: Finished test.service - auto_start.
```

根据这里的排版格式，`Loaded`，`Active`，`Process`以及`Main PID`等关键字非常明显

> - **`Loaded`**：启动服务文件位置，后面的`enabled`表示的是自启动状态
> - **`Active`**：启动状态，`inactive (dead)`则是这个服务目前的状态，后面跟随`since Thu 2026-04-23 02:47:41 UTC; 56s ago`是上次启动的时间，因为我这个是刚启动就直接查看状态，所以是`56s ago`
> - **`Process`**：进程信息，`680`是Process(进程) ID，简称PID，`ExecStart=/bin/bash /home/teach/test.sh`是执行程序的参数，`(code=exited, status=0/SUCCESS)`代表已经退出，`0/SUCCESS`是执行成功
> - **`Main PID`**：主要的进程ID进程号，`CPU`参数主要表示占用CPU的时长


### 服务的停止与启动

**服务开启**

```bash
sudo systemctl start 服务名称
```

**服务关闭**

```bash
sudo systemctl stop 服务名称
```

**重启服务**

```bash
sudo systemctl restart 服务名称
```

## 服务删除

删除服务流程一定是

```text
停止服务 -> 关闭服务自启 -> 删除service文件 -> 重载所有service文件
```


### 停止`test`服务

```bash
sudo systemctl stop test
```


### 关闭`test`服务自启动

```bash
sudo systemctl disable test
```


### 删除`.service`文件

```bash
# 进入存放service文件目录
cd /etc/systemd/system

# 删除自启动service文件
rm -f test.service
```


###  重载service文件

```bash
sudo systemctl daemon-reload
```
