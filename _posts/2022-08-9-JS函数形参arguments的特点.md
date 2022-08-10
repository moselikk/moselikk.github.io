---
layout: post
title:  "JS函数形参arguments的特点"
date:   2022-08-9 15:00:00 +0800
categories: 
---
今天看到一个小题目，加深了我对函数arguments的理解
```javascript
function handleArr(arr) {
    arr[0] = arr[2]
}
function foo(a, b, c) {
    c = 10
    handleArr(arguments)
    return a + b + c
}
foo(2, 2, 2)
// 得到结果：22
```
- 在JS中函数参数变量和arguments是双向绑定的，改变参数变量arguments中的值会立即改变，改变arguments的值，参数变量也会响应改变。

## 拓展：

- arguments并不是一个真正的数组，而是一个类数组对象，意味着arguments有长度属性并且属性的索引是从零开始的，但是它除了length属性和索引元素之外没有任何Array属性，例如forEach()方法和map()方法都是没有的。
- arguments对象是所有（非箭头）函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引 0 处。
- 如果调用的参数多于正式声明接受的参数，则可以使用arguments对象。这种技术对于可以传递可变数量的参数的函数很有用。使用 arguments.length来确定传递给函数参数的个数，然后使用arguments对象来处理每个参数。
- 可以使用Array.from()方法或扩展运算符将参数转换为真实数组
    ```javascript
    var args = Array.from(arguments);
    var args = [...arguments];
    ```
- 相关属性
   - arguments.callee  指向参数所属的当前执行的函数。
   - arguments.length  传递给函数的参数数量。
   - arguments[@@iterator] 返回一个新的Array 迭代器 对象，该对象包含参数中每个索引的值。

- 当非严格模式中的函数有包含剩余参数、默认参数和解构赋值，那么arguments对象中的值不会跟踪参数的值（反之亦然）。
```javascript
function func(a = 55) {
  arguments[0] = 99; // updating arguments[0] does not also update a
  console.log(a);
}
func(10); // 10
```
