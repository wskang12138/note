# JavaScript

## ECMAScript 和 JavaScript

ESMAScript 是由 ECMA 国际（前身为欧洲计算机制造商协会）通过ecma-262 设定的一种名为 ESMAScript 的脚本语言标准。javaScript 可以看做是该标准的实现和拓展。

## JavaScript 的组成部分

ECMAScript + DOM + BOM

## 命名规范

只能以英文字母或下划杠或美元符号开头。英文区分大小写，变量名称应该要有英文意义，不能用汉语拼音。长变量应该使用驼峰标识。



## 数据结构

**定义：**相互之间存在一种或多种特定关系的数据元素的集合，包括逻辑结构和物理结构。定义了计算机储存、组织数据的方式。

## 数据类型

简单数据类型：undefined null boolean string number，储存的是值。

复杂数据类型：引用类型**Object**，如 object,array，变量储存的是指向对象的地址。

ES6 引入第七中数据类型：**Symbol**，标识单一的无修改的值。

typeof + 数据变量 ：返回数据变量的数据类型。

值类型进行操作时交换的是值地址，复杂数据类型交换的是指向对象的地址。

注意点：

1. undefined 转换为 number 时为 NaN。

2. typeof null 返回的是 object。

3. js 内部的所以数字都是以64位浮点数进行储存。

```js
0.1 + 0.2 === 0.3
// false

0.3 / 0.1
// 2.9999999999999996

(0.3 - 0.2) === (0.2 - 0.1)
// false
```

4. 删除对象的属性： delete obj.key。检查对象是否包含某个属性：key in obj。不能识别自身属性和继承属性。

5. 数组的length 是人为可写的。用delete 删除数组的一个成员，会形成空位，即length 长度不变。

## 数据储存

基本类型直接在栈空间划分区域储存；

复杂类型是在堆空间划分区域储存，将其地址储存到栈空间。对于Object对象，Array数组，Function方法等都是在堆区储存，其地址保存在栈区。



## 数据类型转换

**toString** | 用+号连接 | string() 强制转换

Boolean()

**parseInt** | parseFloat 字符串转换为int 型 | float 型



## 合理运用&& 和 || 进行判断

```js
// 传统方法
if(obj.val) {
	obj.fn()
}
// 使用短或与
obj.val && obj.fn();
```

## 伪数组和 arguments

伪数组：拥有真实数组定义中的一些属性：key-value 的形式存值, length ，但是没有 pop push 等真数组才有的方法。

arguments: 每个函数都有的一个属性，储存的是函数实参的信息。



## 断点调试

方法1：通过控制台输出console.log() 手动输出信息；

方法2：通过浏览器的开发者工具进行手动地在源代码中打断点；

方法3：通过在源代码中设置断定的位置输入 debugger。



## 真伪数组

数组可以存放不同类型的数值，但建议储存统一的类型。

**真伪数组的联系和区别：**

**1. 都拥有length 和并且按下标储存数据**

**2. 伪数组不能使用真数组的方法，伪数组的长度不可动态改变。**

## 数组排序

sort 排序默认是将元素转换为字符串格式进行排序，可以自定义一个比较函数作为sort 的参数用来重载比较方式。比较函数接收两个参数a,b 若正序排列，则返回false 值，否则返回true。



## 立即执行函数表达式

函数执行完便会销毁

```js
// 方法一
(function() {
	console.log('')
})()
// 方法二
(function() {
	console.log('')
}())
```

## 函数参数传递

值传递

引用传递，会修改原数据的修改。



## 预解析

js 在解析代码的时候会把**var 变量声明**和 **function** 函数声明**提升到作用域最前面**，再按顺序执行代码。



# Js 高级编程

  

## 对象

创建方式：

字面量、调用构造函数、自定义构造函数、工厂方式。



## 对象属性描述

```js
{
  value: 123,
  writable: false, // 决定value 值是否可被修改
  enumerable: true, // 是否可遍历
  configurable: false, // 决定全部其他属性是否可被修改
  get: undefined,
  set: undefined
}
```

## 添加原型

作用：**共享数据，节省内存空间**；**实现继承效果**

```
obj.prototype.arguments = '内容'
```

实例对象中的 __proto__ 是给浏览器使用的，不是标准属性。(即不同的浏览器访问结果会不一致)

构造函数中的 prototype 是标准属性，其指向原型对象。

```js
function Student(name, age) {
      this.name = name;
      this.age = age;
    }
// 直接用新的对象修改原型对象，需要添加构造函数的指向
Student.prototype = {
    construtor: Student,
    height: 1.7,
    weight: 55
  }
// 直接在原构造函数的基础上添加
// Student.prototype.height = 1.7;
```

## 原型链

定义：实例对象和原型对象之前的关系联系。原型链的尽头为 null。

实例对象在使用属性或方法时，会先在自身对象中寻找，再在原型对象中寻找。

## 事件委托

**定义：**通过给父元素添加事件监听，可以对子元素中产生的事件进行处理。

```js
<ul id="fa">
    <li id="li1"></li>
    <li id="li2"></li>
    <li id="li3"></li>
  </ul>
  <button>添加</button>
  <script>
    let fa = document.getElementById('fa');
    // 通过父元素捕获并处理不同子元素发生的事件，addEventListener 的第三个参数为true 则在事件捕获阶段调用，为false 在
    // 事件冒泡阶段调用，默认为false。
    fa.addEventListener('click', function(event) {
      let target = event.target || event.srcElement;
      if (target.nodeName.toLowerCase() == 'li') {
        switch (target.id) {
          case 'li1':
            alert('li1');
            break;
          case 'li2':
            alert('li2');
            break;
          case 'li3':
            alert('li3');
            break;
          default:
            alert('newAdd');
        }
      }
    })

    let btn = document.getElementsByTagName('button')[0];
    btn.onclick = function() {
      let newLi = document.createElement('li');
      fa.appendChild(newLi);

   }
```

## 借用父级构造函数

用于解决直接改变原型指向时，父原型带来的数据的统一化的问题。通过借用父级构造函数能够动态地为父级原型属性生成不同的数据。

**借用构造函数：**构造函数名称.call( 当前对象，...属性名称)

```js
function a(name) {
	this.name = name;
};
function b() {
	a.call(this); // 借用构造函数
}
```

## 组合继承

原型继承+借用构造函数，用于解决**方法的继承**和设置**属性的独立性**

```js
function Person(name) {
	this.name = name;
}
Person.prototype.say = () => console.log('hello');
function Chinese(name) {
	Person.call(this,name);
}
Chinese.prototype = new Person();
Chinese.prototype.constructor = Chinese();
Chinese.prototype.write = () => console.log('读书、看报');
let chaPer = new Chinese('xiaoming');
console.dir(chaPer);
```

## 函数又是对象

对象中有__proto__ 原型；函数中有prototype 原型。

所有的函数都是通过Function 原型构造函数new 出来的实例对象。



## 数组中的函数调用。

```js
let array = [
  function() {
    console.log('a');
  },
  function() {
    console.log('b');
  },
    
  function() {
    console.log('c');
  }
];

array.forEach(function(ele, index, array) {
  // ele: array 中的元素, 
  // index：元素下标
  // array: 当前元素所属数组
  console.log(ele);
  console.log(index);
  console.log(array);

  ele();
  array[index]();

})
```

## foreach() 、some() 、any()

三个方法都默认对数组进行自执行，参数：

```js
let array = [1,2,4];
console.log(array.some(i => i >= 2)); 默认对数组中的每一个元素执行回调函数中的判断，如有成立则返回结果，不再往下执行。

console.log(array.every(i => i >= 2)); 数组中的每一个元素都执行回调函数，全部为true 返回true ，否则返回false.
```

## Call()、Apply()、Bind()

作用：都是改变目标的执行上下文的。

call、bind、apply 的第一个参数都是**传递 this 的表示对象**，后面的属性参数作用表示方法里需要用到的参数，其中 call 是直接用逗号隔开使用，apply 需要用**一个数组**进行包裹传递，而bind 除了返回类型是函数外，其他使用方法和 call 一致。

```js
let name = 'a';
obj = {
  name: 'b',
  sayName: function() {
    console.log(this.name);
  }
}

obj.sayName(); // b
obj.sayName.call(window); // a
obj.sayName.apply(window); // a
obj.sayName.bind(window)(); // a
```

apply 和 call 函数都是来自于Function **原型**中的属性。

**bind()**

将函数对象复制一份并传入相应的参数，并返回**传入参数后的新的函数**。除对象外的参数，既可以在复制的时候传递，也可以在调用的时候传递。

## 函数内部的属性

name: 函数方法的名称，只读不可修改。函数外供其他对象调用

arguments.length: 函数实参的个数，函数里面使用，箭头函数没有

arguments.callee: 函数自身的引用，只在函数执行时生效，常用于匿名函数递归

length: 函数形参的个数，函数外面调用

caller: 函数的调用者



## 作用域链及预解析

作用域链：变量从里到外层层搜索，直接找到对应的变量。作用域链从**创建函数的那个作用域**进行延伸，而不是函数使用的地方进行延伸



