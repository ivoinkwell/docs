---
title: 'i3 工具补全与配置'
---

在最近配置上，应该也感觉到 `i3-wm` 的简陋了，虽然配置以后应该也达不到 `Hyprland` 动画切换的丝滑，但是视觉效果上会有很多改善

## `dmenu` -> `rofi`

之前在做配置的时候，更多使用的是终端中的操作，但是后面打开应用就要靠 `dmenu` 这个 App 启动菜单来完成


### `i3` 原版 `dmenu` 样式预览

我们可以先看看  `i3` 自带的样式

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/04-i3-wm-completion-tools-and-configurations/04-i3-wm-completion-tools-and-configurations.webp)

自带的 `dmenu` 样式中只有简单的文字与一个黑框，效率高，轻量，但是视觉上十分不友好，所以，我们可以新安装一个全新的 `dmenu` ，也就是 `rofi`


### `rofi` 安装

Debian通常是自带这个软件包的，所以我们在终端直接安装就好

```bash
sudo apt install rofi
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/04-i3-wm-completion-tools-and-configurations/04-i3-wm-completion-tools-and-configurations-1.webp)


### `rofi` 的相关配置

现在我们使用 `$mod`+`d` 这个快捷键出现的还是 `i3-wm` 默认的 `dmenu` ，所以我们需要更改配置文件，将 `rofi` 设置为默认的


编辑配置文件

```bash
nano $HOME/.config/i3/config
```

找到这个

```ini
bindsym $mod+d exec--no-startup-id dmenu_run
```

要先改成 `rofi` 

```ini
bindsym $mod+d exec--no-startup-id dmenu_run # [!code --]
bindsym $mod+d exec--no-startup-id rofi # [!code ++]
```


现在我们尝试一下 `$mod` + `d` 快捷键

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/04-i3-wm-completion-tools-and-configurations/04-i3-wm-completion-tools-and-configurations-2.webp)

出现这样的一个提示，也就是我们需要书写成提示这样的格式，我们需要的是 `dmenu` 的样式，就选择 `drun`

```ini
bindsym $mod+d exec--no-startup-id rofi # [!code --]
bindsym $mod+d exec--no-startup-id rofi -show drun # [!code ++]
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/04-i3-wm-completion-tools-and-configurations/04-i3-wm-completion-tools-and-configurations-3.webp)

现在成功出现了


但是只有文字，不够直观，我们还可以加上图标

```ini
bindsym $mod+d exec--no-startup-id rofi -show drun # [!code --]
bindsym $mod+d exec--no-startup-id rofi -show drun -show-icon # [!code ++]
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/04-i3-wm-completion-tools-and-configurations/04-i3-wm-completion-tools-and-configurations-4.webp)

这样就完成了，简洁直观，想要更换主题可以回车选择 `Rofi Theme Selector` 即可

## 终端 -> `alacritty`

 终端是一个很直接和自己系统“对话”的方式，在我看来响应速度比较重要，所以我更喜欢 `alacritty` 这款终端


### `alacritty` 安装

和 `rofi` 一样，软件商店中也有这个软件，直接安装就行

```
sudo apt install alacritty
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/04-i3-wm-completion-tools-and-configurations/04-i3-wm-completion-tools-and-configurations-5.webp)

我这里安装过，就不会再安装


### `alacritty` 相关配置

首先是要将其你设置为默认终端，同样编辑 `$HOME/.config/i3/config`

找到这个

```ini
bindsym $mod+Return exec i3-sensible-termina
```

将其更改为 `alacritty`

```ini
bindsym $mod+Return exec i3-sensible-termina # [!code --]
bindsym $mod+Return exec alacritty # [!code ++]
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/04-i3-wm-completion-tools-and-configurations/04-i3-wm-completion-tools-and-configurations-6.webp)


`alacritty` 默认的主题如果不怎么满意也可以更换自己喜欢的，这个是我之前更换的，文件位置在 **`$HOME/.config/alacritty/alacritty.yml`**

```yml
# Colors (Aura Theme)
colors:
  # Default colors
  primary:
    background: '#15141b'
    foreground: '#edecee'

  cursor:
    cursor: '#00D1FF'

  selection:
    bash: CellForeground
    background: '#29263c'

  # Normal colors
  normal:
    black: '#110f18'
    red: '#ff6767'
    green: '#61ffca'
    yellow: '#ffca85'
    blue: '#a277ff'
    magenta: '#a277ff'
    cyan: '#61ffca'
    white: '#edecee'

  # Bright colors
  bright:
    black: '#4d4d4d'
    red: '#ff6767'
    green: '#61ffca'
    yellow: '#ffca85'
    blue: '#a277ff'
    magenta: '#a277ff'
    cyan: '#61ffca'
    white: '#edecee'

  search:

    matches:
      foreground: '#000000'
      background: '#ffffff'
    focused_match:
      foreground: '#ffffff'
      background: '#00D1FF'

