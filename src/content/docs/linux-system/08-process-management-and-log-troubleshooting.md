---
title: '进程管理与日志排查'
---

Windows上面有一个场景，很多人都与到过，那就是应用程序卡死，很多人的解决办法也是十分简单，`Ctrl + Shift + Esc`打开任务管理器，将这个进程杀死。但是在Linux操作系统上面查看与管理进程却不是一个任务管理器就可以解决的

## 进程的查看

不像Windows有自己的进程查看和管理器，Linux上面有很多这样的工具，甚至不同发行版自带的都有着细微的差别，所以分成三个方面去了解这三个方面常见的工具


### 快速静态查看

这个场景主要针对想现在看一眼目前的进程内容，资源占用是最低的，这个场景有一个非常常见的工具`ps`


### 简单尝试`ps`指令

先在终端尝试输入这个命令看一下效果

```bash
ps
```

系统做出了如下的回应

```bash
    PID TTY          TIME CMD
   8558 pts/0    00:00:00 bash
  14965 pts/0    00:00:00 ps
```

### `ps`指令的参数

这里能看到两个进程，但一个Linux操作系统不可能只有两个进程，这里显示的一定不全，通过AI的介绍，可以找到下面两个命令

> - `ps aux`
> - `ps -ef`

分别尝试一下


**`ps aux`**

输入这个命令

```bash
ps aux
```

系统给了这样的回复