## 闭包

**闭包是指有权访问另一个函数作用域内变量的函数。实质为函数嵌套形成了作用域链。**

**一般模式：函数闭包** A 函数中嵌套B 函数，B 函数访问了A 函数的属性和方法，B 为闭包。

```js
function A() {
	let num = 10;
	function B() {
		console.log(num);
	}
	B();
}
```

**对象闭包**

```js
function A() {
	let num = 10;
	let obj = {
		age: num
	}
}
```

作用：**缓存数据，延长作用域链**；

优缺点：缓存数据。

## 浅拷贝

基本数据类型复制无异，而复杂引用类型是直接复制对象的引用地址。在自身改变后，复制对象也会改变。

```js
Object.assign(objClone,objProto); // 使用语法糖实现对象的浅拷贝
```

## 深拷贝

复制对象内容时，**简单数据类型**是直接复制，而像数组、对象等复杂数据类型需要先进行一个判断，如果复制的是该中类型的属性数据，则需要在自己**复制的内存上重新划分空间来**进行复制。

```js
// 最简单使用
function deepClone(obj) {
    if(obj && typeof obj === 'object') {
        let cloneObj = Array.isArray(obj) ? [] : {};
        for(let key in obj) {
            if(obj.hasOwnProperty(key)) {
                cloneObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
            }
        }
        return cloneObj;
    }
    return obj;
}
```



## 遍历DOM 树

**节点**

nodeName 节点名字；nodeType 节点类型；nodeValue 值

```js
let root = document.documentElement; // 获取根结点 Html
```

# JS 随笔

## 文档的根元素

**Document.documentElement。**如返回 **html** 对象

eg: `document.documentElement.scrollTop`

## FLIP 动画

https://juejin.cn/post/7016912165789515783

1. 获取 dom 的位置，宽高等信息。
2. dom.animation 设置动画。

## 复合页面中的事件管理

1. 多层级页面都需要使用 document 进行事件绑定时，应该首先使用 DOM 一级事件。方便更深层 DOM 对上层的相同事件的覆盖。
2. 如果改事件是和其他进行共存的才考虑使用二级事件。

## canvas 转图片

```
canvas.toDataURL('image/png', 1);
```

## addEventListener 参数之 passive

1. passive 意为“顺从的”，表示不会阻止默认事件。
2. 通常用于滚动事件的监听器上。

## 获取自定义数据 data-

```
eg: <div data-zoom="125" />
```

1. ele.getAttribute('data-zoom')
2. ele.dataset.zoom

## async/await 函数的传染性

async 函数返回 promise，所以要求调用 async 函数的函数也要为 async。

## 不固定子级查找目标节点

![img](https://cdn.nlark.com/yuque/0/2022/jpeg/12905753/1659949326212-32ea3e7a-0530-4e75-b8f4-451d4ae5340c.jpeg)

## js 创建 class 样式

1. 创建 style 节点，写入 class，添加进 head

```javascript
let style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
  .container {
    height: 300px;
  }
`

document.querySelector('head').appendChild(style);
```

1. 找到目标节点，通过 classList 添加

```javascript
let targetEle = document.querySelector('div');
targetEle.classList.add('.container');
```

## Scroll 滚动

css 和 js 实现页面滚动

https://mp.weixin.qq.com/s/E38yr4cqbYOmgUWtRs7_5Q



## 页面布局自适应方案

1. flexible.js
2. vw 单位。

## 304 状态码

发送的带条件的 GET 方法已被允许，但返回的文档内容并没有改变，故使用缓存中的数据。

## RGB & HSL

**rgb:** 红绿蓝 三色混色，混得越高亮度越大。其十六进制的写法 hex 同理。

**hsl:** 

色相H(hue)，取值 0 到 360 度，每 30 度一个主色，按 **红(0度)、橙、黄、绿(120度)、青、蓝(240度)、紫、品红** 围绕。

饱和度S(saturation)，饱和度越高，颜色越鲜艳，呈现从灰色到色相颜色的变化。

亮度L(lightness)，50% 处只有纯色，小于 50% 时混入越多的黑色，大于 50% 时混入越多的白色。



https://www.editcode.net/archive/detail/162723

## window.getSelection

各个属性：https://blog.csdn.net/weixin_42420703/article/details/84892528

## getBoundingClientRect

返回元素的大小及其相对视口的位置。

```
Element.getBoundingClientRect()
```

## window.parent | top | self

1. `window.self`指的是自身
2. `window.parent`在应用有 iframe 的情况下，指父窗口，否则指自身
3. `window.top`在应用有多层 iframe 的情况下，指最顶层窗口，否则指自身
4. `window.opener` 获取使用 `window.open` 打开的子窗口的父窗口对象。

## xmlHttpRequest

1. 使用原因

1. 1. 兼容支持
   2. 实现 fetch 无法做到的事情，例如进度记录。

1. 实例

```typescript
const uploadRequestWithProcess = ({
  url,
  header,
  data,
  onProgress,
  onSuccess,
  onFail
}: {
  url: string,
  data: any,
  onProgress: (evt: ProgressEvent<EventTarget>, xhr: XMLHttpRequest) => void,
  onSuccess: (xhr: XMLHttpRequest) => void,
  onFail?: (status: number, message: string) => void,
  header?: { [propsName: string]: string },
}) => {
  const xhr = new XMLHttpRequest();
  xhr.open('post', url, true);
  for (let item in header??{}) {
    xhr.setRequestHeader(item, header[item]);
  }
  xhr.onload = () => {
    if (xhr.status != 200) {
      onFail && onFail(xhr.status, xhr.responseText || xhr.statusText);
    } else {
      onSuccess(xhr);
    }
  }
  xhr.onerror = () => onFail && onFail(xhr.status, xhr.responseText || xhr.statusText);
  xhr.upload.onprogress = (evt) => onProgress(evt, xhr);
  xhr.send(data);
}
```

## 使用 typeof 对 undefined 进行判断

1. 不要使用严格比较符对 undefined 进行判断，因为 js 中原始值 undefined 只有在两种场景下产生，一是未声明的变量，二是声明的变量未赋值。当未声明的变量使用严格比较符，会报错。使用 `typeof a == 'undefined'`就没问题。

## 视频流

1. 使用  MediaStream API 的 onended 事件监听流数据的停止。

## 类型推论

用于定义编辑器无法识别出来的元素类型以实现代码补全。

```javascript
/** @type {number} */
let number;

/** @type {function (number): number} */
function(num) {}

/** @name 函数名
*   @param {number} 形参一
*   @param {number} 形参二
*   @returns {number} 返回值
*/
function add(num1, num2) {
  return num1 + num2;
}
```

## 判断多张图片加载完成

1. 循环，临时变量和 onload
2. 循环，promise 和 onload

## 资源在线预览插件

1. word => **docx-preview**
2. ppt => **pptxjs**
3. excel => **exceljs、handsontable**
4. pdf => **pdfjs**
5. picture => **v-viewer**

## 创建事件并在响应

背景：antd form 表单包裹的控件，手动通过查找元素并赋其 value 值，无法生效。需要创建事件并在其控件上调用。

```javascript
const targetNode = document.querySelector(':not(input[name])#installationPath') as HTMLElement;
targetNode.setAttribute('value', path);
// 已被标准丢弃的写法
const evt = document.createEvent('HTMLEvents');
evt.initEvent('input', true, true);
targetNode.dispatchEvent(evt);

// 新写法
event = new Event(typeArg, eventInit)
typeArg: DOMString 类型，表示创建事件的名称
eventInit: bubbles,是否冒泡; cancelable, 能否取消; composed, 是否在影子 DOM 根节点外触发侦听器
const evt = new Event('input', { bubbles: true, cancelable: true });
targetNode.dispatchEvent(evt);
```

## 影像地图

```html
<img src="example.png" usemap="#food_map" />
<map name="food_map" shape coords></map>
```

**map** 参数:

- **herf:** 链接地址
- **title:** 鼠标悬浮时提示文本
- **shape:** 设定的 area 形状

- - rect 矩形
  - circ 圆形
  - poly 不规则

- **coords:** 坐标值

- - rect x1, y1, x2, y2
  - circ x, y, r
  - poly x1, y1, x2, y2, ... xn, yn

- **target**
- **alt**

## 位运算符

https://juejin.cn/post/6854573220948164615

- 非（~）

- - 将数值取负数
  - 减 1
  - `~25 // -26`

- 与（&）

- - 把两个数转换成二进制补码
  - 相同位置进行比较（同 1 异 0 ）
  - 计算结果为负数，继续做补码处理
  - 位数不够，正数左边补 0，负数补 1
  - `10 & 3 //2`
  - `14 & -13 // 2`
  - `-12 & -5 // -16`

- 或（|）

- - 两个数字转换成二进制补码
  - 相同位置进行比较，有 1 为 1，全 0 为 0
  - 计算结果为负数，继续作补码处理
  - `10 | 3 // 11`
  - `10 | -1 // -1`
  - `-15 | -21 // -5`

- 异或（^)

