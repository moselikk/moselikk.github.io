---
layout: post
title:  "个人开发环境预设"
date:   2023-03-03 9:00:00 +0800
categories: 
---

### 个人常用环境配置文件备份：

VSCode
![VSCode](https://less-1251975755.cos.ap-beijing.myqcloud.com/2023-03-03_10-22-36.png)

VSCode配置备份：[下载](https://file-1251975755.cos.ap-nanjing.myqcloud.com/VSCode_Setting.code-profile)

PowerShell（需自行下载安装，系统自带 Windows PowerShell 配置会有无法预料的问题）
![WindowsTerminal](https://less-1251975755.cos.ap-beijing.myqcloud.com/2023-03-03_13-49-17.png)

Ubuntu zsh (WSL)
![WindowsTerminalWSL](https://less-1251975755.cos.ap-beijing.myqcloud.com/2023-03-03_13-49-07.png)

PowerShell配置备份：[下载](https://file-1251975755.cos.ap-nanjing.myqcloud.com/Microsoft.PowerShell_profile.ps1)<br>
WindowsTerminal配置备份：[下载](https://file-1251975755.cos.ap-nanjing.myqcloud.com/windows_terminal_settings.json)

### 配置文件使用：
> VSCode：按 `Ctrl+Shift+P` 打开命令输入框，输入 `Import Profile` 导入配置文件，选择所下载的配置文件导入。

> PowerShell：Terminal 中输入 `$PROFILE` 查看 PowerShell 配置文件地址，将下载的配置文件复制到相应文件中保存（需先安装好配置文件中用到的软件，如：`starship`）。

> WindowsTerminal：打开 终端 - 设置 - 打开JSON文件 将下载的配置文件中内容复制保存即可。

### 前端开发环境

Name               | Version | Host             | Remark
----               |   ---   |  ---             |  ---
Google Chrome      | Next    | Windows          | 
Postman            | Next    | Windows          | 
Visual Studio Code | Next    | Windows          | 
Power Shell        | Next    | Windows          | 
WSL                | 2.0     | Windows          | 
Ubuntu             | LTS     | Windows          | Based on WSL
nvm                | Next    | Ubuntu & Windows | 
node               | 16&18   | Ubuntu & Windows | 
git                | Next    | Ubuntu & Windows | 
Fira Code          | Next    | Windows          | 

### 常用软件

Name               | Version | Host             | Remark
----               |   ---   |  ---             |  ---
uTools             | Next    | Windows          | 
WPS                | Next    | Windows          | 
Wireshark          | Next    | Windows          | 