```bash
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  2.7  21792 13020 ?        Ss   01:28   0:01 /sbin/init
root           2  0.0  0.0      0     0 ?        S    01:28   0:00 [kthreadd]
root           3  0.0  0.0      0     0 ?        S    01:28   0:00 [pool_workqueue_release]
root           4  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-rcu_g]
root           5  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-rcu_p]
root           6  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-slub_]
root           7  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-netns]
root           8  0.0  0.0      0     0 ?        I    01:28   0:06 [kworker/0:0-events]
root           9  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/0:0H-events_highpri]
root          12  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-mm_pe]
root          13  0.0  0.0      0     0 ?        I    01:28   0:00 [rcu_tasks_kthread]
root          14  0.0  0.0      0     0 ?        I    01:28   0:00 [rcu_tasks_rude_kthread]
root          15  0.0  0.0      0     0 ?        I    01:28   0:00 [rcu_tasks_trace_kthread]
root          16  0.0  0.0      0     0 ?        S    01:28   0:00 [ksoftirqd/0]
root          17  0.0  0.0      0     0 ?        I    01:28   0:01 [rcu_preempt]
root          18  0.0  0.0      0     0 ?        S    01:28   0:00 [migration/0]
root          19  0.0  0.0      0     0 ?        S    01:28   0:00 [idle_inject/0]
root          20  0.0  0.0      0     0 ?        S    01:28   0:00 [cpuhp/0]
root          21  0.0  0.0      0     0 ?        S    01:28   0:00 [kdevtmpfs]
root          22  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-inet_]
root          23  0.0  0.0      0     0 ?        S    01:28   0:00 [kauditd]
root          24  0.0  0.0      0     0 ?        S    01:28   0:00 [khungtaskd]
root          25  0.0  0.0      0     0 ?        S    01:28   0:00 [oom_reaper]
root          28  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-write]
root          29  0.0  0.0      0     0 ?        S    01:28   0:00 [kcompactd0]
root          30  0.0  0.0      0     0 ?        SN   01:28   0:00 [ksmd]
root          31  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-kinte]
root          32  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-kbloc]
root          33  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-blkcg]
root          34  0.0  0.0      0     0 ?        S    01:28   0:00 [irq/9-acpi]
root          35  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-tpm_d]
root          36  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-ata_s]
root          37  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-md]
root          38  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-md_bi]
root          39  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-edac-]
root          40  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-devfr]
root          41  0.0  0.0      0     0 ?        S    01:28   0:00 [watchdogd]
root          42  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-quota]
root          43  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/0:1H-kblockd]
root          44  0.0  0.0      0     0 ?        S    01:28   0:00 [kswapd0]
root          45  0.0  0.0      0     0 ?        S    01:28   0:00 [ecryptfs-kthread]
root          46  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-kthro]
root          47  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-acpi_]
root          48  0.0  0.0      0     0 ?        S    01:28   0:00 [scsi_eh_0]
root          49  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-scsi_]
root          50  0.0  0.0      0     0 ?        S    01:28   0:00 [scsi_eh_1]
root          51  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-scsi_]
root          52  0.0  0.0      0     0 ?        S    01:28   0:00 [scsi_eh_2]
root          53  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-scsi_]
root          57  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-mld]
root          58  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-ipv6_]
root          66  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-kstrp]
root          68  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/u3:0]
root          73  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-crypt]
root          83  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-charg]
root         125  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-ttm]
root         170  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-raid5]
root         209  0.0  0.0      0     0 ?        S    01:28   0:00 [jbd2/sda2-8]
root         210  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-ext4-]
root         262  0.0  3.1  50312 14728 ?        S<s  01:28   0:00 /usr/lib/systemd/systemd-journald
root         285  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-kmpat]
root         286  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-kmpat]
root         315  0.0  5.8 288988 27324 ?        SLsl 01:28   0:01 /sbin/multipathd -d -s
root         360  0.0  1.4  28560  6640 ?        Ss   01:28   0:00 /usr/lib/systemd/systemd-udevd
systemd+     397  0.0  2.6  21592 12576 ?        Ss   01:28   0:00 /usr/lib/systemd/systemd-resolved
systemd+     402  0.0  1.6  91028  7684 ?        Ssl  01:28   0:00 /usr/lib/systemd/systemd-timesyncd
root         427  0.0  0.0      0     0 ?        S    01:28   0:00 [psimon]
systemd+     432  0.0  2.0  19012  9452 ?        Ss   01:28   0:00 /usr/lib/systemd/systemd-networkd
root         484  0.0  0.0      0     0 ?        I<   01:28   0:00 [kworker/R-cfg80]
message+     508  0.0  1.1   9720  5544 ?        Ss   01:28   0:00 @dbus-daemon --system --address=systemd: --nofork --nopidfile --systemd-activation --syslog-only
root         525  0.0  1.8  18160  8852 ?        Ss   01:28   0:00 /usr/lib/systemd/systemd-logind
root         554  0.0  4.8 107016 22692 ?        Ssl  01:28   0:00 /usr/bin/python3 /usr/share/unattended-upgrades/unattended-upgrade-shutdown --wait-for-signal
root         628  0.0  0.4   3116  1968 tty1     Ss+  01:28   0:00 /sbin/agetty -o -p -- \u --noclear - linux
root         696  0.0  1.7  12020  8128 ?        Ss   01:28   0:00 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups
polkitd     8402  0.0  1.6 308164  7716 ?        Ssl  02:02   0:00 /usr/lib/polkit-1/polkitd --no-debug
root        8490  0.0  0.0      0     0 ?        I    05:02   0:00 [kworker/u2:1-events_unbound]
root        8497  0.0  0.0      0     0 ?        I    06:13   0:00 [kworker/u2:0-events_power_efficient]
root        8499  0.0  2.2  14960 10520 ?        Ss   06:28   0:00 sshd: teach [priv]
root        8501  0.0  2.2  14964 10608 ?        Ss   06:28   0:00 sshd: teach [priv]
root        8503  0.0  0.0      0     0 ?        S    06:28   0:00 [psimon]
teach       8506  0.0  2.4  20248 11476 ?        Ss   06:28   0:00 /usr/lib/systemd/systemd --user
root        8507  0.0  0.0      0     0 ?        I    06:28   0:00 [kworker/0:2-cgroup_free]
teach       8508  0.0  0.7  21152  3584 ?        S    06:28   0:00 (sd-pam)
teach       8555  0.0  1.5  15124  7132 ?        S    06:28   0:00 sshd: teach@notty
teach       8556  0.1  1.6  15264  7924 ?        S    06:28   0:02 sshd: teach@pts/0
teach       8557  0.0  0.4   2748  2052 ?        Ss   06:28   0:00 /usr/lib/openssh/sftp-server
teach       8558  0.0  0.9   5148  4384 pts/0    Ss   06:28   0:00 -bash
teach       8565  0.2  0.7   4752  3456 ?        Ss   06:28   0:05 bash -c while true; do sleep 1;head -v -n 8 /proc/meminfo; head -v -n 2 /proc/stat /proc/version /proc/uptime /proc/loadavg /proc/sys/fs/file-nr /proc/sys/kernel/hostname; tail -v -n 32 /proc/net/dev;echo '==> /proc/df
root       13187  0.0  0.0      0     0 ?        I    06:41   0:00 [kworker/u2:4-events_unbound]
root       22029  0.0  0.0      0     0 ?        I    07:06   0:00 [kworker/u2:2-events_power_efficient]
teach      22587  0.0  0.4   3124  1892 ?        S    07:08   0:00 sleep 1
teach      22588  0.0  0.9   8332  4376 pts/0    R+   07:08   0:00 ps aux
```