- - 两个数转换成二进制补码
  - 相同位置进行比较，01 组合才为 1
  - 结果为负，再取补码
  - `10 ^ 3 // 9`
  - `10 ^ -3 // -9`
  - `-10 ^ -3 // 11`

- 带符号左移（<<）

- - 两个数转换成二进制补码
  - 左移指定位数，右边补 0
  - 结果为负数，再取补码
  - 超过 32 位舍弃
  - `1 << 2 // 4`
  - `-3 << 4 // - 48`

- 带符号右移（>>）

- - 两个数转换成二进制补码
  - 右移指定位数，左边补位与符号位一致
  - 多余位舍弃
  - 计算结果为负，再取补码
  - `5 >> 1 // 2`
  - `1 >> 2 // 0`

- 无符号右移（>>>)

- - 两个数转换成 32 位二进制补码
  - 连同符号位，右移指定位数
  - 向右被移出的位被丢弃，左侧用 0 填充

## postMessage

跨文档消息通信，用于实现跨源通信。不同源之间无法直接操作其窗口文档上的内容，例如获取父页面的 url，document 等等。针对页面 url 问题，在谷歌浏览器下，从 **window.location.ancestorOrigins** 中可查看所有窗口数据，但该属性火狐没有。通过 **Document.referrer** 可获取上一次引用该页面的地址，在[](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)中，**Document.referrer** 会初始化为父窗口 [Window.location](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location) 的 [href](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLAnchorElement/href)。

```javascript
/**
* otherWindow 其他窗口的应用，如 iframe 的 contentWindow 属性，window.open 返回的窗口对象
* message 传递的数据，任意基本类型值或可复制的对象。在某些低版本浏览器中，只支持字符串
* targetOrigin 能接收该信息的目标源，通用字符 * 表示所有源（为了安全，应始终提供一个确切值
*/
otherWindow.postMessage(message, targetOrigin, [transfer]);

// 接收端
window.onmessage = e => console.log(e.data);
或
window.addEventListener('message', e => console.log(e.data));
```

## Iframe 内嵌网页

将另一个 HTML 页面嵌入到当前页面。

常用属性：

1. height，width 默认都是 150
2. name 定位嵌入的浏览上下文的名称。`window.frames.[name]`
3. sandbox 设置该 iframe 框架内容的限制条件。
4. iframe 完成加载后**无论成功与否都会触发 iframe 的 onload 事件**，所以通常 onerror 方式去处理 iframe 报错基本是无效的

**获取 iframe:**

1. 借助 `window.iframes[iframe_name | index 下标]`
2. `**iframe.contentWindow**、**iframe.contentDocument**`获取 iframe 里的 window 或 document
3. `window.top``window.parent`分别用于获取顶级窗口和父级窗口

## 便捷数据写法

1. `2e3 => 2000`e3 指代 10 的多少次方
2. `100_000_000`用间隔符提高可读性
3. `2**3` 指示 2 的 3 次方
4. `2^3`进行 3 次异或运算

## prototype 和 __proto__

`prototype` 是函数的原型对象。

`__proto__` 是对象实例指向的原型对象。

## Js 对象自动排序

当对象属性的**键值为数字类型或是可以直接转换为数字类型的字符串**时，会默认进行排序

```javascript
const obj = { 2: 'lili' }
Object.assign(obj, {
  1: 'gege'
})
```

## 通过属性查找元素

```
document.querySelector('[attribute=value]')
document.querySelector('[attribute*=value]') // attribute 包含 value 值即匹配
document.querySelector('[attribute^=value]') // attribute 以 value 值开始即匹配
document.querySelector('[attribute$=value]') // attribute 以 value 值结尾即匹配
```

## toLocaleString

实现 24 小时制度

```javascript
new Date().toLocaleString('zh-CN', { hour12: false })
```

## with 语句

```javascript
function Lakers() { 
   this.name = "kobe bryant"; 
   this.age = "28"; 
   this.gender = "boy"; 
} 
var people=new Lakers(); 
with(people) 
{ 
   var str = "姓名: " + name + "<br>"; 
   str += "年龄：" + age + "<br>"; 
   str += "性别：" + gender; 
   document.write(str); 
}
```



**定义：**with 代码块内可以直接引用 with 对象中的属性，无需再通过点访问或者中括号访问。



## 事件

事件冒泡由 IE 团队提出，事件捕获由Netscape 团队提出。DOM2 级事件流规定事件流的三个阶段为：**事件捕获、处于目标对象、事件冒泡**。

addEventListener 的 boolean 参数为 true 则在事件捕获阶段执行，false 在事件冒泡阶段执行。IE 的 attachEvent 和 detachEvent 只支持事件冒泡



## 阻止链接跳转

```plain
href = "javascript:;"; || href = 'javascript:void(0);'
```



## JS 执行机制

###### 同步和异步

**同步任务放在主线程的执行栈上**

**异步任务会交由给异步进程进行处理（浏览器或者运行环境配置的线程），异步进程在处理该任务时会成功处理的结果放到任务队列中，主线程上的内容执行完后，主线程会检查任务队列中是否有内容，有的话便会拿到执行栈上执行。（此过程会反复进行）**

###### 异步任务的分类

- **宏任务**(macro task)。**setTimeout、setInterval、事件绑定、ajax** 、setImmediate、I/O、UI rendering;

- **微任务**(micro task)。process.nextTick、**Promise.then**、Mutation Observer API（用于监听DOM 节点的变化)
  **先执行宏任务，把结果放在宏队列中，次执行微任务，把结果放在微队列中。主线程在读队列的时候先从微队列中处理，处理完后再从宏队列中拿任务进行处理。**

| #                     | 浏览器 | Node |
| --------------------- | ------ | ---- |
| I/O                   | ✅      | ✅    |
| setTimeout            | ✅      | ✅    |
| setInterval           | ✅      | ✅    |
| setImmediate          | ❌      | ✅    |
| requestAnimationFrame | ✅      | ❌    |

| #                          | 浏览器 | Node |
| -------------------------- | ------ | ---- |
| process.nextTick           | ❌      | ✅    |
| MutationObserver           | ✅      | ❌    |
| Promise.then catch finally | ✅      | ✅    |
| async/await                | ✅      | ✅    |



###### 参考文章

https://www.jianshu.com/p/8821c6432fe1 异步处理模块

https://segmentfault.com/q/1010000021004964

https://www.cnblogs.com/ckAng/p/11133643.html 宏任务和微任务

https://blog.csdn.net/RedaTao/article/details/81504532



## console

- console.Time() 和 console.Endtime()
  结合使用，用来计算算法的操作时间。

- console.assert()
  当发生错误时抛出但仍然往下执行

- console.table()
  针对数组格式的对象具有很好的表现力

- console.group / console.groupEnd()
  产生分组信息，用于包裹打印在控制台上的内容

- console.trace
  会将调用栈打印出来，对于构建框架和库具有很好的作用



## get 和 post 请求

1. get 方法将参数拼接到url 后面进行传递，其数据长度会受到url 大小的限制（url 长度最大为2048个字符），post 将参数放在请求体中。没有长度限制。
2. get 回退不会受到影响，post 后退会重新提交表单内容；和5关联。
3. get 只能使用URL 编码，post 支持多种编码。
4. get 请求能被缓存，其记录会被浏览器主动缓存到历史记录中；post 默认不会。



## typeof 和 instanceof

1. instanceof 用于判断实例是否属于某个原型，对于**基本数据类型**的判断不会达到预期效果，需要通过构造函数生成的才会有原型的产生。

```javascript
'string' instanceof String // false
let str = new String('string');
str instanceof String // true
```



其判断方法是通过逐层寻找实例中的__proto__ 进行对比。

```javascript
console.log(Object instanceof Object);//true
console.log(Function instanceof Function);//true
console.log(Number instanceof Number);//false
console.log(String instanceof String);//false

console.log(Function instanceof Object);//true

console.log(Foo instanceof Function);//true
console.log(Foo instanceof Foo);//false
```



Object Function Number String 都是一个构造方法。

1. typeof 用于判断数据类型，返回六个结果：**string、boolean、number、object、undefined、function**。
   在判断null、array、object 等类型的对象时都返回object。



## 闭包的三个特性

闭包：闭包就是一个函数引用另一个函数内部的变量，当被引用的函数执行结束，其相应的执行上下文被摧毁，但引用的变量不会被回收，因此可以用来封装一个私有变量。

1. 函数嵌套函数

1. 内部函数可以调用外部的属性变量或方法

1. 变量或方法不会被垃圾回收机构回收



## apply 和 call 的区别

```plain
共同点：
  用于改变函数的执行上下文，将某个对象进行代替，需要调用函数。
不同点：
    apply();//最多只能有两个参数--新this对象和一个数组argArray，如果给该方法传递多个参数，则把参数都写进这个数组里边，当然，即使只有一个参数，也要写进数组里边。
    call();//可以接收多个参数，第一个参数apply()一样，后面则是一串参数列表。
    实际上，apply和call的功能是一样的，只是传入的参数列表的形式不同。
```



## 深拷贝和浅拷贝

