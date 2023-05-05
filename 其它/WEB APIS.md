## WEB APIS

###### 定义：浏览器提供的一套操作浏览器功能和页面元素的API。



## DOM

dom 是文档对象模型，是W3C 组织推荐的处理可拓展语言的标准编程接口。

通过dom 接口能够改变文档的内容或样式。

```plain
document.body //  获取body 元素
document.documentElement // 获取html 对象
```

#### 

## 自定义属性

html5 规定自定义属性应该以**data-** 开头，这是一个规范。

```plain
<div data-index = "1">
div.dataset.index // dataset 只能获取以data- 开头开始的属性
```



## 节点

**父节点获取子节点**

```less
father.childNodes; // 获取所有子节点，标准用法
father.children; // 获取所有的子元素节点，非标准用法
fa.firstElementChild; // 获取第一个子元素节点，IE 9以上支持
```

**获取兄弟节点**

```plain
bro.nextSibling; // 获取下一个同级节点
bro.previousSibling; // 获取上一个同级节点
bro.nextElementSibling; // 获下一个同级元素节点，有兼容性问题
```

**创建、添加节点**

```plain
var newNode = document.createElement('tag'); // 创建
fa.appendChild(newNode); 添加节点，原有基础后面追加元素
fa.insertBefore(newNode,tag); 在tag 元素前面添加节点
```

**删除节点**

```less
fa.removeChild(node);
```

**复制节点**

```plain
node.cloneNode(); // 复制一份node 节点并返回，参数为空或false，则为浅拷贝，添加true,则为深拷贝
```

**动态创建元素**

```plain
document.write(); // 页面文档流执行完毕再去执行会导致页面全部重绘
node.innerHTML(); // 通过拼接字符串的形式添加内容，效率较慢
node.appendChild(document.createElement('div')); // 效率较高
```



## 事件.

###### 注册事件

HTML 事件、DOM0 级事件、DOM1 级事件



###### 事件对象

产生事件时，系统自动给事件创建的对象。

IE 6,7,8 需要使用window.event 来获取。



###### 阻止事件默认行为

比如超链接点击后跳转、表单按钮点击后提交、文本上按下鼠标移动会选中文本等原生 html 标签具有的默认浏览器行为。

```plain
event.preventDefault(); // DOM 标准,只能在DOM 2级事件中使用
|| event.returnValue; // 低版本 ie6,7,8
|| return false;
```



###### 阻止事件传播

阻止事件在捕获——处于目标阶段——冒泡路线上的传播。

```javascript
event.stopPropagation(); // 标准写法
|| event.cancelBubble = true; // 非标准

event.stopImmediatePropagation(); 
```



**禁止鼠标右键菜单**

```html
document.addEventListener('contextMenu',function() {
	event.preventDefault();
})
```



**禁止鼠标选中**

```plain
'selectstart' -> event.preventDefault();
```



**鼠标移动事件**

mousemove



**mouseenter 和 mouseover**

不会冒泡：mouseenter && mouseleave



会冒泡：mouseover && mouseout，比上面不会冒泡的事件先触发



**mousedown 和 mouseup**

鼠标按下和鼠标抬起



**键盘事件**

keyup 和 keydown 不区分按键的大小写；

keypress **区分按键的大小写**



## BOM 浏览器模型

**Location**

href、protocol(协议)、host（域名+端口)、hostname(域名)、port(端口)、pathname(路径)、search(请求参数)、hash（哈希队列)



###### 事件

```plain
window.onload // 页面元素全部加载完后调用，用DOM0 级事件的写法只能写一个
window.onDOMContentLoaded //页面除样式表、图片、flash 等加载完后执行，ie9+支持
```



###### 定时器

```plain
window.setTimeout(fn,time); // time 结束后调用fn
window.clearTimeout(timeoutId); // 停掉timeoutID 对应定时器的运行

window.setInterval(fn,time); // 每隔time 时间调用fn
window.clearInterval(intervalId); // 停止intervalID 对应定时器的运行
```



**load 和 pageshow**

###### navigator 对象

- userAgent 访问客户端发送请求的头部值

- geolocation 返回一个用于获取设备地理位置的可编程对象。

```javascript
geolocation.getCurrention // 确认设备的位置并返回一个携带位置信息的Position对象
geolocation.watchPosition // 注册一个位置改变监听器，每当设备位置改变时，返回一个long 类型的该监听器的ID值。
geolocation.clearWatch // 取消watchPosition 注册的位置监听器
```



###### history 对象

```typescript
back();
forword();
go();
```

值得研究的是，常用框架中的 route 对象都是根据 history 内置API进行实现的，有history(默认，基于 createBrowserHistory），hash(基于 createHashHistory)，Memory(基于 createMemoryHistory)，用途不多)三种模式进行配置，常用的是history 和 hash。history 需要服务端的支持，hash 则不需要，对部署更友好，但 url 地址很丑。

history: 服务器需要做好处理 URL 的准备。处理应用启动最初的 `/` 这样的请求应该没问题，但当用户来回跳转并在 `/accounts/123` 刷新时，服务器就会收到来自 `/accounts/123` 的请求，这时你需要处理这个 URL 并在响应中包含 JavaScript 应用代码



## 元素偏移量

以下返回的都是数字。

**offset**

offsetWidth、offsetHeight 指自身宽高，不包括overflow未显示部分。

为content + padding + border

offsetTop、offsetLeft 为自身距离最近的**带有定位的**父元素的顶部\左侧的距离，没有找到则以根元素作为父元素。



**client**

clientWidth、clientHeight 指自身宽高，不包括边框部分。

为content + padding

clientTop、clientLeft 为自身上、左边框宽度。



**scroll**

scrollHeight 获取对象的实际高度，包含被隐藏的部分。

为content + padding + border

scrollTop、scrollLeft 为自身沿垂直、水平方向滚动的距离



## 动画函数封装

**缓动动画：每次移动的距离为目标距离 - 当前距离/步长**

**无缝连接：在末尾添加多一张与首部相同内容的元素，用于掩盖下一步的操作。**

**节流阀：等待动画活动结束后，再进行下一个事件，让事件无法连续触发，通过回调函数来锁定**

**页面滚动到特定位置**

```plain
window.scroll(x,y); // x,y 不跟单位
```



## 移动端动效

###### 触摸事件

```plain
ele.addEventListener('touchstart',() => {}); // 触摸触发
ele.addEventListener('touchmove', () => {}); // 按住移动
ele.addEventLIstener('touchend', () => {}); // 离开触摸事件
```

###### 触摸事件对象

**touchstart**

**touchmove**

**touchend**

## 本地存储

```plain
sessionstorage 大约可以储存5M 数据；
localstorage 约20M 数据。
只能存储字符串。
```

**删除所有数据**：sessionstorage || localstorage.clear