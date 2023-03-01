---
layout: post
title:  "华为eNSP错误40"
date:   2023-02-28 18:00:00 +0800
categories: 
---

> 环境：<br>
Windows11 x64 22H2<br>
WinPcap-4.1.3<br>
Wireshark-2.6.4<br>
VirtualBox-5.2.26<br>
eNSP V100R003C00SPC100

如果eNSP安装后，虚拟设备无法启动报错 `错误代码：40`

可打开 VirtualBox，启动eNSP安装时自动添加的 AR_Base 虚拟机，查看报错是否是：

`Raw-mode is unavailable courtesy of Hyper-V. (VERR_SUPDRV_NO_RAW_MODE_HYPER_`

如满足以上条件，解决方法如下：

1. 问题发生原因：所安装 VirtualBox 版本与 Hyper-V 冲突，可使用以下命令检查 Hyper-V 是否开启

（系统附加功能 Hyper-V **没打勾不代表没有启用**，如使用WSL但没在附加功能中手动开启，Hyper-V 也会是启用状态）
```bash

// bcdedit 检查 Hyper-V 是否已启用
// hypervisorlaunchtype 值代表其状态

$ bcdedit

```
2. 解决方法：关闭 Hyper-V 后 VirtualBox 与 eNSP 均可正常使用

```bash
// 需使用管理员权限shell运行

// 关闭 Hyper-V
$ bcdedit /set hypervisorlaunchtype off

// 开启 Hyper-V
$ bcdedit /set hypervisorlaunchtype auto
```