```javascript
基本类型指的是简单的数据段，引用类型指的是多个值构成的对象；    var name = "John"; // 基本类型值

var obj = new Object(); 
obj.name = "John"; 
// obj 为引用类型值

在复制变量中，对于基本类型来说，两者互不影响，    var num = 1;    var num1 = num; // num1 = 1;

var num1 = 3; // num还是1,不会变

浅拷贝和深拷贝的区别：
对于浅拷贝来说，对于一个数组（数组是一个对象），只要我们修改了一个拷贝数组，原数组也会跟着改变。
因为他们引用的是同一个地址的数据，拷贝的时候并没有给b数组创造独立的内存，只是把a数组指向数据的指针拷贝给了b；
而深拷贝就与其相反，将会给b数组创造独立的内存，并且将a数组的内容一一拷贝进来，两者互不影响。

实现深拷贝：
一：层级拷贝，用递归实现；
二：JSON解析        var b = JSON.parse(JSON.stringify(a)); 
三：通过JQ 的$extend 方法

//原生js 封装函数实现深拷贝
function deepClone(obj) {
    if(obj && typeof obj === 'object') {
        let objClone = Array.isArray(obj) ? [] : {};
        Object.keys(obj).forEach(key => {
        objClone[key] = obj[key] && typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
          })
        return objClone;
    }
    return obj;
}
```



## null 和 object

在js 中，null 是基本数据类型，但是用 typeof 检测 null 时确显示为object。因为对象类型在js 的储存中是以0 开头的，而null 相当于全0。所以结果是object。但是用instanceof 检测结果为false。可知null 的原型不是object。



## forEach、for-of 和 for-in

forEach 遍历中**不能用 continue、break 和 return 中断**循环。

for-of **适合遍历拥有或实现了iterator 接口的数据结构**，像string、数组/数组对象、map/set。其遍历的对象是元素值。

for-in **遍历的是对象的key 值**。其在遍历对象时，会遍历所有的可枚举属性，包括其原型新添加的属性，通过object.hasOwnProperty(key) 可用于判断当前key 值是否为实例自身的属性。



## filter、map、reduce 三个高阶函数

```javascript
三者都接受一个回调函数作为参数。函调函数中可以有三个参数，分别表示当前值、当前下标、循环数组。
filter 用于对数组中的元素进行一个过滤，返回过滤后的新数组；
let array = [1,2,3];
let filter_arr = array.filter(val => {
	return val > 2;
}) // [3]

map 用于对数组中的元素进行一个改动，返回改动过的新数组，需要数组拥有值才可以
let map_arr = array.map(val => {
	return val += 2;
}) // [3,4,5]

// reduce 常用于实现函数式编程，数组中的每一个元素都会回调一次该函数。
// pre 上一次回调的结果，第一次回调时pre 的值是数组中的第一个元素的值; 
	cur 当前循环的元素值; 
	init 第一次回调pre 的值，没有设置的情况下，函数从数组的第二个元素开始进行回调，用数组第一个值作为pre
let res = array.reduce((pre,cur) => {
	return pre += cur;
},init) // 返回数组的累加和
```



## Object.defineProperty

**用于设定对象属性的值**



## this 的指向问题

**内层this 不指向外部，指向全局对象**



## 高阶函数和函数的柯里化

1. **以函数作为参数或者以函数作为返回值**的函数称为高阶函数。

1. 通过函数闭包的形式实现多次接受参数最后统一处理的函数编码形式称为函数的柯里化。即使将多参函数进行拆分。



## 递归函数

**函数内部调用自己，通过return 退出递归**



## 数组拓展

**拓展运算符**

...array 用于将**拥有 iteraro 迭代器的数据类型**（string、array、map、set）中的元素值进行输出

**find()、findIndex()**

接受回调函数作为参数，回调函数形参和every、some、foreach 一样，find 返回查找到的一个存在的元素，findIndex 返回查找到的一个元素的下标值。

**includes**

判断字符串、数组是否包含某值



## 模板字符串

用两个反引号包裹。特点：1. 可以引用变量 2. 可以换行 3. 可以调动函数

```plain
let uname = '今童志敏';
function showAge() { console.log('18')};
let str = `我的名字是${uname}，我的年龄是${showAge()}`;
```



## Set、Map 的方法

- 利用 Set 去除数组或字符串中的重复值
- Set 加入值时不会发生类型转换，内部使用严格相等（===）进行比较（NaN例外）
- Map 是更贴切的哈希储存数据结构，提供“值对值”的形式
- 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数组结构都可以作为 Map 构造函数的参数。同样的，Map 也将 NaN 视为同一个值。
- weakSet 的成员只能是对象，weakMap 只接收对象作为键名，两者对于对象的引用都是弱引用。（两者都是考虑到对象引用和垃圾回收处理）
- weakMap 的典型用途是，需要把Dom元素作为对象键值的时候。

```plain
// Set 和 Map具有的相同属性
size()
add()
delete()
has() // 查找键名
clear

// Map 
new Map().set(key, value) // 设置值，返回当前Map对象
map.keys() 
map.values()
map.entries() // 返回键值对
map.forEach 
```



Map 数据结构是 Object 对象数据结构的升级版，可以以任意值作为键值。

可以接受一个数组作为参数，数组成员是一个个表示键值对的数组。

```javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true, 该操作能找到深层次的值
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

## PPI

显示设备一英寸内能显示的像素密度。



## 字符串的方法总结

```javascript
// 返回字符串中某个位置的字符
str.charAt(index) 

当参数为负数时，slice 会将负数和字符串长度进行相加，substring 会将所有负数变为0，
substr 会将第一个参数和字符串长度相加，第二个参数变为0。
substring 的起始位置和结束位置顺序不一致的情况下会进行颠倒，而slice 不会。
不改变原字符串。
当缺少第二个参数时，表示获取到字符尾部的数据。
str.slice(startIndex,endIndex) || substr(startIndex,length) || substring(startIndex,endIndex) 

// 接受字符作为参数，返回该字符在字符串中首次出现的位置坐标
str.indexOf(str) 

// 返回最后出现的位置坐标
str.lastIndexOf(str) 

// 字符串去除两边的空格
str.trim() 

// 字符串转换为小写或大写
str.toLowerCase || str.toUpperCase() 

// 带有Locale 的地区设置更稳妥
str.toLocaleLowerCase || str.toLocaleUpperCase 

// 一般用于字符串匹配正则，返回一个匹配字符串的数组。
str.match(RegExp) 

// 作用同match，但返回的是第一个匹配字符串对应下标的数组。
str.search(str) 

不改变原字符串
str.replace(str|RegExp,str)

// 第一个参数可用为字符串内容或RegExp,第二个参数为切割的数量限制。返回数组格式,不包含切割点
str.split(str|RegExp, n)

// 判断字符串是否以形参字符串开头|结尾
str.startsWith(str) | str.endsWith(str)

// 将字符串重复n 次并返回新的字符串, 不改变原字符串
str.repeat(n)

// 合并多个字符并返回
str.concat(str) 

// 字符中是否包含子字符
str.includes(str)

// 在字符串前面(后面)填充val 直到长度到达num。num 小于str的原本长度则不填充。
str.padStart | padEnd(num, val)

// 获取字符串的原版字符串，忽略其中的\n,\t,\v 等转义字符。
String.raw(str)
```



## 数组方法总结

```javascript
// 将数组拉平成一维数组, 默认拉平一层，若要拉平多层，传入 leval 参数, 
// 如果不管多少层都要转为一维数组，则传入 Infinity
arr.flat([,leval])

// arr.map 和 arr.flat 的结合，将转换后的数组拉平一层
arr.flatMap(func)

// 数组末端添加元素，返回更新后的数组长度
arr.push(...array)

 // 数组末端删除元素，返回删除的值
arr.pop()

// 数组前端删除元素，返回删除的值
arr.shift() 

// 数组前端插入元素，返回更新后的长度
arr.unshift(...array)

// 验证内容是否为数组 
Array.isArray(array) || array instanceof Array

// 返回映射数组
arr.map()

// 返回过滤后的数组(储存满足过滤条件的数值)
arr.filter()

// 过滤掉数组中的falsy 值
arr.filter(Boolean)

//数组内的所有函数调用参数函数, 不改变原数组
arr.reduce() 

// 遍历数组，数组中的每一个元素都执行参数方法
arr.forEach() 

//遍历数组并进行逐一判断，全部为true 返回true
arr.every() 

// 遍历数组并逐一判断，任意为true 返回true
arr.some() 

// 合并数组，返回新的数组
arr.concat() 

// 将数组转换为字符串
arr.toString() 

// 将数组的元素以参数隔开，返回字符串
arr.join() 

// 从特定位置删除特定数量的数据，并插入传入的新的元素，返回删除的数组格式的内容
会改变原数组
arr.splice(start,num,ele) 

// 返回修剪的数组值
arr.slice(start,end) 

// 判断数组是否包含元素，内部使用===进行判断
arr.includes(ele) 

// start 为开始查找位置，默认为 0
arr.indexof(ele, [start]) 

