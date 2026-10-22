---
title: 程序入口与函数
---

这样的一段程序应该都不陌生
 
```c
#include<stdio.h>

int main(){
	printf("Hello World!");
	return 0;
}
```

运行结果是这样的

![](https://pic.ivoinkwell.xyz/file/docs/c-study-notes/02-program-entry-points-and-functions/02-program-entry-points-and-functions.webp)

没有人好奇过，在 Python 当中只需要一句话就能完成的事情，为什么 C 语言要这么多东西。

## 程序入口

看语句意思，`printf("Hello World!");` 就是这个效果出现的原因，那如果我不写在 `main()` 函数当中呢？

比如这样

```c
#include<stdio.h>

int main(){	
	return 0;
}
printf("Hello World!");
```

编译的时候出现了报错

![](https://pic.ivoinkwell.xyz/file/docs/c-study-notes/02-program-entry-points-and-functions/02-program-entry-points-and-functions-1.webp)

这个报错翻译成中文应该是这样：**编译器在“函数外面”看到了 `printf("Hello World!");` 这条语句**

报错说明：可执行语句必须写在函数体内。  

而一个 C 程序启动后，是从 `main` 开始执行的，所以 `main` 是程序的入口。

## 函数

既然这样就要先看看函数是什么，以及怎么定义的。

函数大概的定义形式如下：

```c
返回类型 函数名(参数列表)
{
    函数体;
    return 返回值;
}
```

结构是不是有点似曾相识了，完全可以对应这个：

```c
int main(){
	printf("Hello World!");
	return 0;
}
```

这里的函数参数就是形式参数，可以理解为打一个标签，可以以一个加法计算为例子

```c
int add(int add1, int add2){
	int result = add1 + add2;
	return result;
}
```

我现在想要使用 `add()` 去做加法，就需要给出两个加数，也就是里面的 `add1` 和 `add2`，为了在函数里面方便使用，就给传入的这两个数据赋值给这两个变量。

```c
#include<stdio.h>

int add(int add1, int add2){
    int result = add1 + add2;
    return result;
}

int main(){
    printf("Hello World!\n");

    int result = add(10, 20);
    printf("结果是: %d\n", result);

    return 0;
}
```

最后成功输出计算结果

![](https://pic.ivoinkwell.xyz/file/docs/c-study-notes/02-program-entry-points-and-functions/02-program-entry-points-and-functions-2.webp)

里面的形式参数是 `add1` 和 `add2` 两个变量，而实际参数就是在调用时候传入的 `10` 和 `20` 。形参和实参要能够分清楚。
