---
layout: post
title:  "前端速查自用"
date:   2020-11-8 10:56:00 +0800
categories: 
---

## HTML

1. **系统结构**
    - B/S架构
        Browser / Server
    - C/S架构
        Client / Server

        *企业一般用B/S架构*
        
        *游戏 、APP等用C/S架构*  
---

- ASP是Active Server Page的缩写，意为“活动服务器网页”，ASP的网页文件的格式是.asp，现在常用于各种动态网站中。与HTML相比，ASP网页具有6大特点。
ASP是Active Server Page的缩写，意为“活动服务器网页”。ASP是微软公司开发的代替CGI脚本程序的一种应用,它可以与数据库和其它程序进行交互，是一种简单、方便的编程工具。ASP的网页文件的格式是.asp，现在常用于各种动态网站中。 ASP是一种服务器端脚本编写环境，可以用来创建和运行动态网页或web应用程序。ASP网页可以包含HTML标记、普通文本、脚本命令以及COM组件等。利用ASP可以向网页中添加交互式内容（如在线表单），也可以创建使用HTML网页作为用户界面的web应用程序。
与HTML相比，ASP网页具有以下特点：
    1. 利用ASP可以实现突破静态网页的一些功能限制，实现动态网页技术；
    2. ASP文件是包含在HTML代码所组成的文件中的，易于修改和测试；
    3. 服务器上的ASP解释程序会在服务器端制定ASP程序，并将结果以HTML格式传送到客户端浏览器上，因此使用各种浏览器都可以正常浏览ASP所产生的网页；
    4. ASP提供了一些内置对象，使用这些对象可以使服务器端脚本功能更强。例如可以从web浏览器中获取用户通过HTML表单提交的信息，并在脚本中对这些信息进行处理，然后向web浏览器发送信息；
    5. ASP可以使用服务器端ActiveX组建来执行各种各样的任务，例如存取数据库、发现哦那个Email或访问文件系统等。
    6. 由于服务器是将ASP程序执行的结果以HTML格式传回客户端浏览器，因此使用者不会看到ASP所编写的原始程序代码，可放置ASP程序代码被窃取。

- HTML ul li标签可用于菜单栏（apple官网 w3school）
```html
    <div id="navfirst">
    <ul id="menu">
    <li id="h"><a href="/h.asp" title="HTML 系列教程">HTML 系列教程</a></li>
    <li id="b"><a href="/b.asp" title="浏览器脚本教程">浏览器脚本</a></li>
    <li id="s"><a href="/s.asp" title="服务器脚本教程">服务器脚本</a></li>
    <li id="p"><a href="/p.asp" title="编程教程">编程教程</a></li>
    <li id="x"><a href="/x.asp" title="XML 系列教程">XML 系列教程</a></li>
    <li id="w"><a href="/w.asp" title="建站手册">建站手册</a></li>
    <li id="r"><a href="/r.asp" title="参考手册">参考手册</a></li>
    </ul>
    </div>
```
- JS使用事件监听器(一种事件绑定方式)时，使用函数时不带有'()'，因为'()'表示函数会在页面加载到这里时运行，而不是事件触发时执行。匿名函数不同，虽然也有小括号，但其只会在事件触发时执行。
- JS将事件绑定的到元素的方式有三种：HTML事件处理程序（老式方法以不再使用，旧代码中可能会有）；传统的DOM事件处理程序：DOM监听器。
- 如果需要向事件处理程序或事件监听器所调用的函数传递参数，就需要把方法调用封装在“匿名函数”中。（将命名函数封装成匿名函数） 例：function() {checkUsername(5)}

- value 值
- source 源头，来源
- element 元素，基本部分
- event 事件
- selector 选择器
- node 节点
- query 查询指令

## JavaScript 的组成分为三个部分：

- ECMAScript
- DOM：标签元素相关的API
- BOM：浏览器相关的API

## Node.js 的组成分为：

- **ECMAScript**。ECMAScript 的所有语法在 Node 环境中都可以使用。
- **Node 环境**提供的一些**附加 API**(包括文件、网络等相关的 API)。

## Form表单

- `<fieldset>` 标签将表单里的内容进行打包，代表一组；而`<legend>`标签的则是 fieldset 里的元素定义标题。

### **表单属性**

- `placeholder` 占位符（提示文字）
- `autofocus` 自动获取焦点
- `multiple` 文件上传多选或多个邮箱地址
- `autocomplete` 自动完成（填充的）。on 开启（默认），off 取消。用于表单元素，也可用于表单自身(on/off)
- `form` 指定表单项属于哪个form，处理复杂表单时会需要
- `novalidate` 关闭默认的验证功能（只能加给form）
- `required` 表示必填项
- `pattern` 自定义正则，验证表单。