返回一个排序后的复制。
会该变原数组
arr.sort() || reverse() 
设置自定比排序规则，如果pre 大于 cur,并且pre排序后想排在cur后面，则返回大于0的值。

// 打乱数组
arr.sort(() => (Math.randow() - 0.5))

// 将对象转换为数组，对象需要具有length 属性,
如果传入mapFn方法，则新数组中的每个回调方法都会执行该回调函数，传入 thisArg 为 mapFn 中 this 的上下文。
可以看出是map方法的替换方案。
arr.from(obj[, mapFn, thisArg]) 

// 将参数转换为数组
arr.of(value) 

arr.find(function) || arr.findIndex(function)  // 

// 将一个多维数组扁平化，返回一个二维数组
arr.flat(depth) depth: 接口深度 

// 数组填充值
arr(length).fill(value,start,end) 
```



## 对象方法总结

```javascript
对象遍历
for...in  // 遍历自身所以包括继承的可枚举属性
Object.keys() // 返回自身非继承的所以可枚举属性键值（不含symbol 键名）
Object.values() // 返回自身非继承的所以可枚举属性值
Object.entries 返回一个对象的键值对数组。// [['name': 'lili'], ['sex': 'girl']]
Object.getOwnPropertyNames() // 遍历所以属性，包括可枚举和不可枚举。
//将源对象的所以可枚举对象复刻到target 对象上 ,为浅拷贝，使用ES6 都解构赋值更便捷
Object.assign(target,source1,source2) 
// 删除对象的某个属性，返回boolean 值。true 删除成功，false 删除失败。
delete object.paramter 
// 给target 对象添加一个属性为source 的属性，
// 默认是不可枚举，不可变的。
// 通过projection 配置 value,writable,configurable,enumerable 设置值，可写性，是否枚举等，默认值都为 false。
Object.defineProperty(target, source, {projection}) 
```



## Math | Number 方法总结

```javascript
-- math
abs(x) // 绝对值
pow(x,y) //x 的y 平方
sqrt(x) // x 的平方根
ceil(x) // x 向上舍入
floor(x) // x 向下舍入
round(x) // x 四舍五入
max(...ary) // 返回元素列表中的最大值，必须全部为number 类型的数据
== ary.reduce((pre, suf) => pre > suf ? pre : suf)
min(...ary) // 返回元素列表中的最小值
== ary.reduce((pre, suf) => pre > suf ? suf : pre)
random() // 返回0-1 之间的随机小数，不包括1

--Number
toFixed(n) // 将number 四舍五入到n 位小数
isInteger(num) // 检查num是否为整数
isFinite(num) // 检查num是否无穷大
```



返回min 到max 之间的随机数

**Math.floor(Math.random() \* (max - min + 1)) + min;**



## load 和 DOMContentLoaded

DOMContentLoaded 是等待 DOM 和 CSSOM（其样式是页面内部样式或元素的内联样式） 一起渲染成渲染树后的回调，其作用主要是针对文档的**渲染树**被完成加载并解析；

load 是页面所有资源都完成加载后的回调，包括图片、音频、视频等。

- \1. 解析 HTML 结构。

- \2. DOM 树构建完成。// DOMContentLoaded

- \3. 加载**外部**脚本和样式表文件。

- \4. 解析并执行脚本代码。

- \5. 加载图片等外部异步资源文件。

- \6. 页面加载完毕。// load



## 可枚举对象

- 可枚举属性是指那些内部 “可枚举” 标志设置为 true 的属性。对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 true。但是对于通过 [Object.defineProperty](https://links.jianshu.com/go?to=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FdefineProperty) 等定义的属性，该标识值默认为 false

- 其中js中基本包装类型的原型属性是不可枚举的，如Object, Array, Number等

- 可枚举的属性可以通过[for...in](https://links.jianshu.com/go?to=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Ffor...in)循环进行遍历（除非该属性名是一个[Symbol](https://links.jianshu.com/go?to=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FSymbol)），或者通过Object.keys()方法返回一个可枚举属性的数组



## label

用于设定一个定位符，常用于跳转到程序的特定位置，也用于跳出循环。



## 强制转换

Number()、Boolean()、String()、Object()



## 错误类型

**SyntaxError** 代码解析时错误，语法错误。

**ReferenceError** 引用不存在的变量的错误。

**RangeError** 超出值有效范围错误。



## JSON 数据

**格式严格规定：**

1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。

1. 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和`null`（不能使用`NaN`, `Infinity`, `-Infinity`和`undefined`）。

1. 字符串必须使用双引号表示，不能使用单引号。

1. 对象的键名必须放在双引号里面。

1. 数组或对象最后一个成员的后面，不能加逗号。

## 防抖和节流

两者都是优化高执行频率js 代码的一种手段。

**防抖****(debounce)：**触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间。如果事件还是不断产生，则会继续延长计算事件。分立即执行和非立即执行两种。

**节流****(throttle)：**高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。可通过时间戳和定时器实现。

**区别：防抖是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。**

```javascript
// 防抖
const setDebounce = (fn, delay) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(args), delay);
  }
}

// 节流
const setThrottle = (fn, delay) {
  let timer = null;
  return () => {
    if(timer) return;
    timer = setTimeout((...args) => {
      fn(arg);
      timer = null;
    }, delay);
  }
}
```



## js 数组 key 值不是整形

数组的length 是通过数组中可以转换为整形的key 值计算出来的，而数组的for of 方法是受length 指引的，如果手动设置的数组key 值都为字符串的话，数组的length 为零，for of 也是无法遍历的。



## js 最大整形数

2^53 次方。



## switch 内部比较方式

采用**严格相等(===)**的比较方式。



## js 内存泄漏及垃圾回收机制(GC)

http://www.ruanyifeng.com/blog/2017/04/memory-leak.html

1. 什么是垃圾：一般来说没有被引用的对象就是垃圾，或者几个对象之间的引用形成一个环，无法访问，那也是垃圾。即不再可达的对象，清除其在内存上的储存控件便称为垃圾回收。
2. 什么时候会有垃圾。一个作用域中的代码运行过后，作用域中的变量和方法都不会再被使用，那么就会被作为垃圾进行回收了。
3. 垃圾回收方式。

标记清除（常用）：一个变量进入环境后会被标记，当离开环境后标记消失才会被清除。不会立即回收垃圾对象，清除的内存归到空闲链表上，地址不连续从而产生空间碎片化。

![img](https://cdn.nlark.com/yuque/0/2021/png/12905753/1629875729642-ef452154-604f-45e2-a414-43ff2a0f1fb3.png)
    标记整理：标记清除的增强版，把回收的地址变成连续的内存。

引用计数：语言引擎有一张“引用表”，保存内存里面所有的资源的引用次数，如果一个值引用次数为0，则表示该值不再用到，便会将其内存释放。（该方式不能很好解决循环引用(互相引用）的问题，目前浏览器已逐渐弃用）

1. 内存泄漏指系统没有释放不要用到的内存。
2. 监控内存的方式

- - 浏览器任务管理器(shift + esc)
  - Timeline 时序图记录
  - 堆快照查找分离DOM



## V8引擎

内存设限：64位操作系统不超过1.5G。32位操作系统不超过800M。

垃圾回收策略：采用分代回收（新、老存储区）。不同代对象采用不同的回收算法。

新生代对象：存活时间较短（函数里的变量）



## 内存优化

1. 避免全局变量
2. 避免全局查找（作用链查询）
3. 避免循环引用
4. 字面量代替 New 声明
5. setTimeout  代替 setInterval
6. 采用事件委托



## 禁止页面右键菜单、选择、复制

```javascript
oncontextmenu = return false;
ondragstart = return false; // drag -- 拖拽
onselectstart = return false;
onselect = document.selection.empty;
oncopy = document.selection.empty; // document.selection 只有IE支持
```



## cookie 不设置过期时间

cookie 默认有效时间是-1，不设置的话其生命周期会在浏览器会话关闭时结束，这时候的生命周期相当于 session。通过 **expires** 或 **max-age** 都能实现。



## cookie 设置域名和路径

1. cookie 只能获取大于或等于配置域名的 cookie，只能获取大于或等于配置路径的cookie。
2. 每个域名下可储存的 cookie 数量是有限制的，一般为 20+，差别取决于不同的浏览器。
3. 不能把 cookie 域属性设置成与设置它的服务器所在域不同的值。



## JSON 转换

普通对象转换成  JSON 借助`JSON.stringify()`。可接受第二个参数（替代者），可以是**数组或是函数**。只有包含在数组中的属性会被转变为字符串，如果是函数，原转换对象中的每个属性都会调用该函数，转变为函数的返回值。在谷歌浏览器测试下，如果返回的都是一个相同的值，则直接将返回值作为结果输出而不是输出字符串。如果返回值是 undefined，则该属性被排除在外。

**注意点：**如果对象中有 toJSON 方法，那么 stringify 转换的结果便是 toJSON 的返回值。

**注**：Stringify 特性

1. 值为 undefined、任意的函数、以及 symbol 在非数组对象的属性值中在序列化过程中会被转换为 null；在数组对象的序列化过程中会被忽略；在被单独转换时，返回 undefined。
2. NaN 和 Infinity 格式的数值及 null 都会被当作 null。



另外，值为 NaN，Infinity 的非对象属性值会被转换为 null。不可枚举的属性会被忽略。

```javascript
JSON.stringify([undefined, Object, Symbol("")]);
// '[null,null,null]'
JSON.stringify({ x: undefined, y: Object, z: Symbol("") });
// '{}'
```



JSON 对象转换成普通对象： JSON.parse()



## 数组遍历删除

通过遍历循环和 splice 的配合删除数据会带来一些问题，因为 splice 会直接改变原数组，导致第二次遍历时忽略其他的元素。用 filter 可替换。



## falsy 和 truthy

falsy 代表可以转换为 false 的值。六种falsy 值如下：

- undefined

- null

- NaN

- 0

- empty string

- false

truthy 代表可以转换为 true 的值。



## 纯函数

函数的返回结果只依赖于它的参数，执行过程中没有其它副作用（外部无法改变自身的返回结果，自身也不会对外部因素产生任何影响）。



## 可选链接

访问对象深层数据（属性的属性）时，如果数据不存在，则会报错。通过 **?.** 的形式访问可以直接返回 undefined。



## URL.createObjectURL

该静态方法会创建一个 URL -> File\Blob 映射。这个 URL 的生命周期和创建它的窗口中的 `document` 绑定。新的 URL对象表示特定的 File 或 Blob 对象。

每次调用 createObjectURL 时都会创建新的URL对象，尽管使用相同的对象作为参数。当不需要这些URL对象时，应该调用 revokeObjectURL 进行释放以获得最佳性能和内存使用状况。



## Array 和 new Array

当数组作为一个函数使用而不是构造函数时，它会创建并初始化一个新的数组对象。因此当 Array 和 new Array 接受相同的参数时，它们是相同的。



## thunk 函数

通过一个临时函数保存某个运算的结果，该临时函数便称之为thunk 函数。在 js 里面，thunk 替换的不是表达式，而是多参数函数，通过将其替换成一个只接受回调函数作为参数的单参数函数。

```plain
// 多参数函数
function fun_1(file, callback) {
	return callback(file);
}
// Thunk 版本的单参数函数
function thunk(file) {
	return function(callback) ;
}