# 设置字体
font:
  normal:
    family: 'JetBrains Mono'
    style: Regular

  bold:
    family: 'JetBrains Mono'
    style: Regular

  italic:
    family: 'JetBrains Mono'
    style: Italic

  bold_italic:
    family: 'JetBrains Mono'
    style: Italic

  # 字大小
  size: 8

  offset:
    x: 0
    y: 1

  glyph_offset:
    x: 0
    y: 1



window:
  padding:
    x: 22
    y: 22

  decorations: transparent

  dimensions:

    columns: 80
    lines: 25



scrolling:
  # 回滚缓冲区中的最大行数,指定“0”将禁用滚动。
  history: 100000
  # 滚动行数
  multiplier: 4



cursor:
  style:
    shape: Beam

# 如果为‘true’，则使用亮色变体绘制粗体文本。
draw_bold_bash_with_bright_colors: false

selection:
  semantic_escape_chars: ',│`|:"'' ()[]{}<>'
  save_to_clipboard: true

live_config_reload: true
key_bindings:
  - { key: R, mods: Command, mode: ~Vi|~Search, chars: "\x0c" }
  - { key: R, mods: Command, mode: ~Vi|~Search, action: ClearHistory }
  - { key: W, mods: Command, action: Hide }
  - { key: W, mods: Command|Shift, action: Quit }
  - { key: N, mods: Command, action: SpawnNewInstance }
  - { key: T, mods: Command, action: CreateNewWindow }
  - { key: Left, mods: Alt, chars: "\x1bb" } # Skip word left
  - { key: Right, mods: Alt, chars: "\x1bf" } # Skip word right
  - { key: Left, mods: Command, chars: "\x01" } # Home
  - { key: Right, mods: Command, chars: "\x05" } # End
  - { key: Back, mods: Command, chars: "\x15" } # Delete line
  - { key: Back, mods: Alt, chars: "\x1b\x7f" } # Delete word
```

## 窗口美化 -> `Picom`

 相比 `Hyprland` ，`i3-wm` 的窗口显得单调很多，圆角，毛玻璃都是没有的。毛玻璃的效果可能很难实现，也对使用效率没有什么帮助，就简单做一些不突兀的视觉，动画效果


### 安装

和之前两个软件一样，软件商店中也有这个软件，直接安装就行

```
sudo apt install picom
```

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/04-i3-wm-completion-tools-and-configurations/04-i3-wm-completion-tools-and-configurations-7.webp)

### 配置文件

**配置文件位置：** `$HOME/.config/picom.conf`

我的配置文件

```ini
#################################
#             Shadows           #
#################################
# 在 Windows 上启用客户端阴影。注意桌面窗口
# (windows with '_NET_WM_WINDOW_TYPE_DESKTOP') 永远不会有阴影，
# 除非使用 wintypes 选项明确要求。
#
# shadow = false
shadow = false;
# 阴影的模糊半径，以像素为单位。 （默认为 12）
# shadow-radius = 12
shadow-radius = 7;
# 阴影的不透明度。 （0.0 - 1.0，默认为 0.75）
# shadow-opacity = .75
# 阴影的左偏移，以像素为单位。 （默认为 -15）
# shadow-offset-x = -15
shadow-offset-x = -7;
# 阴影的顶部偏移量，以像素为单位。 （默认为 -15）
# shadow-offset-y = -15
shadow-offset-y = -7;
# 阴影的红色值（0.0 - 1.0，默认为 0）。
# shadow-red = 0
# 阴影的绿色值（0.0 - 1.0，默认为 0）。
# shadow-green = 0
# 阴影的蓝色值（0.0 - 1.0，默认为 0）。
# shadow-blue = 0
# 阴影的十六进制字符串颜色值（#000000 - #FFFFFF，默认为#000000）。此选项将覆盖选项集阴影-（红色/绿色/蓝色）
# shadow-color = "#000000"
# 指定不应该有阴影的窗口的条件列表。
#
# examples:

