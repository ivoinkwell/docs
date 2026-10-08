---
title: '配置你自己的 i3-wm'
---

Linux 这个系统的乐趣就在于自定义，但是在自定义之前也需要了解其基本规则

## 快捷键

`i3-wm` 作为一个窗口管理器是没有鼠标操作这么一个选项的，所以基本上很多事情都是由键盘按键来控制的

|    基础操作    |                快捷键                 |          说明           |
| :--------: | :--------------------------------: | :-------------------: |
|    打开终端    |          `$mod` + `Enter`          |       启动你的默认终端        |
|  打开dmenu   |            `$mod` + `d`            |        启动应用菜单         |
|    关闭窗口    |       `$mod` + `Shift` + `q`       |       关掉当前聚焦的窗口       |
|  在窗口间移动焦点  |   `$mod` + `j`/`k`/`l`/`;`（或方向键）   |  分别对应← ↓ ↑ →，Vim 风格   |
|   移动窗口位置   | `$mod` + `Shift` + `j`/`k`/`l`/`;` |      把当前窗口在区域内移动      |
| 切换工作区（桌面）  |          `$mod` + `1`~`0`          |      数字键对应不同工作区       |
| 把窗口移到别的工作区 |     `$mod` + `Shift` + `1`~`0`     |       移动窗口并跟随跳转       |
| 改变窗口布局（堆叠） |            `$mod` + `s`            |     窗口上下堆叠，适合小屏幕      |
| 改变窗口布局（标签） |            `$mod` + `w`            |       类似浏览器标签页        |
|   恢复平铺布局   |            `$mod` + `e`            |     在默认水平/垂直平铺间切换     |
|   全屏当前窗口   |            `$mod` + `f`            |       全屏，再按一次退出       |
|   让窗口浮动    |     `$mod` + `Shift` + `Space`     | 浮动后可鼠标拖拽（按住 `$mod` 拖） |
| 重载配置让改动生效  |       `$mod` + `Shift` + `c`       |     改完配置文件后必须用它刷新     |
|   退出 i3    |       `$mod` + `Shift` + `e`       |     退出 i3，回到登录界面      |
## 配置文件

配置文件一般都是在用户目录中的 `.config` 文件夹内，安装软件后可以进去查看


### `i3-wm`

`i3-wm` 的配置文件在刚进入桌面的时候让选择过，位置在`$HOME/.config/i3/config`，可以直接配置

#### 修改配置文件

按下 `$Mod+Enter` 打开用户的配置文件

```bash
nano ./.config/i3/config
```

我想更改退出的快捷键，退出窗口不想按 `Shift`

```bash
bindsym $mod+Shift+q kill # [!code --]
bindsym $mod+q kill # [!code ++]
```

重启 `i3-wm`

```text
$Mod+Shift+R
```

#### 一些额外配置

**除了这些我还加了以下内容：**

```bash
new_window none
new_float none
hide_edge_borders both #隐藏窗口边框
gaps inner 8
gaps outer 6
```

效果如下：

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/03-configure-your-i3-wm/03-configure-your-i3-wm.webp)


### `i3-status`

这个就是整个桌面下面部分，我之前刚刚摸索啥也不懂，习惯性的喜欢抄大佬们[现成的](https://www.cnblogs.com/siyingcheng/p/11706201.html)，在其中按照我的需要做了写调整，下面是配置文件

```bash
general {
        colors = true
        interval = 5
        color_good = "#2AA198"
        color_bad = "#586E75"
        color_degraded = "#DC322F"
}
# order += "ipv6"
## 显示cpu温度
order += "cpu_temperature 0"
order += "cpu_usage"
## 取消显示硬盘使用情况
#order += "disk /"
# order += "disk /home"
## 无线网络信息使用默认参数 _first_ 可能无法找到无线信息，这里直接制定我的无线网络的名称，可以使用 ip addr查看，相当于ifconfig
#order += "wireless _first_"
#order += "wireless wlp3s0"
#order += "ethernet _first_"
# order += "load"
order += "memory"
order += "tztime local"
order += "battery all"
## 定制无线网络信息
# wireless wlp3s0 {
#     format_up = " %quality  %essid %ip"
#     format_down = "W: down"
# }

cpu_usage {
        format = "  %usage "
}

load {
        format = " load %1min "
        # max_threshold = 0.3
}

disk "/" {
        # format = " hdd %avail "
        format = " ⛁ %avail "
}

ethernet _first_ {
# if you use %speed, i3status requires root privileges
        format_up = " lan: %ip %speed "
        format_down = " no lan "
}

battery all {
        # format = "%status %percentage %remaining %emptytime"
        format = " %status %percentage"
        format_down = "No battery"
        last_full_capacity = true
        integer_battery_capacity = true
        # status_chr = ""
        status_chr = "⚡"
        # status_bat = "bat"
        # status_bat = "☉"
        status_bat = ""
        # status_unk = "?"
        status_unk = ""
        # status_full = ""
        status_full = "☻"
        low_threshold = 15
        threshold_type = time
}

memory {
        format = " %used | %available"
        threshold_degraded = "1G"
        format_degraded = "MEMORY < %available"
}
## 日期改成自己喜欢的格式
tztime local {
        # format = "%Y-%m-%d %H:%M:%S"
        format = " %m月-%d日 %H:%M "
}

## 定制温度控制器
cpu_temperature 0 {
        format = " %degrees °C"
        max_threshold = 85
        path = "/sys/class/thermal/thermal_zone0/temp"
}
```

这个配置文件我们拿过来需要放在我们自己本地的配置文件当中，所以需要创建存放的目录

```bash
# 进入目录
cd $HOME/.config/

# 创建文件夹
mkdir i3status

# 拷贝原始文件
cp /etc/i3status.conf $HOME/.config/i3status

# 重命名
mv $HOME/.config/i3status/i3status.conf config
```

最后我们编辑这个 `config` 文件

```
nano config
```

最后添加一下 `i3-wm` 的配置

```bash
bar {
        position top # [!code focus]
        status_command i3status
}
```

## 配置后的最终效果

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/03-configure-your-i3-wm/03-configure-your-i3-wm-1.webp)