var func_2 = thunk(file);
func_2(callback);
```



## js 获取浏览器、屏幕高度

屏幕高度：window.screen.height

屏幕可用高度： window.screen.availHeight

任务栏：两者相减

浏览器：window.outerHeight

可用高度：window.innerHeight

工具栏高度：两者相减



## 可选链操作符（?.) 和空值合并操作符（??）

可选链操作符在**访问对象深层属性**时不用考虑其是否存在，不存在则返回 undefined 而不是报错。同样也可以通过

`?.() `来运行一个可能不存在的函数。

空值合并操作符在其左边值为 null 或 undefined 时返回右边数据，否则返回左边数据。便捷的 if-else。优先级非常低，使用时通常搭配小括号提升优先级。

或运算符（||）返回第一个真值，对于 0,false,空字符串和“”都无法返回。



## new 关键字

创建对象实例时，使用new 将this 指向创建的空对象，没有使用new 时this 指向的时全局对象global object。



## 使用字符串模板作为函数参数

第一个参数是包含所有字符串数组，接着才是其他表达式变量。



## use strict

不允许声明全局变量。



## eval

用于计算字符串表达式的值。功能强大，但实际使用情况不多。



```javascript
eval("2+2")
eval("x=10;y=20;document.write(x+y)")
```



## 对象作为另一对象的键值

会被自动转变为 [object Object] 字符串。



## Dom 0 级事件绑定和 DOM2 级事件绑定

onEvent 只能执行一次绑定事件，addEventListener 可以绑定多个事件。默认都是执行事件冒泡机制，可以通过addEventListener 设置第二个参数为true 执行事件捕获机制。onEvent通过将指针指向null 移出事件，Dom2 级事件通过removeEventListener 移除事件。



## MutationObserver

突变观察者。用于异步处理Dom 的变动。

- 等待所有脚本执行结束后才运行

- 把Dom 的变动纪录封装进数组中，再统一进行处理。

- 既可以观察所有Dom 的变动，也可以只观察某一类的变动。



## setTimeout 的第三个参数

理论上 `setTimeout` 可以存在更多个参数，其从第三个参数起都是前面**回调函数的附加参数**。

`setTimeout`返回的是整形数值 id，为定时器标识。



## parseInt

```
parseInt(string, [ radix ])
```

parseInt 第二个为可选参数，表示进制，默认 10。解析字符串时，从左往右解析遇到不合法的字符停止解析，放回当前解析的结果。



## 同时赋值表达式

```plain
let x=y=10;

即，
y=10;
let x=y;
```



## || 运算符

返回条件中第一个真值，**如果所有都是假值返回****最后一个值**。



## 异或运算

通过插入标识^。只有一个运算子为 true，另一个为false。才会返回 true。其他情况返回 false。

```javascript
0^0 = 0
0^1 = 1
1^0 = 1
1^1 = 0
```



## 操作剪贴板

- 使用 document.execCommand 方法

- 使用 Navigator.clipboard API

http://www.ruanyifeng.com/blog/2021/01/clipboard-api.html



## 页面实现全屏效果

html5 API: **requestFullScreen**

```javascript
function openBig () {
  # 想要全屏展示的模块包含class名content 
  var elem = document.querySelector('.content');
  requestFullScreen(elem);
};

function requestFullScreen (elem) {
   #兼容不同的浏览器
  var requestMethod = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullScreen;

  if (requestMethod) {
    requestMethod.call(elem)
  } else if (typeof window.ActiveXObject !== 'undefined') {
    #模拟F11 实现全屏
    var wscript = new ActiveXObject('WScript.Shell')

    if (wscript !== null) {
      wscript.SendKeys('{F11}')
    }
  }
}
```



## arguments

arguments 不会接受默认参数。

```javascript
function Func(a, b=1) {
    console.log(`a ${a}`);
    console.log(`b ${b}`);
    console.log(`argument_a ${arguments[0]}`);
    console.log(`argument_b ${arguments[1]}`);
}

Func(2);
// a 2
// b 1
// argument_a 2
// argument_b undefined
```

#### 

## 避免 async/await 嵌套地狱

在同步处理异步执行时，如果 await 函数使用的不是另一个 await 函数的结果，应该使用 Promise.all() 使他们同时发生。经async/await 修饰的函数的返回值也是一个promise。



## promise 内部 throw出错误

promise 的执行环境及 handle环境（then,catch)默认具有一个 try...catch 的环境，即如果在 promise 的执行环境及handle 环境中通过 throw 抛出错误，会给转换为 reject 状态。注意：只在同步执行状态下。

```javascript
// throw 不在promise的执行环境中被抛出，所有不会被转为reject，所以这个错误不会被捕获。
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```



## fetch 网络请求

https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html

```javascript
let res = fetch(url, [options]) // 返回promise。成功响应则为resolve，失败为rejected状态
// res 为Response 对象
// options 配置请求的方法、标头和数据体等
```



Response 读取内容的方法

- `response.text()` 读取文本数据，类似html
- `response.json()` 读取服务器返回的Json 数据
- `response.formData()` 主要用在service worker 里面，用于拦截用户提交的表单，修改自定义数据后再进行提交
- `response.blob()` 获取二进制文件
- `response.arrayBuffer()` 获取流媒体文件

结合异步操作，元素 fetch 由两个 await 组成。

```javascript
let response = await fetch(url, options); // 解析 response header
let result = await response.json(); // 将 body 读取为 json
```



使用abortController 可终止fetch请求，在options中设置。

配置选项：

```javascript
let promise = fetch(url, {
  method: "GET", // POST，PUT，DELETE，等。
  headers: {
    // 内容类型 header 值通常是自动设置的
    // 取决于 request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string，FormData，Blob，BufferSource，或 URLSearchParams
  referrer: "about:client", // 或 "" 以不发送 Referer header，
  // 或者是当前源的 url
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer，origin，same-origin...
  mode: "cors", // same-origin，no-cors
  credentials: "same-origin", // omit，include
  cache: "default", // no-store，reload，no-cache，force-cache，或 only-if-cached
  redirect: "follow", // manual，error
  integrity: "", // 一个 hash，像 "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController 来中止请求
  window: window // null
});
```



## onbeforeunload

离开页面时触发（窗口刷新或关闭）



## memoized 函数

记忆函数。将初始调用该函数的参数和计算结果进行缓存，下次调用时对形参值进行对比，如果相同则直接返回结果。



```javascript
function memoize(func, hasher) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  const memoized = function(key) {
    const address = hasher ? hasher.apply(this, arguments) : key;
    const cache = memoized.cache;
    if (cache.has(address)) {
      return cache.get(address);
    }
    console.log(address);
    const result = func.apply(this, arguments);
    memoized.cache = cache.set(address, result) || cache;
    return result;
  }
  memoized.cache = new Map();
  return memoized;
}
```



## Js 原生数据代理

```javascript
const object = {
  name: 'lili',
  age: 23
}