### **表单事件**

- `oninput()`：用户输入内容时触发，可用于输入字数统计。
- `oninvalid()`：验证不通过时触发。比如，如果验证不通过时，想弹出一段提示文字，就可以用到它。

## **多媒体**

在HTML5之前，在网页上播放音频/视频的通用方法是利用Flash来播放。但是大多情况下，并非所有用户的浏览器都安装了Flash插件，由此使得音频、视频播放的处理变得非常复杂；并且移动设备的浏览器并不支持Flash插件。H5里面提供了视频和音频的标签。

```html
<audio src="music/yinyue.mp3" autoplay controls> </audio>
```
<audio src="music/yinyue.mp3" autoplay controls> </audio>

```html
<video src="video/movie.mp4" controls autoplay></video>
```
<video src="video/movie.mp4" controls autoplay></video>

## **DOM 操作**

### **获取元素**

- `document.querySelector("selector")` 通过CSS选择器获取符合条件的第一个元素。
- `document.querySelectorAll("selector")` 通过CSS选择器获取符合条件的所有元素，以类数组形式存在。

### **类名操作**

- `Node.classList.add("class")` 添加class
- `Node.classList.remove("class")` 移除class
- `Node.classList.toggle("class")` 切换class，有则移除，无则添加
- `Node.classList.contains("class")` 检测是否存在class

### **自定义属性**

js 里可以通过 `box1.index=100;` `box1.title` 来自定义属性和获取属性。

H5可以直接在标签里添加自定义属性，**但必须以 `data-` 开头**。

### CSS关键词

BOX 盒模型

- `width`宽&`height`高  `content`内容
- `padding`：内边距
- `border`：边框
- `margin`：外边距
- `border`属性：宽度 样式 颜色（样式：`solid`实线、`dashed`点画线、`dotted`虚线）

**浮**

- float 浮动属性 （值：left right）

定位属性

- `position` 位置
- `absolute` 绝对的
- `relative` 相对的
- `fixed` 使···固定，确定的
- `flat`  水平的
- `infinite` 无限的
- `count`  数数
- `normal` 正常
- `alternate` 反向
- `steps` 迈步（动画不连续执行-间断执行）
- `opacity:` 0.3; 设置图片不透明度 值0-1 0:完全透明 1:完全不透明

JS **生成 [x, y) 之间的随机数**

```jsx
Math.round(Math.random()*(y-x)+x)
```

### **【重要】生成 [x, y]之间的随机整数**

也就是说：生成两个整数之间的随机整数，**并且要包含这两个整数**。

这个功能很常用，我们可以将其封装成一个方法，代码实现如下：

```jsx
    /*
    * 生成两个整数之间的随机整数，并且要包含这两个整数
    */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    console.log(getRandom(1, 10));
```

### **时间戳的定义和作用**

**时间戳**：指的是从格林威治标准时间的`1970年1月1日，0时0分0秒`到当前日期所花费的**毫秒数**（1秒 = 1000毫秒）。

计算机底层在保存时间时，使用的都是时间戳。时间戳的存在，就是为了**统一**时间的单位。

我们经常会利用时间戳来计算时间，因为它更精确。而且，在实战开发中，接口返回给前端的日期数据，都是以时间戳的形式。

### **获取当前时间的时间戳**

如果我们要获取**当前时间**的时间戳，除了上面的几种方式之外，还有另一种方式。代码如下：

```jsx
// 方式六：获取当前时间的时间戳（很常用的写法）
console.log(Date.now()); // 打印结果举例：1589448165370
```

上面这种方式六，用得也很多。只不过，`Date.now()`是H5标准中新增的特性，如果你的项目需要兼容低版本的IE浏览器，就不要用了。这年头，谁还用IE呢？

### **利用时间戳检测代码的执行时间**

我们可以在业务代码的前面定义 `时间戳1`，在业务代码的后面定义 `时间戳2`。把这两个时间戳相减，就能得出业务代码的执行时间。

### **举例1：模拟日历**

要求每天打开这个页面，都能定时显示当前的日期。

代码实现：

