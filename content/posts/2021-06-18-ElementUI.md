---
layout: post
title:  "ElementUI 多页表格打印无表头"
date:   2021-06-18 00:00:00 +0800
categories: 
---
开发审批记录类系统过程中，使用者对于列表打印功能要求较多，虽然现在公司都为线上审批无纸化办公，但是难免还是会有需要将系统中的数据打印出来进行签字的需求，在传统制造业尤为明显。在自测过程中发现使用 Vue 加 element-ui 开发的产品，在打印长表格时打印多页会出现只有第一页有表头的情况。

![](https://less-1251975755.cos.ap-beijing.myqcloud.com/posts/2022-08-12%2011.00.22.png)

![](https://less-1251975755.cos.ap-beijing.myqcloud.com/posts/2022-08-12%2011.00.31.png)

在 HTML 中原生 table 表头若是用 thead 写，那打印时会自动优化将每页纸都加上表头，排查发现，element-ui 的表格组件为了实现表头浮动，将表头和表格内容部分分别放在两个 table 里且包在了两个 div 里，致使打印时无法自动为后续页添加表头

![](https://less-1251975755.cos.ap-beijing.myqcloud.com/posts/2022-08-12%2011.11.28.png)

## 解决思路
通过在打印时将原本的 thead 结构隐藏，并复制一份与 tbody 放在同一个 table 中，即可实现目标功能

复制结构：
```javascript
/*
index.vue
el-table标签 ref="mytable"
*/
<script>
export default{
// ...
  mounted() {
    this.$nextTick(() => { 
      let thead = this.$refs.mytable.$el.querySelector('.el-table__header-wrapper thead')
      let theadNew = thead.cloneNode(true)
      this.$refs.mytable.$el.querySelector('.el-table__body-wrapper table').appendChild(theadNew)
    })
  }
// ...
}
</script>
```
设置打印时 css 规则：
```css
.el-table >>> .el-table__body-wrapper table thead{
  display: none;
 }
@media print {
  .el-table >>> .el-table__header-wrapper{
    display: none;
  }
 .el-table >>> .el-table__body-wrapper table thead{
  display: table-header-group;
  }
}
```
## 优化
项目中用到的地方少的话可以在组件中直接书写，若广泛使用，可封装为组件，方便维护
```javascript
/* el-table-p.vue */
<script>
import {Table} from 'element-ui'
export default{
  extends: Table,
  mounted() {
    this.$nextTick(() => { 
      let thead = this.$el.querySelector('.el-table__header-wrapper thead')
      let theadNew = thead.cloneNode(true)
      this.$el.querySelector('.el-table__body-wrapper table').appendChild(theadNew)
    })
  }
}
</script>
<style scoped>
.el-table >>> .el-table__body-wrapper table thead{
  display: none;
 }
@media print {
  .el-table >>> .el-table__header-wrapper{
    display: none;
  }
 .el-table >>> .el-table__body-wrapper table thead{
  display: table-header-group;
  }
}
</style>
```
注册为全局组件：
```javascript
/* main.js */
import ElTableP from './components/el-table-p.vue'
Vue.component('el-table-p', ElTableP)
```
使用 table 时使用自定义的组件快速方便满足需求:
```HTML
<!--index.js=>template-->
  <el-table-p
    :data="tableData"
    ref="mytable"
    style="width: 800px; margin:0px auto">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table-p>
```
实现了每页打印都有表头的效果

![](https://less-1251975755.cos.ap-beijing.myqcloud.com/posts/2022-08-12%2011.47.17.png)