**`ps -ef`**

再试试这个

```bash
ps -ef
```

系统给了这样的回复

```bash
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 01:28 ?        00:00:01 /sbin/init
root           2       0  0 01:28 ?        00:00:00 [kthreadd]
root           3       2  0 01:28 ?        00:00:00 [pool_workqueue_release]
root           4       2  0 01:28 ?        00:00:00 [kworker/R-rcu_g]
root           5       2  0 01:28 ?        00:00:00 [kworker/R-rcu_p]
root           6       2  0 01:28 ?        00:00:00 [kworker/R-slub_]
root           7       2  0 01:28 ?        00:00:00 [kworker/R-netns]
root           8       2  0 01:28 ?        00:00:06 [kworker/0:0-events]
root           9       2  0 01:28 ?        00:00:00 [kworker/0:0H-events_highpri]
root          12       2  0 01:28 ?        00:00:00 [kworker/R-mm_pe]
root          13       2  0 01:28 ?        00:00:00 [rcu_tasks_kthread]
root          14       2  0 01:28 ?        00:00:00 [rcu_tasks_rude_kthread]
root          15       2  0 01:28 ?        00:00:00 [rcu_tasks_trace_kthread]
root          16       2  0 01:28 ?        00:00:00 [ksoftirqd/0]
root          17       2  0 01:28 ?        00:00:01 [rcu_preempt]
root          18       2  0 01:28 ?        00:00:00 [migration/0]
root          19       2  0 01:28 ?        00:00:00 [idle_inject/0]
root          20       2  0 01:28 ?        00:00:00 [cpuhp/0]
root          21       2  0 01:28 ?        00:00:00 [kdevtmpfs]
root          22       2  0 01:28 ?        00:00:00 [kworker/R-inet_]
root          23       2  0 01:28 ?        00:00:00 [kauditd]
root          24       2  0 01:28 ?        00:00:00 [khungtaskd]
root          25       2  0 01:28 ?        00:00:00 [oom_reaper]
root          28       2  0 01:28 ?        00:00:00 [kworker/R-write]
root          29       2  0 01:28 ?        00:00:00 [kcompactd0]
root          30       2  0 01:28 ?        00:00:00 [ksmd]
root          31       2  0 01:28 ?        00:00:00 [kworker/R-kinte]
root          32       2  0 01:28 ?        00:00:00 [kworker/R-kbloc]
root          33       2  0 01:28 ?        00:00:00 [kworker/R-blkcg]
root          34       2  0 01:28 ?        00:00:00 [irq/9-acpi]
root          35       2  0 01:28 ?        00:00:00 [kworker/R-tpm_d]
root          36       2  0 01:28 ?        00:00:00 [kworker/R-ata_s]
root          37       2  0 01:28 ?        00:00:00 [kworker/R-md]
root          38       2  0 01:28 ?        00:00:00 [kworker/R-md_bi]
root          39       2  0 01:28 ?        00:00:00 [kworker/R-edac-]
root          40       2  0 01:28 ?        00:00:00 [kworker/R-devfr]
root          41       2  0 01:28 ?        00:00:00 [watchdogd]
root          42       2  0 01:28 ?        00:00:00 [kworker/R-quota]
root          43       2  0 01:28 ?        00:00:00 [kworker/0:1H-kblockd]
root          44       2  0 01:28 ?        00:00:00 [kswapd0]
root          45       2  0 01:28 ?        00:00:00 [ecryptfs-kthread]
root          46       2  0 01:28 ?        00:00:00 [kworker/R-kthro]
root          47       2  0 01:28 ?        00:00:00 [kworker/R-acpi_]
root          48       2  0 01:28 ?        00:00:00 [scsi_eh_0]
root          49       2  0 01:28 ?        00:00:00 [kworker/R-scsi_]
root          50       2  0 01:28 ?        00:00:00 [scsi_eh_1]
root          51       2  0 01:28 ?        00:00:00 [kworker/R-scsi_]
root          52       2  0 01:28 ?        00:00:00 [scsi_eh_2]
root          53       2  0 01:28 ?        00:00:00 [kworker/R-scsi_]
root          57       2  0 01:28 ?        00:00:00 [kworker/R-mld]
root          58       2  0 01:28 ?        00:00:00 [kworker/R-ipv6_]
root          66       2  0 01:28 ?        00:00:00 [kworker/R-kstrp]
root          68       2  0 01:28 ?        00:00:00 [kworker/u3:0]
root          73       2  0 01:28 ?        00:00:00 [kworker/R-crypt]
root          83       2  0 01:28 ?        00:00:00 [kworker/R-charg]
root         125       2  0 01:28 ?        00:00:00 [kworker/R-ttm]
root         170       2  0 01:28 ?        00:00:00 [kworker/R-raid5]
root         209       2  0 01:28 ?        00:00:00 [jbd2/sda2-8]
root         210       2  0 01:28 ?        00:00:00 [kworker/R-ext4-]
root         262       1  0 01:28 ?        00:00:00 /usr/lib/systemd/systemd-journald
root         285       2  0 01:28 ?        00:00:00 [kworker/R-kmpat]
root         286       2  0 01:28 ?        00:00:00 [kworker/R-kmpat]
root         315       1  0 01:28 ?        00:00:01 /sbin/multipathd -d -s
root         360       1  0 01:28 ?        00:00:00 /usr/lib/systemd/systemd-udevd
systemd+     397       1  0 01:28 ?        00:00:00 /usr/lib/systemd/systemd-resolved
systemd+     402       1  0 01:28 ?        00:00:00 /usr/lib/systemd/systemd-timesyncd
root         427       2  0 01:28 ?        00:00:00 [psimon]
systemd+     432       1  0 01:28 ?        00:00:00 /usr/lib/systemd/systemd-networkd
root         484       2  0 01:28 ?        00:00:00 [kworker/R-cfg80]
message+     508       1  0 01:28 ?        00:00:00 @dbus-daemon --system --address=systemd: --nofork --nopidfile --systemd-activation --syslog-only
root         525       1  0 01:28 ?        00:00:00 /usr/lib/systemd/systemd-logind
root         554       1  0 01:28 ?        00:00:00 /usr/bin/python3 /usr/share/unattended-upgrades/unattended-upgrade-shutdown --wait-for-signal
root         628       1  0 01:28 tty1     00:00:00 /sbin/agetty -o -p -- \u --noclear - linux
root         696       1  0 01:28 ?        00:00:00 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups
polkitd     8402       1  0 02:02 ?        00:00:00 /usr/lib/polkit-1/polkitd --no-debug
root        8490       2  0 05:02 ?        00:00:00 [kworker/u2:1-events_unbound]
root        8497       2  0 06:13 ?        00:00:00 [kworker/u2:0-events_unbound]
root        8499     696  0 06:28 ?        00:00:00 sshd: teach [priv]
root        8501     696  0 06:28 ?        00:00:00 sshd: teach [priv]
root        8503       2  0 06:28 ?        00:00:00 [psimon]
teach       8506       1  0 06:28 ?        00:00:00 /usr/lib/systemd/systemd --user
root        8507       2  0 06:28 ?        00:00:00 [kworker/0:2-cgroup_free]
teach       8508    8506  0 06:28 ?        00:00:00 (sd-pam)
teach       8555    8501  0 06:28 ?        00:00:00 sshd: teach@notty
teach       8556    8499  0 06:28 ?        00:00:02 sshd: teach@pts/0
teach       8557    8555  0 06:28 ?        00:00:00 /usr/lib/openssh/sftp-server
teach       8558    8556  0 06:28 pts/0    00:00:00 -bash
teach       8565    8556  0 06:28 ?        00:00:05 bash -c while true; do sleep 1;head -v -n 8 /proc/meminfo; head -v -n 2 /proc/stat /proc/version /proc/uptime /proc/loadavg /proc/sys/fs/file-nr /proc/sys/kernel/hostname; tail -v -n 32 /proc/net/dev;echo '==> /proc/df <==';df -l;echo
root       13187       2  0 06:41 ?        00:00:00 [kworker/u2:4-events_power_efficient]
root       22029       2  0 07:06 ?        00:00:00 [kworker/u2:2-events_power_efficient]
teach      23272    8565  0 07:10 ?        00:00:00 sleep 1
teach      23273    8558  0 07:10 pts/0    00:00:00 ps -ef
```