const proxyObj = {};

Object.defineProperty(proxyObj, 'name', {
  get() {
    return object.name;
  }
  set(val) {
    object.name = val;
  }
})
```



- 未设置getter和setter方法的属性相当于对象的静态属性，例如下面的count

- 设置了getter和setter方法的属性相当于对象的动态属性，例如下面的plus

- 静态属性的值可以在触发setter方法时被改变

- 动态属性的value是getter的return返回值

**注意：get 和 set 的方法会以 get 方法名或者 set 方法名的形式保存在对象的属性里，访问是以属性形式访问**



## setTimeout 和 setInterval

```javascript
argus 作为附加参数传递给 fn
// 浏览器中的setTimeout零时调用在执行五次后时间间隔会被强行设定为至少4ms
setTimeout(fn, delay, [...argus]) 
// 内部计时不受其他程序阻塞
setInterval(fn, delay, [...argus]) 
```



## 以下划线作为变量前缀

众所周知的，这种方式是对象内部属性的命名方式，不应该从外部进行直接访问。



## bind双重绑定

```javascript
// 一个函数不能被重绑定。
function f() {
  alert(this.name);
}
f = f.bind( {name: "John"} ).bind( {name: "Pete"} );
f(); // John

// bind代之访问的是另一个对象，不单单受限于影响this值，改变的是执行上下文
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;
let bound = sayHi.bind({
  name: "John"
});
alert( bound.test ); // undefined
```



## 自定义事件

```javascript
let event = new Event(type[, options]) //创建自定义事件

/type: 事件类型
/options: bubbles,是否冒泡，默认false；cancelable,默认行为是否被阻止，默认false。

ele.dispatchEvent(event) //手动在ele元素上执行event事件
```



## ondragstart

html5 默认拖拽元素响应事件。



## event.target.valueAsNumber

使用 event.target.valueAsNumber 将输入框的值作为 Number 类型返回。适用范围：日期时间输入框，number 输入框。



## 逗号运算符

在小括号的加持下，里面的逗号运算符能够从左往右运算，返回最后的值。

```plain
let num = 1;
let res = (num++, num*=2, num); // res: 4
```



## 简明代码

面向未来和其他人而不是仅为了机器编写代码。

- 适用严格相等（==）检查避免不可控变量

- 适用直接了当的变量声明，不要添加不必要的单词，如：nameValue => name。
- 不要强制他人记住变量的上下文

```javascript
const users = ["John", "Marco", "Peter"];
users.forEach(u => { // u -> user
  doSomething();
  doSomethingElse();
  // ...
  // ...
  // ...
  // ...
  // 这里有 WTF 场景：`u` TM 是啥？
  register(u); 
});
```



- 不要添加不必要的上下文。

```javascript
const user = { // 应该去掉user前缀
  userName: "John",
  userSurname: "Doe",
  userAge: "28"
};

...

user.userName;
```



- 函数声明应该使用长而具有描述性的名称，它代表某种行为，应该是暴露其背后意图的动词或短语，参数也是如此。

- 避免使用过多的参数，尽量不应该超过三个。可以将多余的参数包装成对象传入。

- 多使用ES6 类。



## 13 个非常有用的DOM操作API

- `document.querySelector / document.querySelectorAll`

- `document.createElement`

- `Node.appendChild(child)` 元素添加子元素到结尾 | Node.removeChild(child)

- `Node.insertBefore(child, ele)` 在指定父节点Node中的ele节点前添加元素child

- `Node.replaceChild(new, old)`

- `Node.cloneNode()` 克隆Node节点

- `Ele.getAttribute / Ele.setAttribute` 获取/设置元素上的属性值

- `Ele.hasAttribute / Ele.removeAttribute` 检查是否具有 / 移除元素上的属性值



## 四种常用的js设计模式

- 策略模式
  与组件封装思想大同小异，强调考虑函数设计上的拓展性强，能应对多种情况而不是针对单一情况编写死代码。

- 发布-订阅者模式
  目的是降低功能之间的耦合度，强调不同功能间的联系不是点到点的，通过将功能结果发布出去（搭载一个消息订阅器），另以功能需要用到该结果时再进行订阅。

```javascript
// 消息订阅器载体
const EventEmit = function() {
  this.events = {};
  this.on = function(name, cb) {
    if (this.events[name]) {
      this.events[name].push(cb);
    } else {
      this.events[name] = [cb];
    }
  };
  this.trigger = function(name, ...arg) {
    if (this.events[name]) {
      this.events[name].forEach(eventListener => {
        eventListener(...arg);
      });
    }
  };
};

// 独立功能间的添加、修改、删除事件
let event = new EventEmit();
MessageCenter.fetch() {
  event.on('success', () => {
    console.log('update MessageCenter');
  });
}
Order.update() {
  event.on('success', () => {
    console.log('update Order');
  });
}
Checker.alert() {
  event.on('success', () => {
    console.log('Notify Checker');
  });
}
event.trigger('success');
```

- 装修者模式
  使用高阶函数对组件进行包裹，例：权限控制组件，所有功能路由都经过权限控制组件进行判断

- 责任链模式

```javascript
function applyDevice(data) {
  // some code to apply device
  // ...
  // Then go to the next step
  selectAddress(nextData);
}
function selectAddress(data) {
  // some code to select address
  // ...
  // Then go to the next step
  selectChecker(nextData);
}
function selectChecker(data) {
  // Some code to select a person to review
  // ...
}
// 使用责任链模式重写
const Chain = function(fn) {
  this.fn = fn;
  
  this.setNext = function() {}
  this.run = function() {}
}
const applyDevice = function() {}
const chainApplyDevice = new Chain(applyDevice);
const selectAddress = function() {}
const chainSelectAddress = new Chain(selectAddress);
const selectChecker = function() {}
const chainSelectChecker = new Chain(selectChecker);
chainApplyDevice.setNext(chainSelectAddress).setNext(chainSelectChecker);
chainApplyDevice.run();
```



## 动态导入模块

`import(path)`，返回Promise。**import并不是一个函数**，不能将其值赋值到一个变量中，或者对其使用call/apply。



## 古怪JS

```javascript
true + false // 1，会被转为Number
[,,,].length // 3, 最后一个逗号是尾随逗号
[1,2,3] + [4,5,6] // 1,2,34,5,6 默认将数组转换成字符串，然后再进行连接
10,2 // 2 逗号运算符只返回最后一个操作数
!!"" // false, 任何值之前使用两个感叹号获取其布尔值表示
+!![] // 1, 加号将其转变为数字
true == 'true' // 根据抽象相等的法则，两个值都会被转为数字
010 - 03 // 5 以0开头表示8进制数字
0/0 // NaN 表示没有意义的值
"" - 1 // -1， 加法运算符用于数字和字符串，减法运算符不用于字符串，故进行数值转换后输出
undefined + false // NaN false 可以转为数字，但undefined不行
```



## console.log 设置输出颜色

```javascript
console.log('%c 我是一条有样式的控制台输出', 'color: red;background-color: yellow')
```



## 声明boolean值的变量

增强代码可读性，应该使用is，has，can 等动词作前缀。



## removeEventListener

该钩子移除的事件必须是外部定义函数（传递引用地址）。

```javascript
window.removeEventListener('click', () => console.log('移除事件')) // 该写法没有效果
```

#### 

## ArrayToTree 算法

```javascript
function ArrayToTree(arr) {
  arr.sort((pre, cur) => pre.id - cur.id);
  const root = arr[0].id;
  const map = new Map();
  arr.forEach(item => {
    if(!map.has(item.id)) {
      item.children = [];
      map.set(item.id, item);
    }
    if(map.has(item.pid)) {
      let parent = map.get(item.pid);
      parent.children.push(item);
    }
  });
  return map.get(root);
}

eg:
let arr = [
  {id: 3, name: '部门3', pid: 1},
  {id: 2, name: '部门2', pid: 1},
  {id: 5, name: '部门5', pid: 4},
  {id: 4, name: '部门4', pid: 3},
  {id: 1, name: '部门1', pid: 0},
  {id: 7, name: '部门5', pid: 6},
  {id: 6, name: '部门5', pid: 5},
];
```

#### 

## 函数参数传值

函数参数传递为值传递，当传递引用类型时，传递的是引用类型指针的复制。

```javascript
let obj = {
  name: 'lili'
}
function testPass(obj) {
  obj.name = 'huahua';
  obj = null;
}