#   shadow-exclude = "n:e:Notification";

#

# shadow-exclude = []

shadow-exclude = [
  "name = 'Notification'",
  "class_g = 'Conky'",
  "class_g ?= 'Notify-osd'",
  "class_g = 'Cairo-clock'",
  "_GTK_FRAME_EXTENTS@:c"
];
# 指定不应覆盖阴影的窗口条件列表，例如停靠窗口。
# clip-shadow-above = []
# 指定一个 X 几何图形来描述不应该出现阴影的区域
# 被绘制在，比如一个停靠窗口区域。采用
# shadow-exclude-reg u003d "x10+0+0"
# 例如，如果屏幕底部的 10 个像素不应绘制阴影。
#
# shadow-exclude-reg = ""
# 在特定的 Xinerama 屏幕上将窗口的阴影完全裁剪到屏幕上。
# xinerama-shadow-crop = false

#################################
#           Fading              #
#################################
# 在打开/关闭和不透明度变化时淡入/淡出窗口，
#  unless no-fading-openclose is used.
# fading = false
fading = true;

# 淡入时步骤之间的不透明度变化。（0.01 - 1.0，默认为 0.028）
# fade-in-step = 0.028

fade-in-step = 0.03;
# 淡出时步骤之间的不透明度变化。 （0.01 - 1.0，默认为 0.03）
# fade-out-step = 0.03

fade-out-step = 0.03;
# 淡入淡出步骤之间的时间，以毫秒为单位。 （> 0，默认为 10）
# fade-delta = 10
# 指定不应褪色的窗口条件列表。
# fade-exclude = []
# 不要在窗口打开/关闭时淡入淡出。
# no-fading-openclose = false
# 不要使用 WM 框架淡化被破坏的 ARGB 窗口。解决 Openbox、Fluxbox 等中的错误。
# no-fading-destroyed-argb = false

#################################

#   Transparency / Opacity      #

#################################
# 非活动窗口的不透明度。 （0.1 - 1.0，默认为 1.0）
# inactive-opacity = 1

inactive-opacity = 0.5;

# 窗口标题栏和边框的不透明度。 （0.1 - 1.0，默认禁用）
# frame-opacity = 1.0

frame-opacity = 0.8;

# 让 -i 设置的非活动不透明度覆盖窗口的 '_NET_WM_WINDOW_OPACITY' 值。
# inactive-opacity-override = true

inactive-opacity-override = false;

# 活动窗口的默认不透明度。 （0.0 - 1.0，默认为 1.0）

active-opacity = 0.8

# 使非活动窗口变暗。 （0.0 - 1.0，默认为 0.0）
# inactive-dim = 0.0
# 指定不应该被视为焦点的窗口的条件列表。
# focus-exclude = []

focus-exclude = [ "class_g = 'Cairo-clock'" ];

# 使用固定的非活动暗度值，而不是根据窗口不透明度进行调整。
# inactive-dim-fixed = 1.0
# 指定不透明度规则列表，格式为 `PERCENT:PATTERN`,
# 像 `50:name *u003d "Firefox"`。建议使用 picom-trans。
# 请注意，我们不保证可能与其他人发生冲突
# 在框架或客户端窗口上设置“_NET_WM_WINDOW_OPACITY”的程序。
# example:
#    opacity-rule = [ "80:class_g = 'URxvt'" ];
#
# opacity-rule = []

#################################
#           Corners             #
#################################

# 设置圆角窗口角的半径。当 > 0 时，合成器将
# 圆窗户的角落。不能很好的互动
# `transparent-clipping`.
corner-radius = 0

# 排除圆角的条件。

rounded-corners-exclude = [
  "window_type = 'dock'",
  "window_type = 'desktop'"
];

#################################
#     Background-Blurring       #
#################################
# 背景模糊的参数，请参阅 *BLUR* 部分了解更多信息。
# blur-method =
# blur-size = 12
#
# blur-deviation = false
#
# blur-strength = 5
# 模糊半透明/ARGB 窗口的背景。
# 性能不佳，具有依赖于驱动程序的行为。
# 交换机名称可能会更改，恕不另行通知。
#
# blur-background = false
# 当窗口框架不透明时模糊窗口的背景。
# Implies:
#    blur-background
# 性能不佳，具有依赖于驱动程序的行为。名称可能会改变。
#
# blur-background-frame = false
# 使用固定的模糊强度，而不是根据窗口不透明度进行调整。
# 模糊背景固定 = 假
# 指定模糊卷积核，格式如下：
# example:
#   blur-kern = "5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
#
# blur-kern = ""