**对比**

对比一下两个结果，`ps aux`显示所有的用户进程，除了`ps -ef`中有的信息，还多`VSZ`，`RSS`，`TTY`，`STAT`，`START`和`TIME`这些，会比`ps aux`信息更详细

而这两个命令显示的内容是两种标准风格，`ps aux`显示的内容是BSD风格，`ps -ef`是System V风格

## 进程的筛选

一般找进程都是找现在活动的，这些进程一般都是CPU或者内存占用较大的，所以我们可以使用降序排列的方式显示，可以加上这样的参数

### 排序参数

```bash
# ps -ef 按照CPU排序
ps -ef --sort=-%cpu

# ps -ef 按照内存排序
ps -ef --sort=-%mem

# ps aux 按照CPU排序
ps aux --sort=-%cpu

# ps aux 按照内存排序
ps aux --sort=-%mem
```


### 查找特定用户

```bash
# ps -ef 查看root用户进程
ps -ef -u root

# ps aux 查看root用户进程
ps aux -u root
```


### 通过命令查找

```bash
# ps -ef 查看/usr/bin/python3
ps -ef -c /usr/bin/python3 

# ps aux 查看/usr/bin/python3
ps aux -c /usr/bin/python3 
```


### 以树形结构显示父子关系

```bash
# 基于 ps -ef
ps -ejH

# 基于 ps aux
ps auxf
```


