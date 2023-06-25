---
layout: post
title:  "Nginx Conf"
date:   2023-06-25 22:00:00 +0800
categories: 
---


Nginx 是一种高性能的 Web 服务器软件，也可以充当反向代理服务器、负载均衡器等。在使用 Nginx 时，经常会遇到需要根据请求的路径进行转发或者重定向的情况，本文将详细讲解如何配置Nginx根据路径转发的步骤。

### 1. 配置location指令
在 Nginx 中，可以使用 location 指令来匹配请求的 URI，然后进行转发或重定向。下面是 location 指令的语法格式：
```yml
location [ = | ~ | ~* | ^~ ] uri {
    . . .
}
```
其中：

- = 表示精确匹配 URI；
- ~ 表示区分大小写的正则表达式匹配 URI；
- ~* 表示不区分大小写的正则表达式匹配 URI；
- ^~ 表示普通字符匹配URI。
对于大部分情况，我们使用最简单的普通字符匹配即可。比如下面的配置：
```yml
location /api {
    proxy_pass http://127.0.0.1:8000;
}
```
这个配置表示，如果请求的 URI 以 /api 开头，Nginx 就会将请求转发到 http://127.0.0.1:8000 这个地址。注意，这里的 /api 应该是相对于 Nginx 根路径的相对路径，并不是绝对路径。

### 2. 配置rewrite指令
如果我们想要对请求的 URI 进行重定向，可以使用 rewrite 指令。比如下面的配置：
```yml
location /old {
    rewrite ^/old(.*)$ /new$1 permanent;
}
```
这个配置表示，如果请求的URI以 /old 开头，Nginx就会将URI中的 /old 替换成 /new 并进行重定向。注意，这里的重定向是永久重定向（301），如果需要临时重定向（302），可以将 permanent 改为 redirect。

示例一：转发 API 请求
假设我们有一个 Web 应用，需要将所有 API 请求转发到后台的 API 服务器，API 服务器的地址是 http://api.example.com，我们可以在 Nginx 中加入下面的配置：
```yml
location /api {
    proxy_pass http://api.example.com;
}
```
这个配置表示，如果请求的 URI 以 /api 开头，Nginx 就会将请求转发到 http://api.example.com 这个地址。比如说，如果有一个请求 /api/users/1，Nginx 就会将请求转发到 http://api.example.com/api/users/1 这个地址，然后将 API 服务器返回的响应返回给客户端。

示例二：多站点部署
假设我们有两个 Web 应用，分别是前端应用和后台管理应用，前端应用的地址是 http://example.com，后台管理应用的地址是 http://admin.example.com，我们可以在 Nginx 中加入下面的配置：

### 前端应用配置
```yml
server {
    server_name example.com;
    location / {
        root /var/www/example.com;
        index index.html;
    }
}
```

### 后台管理应用配置
```yml
server {
    server_name admin.example.com;
    location / {
        proxy_pass http://127.0.0.1:8000;
    }
}
```
这个配置表示，如果请求的域名是 example.com，并且请求的 URI 不以 /api 开头，Nginx 就会将请求映射到 /var/www/example.com 目录下的静态文件，例如 /index.html；如果请求的域名是 admin.example.com，或者请求的 URI 以 /api 开头，Nginx 就会将请求转发到 http://127.0.0.1:8000 这个应用服务器，这个服务器可以是一个 Django 应用、Flask 应用、Node.js 应用等。

注意，这个配置中我们使用了不同的虚拟主机（server）来处理不同的域名，这样可以让不同的应用使用不同的配置。并且，我们在后台管理应用的 location 中加入了 /api 前缀的匹配，这是为了将 API 请求转发到后台的 API 服务器，和前端应用的静态文件请求区分开来。