```jsx
<!DOCTYPE html>
<html>
    <head lang="en">
        <meta charset="UTF-8" />
        <title></title>
        <style>
            div {
                width: 800px;
                margin: 200px auto;
                color: red;
                text-align: center;
                font: 600 30px/30px 'simsun';
            }
        </style>
    </head>
    <body>
        <div></div>

        <script>
            //模拟日历
            //需求：每天打开这个页面都能定时显示年月日和星期几
            function getCurrentDate() {
                //1.创建一个当前日期的日期对象
                const date = new Date();
                //2.然后获取其中的年、月、日和星期
                const year = date.getFullYear();
                const month = date.getMonth();
                const hao = date.getDate();
                const week = date.getDay();
                //        console.log(year+" "+month+" "+hao+" "+week);
                //3.赋值给div
                const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                const div = document.getElementsByTagName('div')[0];
                return '今天是：' + year + '年' + (month + 1) + '月' + hao + '日 ' + arr[week];
            }

            const div = document.getElementsByTagName('div')[0];
            div.innerText = getCurrentDate();
        </script>
    </body>
</html>
```

### 数组

**使用字面量创建数组**

```jsx
var arr1 = []; // 创建一个空的数组

var arr2 = [1, 2, 3]; // 创建带初始值的数组
```

**使用构造函数创建数组**

```jsx
let arr = new Array(参数);

let arr = Array(参数);
```

如果**参数为空**，则表示创建一个空数组；如果参数是**一个数值**时，表示数组的长度；如果有多个参数时，表示数组中的元素。

```jsx
// 方式一
var arr1 = [11, 12, 13];

// 方式二
var arr2 = new Array(); // 参数为空
var arr3 = new Array(4); // 参数为一个数值
var arr4 = new Array(15, 16, 17); // 参数为多个数值

console.log(typeof arr1); // 打印结果：object

console.log('arr1 = ' + JSON.stringify(arr1));
console.log('arr2 = ' + JSON.stringify(arr2));
console.log('arr3 = ' + JSON.stringify(arr3));
console.log('arr4 = ' + JSON.stringify(arr4));
```

结果：

```jsx
object;

arr1 = [11, 12, 13];
arr2 = [];
arr3 = [null, null, null, null];
arr4 = [15, 16, 17];
```

- `***JSON.stringify(arr)`  将数组转换为字符串       ————***!!!

数组转字符串方式

```jsx
字符串 = 数组.toString();
字符串 = String(数组);
字符串 = 数组.join(','); // 将数组转为字符串，每一项用 英文逗号 分隔
```

- `A instanceof B`来判断 A 是否属于 B 类型

- **数组合并的另一种方式**：
    
    我们可以使用`...`这种展开语法，将两个数组进行合并。举例如下：
    

```jsx
const arr1 = [1, 2, 3];

const result = ['a', 'b', 'c', ...arr1];
console.log(JSON.stringify(result)); // 打印结果：["a","b","c",1,2,3]
```

- 数组排序

```jsx
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <script>
            let dataList = [
                {
                    title: '品牌鞋子，高品质低价入手',
                    publishTime: 200,
                },
                {
                    title: '不是很贵，但是很暖',
                    publishTime: 100,
                },
                {
                    title: '无法拒绝的美食，跟我一起吃吃',
                    publishTime: 300,
                },
            ];

            console.log('example 排序前的数组：' + JSON.stringify(dataList));

            // 将dataList 数组，按照 publishTime 字段，从小到大排序。（会改变原数组）
            dataList.sort((a, b) => parseInt(a.publishTime) - parseInt(b.publishTime));

            console.log('example 排序后的数组：' + JSON.stringify(dataList));
        </script>
    </body>
</html>
```

打印结果：

```jsx
example 排序前的数组：[
    {"title":"窗前明月光","publishTime":200},
    {"title":"疑是地上霜","publishTime":100},
    {"title":"举头望明月","publishTime":300}
]

example 排序后的数组：[
    {"title":"疑是地上霜","publishTime":100},
    {"title":"窗前明月光","publishTime":200},
    {"title":"举头望明月","publishTime":300}
]
```

上方代码中，有人可能会问： publishTime 字段已经是 int 类型了，为啥在排序前还要做一次 parseInt() 转换？这是因为，这种数据，一般是后台接口返回给前端的，数据可能是 int 类型、也可能是字符串类型，所以还是统一先做一次 partInt() 比较保险。这是一种良好的工作习惯。

- 将一个字符串数组输出为`|`分割的形式

```jsx
var arr = ['jay', 'gem', 'jj'];

console.log(arr.join('|'));
```

- **创建数组对象：**
1.使用字面量创建数组        `var arr = [1,2,3];`
2.使用构造函数创建数组   `let arr = new Array(参数);`

