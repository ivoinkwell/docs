---
title: 自动化测试
---

自动化测试是一个很有意思的东西，我一直以为是跳过前端页面去测试后端逻辑，后面才知道那是API测试，而自动化测试就是用 Python 脚本去执行那些需要手动的操作

## 环境安装

### 浏览器驱动安装

基于 Blink 内核的浏览器都有自己家的驱动，用于自动化控制，首先就需要下载对应的浏览器自动化的驱动程序，我提供 Edge 和 Chrome 的驱动下载地址

> - **`Edge`**: https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/?form=MA13LH&cs=3397636917
> - **`Chrome`**: https://googlechromelabs.github.io/chrome-for-testing/

下载后并添加进环境变量当中

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing.webp)

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing-1.webp)

### 安装 Python 软件包

输入以下命令进行安装：

```shell
pip install selenium
```

安装后尝试导入不报错

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing-2.webp)

## 基础操作

### 实例化对象

首先我们需要了解 `selenium` 的使用方法，实例化一个对象进行操作

```python
from selenium import webdriver

broswer_driver = webdriver.Edge()
```

### 打开网页

输入以下代码

```python
broswer_driver.get('https://blog.ivoinkwell.xyz/')
```

运行查看效果，发现窗口会直接关闭，可以添加以下参数避免运行结束之后自动关闭浏览器窗口

```python
# 引入 Options
from selenium.webdriver.edge.options import Options

# 设置Options
edge_options = Options()
edge_options.add_experimental_option("detach", True)

# 实例化添加 Options 参数
broswer_driver = webdriver.Edge(options=edge_options)
```

完整代码如下

```python
from selenium import webdriver
from selenium.webdriver.edge.options import Options

edge_options = Options()
edge_options.add_experimental_option("detach", True)

broswer_driver = webdriver.Edge(options=edge_options)

broswer_driver.get('https://blog.ivoinkwell.xyz/')
```

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing-3.webp)

### 测试与测试流程

#### 测试流程

现在我想要复刻这样的一个手动操作步骤

> 1. 打开博客官网网页
> 2. 点击右侧上方的 “放大镜” 图标
> 3. 在搜索框输入 "Telegram"
> 4. 选择 “Telegram + Cloudflare Pages：搭建博客图床与网盘” 进入

#### 打开博客官网网页

```python
broswer_driver.get('https://blog.ivoinkwell.xyz/')
```

#### 点击搜索图标

首先我们需要去找到搜索图标

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing-4.webp)

这里可以看到元素的 ID ，不妨去使用 ID 定位一下这个元素

```python
broswer_driver.find_element(By.ID, '友链search-switch').click()
```

尝试运行一下

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing-5.webp)

成功完成点击

#### 往搜索框中传入文字

还是需要先定位这个搜索框

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing-6.webp)

你会发现没有 ID 这么个玩意出现，这个时候我们就需要使用 XPath 进行定位

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing-7.webp)

右键复制这个元素的 XPath，并粘贴进以下代码

```python
broswer_driver.find_element(By.XPATH, '//*[@id="search-bar-inside"]/input')
```

然后我们需要使用 `send_keys()` 方法传入我们需要输入的文字

```python
broswer_driver.find_element(By.XPATH, '//*[@id="search-bar-inside"]/input').send_keys('Telegram')
```

#### 点击并跳转文章

你会发现搜索出来可以跳转的文章有这些

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing-8.webp)

我想跳转的就是第一篇，第一篇里面的文字也是独一无二的，也就是说，我们可以使用链接文字的方式去进行定位

```python
broswer_driver.find_element(By.PARTIAL_LINK_TEXT, '网盘')
```

像上文一样，使用 `click()` 方法即可进行点击

```python
broswer_driver.find_element(By.PARTIAL_LINK_TEXT, '网盘').click()
```

所以完整程序是这样

```python
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By

edge_options = Options()
edge_options.add_experimental_option("detach", True)

broswer_driver = webdriver.Edge(options=edge_options)

broswer_driver.get('https://blog.ivoinkwell.xyz/')

broswer_driver.find_element(By.ID, 'search-switch').click()
broswer_driver.find_element(By.XPATH, '//*[@id="search-bar-inside"]/input').send_keys('Telegram')
broswer_driver.find_element(By.PARTIAL_LINK_TEXT, '网盘').click()
```

#### 延时等待

我们完整执行一遍

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing-9.webp)

发现卡在这里了，去看一眼报错

![](https://pic.ivoinkwell.xyz/file/docs/software-testing-study-notes/04-automated-testing/04-automated-testing-10.webp)

找不到这个标志，也就是说明最后一个元素没有加载出来的时候程序就已经运行完成了，所以我们需要去加一个延时等待

```python
sleep(5)
```

#### 完整程序

```python
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from time import sleep

edge_options = Options()
edge_options.add_experimental_option("detach", True)

broswer_driver = webdriver.Edge(options=edge_options)

broswer_driver.get('https://blog.ivoinkwell.xyz/')

broswer_driver.find_element(By.ID, 'search-switch').click()
broswer_driver.find_element(By.XPATH, '//*[@id="search-bar-inside"]/input').send_keys('Telegram')
sleep(5)
broswer_driver.find_element(By.PARTIAL_LINK_TEXT, '网盘').click()
```