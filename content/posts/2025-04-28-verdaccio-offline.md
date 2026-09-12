---
layout: post
title:  "离线环境 npm 私服搭建"
date:   2025-04-28 12:00:00 +0800
categories: 
---

[https://github.com/moselikk/verdaccio-offline](https://github.com/moselikk/verdaccio-offline)


## 离线环境 npm 私服搭建 

创建 verdaccio 离线镜像：
> 联网的 linux 环境，需要 docker

1. 拉取镜像 `docker pull verdaccio/verdaccio`
2. 打包镜像 `docker save -o verdaccio.tar verdaccio/verdaccio:latest`
3. 生成的镜像文件为 `verdaccio.tar`

操作步骤：
1. 将项目所有文件及 verdaccio.tar 拷贝至离线机器下，本项目暂时只支持 linux 机器作为私服服务器，私服依赖 docker
2. 在离线机器下运行 `docker load -i verdaccio.tar` 加载 verdaccio docker 镜像
3. 将 `verdaccio-config.zip` 文件解压，假设解压后在目录 `/home/ming/verdaccio-config`
4. 配置文件在 `/home/ming/verdaccio-config/conf/config.yaml` 中，可根据需要更改配置
5. 离线机器中运行：
 ```bash
V_PATH=/home/ming/verdaccio-config; docker run -it --rm --name verdaccio   -p 4873:4873   -v $V_PATH/conf:/verdaccio/conf   -v $V_PATH/storage:/verdaccio/storage   -v $V_PATH/plugins:/verdaccio/plugins   verdaccio/verdaccio
```
6. 如需后台运行可加 `-d` 参数，`V_PATH=/home/ming/verdaccio-config` 根据第四步文件存放位置进行更改
7. 访问 `http://your-offline-server-ip:4873/` 验证私服是否启动成功
8. 在有网机器中新建一个文件夹，并将项目 `package.json` 文件复制至此文件夹，执行 `npm insatll` 安装所有依赖
9. 将脚本文件 `generate-pkg-files.cjs` `publish.cjs` 拷贝至上一步建立的文件夹中
10. 运行脚本 `node generate-pkg-files.cjs` 打包所有依赖，如有打包失败的，运行完后再次运行，直至所有依赖包都打包成功
11. `npm config set registry http://your-offline-server-ip:4873/` 设置源为私服，`npm login` 登陆， 配置文件已有一个用户 admin/123456
12. 运行脚本 `publish.cjs ./pkg` 可在脚本中指定私服地址，或者在命令中指定 `publish.cjs ./pkg http://your-offline-server-ip:4873/` 上传所有依赖包到私服，如有失败的，运行完后再次运行，直至所有依赖包都上传成功
13. 在离线环境使用私服验证 `npm install --registry http://your-offline-server-ip:4873/` 安装项目依赖
14. 如果不报错，且安装依赖后项目可以正常启动，恭喜你离线私服搭建成功！

---

> 可使用 `npm install --verbose` 安装依赖以获取更多 log 信息

> 后续私服如需添加包在联网环境的机器中新建一个空 node 项目，安装所需包，然后执行以上 10-11 操作即可