### 管道符查找

```bash
# ps aux
ps aux | grep nginx

# 只显示Nginx，不显示grep
ps aux | grep -v grep | grep nginx
```


### 自定义格式输出

```bash
# ps aux命令
ps aux -o pid,ppid,pcpu,pmem,comm

# ps -ef命令
ps -ef -o pid,ppid,pcpu,pmem,comm
```

## 进程的控制

查找到进程之后需要对进程进行控制


### 终止进程

终止进程有两个常见的命令，`kill`和`pkill`

**`kill`**

`kill`是使用PID的方式结束进程的

```bash
# 发送 SIGTERM
kill 1234 

# 强制杀死         
kill -9 1234   

# 同上（显式写数字）    
kill -15 1234

# 发送 SIGHUP
kill -HUP 1234     
```

**`pkill`**

`pkill`是使用进程名称的方式结束进程的

```bash
# 给所有名为 nginx 的进程发送 SIGTERM
pkill nginx            

# 强制杀死所有 chrome（危险！慎用）
pkill -9 chrome        

pkill -HUP systemd-logind
```

## 日志

日志是最常用与排查错误的方式，日志会记录启动，参数等重要信息，可以通过这些信息判断目前状况是出于什么原因


### 日志查看

```bash
journalctl
```

出现了很多的日志，我们需要对日志进行筛选

### 按单元服务筛选

```bash
journalctl -u test.service
```

日志少了很多，还可以按照时间过滤


### 按照时间过滤

```bash
journalctl --since "2025-04-01"
journalctl --since "1 hour ago"
journalctl --since "09:00" --until "12:00"
```


### 查看内核日志

```bash
journalctl -k
```


### 导出日志

```bash
journalctl -o json            # JSON 格式（便于脚本处理）
journalctl -o verbose         # 显示所有字段
journalctl -o short-iso       # 带 ISO 时间戳
```