blur-kern = "3x3box";

# 排除背景模糊的条件。

# blur-background-exclude = []
blur-background-exclude = [
  "window_type = 'dock'",
  "window_type = 'desktop'",
  "_GTK_FRAME_EXTENTS@:c"
];



#################################
#       General Settings        #
#################################
# 守护进程。初始化后分叉到后台。导致某些（编写错误的）驱动程序出现问题。
# daemon = false
# 指定要使用的后端：`xrender`、`glx` 或 `xr_glx_hybrid`。
# `xrender` is the default one.
# backend = "glx"

backend = "xrender";

# 启用/禁用垂直同步。
# vsync = false

vsync = true;

# 通过 D-Bus 启用远程控制。有关详细信息，请参阅下面的 *D-BUS API* 部分。
# dbus = false
# 尝试检测 WM 窗口（一个非覆盖重定向窗口，没有
# 具有'WM_STATE'的孩子）并将它们标记为活动。
#
# mark-wmwin-focused = false

mark-wmwin-focused = true;

# 标记没有以“WM_STATE”为焦点的子窗口的覆盖重定向窗口。
# mark-ovredir-focused = false

mark-ovredir-focused = true;

# 尝试检测带有圆角的窗口并且不考虑它们
# 形状的窗户。不幸的是，准确度不是很高。
#
# detect-rounded-corners = false

detect-rounded-corners = true;

# 在客户端窗口上检测'_NET_WM_WINDOW_OPACITY'，对窗口管理器很有用
# 不将客户端窗口的“_NET_WM_WINDOW_OPACITY”传递给框架窗口。
#
# detect-client-opacity = false

detect-client-opacity = true;

# 使用 EWMH '_NET_ACTIVE_WINDOW' 来确定当前聚焦的窗口，
# 而不是听 'FocusIn'/'FocusOut' 事件。可能精度更高，
# 前提是 WM 支持它。
#
# use-ewmh-active-win = false
# 如果检测到全屏不透明窗口，则取消重定向所有窗口，
# 最大化全屏窗口的性能。已知会导致闪烁
# 当重定向/取消重定向窗口时。
#
# unredir-if-possible = false
# 取消重定向窗口前的延迟，以毫秒为单位。默认为 0。
# unredir-if-possible-delay = 0
# 不应该被视为非重定向屏幕全屏的窗口条件。
# unredir-if-possible-exclude = []
# 使用 'WM_TRANSIENT_FOR' 对窗口进行分组，并考虑窗口
#在同一组中同时专注。
#
# detect-transient = false

detect-transient = true;

# 使用 'WM_CLIENT_LEADER' 对窗口进行分组，并考虑同一个窗口
# 小组同时聚焦。这通常意味着来自同一应用程序的窗口
# 将同时被视为专注或不专注。
# 如果启用了检测瞬态，'WM_TRANSIENT_FOR' 具有更高的优先级。
#
# detect-client-leader = false
# 将损坏区域的大小调整为特定数量的像素。
# 正值放大，负值缩小。
# 如果值为正，则不会实际绘制那些额外的像素
# 到屏幕，仅用于模糊计算等。 （由于技术限制，
# 使用损坏，这些像素仍然会错误地绘制到屏幕上。）
# 主要用于修复模糊的线路损坏问题，
# 在这种情况下你应该在这里使用模糊半径值
# （例如，对于 3x3 内核，您应该使用 `--resize-damage 1`，
# 使用 5x5 的 `--resize-damage 2`，依此类推）。
# 可能会也可能不会与 *--glx-no-stencil* 一起使用。收缩功能不正常。
#
# resize-damage = 1
# 指定应该用反转颜色绘制的窗口的条件列表。
# 资源占用，并且没有经过很好的测试。
#
# invert-color-include = []

# GLX 后端：避免使用模板缓冲区，如果您没有模板缓冲区，这很有用。
# 在渲染透明内容时可能会导致不正确的不透明度（但绝不会
# 实际上发生了）并且可能不适用于模糊背景。
# 我的测试显示性能提升了 15%。推荐的。
#

glx-no-stencil = true;