testPass(obj);
console.log(obj.name); // 'huahua', 如果是引用传递，那么 obj 为 null.
```

## callee 和 caller

函数 arguments 对象的 callee 指向拥有该 arguments 对象的函数本身，caller 指向拥有该 arguments 对象函数的调用者。注意的时，在严格模式下无法使用。

应用 eg: 递归函数中使用 callee 解除与函数名的耦合性。



## websocket 的四种状态

ws 的 readyState 属性可返回当前实例对象的连接状态。

CONNECTING: 值为0，表示正在连接

**OPEN**: 值为1，表示连接成功

CLOSING: 值为2，表示连接正在关闭

**CLOSED**: 值为3，表示连接已经关闭，或者打开连接失败



## designMode

设置 document.designMode 模式为on 可直接改变网页上的显示内容。



## a 标签和 download

href 值为空时，与 download 结合使用为下载当前网页。

```html
<a href download="当前网页" >点击下载</>
```

#### 

## 二进制数据和文件

1. **ArrayBuffer**，二进制数组

TypedArray 有如下：

Unit 储存无符号，Int 储存有符号，Float 储存有符号浮点数

-  Unit8Array 每个字节 0 到 255
- Unit16Array 每 2 个字节 0 到 65535
- Unit32Array 每 4 个字节 0 到 4294967295 
- Float64Array 每 8 个字节 5.0x10-324 到 1.8x10308 浮点数

储存越界数据不会报错，直接将多余的位进行切除。

```javascript
// 创建
let buffer = new ArrayBuffer(16) // 创建长度为 16 (字节)的 buffer
// 操作 ArrayBuffer 需要使用视图对象
let view = new Unit32Array(buffer) // 将 buffer 视为一个 32 位整数的序列，可以储存 4 个字
```

1. **Blob**

Blob 由一个可选字符串 type （通常是 MIME 类型）和 blobParts 组成，一系列其他 Blob 对象，字符串和 BufferSource。具有类型的二进制数据。

```javascript
// 构造函数
new Blob(blobParts, options)
// blobParts 是 Blob/BufferSource/String 类型的值的数组
// options 可选对象，包含 type —— Blob 类型，通常是 MIME 类型，例如 image/png.

// 创建实例
let blob = new Blob(['<html><html/>'], {type: 'text/html'}); // 第一个参数必须是一个数组
```

![img](https://cdn.nlark.com/yuque/0/2021/png/12905753/1630391134155-f059f43a-8990-43d0-9aa1-b049b212f07c.png)

Blob 可以很容易用作 <a>、<img> 或其他标签的 URL，来显示他们的内容

**Blob 转 base64**

```javascript
let blob = new Blob(['hello word'],{type: 'text/plain'});
// 使用浏览器内建FileReader将 Blob 转换为 base64 并调用 onload
let reader = new FileReader();
reader.readAsDataURL(blob); 

reader.onload = function() {
  link.href = reader.result; // 转换为 data url
  link.clik();
}
```

**两种创建 URL 方法比较**

![img](https://cdn.nlark.com/yuque/0/2021/png/12905753/1630394765007-f845b52d-4165-41b1-81ce-256c2cabe342.png)

1. FileReader

FileReader 是一个对象，其唯一目的是从 Blob 对象中读取数据。使用事件来传递数据，因为从磁盘读取数据更费时间。

主要方法：

- readAsArrayBuffer(blob) 读取为二进制格式的 ArrayBuffer
- readAdText(blob, [encoding]) 读取为指定编码（默认 utf8）的文本字符串
- readAsDataURL(blob) 读取并编码为 base64 的 data url
- abort() 取消操作

```javascript
// 读取文件示例
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```



## activeElement

返回当前页面活动的元素。默认是 body



## 带作用域的元素

元素标签分是否带作用域。像 script 就是不带作用域的



## innerHTML 和 innerText

使用这两者注意检查替换元素时是否释放元素对象的事件处理，以避免内存泄漏影响性能



## ScrollIntoView

将指定元素滑动到视口。

```
element.scrollIntoView([alignToTop])
element.scrollIntoView([**scrollIntoViewOptions** ])
```

- **alignToTop 可选**

- - true 默认值，元素的顶端将和其所在滚动区的可视区域的顶端对齐
  - false，元素的底端将和其所在滚动区的可视区域的底端对齐。

- **scrollIntoViewOptions** **可选，对象属性**

- - behavior，定义过渡效果，auto | smooth
  - block，定义垂直方向的对齐，start | center | end | nearest，默认 start
  - inline，定义水平方向的对齐，start | center | end | nearest，默认 nearest



## Window.scrollTo

滚动到文档中的某个坐标。

```
window.scrollTo(x, y)
window.scrollTo(options)
```

- options

- - top，等同 y
  - left，等同 x
  - behavior，smooth(平滑滚动)，instant(瞬间滚动)

## Window.open

手动打开某个链接。相当于访问超链接。

可接收四个参数：

- url。跳转的地址
- target。跳转的目标窗口，即可是某个 iframe 的名称，也可是 _self _blank 等
- 特性。配置跳转窗口的特性
- 取代浏览器历史记录的 boolean 值

```javascript
let newWindow = window.open();
newWindow.opener = null; // opener 用于获取打开新窗口的旧窗口主体
```



## 常用操作符优先级

以下从高到低进行排列

| 运算符                             | 描述                                         |
| ---------------------------------- | -------------------------------------------- |
| . [] ()                            | 字段访问、数组下标、函数调用以及表达式分组   |
| ++ -- - ~ ! delete new typeof void | 一元运算符、返回数据类型、对象创建、未定义值 |
| * / %                              | 乘法、除法、取模                             |
| + - +                              | 加法、减法、字符串连接                       |
| << >> >>>                          | 移位                                         |
| < <= > >= instanceof               | 小于、小于等于、大于、大于等于、instanceof   |
| == != === !==                      | 等于、不等于、严格相等、非严格相等           |
| &                                  | 按位与                                       |
| ^                                  | 按位异或                                     |
| \|                                 | 按位或                                       |
| &&                                 | 逻辑与                                       |
| \|\|                               | 逻辑或                                       |
| ?:                                 | 条件                                         |
| = oP=                              | 赋值、运算赋值                               |
| ,                                  | 多重求值                                     |

## 字符串编码转换

unicode 转字符串编码：

```typescript
1. eval("'" + str + "'")
2. unescape(str.replace(/\u/g, '%u');
```

#### 

## js 设置元素 style 样式

1. `[ ele ].style.[ attribute ] = value`
2. `[ ele ].setAttribute( <attribute>, value )`

直接设置属性（适用于某些样式）：`ele.setAttribute('height', 100)`

设置 style 属性：`ele.setAttribute('style', 'height: 100px !important')`

1. `[ ele ].style.setProperty(< attribute >, value, [ !important])`
2. `[ ele ].style.cssText = valueString`



## Window.getComputedStyle

getComputedStyle(element, [pseudoElt]) 获取元素的所有样式对象，包括行内样式，嵌入样式和外部样式。



## document.createdocumentfragment

用于创建虚拟节点对象，该节点对象包含所有属性和方法。可防止破坏文档结构而达到改变，增加，删除某些文档内容的目的。



## 使用 FileAPI 操作文件

1. 设置 HTML 元素

```html
<input type="file" id="input" />
//  weblitRelativePath 添加该属性时，可以直接选择目录下的所有文件
// multiple 可以一次选择多个上传文件
```

1. `input file` 元素选择文件后返回的是一个 `FileLis` 对象。通过 FileAPI 访问 fileList<伪数组>，也可以通过 change 事件访问 FileList。

```javascript
const fileList = document.getElementById('input').files[0];

<input type="file" id="input" change="handleFile(this.files)" />
 // 使用 multiple 设置可选择多个文件, 这时用户选择每个文件都包含一个对应的 File 对象
<input type="file" id="input" multiple change="handleFile(this.files)" />
  
```

1. FileList对象

1. 1. name 只读字符串，只包含文件名 
   2. size 字节数为单位的文件大小，只读的 64 位整数
   3. type 文件的 MME 类型，只读字符串，当类型不确定时为空字符串
   4. lastModified 表示最近一次修改时间的毫秒值
   5. lastModifiedDate 表示上传文件的当前标准时间

1. FileReader API

属性：

`readyState`表示 FileReader 状态的数字

| 产量名  | 值   | 描述                 |
| ------- | ---- | -------------------- |
| EMPTY   | 0    | 还没有加载任何数据   |
| LOADING | 1    | 数据正在被加载       |
| DONE    | 2    | 已完成全部的读取请求 |

方法：

`.abort()`终止文件读取操作，readyState 属性变为 DONE

`.readAsArrayBuffer(file)` 按字节读取文件内容 结果用 ArrayBuffer 对象表示

`.readAsBinaryString(file)`按字节读取文件内容 结果为文件的二进制串

`.readAsDataURL()` 结果用 data:url 的字符串形式表示 --常用

`.readAsText()`按字符读取文件内容 结果用 字符串形式表示 --常用

1. 重复选择相同的文件

这样不会触发 onChange 事件，清除其 input 的 value 值即可。value = others



## querySelector

一个class属性为"user-panel main"的div元素[](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div)(<div class="user-panel main">)内包含一个name属性为"login"的input元素[](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input) (<input name="login"/>) ，如何选择，如下所示:

```json
let inputEl = document.querySelector("div.user-panel.main input[name='login']");
```

## js 中的数字比较

如果为字符串数字，不会进行自动转换成 Int 型，需要手动进行 `parseInt | parseFloat`进行类型转换。

## Js RORO 模式

即函数接受的参数，return 或 resolve 的返回值都是一个对象。

具有以下优点：

- 参数命名
- 简化默认参数
- 丰富返回值
- 函数可读性增强