- DOM设置节点的属性值

```jsx
		元素节点.setAttribute("属性名", "新的属性值");
		//举例：
		myNode.setAttribute("src","images/3.jpg");
    myNode.setAttribute("class","image3-box");
    myNode.setAttribute("id","你好");
```

- **如果是节点的“原始属性”**（比如 普通标签的`class/className`属性、普通标签的`style`属性、普通标签的 title属性、img 标签的`src`属性、超链接的`href`属性等），**方式1和方式2是等价的**，可以混用。怎么理解混用呢？比如说：用 `div.title = '我是标题'`设置属性，用 `div.getAttribute('title')`获取属性，就是混用。
“非原始属性”，在使用这两种方式时，是有区别的。
非原始属性需要get值和set值必须使用同一种方法。
- **innerHTML和innerText的区别
1.**value：标签的value属性。
2.**innerHTML**：双闭合标签里面的内容（包含标签）。
3.**innerText**：双闭合标签里面的内容（不包含标签）。（老版本的火狐用textContent）

## ES6

### **let 和 const 的特点【重要】**

- 不属于顶层对象 Window
- 不允许重复声明
- 不存在变量提升
- 暂时性死区
- 支持块级作用域

相反， 用`var`声明的变量：存在变量提升、可以重复声明、**没有块级作用域**。

### **var/let/const 的共同点**

- 全局作用域中定义的变量，可以在函数中使用。
- 函数中声明的变量，只能在函数及其子函数中使用，外部无法使用。

## 异步编程

### 1.浏览器兼容：处理低版本的浏览器显示问题一直是前端开发人员头痛的问题之一。移动设备兼容性较好，ie6已经越来越少人用了。**服务器分类及PHP入门**

### **C/S架构**

是Client/Server这两个单词的首字母，指的是客户端，服务器。

优点:

- 性能较高：可以将一部分的计算工作放在客户端上,这样服务器只需要处理数据即可。
- 界面酷炫:客户端可以使用更多系统提供的效果,做出更为炫目的效果。

缺点:

- 更新软件：如果有新的功能，就要推出新的版本。
- 不同设备访问：如果使用其他的电脑，没有安装客户端的话就无法登陆软件。

### **B/S架构**

是Browser/Server的这两个单词的首字母。指的是浏览器、服务器，是WEB兴起之后的一种架构。

现在所有的网站都是B/S架构，较为常见的例子有百度、知乎、网易云音乐Web等等，只需要通过浏览器即可使用.

优点：

- 更新简洁：如果需要更新内容了,对开发人员而言需要更改服务器的内容，对用户而言只需要刷新浏览器即可。
- 多设备同步：所有数据都在网上,只要能够使用浏览器即可登录使用。

缺点:

- 性能较低：相比于客户端应用性能较低,但是随着硬件性能的提升,这个差距在缩小。
- 浏览器兼容：处理低版本的浏览器显示问题一直是前端开发人员头痛的问题之一。移动设备兼容性较好，ie6已经越来越少人用了。

## **服务器分类**

项目开发时，有三套环境：

- Development 开发环境
- Test 测试环境
- Production 生产环境

程序员平时干活儿用开发环境；开发完成后，部署到测试环境；测试完成后，产品上线，部署到生产环境。

三套环境意味着三个服务器。

### **服务器类型**

按类型分：

- 文件服务器
- 数据库服务器
- 邮件服务器
- Web 服务器等

按软件分：

- Apache 服务器
- Nginx 服务器
- IIS 服务器
- Tomcat 服务器
- Node 服务器等

按操作系统分：

- Linux服务器
- Windows服务器等

### **服务器软件**

**提供了某种服务的计算器，我们称之为服务器。**那么这些赋予计算器各种服务功能的软件主要有哪一些呢？

常见的服务器软件有：

- 文件服务器：Server-U、FileZilla、VsFTP等
*ming: freeNAS*
- 数据库服务器：Oracle、MySQL、PostgreSQL、MSSQL等；
- 邮件服务器：Postfix、Sendmail等；
- HTTP 服务器：Apache（免费、开源）、Nginx、IIS（微软的.net服务器）、Tomcat（java编程的服务器）、NodeJS 等。

## Ajax

