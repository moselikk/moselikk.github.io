---
layout: post
title:  "Git 常用命令速查"
date:   2022-10-30 19:00:00 +0800
categories: 
---

Git 官网：[https://git-scm.com/](https://git-scm.com/)

官方文档：[https://git-scm.com/docs](https://git-scm.com/docs)

阮一峰整理：[https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

全部命令： [https://git-scm.com/docs/git#_git_commands](https://git-scm.com/docs/git#_git_commands)

GitHub Cheat Sheet：[https://training.github.com/](https://training.github.com/)

## 创建仓库

创建仓库有多种方式，可以直接复制一个已经创建好的仓库的全部文件，git 即刻可用；可以从 github 等远程仓库 clone，克隆的项目 git 也是就绪的；可以使用```git init```初始化本地 git 仓库。

``` $ git init ```

将所在目录初始化为一个 git 仓库

``` $ git init [project-name] ```

新建一个目录，将其初始化为 Git 仓库


``` $ git remote add origin [url] ```

链接本地仓库与远程仓库

``` $ git clone [url] ```

Clone（下载）一个已存在于的仓库和它的整个代码历史

## Git配置

Git的设置文件为 .gitconfig，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）

``` $ git config --list```

显示当前的 Git 配置


``` $ git config --global user.name "[name]" ```

对你的 commit 操作设置关联的用户名

``` $ git config --global user.email "[email address]" ```

对你的 commit 操作设置关联的邮箱地址

``` $ git config --global color.ui auto ```

启用有帮助的彩色命令行输出

## 分支

``` $ git branch ```

列出所有本地分支

``` $ git branch -r ```

列出所有远程分支

``` $ git branch -a ```

列出所有本地分支和远程分支

``` $ git branch [branch-name] ```

创建分支（但依然停留在当前分支）

``` $ git checkout -b [branch] ```

新建一个分支，并切换到该分支

``` $ git checkout [branch-name] ```

切换到指定分支，并更新工作区

``` $ git switch -c [branch-name] ```

切换到指定分支并更新工作目录 （working directory）（>git 2.23）

``` $ git checkout - ```

切换到上一个分支

``` $ git merge [branch] ```

将指定分支的历史合并到当前分支。这通常在拉取请求(PR)中完成，但也是一个重要的 Git 操作。

``` $ git cherry-pick [commit] ```

选择一个 commit，合并进当前分支

``` $ git branch -d [branch-name] ```

删除指定分支

``` $ git push origin --delete [branch-name] ```

``` $ git branch -dr [remote/branch] ```

删除远程分支


## 增加/删除文件

``` $ git add [file1] [file2] ... ```

添加指定文件到暂存区

``` $ git add [dir] ```

添加指定目录到暂存区，包括目录下所有子目录及文件

``` $ git add . ```

添加当前目录的所有文件到暂存区


``` $ git add -p ```

添加每个变化前，都会要求确认；对于同一个文件的多处变化，可以实现分次提交（细颗粒度的控制）

``` $ git rm [file1] [file2] ... ```

删除工作区文件，并且将这次删除放入暂存区

``` $ git rm --cached [file] ```

停止追踪指定文件，但该文件会保留在工作区

``` $ git mv [file-original] [file-renamed] ```

改名文件，并且将这个改名放入暂存区

## 代码提交


``` $ git commit -m [message] ```

提交暂存区到仓库区

``` $ git commit [file1] [file2] ... -m [message] ```

提交暂存区的指定文件到仓库区

``` $ git commit -a ```

提交工作区自上次 commit 之后的变化，直接到仓库区

``` $ git commit -v ```

提交时显示所有 diff 信息

``` $ git commit --amend -m [message] ```

使用一次新的 commit，替代上一次提交
如果代码没有任何新变化，则用来改写上一次 commit 的提交信息

``` $ git commit --amend [file1] [file2] ... ```

重做上一次 commit，并包括指定文件的新变化

## 远程同步

``` $ git fetch [remote] ```

下载远程仓库的所有变动

``` $ git remote -v ```

显示所有远程仓库

``` $ git remote show [remote] ```

显示某个远程仓库的信息

``` $ git remote add [shortname] [url] ```

增加一个新的远程仓库，并命名

``` $ git pull [remote] [branch] ```

取回远程仓库的变化，并与本地分支合并

``` $ git push [remote] [branch] ```

上传本地指定分支到远程仓库

``` $ git push [remote] --force ```

强行推送当前分支到远程仓库，即使有冲突

``` $ git push [remote] --all ```

推送所有分支到远程仓库

``` $ git push --set-upstream origin my-branch ```

将本地创建的分支推送到远程仓库

## 撤销

``` $ git checkout [file] ```

恢复暂存区的指定文件到工作区（撤销对 file 文件的修改）

``` $ git checkout [commit] [file] ```

恢复某个 commit 的指定文件到暂存区和工作区

``` $ git checkout . ```

恢复暂存区的所有文件到工作区

``` $ git reset [file] ```

重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变

``` $ git reset --hard ```

重置暂存区与工作区，与上一次 commit 保持一致

``` $ git reset [commit] ```

重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变

``` $ git reset --hard [commit] ```

重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致

``` $ git reset --keep [commit] ```

重置当前 HEAD 为指定 commit，但保持暂存区和工作区不变

``` $ git revert [commit] ```

新建一个 commit，用来撤销指定 commit
后者的所有变化都将被前者抵消，并且应用到当前分支

``` $ git stash ```

``` $ git stash pop ```

暂时将未提交的变化移除，稍后再移入

``` $ git reset HEAD^ ```

上次提交内容会被保存到工作目录

``` $ git reset --hard HEAD^ ```

上次提交内容会被直接丢弃

## 标签

``` $ git tag ```

列出所有 tag

``` $ git tag [tag] ```

新建一个 tag 在当前 commit

``` $ git tag [tag] [commit] ```

新建一个 tag 在指定 commit

``` $ git tag -d [tag] ```

删除本地 tag

``` $ git push origin :refs/tags/[tagName] ```

删除远程 tag

``` $ git show [tag] ```

查看 tag 信息

``` $ git push [remote] [tag] ```

提交指定 tag

``` $ git push [remote] --tags ```

提交所有 tag

``` $ git checkout -b [branch] [tag] ```

新建一个分支，指向某个 tag

## 查看信息

``` $ git status ```

显示有变更的文件

``` $ git log ```

显示当前分支的版本历史

``` $ git log --stat ```

显示 commit 历史，以及每次 commit 发生变更的文件

``` $ git log -S [keyword] ```

搜索提交历史，根据关键词

``` $ git log [tag] HEAD --pretty=format:%s ```

显示某个 commit 之后的所有变动，每个 commit 占据一行

``` $ git log [tag] HEAD --grep feature ```

显示某个 commit 之后的所有变动，其"提交说明"必须符合搜索条件

``` $ git log --follow [file] ```

``` $ git whatchanged [file] ```

显示某个文件的版本历史，包括文件改名

``` $ git log -p [file] ```

显示指定文件相关的每一次 diff

``` $ git log -5 --pretty --oneline ```

显示过去 5 次提交

``` $ git shortlog -sn ```

显示所有提交过的用户，按提交次数排序

``` $ git blame [file] ```

显示指定文件是什么人在什么时间修改过

``` $ git diff ```

显示暂存区和工作区的差异

``` $ git diff --cached [file] ```

显示暂存区和上一个 commit 的差异

``` $ git diff HEAD ```

显示工作区与当前分支最新 commit 之间的差异

``` $ git diff [first-branch]...[second-branch] ```

显示两次提交之间的差异

``` $ git diff --shortstat "@{0 day ago}" ```

显示今天你写了多少行代码

``` $ git show [commit] ```

显示某次提交的元数据和内容变化

``` $ git show --name-only [commit] ```

显示某次提交发生变化的文件

``` $ git show [commit]:[filename] ```

显示某次提交时，某个文件的内容

``` $ git reflog ```

显示当前分支的最近几次提交

---

## 命令行中图形化显示提交日志

``` $ git log --graph --oneline ```

图形化显示当前分支的提交日志

``` $ git log --graph --patch ```

图形化显示当前分支的提交日志及每次提交的变更内容

``` $ git log --graph --oneline --all ```

图形化显示所有分支的提交日志

``` $ git log --graph --patch --all ```

图形化显示所有分支的提交日志及每次提交的变更内容

## Git diff

``` $ git diff ```

比较当前工作区和 Git 的 staging area 里内容的区别

``` $ git diff --staged ```

比较 Git 的 staging area 和当前分支指向内容的区别

``` $ git diff <commit> <commit> ```

比较任意两次提交指向内容的区别

## git checkout 和 git switch 的区别

是这样的，git checkout 是用于创建和切换分支的旧命令。它还可以用于恢复来自某个提交的修改。但是 git checkout 能做的不仅仅是这些，它还可以让你从任何分支复制文件或直接提交到当前工作区中，而无需切换分支。

实际上，git checkout 做了三件事情：

1）切换分支；

2）从暂存区复制文件到工作区（放弃当前修改）；

3）从其他区复制文件到工作区；

如果你不明白，那没关系，只需要记住：git checkout 能做的不仅仅是分支的切换，还有很多其他额外的功能，而这些额外的功能，增加了 git checkout 这个命令的复杂性。

因此，从 git 2.23 版本发布以后，引入了两个新的命令：git switch 和 git restore。

这样做的目的，是为了让人们使用 git switch 来切换分支，使用 git restore 来撤销本地修改。与此同时，git checkout 仍然被保存，用于提供更高级的选项来处理各种更加复杂的操作。

如果是切换分支，请使用 git switch 命令而不是 git checkout。为什么？因为它就是为这个特定任务创建的。对于新的 git 用户，更容易记住 git switch 用于切换分支，git restore 用于恢复修改。

因此，对于切换和创建分支这个操作来说，使用 git switch 命令替代 git checkout 是被提倡的做法。

## git 修改 .gitignore 文件 不生效

原因是 .gitignore 只能忽略那些原来没有被 track 的文件，如果某些文件已经被纳入了版本管理中，则修改 .gitignore 是无效的。那么解决方法就是先把本地缓存删除（改变成未 track 状态），然后再提交：

```bash
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```
停止追踪某文件，重点命令

```$ git rm —cached -r [file]```

停止追踪指定文件，但该文件会保留在工作区

## commit 之后 git 自动将 lf 转换成 crlf，导致行末 eslint 飘黄

修改 git 全局配置，禁止 git 自动将 lf 转换成 crlf

```bash
git config --global core.autocrlf false
```