# GLX 后端：避免在窗口损坏时重新绑定像素图。
# 可能可以提高快速窗口内容更改的性能，
# 但已知会破坏某些驱动程序（LLVMpipe、xf86-video-intel 等）。
# 如果可行，推荐。
#
# glx-no-rebind-pixmap = false
# 禁用损坏信息。
# 这会导致每次重绘整个屏幕，而不是屏幕的一部分
#实际上已经改变了。可能会降低性能，但可能会修复一些伪影。
# 对立的选项是使用伤害
#
# no-use-damage = false

use-damage = true;

# 使用 X Sync fence 来同步客户端的draw call，确保所有draw
# 调用在 picom 开始绘制之前完成。需要 nvidia 驱动程序
# 为某些用户使用 GLX 后端。
#
# xrender-sync-fence = false

# GLX 后端：使用指定的 GLSL 片段着色器来渲染窗口内容。
# 参见 `compton-default-fshader-win.glsl` 和 `compton-fake-transparency-fshader-win.glsl`
# 在源代码树中作为示例。
#
# glx-fshader-win = ""

# 强制所有窗口使用混合进行绘制。如果你有用
# 有一个 glx-fshader-win 可以把不透明的像素变成透明的。
#
# force-win-blend = false
# 不要使用 EWMH 检测全屏窗口。
# 恢复为仅根据其大小和坐标检查窗口是否为全屏。
#
# no-ewmh-fullscreen = false
# 调暗明亮的窗户，使其亮度不超过此设定值。
# 窗口的亮度是通过平均窗口中的所有像素来估计的，
# 所以这可能会带来性能损失。
# 将此设置为 1.0 会禁用此行为。需要禁用 --use-damage。 （默认值：1.0）
#
# max-brightness = 1.0
# 让透明窗口像非透明窗口一样剪辑其他窗口，
# 而不是在它们之上混合。
#
# transparent-clipping = false
# 设置日志级别。可能的值为：
#  "trace", "debug", "info", "warn", "error"
# 越来越重要。大小写无关紧要。
# 如果使用“TRACE”日志级别，最好登录到文件中
# 使用 *--log-file*，因为它可以生成大量日志。
#
# log-level = "debug"

log-level = "warn";

# 设置日志文件。
# 如果 *--log-file* 从未指定，日志将被写入标准错误。
# 否则，日志将写入给定文件，尽管一些早期的
# 日志可能仍会写入标准错误。
# 从配置文件中设置此选项时，建议使用绝对路径。
#
# log-file = "/path/to/your/log/file"
# 显示所有 X 错误（用于调试）
# show-all-xerrors = false
# 将进程 ID 写入文件。
# write-pid-path = "/path/to/your/log/file"
# 窗口类型设置
#
# 'WINDOW_TYPE' 是 EWMH 标准中定义的 15 种窗口类型之一：
#     "unknown", "desktop", "dock", "toolbar", "menu", "utility",
#     "splash", "dialog", "normal", "dropdown_menu", "popup_menu",
#     "tooltip", "notification", "combo", and "dnd".
#

# 以下每个窗口类型选项可用：::
#
#   fade, shadow:::
#     Controls window-type-specific shadow and fade settings.
#
#   opacity:::
#     Controls default opacity of the window type.
#
#   focus:::
#     Controls whether the window of this type is to be always considered focused.
#     (By default, all window types except "normal" and "dialog" has this on.)
#
#   full-shadow:::
#     Controls whether shadow is drawn under the parts of the window that you
#     normally won't be able to see. Useful when the window has parts of it
#     transparent, and you want shadows in those areas.
#
#   clip-shadow-above:::
#     Controls wether shadows that would have been drawn above the window should
#     be clipped. Useful for dock windows that should have no shadow painted on top.
#
#   redir-ignore:::
#     Controls whether this type of windows should cause screen to become
#     redirected again after been unredirected. If you have unredir-if-possible
#     set, and doesn't want certain window to cause unnecessary screen redirection,
#     you can set this to `true`.
#
wintypes:
{
  tooltip = { fade = true; shadow = false; opacity = 0.75; focus = true; full-shadow = false; };
  dock = { shadow = false; clip-shadow-above = true; }
  dnd = { shadow = false; }
  popup_menu = { opacity = 0.8; }
  dropdown_menu = { opacity = 0.8; }
};
```

重启后查看效果

![](https://pic.ivoinkwell.xyz/file/docs/build-linux-development-enviroment/04-i3-wm-completion-tools-and-configurations/04-i3-wm-completion-tools-and-configurations-8.webp)