- **Ajax：Asynchronous Javascript And XML（异步 JavaScript 和 XML)**
它并不是凭空出现的新技术，而是对于现有技术的结合。Ajax 的核心是 js 对象：**XMLHttpRequest**。
- **发送 Ajax 请求的五个步骤**：
    
    （1）创建异步对象，即 XMLHttpRequest 对象。
    
    （2）使用 open 方法设置请求参数。`open(method, url, async)`。参数解释：请求的方法、请求的 url、是否异步。第三个参数如果不写，则默认为 true。
    
    （3）发送请求：`send()`。
    
    （4）注册事件：注册 onreadystatechange 事件，状态改变时就会调用。
    
    如果要在数据完整请求回来的时候才调用，我们需要手动写一些判断的逻辑。
    
    （5）服务端响应，获取返回的数据。
    

## deno

- deno为node.js作者做的 和node.js功能类似

## —定律—haha

- Jeff Atwood 在 2007 年提出了著名的 Atwood 定律：**任何能够用 JavaScript 实现的应用系统，最终都必将用 JavaScript 实现**。 Jeff Atwood 是谁不重要（他是 Stack Overflow 网站的联合创始人），重要的是这条定律。

## ES6

现在有了 ES6 语法，字符串拼接可以这样写：

```jsx
var name = 'Taylor';
    var age = '18';

    console.log('name:'+name+',age:'+age);   //传统写法

    console.log(`name:${name},age:${age}`);  //ES6 写法
```

注意，上方代码中，倒数第二行用的是单引号，最后一行用的是反引号（在tab键的上方）。

## 组件

- 组件：构成页面局部功能的代码和资源的集合

### 对象

- 一般对象
- 数组对象
- 函数对象

## JSX语法规则：

1. 创建虚拟DOM时，不要写引号；
2. 标签中要混入js表达式，要是用{}
3. 标签中样式的类名要用className指定
4. 标签中的内联样式要用`style=\{\{color:'white'\}\}`，注意属性名转为小驼峰
5. 只能有一个根标签
6. 标签必须闭合
7. 关于标签首字母
- 若首字母小写，那么React就会去寻找与之同名的html标签
若找见，直接转为html同名元素
若未找见，报错
- 若首字母大写，那么React就会去寻找与之同名的组件
若找见，那么就是用组件
若未找见，报错

## 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

- 示例：`我的名字是${name}`

### 解构赋值

- const {isHot} = this.state
    
    对象和数组可以解构赋值
    
    必须保证等号右边是对象或数组，对象用{}， 数组用[],逗号占位[,,3],拿的是第三个
    
    实质是：const isHot = this.state.isHot
    
    连续解构赋值：{state:{isHot}} = this
    
- {isHot ? ‘炎热’ : ‘凉爽’}

### React绑定事件监听

1. React对原生事件进行了二次封装，使用小驼峰命名。例如：onClick
2. 事件绑定函数用{}包裹，不可以加()，加了会立马执行。例如：onClick={show}
3. ES原生绑定事件有三种

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Document</title>
	</head>
	<body>
		<button id="btn">点我</button>

		<script type="text/javascript" >
			const btn = document.getElementById('btn')

			btn.onclick = (event)=>{
				console.log(event)
			}

			/* btn.addEventListener('click',()=>{
				alert(1)
			}) */

			/* function show() {
				alert(1)
			} */
		</script>
	</body>
</html>
```

- 类里边赋值语句，是增加类的属性，等号左边为属性名，等号右边为属性值

## 严格模式 ’use strict’

- 严格模式可以局部开启
- 类中所有定义的方法，浏览器在运行时 ，全都加上了 ‘ use strict’

## JS类

- 类里边的方法，都在类的原型上
- 改变this指向：call，apply，bind(更改this指向，但是不调用)

## ...展开语法

- 可以展开数组，有@@iterator迭代器
- ...默认不能展开对象，但是包在另外一个对象里可以展开另一个对象。浅克隆对象
    
    可以修改，合并对象
    
- 打包，拆包

### 回调函数三个特点

1. 自己定义的
2. 自己没调用
3. 得执行

### 箭头函数

- 箭头函数没有自的this，用this会向外层找
- 箭头函数只有一个参数可以省略()，只有一行代码可以省略{}

### 对象属性

- 对象中的属性名都是字符串
- 操作对象属性，一种是Person.a  |  一种是Person[a] (可读变量)

## 对象简写方式

```jsx
let a = 'abcde'
let obj = {a:a}
let obj = {a} //变量与属性同名可简写
```

### React状态提升

- 和兄弟组件公用的状态放在父组件，或祖组件里

### JSX

- JSX不能直接渲染对象，需要是数组

## 项目

- 一般做项目在最开始写静态页面之前，要重置样式
github项目minireset.css