## JS

### 为什么异步编程对 Web 开发很重要

因为 Web 应用程序通常需要与远程服务器或其他资源进行交互，这些交互可能需要花费很长的时间。如果 Web 应用程序使用同步编程，那么在等待响应的过程中，它将无法响应用户的输入或其他事件，从而导致用户感到卡顿或无响应。如果 Web 应用程序使用异步编程，那么它可以在发送请求后立即返回，并在收到响应后再更新界面或执行其他操作，从而提高用户的满意度和参与度。

JavaScript 是一种单线程的语言，也就是说它一次只能执行一个任务。为了实现异步编程，JavaScript 使用了事件循环、回调函数、Promise、async/await 等机制和语法。这些机制和语法可以让 JavaScript 在执行一个任务的同时，将另一个任务放入队列中等待执行，并在合适的时机执行它。这样就可以实现非阻塞的异步编程。

### 抽象比较的转换规则

1. NaN 与任何值不相等。正零负零相等。
2. 数字&字符串，字符串转数字
3. 某个操作数是布尔值，将其转数字
4. 某个操作数是对象，将其转原始值（valueof 或 toString）



### this

this 指向函数运行时所在的环境（也是设计目的）

绑定规则: 

1. 默认

严格模式下不能绑定 window，而是绑定 undefined。

非严格模式下绑定 window。

赋值操作会应用默认绑定，函数传参是一种隐式赋值。

1. 显式

通过 call、bind、apply 的绑定。

1. 隐式

函数作为对象的属性存在，并通过对象的属性调用时，绑定该对象。

1. new

返回新构造对象上的值。

1. 箭头函数

根据外层作用域决定。

### js异步加载有哪些实现方式

1. async
2. defer
3. 监听 OnLoad 事件我完成并手动添加 js



### 5个ES6 新特性

1. let 和 const 两个新的变量声明，有自己的作用域，不会有变量提升，const 声明的变量不允许改变
2. 有块级作用域
3. 解构赋值
4. array 新的方法，像 array.from——将为数据转换成真数组，array.of 将参数转变为数组 ，还有数据的拓展运算
5. promise 异步请求封装
6. 新的数据类型 symbol，新的数据结构 map 和 set
7. 箭头函数
8. 模块、类

### 浅拷贝和深拷贝的区别

浅拷贝是复制引用类型在栈中的地址，改变复制的对象也会引起原对象的改变。深拷贝是遍历引用对象的每一层，会在栈中开辟新的地址去储存。

### typeof 返回的结果有多少种

undefined、number、boolean、string、object、function、symbol

### Promise 的特点

1. 对象的状态只受异步操作改变，不受外界影响
2. 一旦状态改变便不可更改
3. 一旦建立便会立即执行，内部的错误不会抛到外部去，在pengding 状态时无法得知进展阶段



### 原生 js 异步请求步骤

1.  创建xmlHttpRequest 对象
   let ajax = new XmlHttpRequest() 
2.  设置请求方式，url，和是否异步请求
   ajax.open('GET'，url，true) 
3.  设置内容编码类型
   ajax.setRequestHeader('Content-type'，编码类型) 
4.  发送请求
   ajax.send() 
5.  接受响应数据 

### new 一个对象时的操作

1. 创建一个空的对象
2. 链接对象（*proto*)到构造函数的原型
3. 将创建的对象作为this 的上下文
4. 返回

## CSS

### 伪元素和伪类的区别

1. 伪类: 用于为已有 DOM元素添加某种状态的样式，用单冒号表示。如：hover，active，first-child， first-of-type
2. 伪元素: 为创建不在 DOM 数中的元素并添加相应的样式和内容，用双冒号表示。如 before，after



### 行内元素和块级元素

1. 行内元素的宽度不受控制，与内容有关，块级元素可控制宽高
2. 行内元素只能容纳行内元素和文本，块级元素可容纳行内元素和块级元素，p 标签不能嵌套块级元素
3. 行内元素都在一行上，块级元素会另起并独占一行
4. 行内元素，span\a\b\i\img；块级元素，div\h\ul\li\p\th\td



### css 权重优先级

!important 权重最大

内联 1000

id 0100

class、伪类、属性 **0010**

元素，伪元素 0001

通用，子选择器，同胞选择器，继承 **0000**

### image 是行内元素为什么还可以设置宽高

image 既是行内元素也是可替换元素，除了行内元素和块级元素的定义内，还有替换元素和不可替换元素的定义，像 image 带有 src 属性，input 带有value 属性的标签，属于可替换元素，像直接呈现内容到页面中的标签如 h 标题，属于不可替换元素。

可替换元素的定义是：在CSS中，可替换元素的展现效果不是由CSS来控制的，而是由它们自身的内容或属性值来决定的。它们的内容不受当前文档的样式的影响，但是CSS可以影响它们的位置和大小。 常见的可替换元素有：

- <img>，它的内容是由src属性值指定的图片
- <input>，它的内容是由type属性值指定的控件，比如文本框、按钮、单选框等
- <video>，它的内容是由src属性值指定的视频
- <iframe>，它的内容是由src属性值指定的另一个文档
- <object>，它的内容是由data属性值指定的嵌入对象，比如Flash、PDF等



### display: block 改变的是元素的显示方式，而不是种类

html5 规范规定每个元素都有Categories 和 Content Model 两类。某个父元素是否能容纳子元素是看其content Model 是否包含子元素的Categories。

### span 之间存在空隙的原因

行内元素之间存在空格，空格占有一定大小的位置由字体大小所确定，字体大小具有继承性，将父级元素字体大小设置为0，再在行内元素内将其字体大小设置回便可。

## 网络

### Websocket

WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议，它工作在 OSI 七层模型中的传输层，也就是四层模型中的运输层。它和 HTTP 是不同的协议，但是它们都是基于 TCP 的，而不是 UDP 的。WebSocket 可以利用 HTTP 的握手过程建立连接，但是之后的数据传输不再遵循 HTTP 协议。WebSocket 可以实现浏览器和服务器之间的双向实时通信，而不需要频繁地建立和关闭连接。

OSI 七成模型：物理层、数据链路层、网络层、传输层、会话层、表示层、应用层

### 实现类似于聊天这样的功能时为什么用WebSocket 而不用 http

http 协议是单向的，不支持持久连接的，像长连接和短轮询这些是建立在不断的请求服务器基础上的。

要不断的建立，关闭HTTP协议，由于HTTP是非状态性的，每次都要**重新传输 identity info（鉴别信息）**，来告诉服务端你是谁。

http 协议是文本协议，websocket 是二进制协议，传输二进制文件。

Websocket是双向的，只需要**一次HTTP握手，所以说整个通讯过程是建立在一次连接/状态中**，也就避免了HTTP的非状态性，服务端会一直知道你的信息，直到你关闭请求，这样就解决了接线员要反复解析HTTP协议，还要查看identity info的信息。

http 的声明周期通过request 来界定，一个request 请求对应一个response，在http1.1 协议中虽然可以在一个http 连接中发送多个request 请求，但始终是一个request 对应一个response，且response 是被动的。

### CDN

CDN 的工作原理是利用内容分发网络（Content Delivery Network）将源站的内容缓存到全国或全球各地的边缘节点上，从而实现用户就近访问，提高网站的响应速度和可用性。CDN 的核心技术包括路由转发技术、负载均衡技术、内容分发技术、内容存储技术和内容管理技术。CDN 的好处有以下几点：

- 减轻源站的压力，节省带宽成本
- 提升用户的访问体验，降低延迟和丢包
- 增强网站的安全性，防止恶意攻击和盗链
- 实现跨运营商、跨地域的全网覆盖
- 便于网站的管理和维护

### Token&Cookie

Token 和 Cookie 都是用来实现用户身份认证和会话管理的技术，但是它们有一些区别和联系：

- Cookie 是一种存储在客户端的小型文本文件，用来保存用户的一些状态信息，如用户名、购物车等。Cookie 通常会随着 HTTP 请求自动发送到服务器，服务器可以根据 Cookie 来识别用户的身份。
- Token 是一种加密的字符串，用来表示用户的一些身份信息，如用户 ID、角色等。Token 通常不会自动发送到服务器，而是需要开发者手动添加到 HTTP 请求的头部或者参数中，服务器可以根据 Token 来验证用户的身份。
- Cookie 和 Token 的主要区别在于存储位置和安全性。Cookie 存储在客户端，容易被篡改或者窃取，造成用户信息泄露或者 CSRF 攻击。Token 存储在服务器端，更加安全，但是需要额外的存储空间和验证逻辑。
- Cookie 和 Token 的联系在于它们都是为了解决 HTTP 协议的无状态性问题，即如何在多次请求之间保持用户的登录状态和会话信息。

## 前端负载均衡

前端负载均衡可以通过不同的算法来分配客户端的请求到后端的服务器，比如轮询、加权轮询、IP 哈希、URL 哈希等。

场景：新版本灰度测试。

### Node 和前端运行环境

- 运行平台：Node 运行在服务器端，可以直接操作系统资源，如文件、网络、进程等；前端运行在浏览器端，受到浏览器的安全限制，不能直接操作系统资源，只能通过 Web API 来实现一些功能。[1](https://www.zhihu.com/question/60164095)[2](https://blog.csdn.net/zhouang1/article/details/126813941)[3](https://juejin.cn/post/6844903841473921038)
- 语言特性：Node 和前端都使用 JavaScript 语言，但是 Node 支持的 ECMAScript 版本和模块规范可能和前端不一致，需要注意兼容性问题。[1](https://www.zhihu.com/question/60164095)[2](https://blog.csdn.net/zhouang1/article/details/126813941)[3](https://juejin.cn/post/6844903841473921038)
- 内置 API：Node 提供了一些针对服务器开发的内置 API，如 os、fs、net、http 等模块，可以方便地进行操作系统、文件系统、网络通信、HTTP 服务等操作；前端提供了一些针对浏览器开发的内置 API，如 DOM、BOM、XMLHttpRequest 等对象，可以方便地进行页面元素、浏览器窗口、Ajax 请求等操作。[1](https://www.zhihu.com/question/60164095)[2](https://blog.csdn.net/zhouang1/article/details/126813941)[3](https://juejin.cn/post/6844903841473921038)
- 开发思维：Node 需要考虑服务器端的开发思维，如多进程、负载均衡、分布式、缓存机制、数据库操作等；前端需要考虑浏览器端的开发思维，如用户交互、页面渲染、性能优化、兼容性处理等。

### Koa 洋葱模型

Koa 的洋葱模型是指它的中间件流程控制机制，它可以让每个请求在进入和退出时都经过同一组中间件，形成一个类似洋葱的结构[1](https://juejin.cn/post/7012031464237694983)[2](https://juejin.cn/post/6844904031152783374)。这样做的好处是可以方便地实现后置处理逻辑，比如记录请求耗时、捕获异常等[1](https://juejin.cn/post/7012031464237694983)[3](https://blog.csdn.net/csdnnb666888/article/details/129801458)。Koa 的洋葱模型基于 async/await 语法，可以避免回调地狱和生成器的复杂性[4](https://segmentfault.com/a/1190000013981513)。

### 发布订阅&广播

- 发送对象：发布订阅模式中，消息的发送者（发布者）和接收者（订阅者）之间没有直接的联系，它们通过一个中间件（代理或主题）来进行消息的传递；广播模式中，消息的发送者（广播源）直接将消息发送给所有的接收者（广播站）。[1](https://zhuanlan.zhihu.com/p/182546537)[2](https://cloud.tencent.com/developer/article/1558847)
- 接收方式：发布订阅模式中，订阅者需要主动订阅感兴趣的主题，才能接收到相关的消息；广播模式中，广播站无需订阅任何东西，只要在广播源的范围内，就能接收到所有的消息。[1](https://zhuanlan.zhihu.com/p/182546537)[2](https://cloud.tencent.com/developer/article/1558847)
- 消息过滤：发布订阅模式中，代理或主题可以根据不同的规则对消息进行过滤，只将符合条件的消息发送给对应的订阅者；广播模式中，广播源无法对消息进行过滤，所有的消息都会被发送给所有的广播站。[1](https://zhuanlan.zhihu.com/p/182546537)[2](https://cloud.tencent.com/developer/article/1558847)
- 消息存储：发布订阅模式中，代理或主题可以对消息进行存储，以便在订阅者不在线时，能够保证消息的可靠性和持久性；广播模式中，广播源一般不会对消息进行存储，如果广播站不在线或者丢失了消息，就无法再次获取。

### 进程线程

进程是CPU资源分配的基本单元。

线程是CPU事件调度和执行的基本单元，共享所属进程的地址空间和资源。

### Vue2，3 封装组件

- Vue3 支持多根节点，也就是说组件的模板可以有多个顶层元素，而不是像 Vue2 那样必须有一个包裹的 div。
- Vue3 引入了组合式 API，也就是 setup() 函数，它可以让我们更灵活地组织组件的逻辑，而不是像 Vue2 那样按照 data、computed、methods 等选项来分割代码。
- Vue3 提供了更细粒度的控制响应式数据的方式，比如 reactive、ref、toRefs 等函数，它们可以让我们更清楚地知道哪些数据是响应式的，以及如何在模板和脚本中使用它们。
- Vue3 优化了性能，比如通过静态标记和编译时优化来减少不必要的渲染，以及通过 proxy 来替代 defineProperty 来实现响应式系统。
- Vue3 增加了一些新的特性，比如 teleport、suspense、provide/inject 等，它们可以让我们更方便地实现一些常见的需求，比如弹窗、异步加载、依赖注入等

## React

### 虚拟 DOM

真实 dom 在内存中的表示，与实际 dom 同步，其渲染逻辑由 react 底层实现。

### Whats React

facebook 开发的一个 js 库，基于组件的方式开发网页。

注：react 不是 mvvm 库，mvvm 的一个特点是双向绑定，react 是单向数据流，状态驱动视图。只相当于 View。

flux 架构：view-action-dispatch-store	

### JSX

react 编写 js 的一种模板语法，旨在在 js 中直接编写类似 HTML 标签。需要像 Babel 转换器进行转换。他有以下特点：

1. 属性名采用驼峰式命名
2. class 和 for 需要用 classNames 和 htmlFor 代替
3. 内联样式需要写成对象

### Redux

#### 三原则

单一数据源、state 只读，修改只能通过 action、纯函数执行修改。

### React Router

一种用于在 React 应用中实现页面跳转和导航功能的库。

React Router v4 中使用 switch 关键字是为了只渲染第一个匹配到的路由组件，而不是渲染所有匹配到的路由组件。

React 中需要路由是因为 React 是一个用于构建单页面应用（SPA）的库，而 SPA 需要在不刷新页面的情况下，根据 URL 的变化来显示不同的内容。

优点有：

1. 声明式
2. 动态的
3. 可组合的

React Router 与常规路由的不同在于，React Router 是基于浏览器历史记录（history）对象来实现路由跳转和监听的，而不是基于服务器端的请求和响应。这意味着，当用户访问一个 URL 时，浏览器不会向服务器发送请求，而是通过 history 对象来改变 URL 并触发路由匹配和组件更新。这样做的好处是可以实现单页应用（SPA），即只有一个 HTML 页面，但可以根据不同的 URL 显示不同的内容，从而提高用户体验和性能。



线上环境使用 history 模式需要配置服务端支持的原因？

这是因为 history 模式的 router 是利用 HTML5 History API 来改变 URL 的，而不是真正的向服务器发送请求。[1](https://router.vuejs.org/zh/guide/essentials/history-mode.html)[2](https://blog.csdn.net/mynewdays/article/details/124478849) 当你在本地开发时，你的开发服务器（如 webpack-dev-server）会自动处理 history 模式的 URL，让你可以正常访问任何路由。[3](https://www.cnblogs.com/shapeY/p/14708991.html)

但是当你在线上环境部署时，如果你直接访问一个非根路径的 URL，比如 http://example.com/user/id ，服务器会认为你在请求一个实际的资源，而不是 index.html 页面。[1](https://router.vuejs.org/zh/guide/essentials/history-mode.html)[2](https://blog.csdn.net/mynewdays/article/details/124478849) 但是你的服务器上并没有这个资源，所以会返回 404 错误。[1](https://router.vuejs.org/zh/guide/essentials/history-mode.html)[2](https://blog.csdn.net/mynewdays/article/details/124478849)

为了解决这个问题，你需要在服务器端配置一个回退路由，让所有未匹配到静态资源的 URL 都返回 index.html 页面。[1](https://router.vuejs.org/zh/guide/essentials/history-mode.html)[2](https://blog.csdn.net/mynewdays/article/details/124478849) 这样，浏览器就可以加载 index.html 页面，并根据 history 模式的 URL 来渲染对应的组件

## link 和 @import  的区别 

1. link 引用 css 时，页面载入的时候同时载入；[@import ]() 则等待页面完全载入后再载入 
2. link 除了可加载 css 外，还可加载其他资源；[@import ]() 则只可加载css 
3. link 支持使用 js 控制 dom 改变样式；[@import ]() 不支持 



## 



## 



## 



## http 和 https 的区别

http: 建立在TCP 上的超文本传输协议，以明文方式发送信息，端口 80，连接是无状态的

https: 通过SSL协议提供封装、压缩、加密传输数据，身份认证的功能，端口443

[https 加密实现原理。](https://juejin.cn/post/6844904021308735502#heading-84)

总结：使用对称和非对称加密相结合的方式。使用非对称加密对密钥进行加密通知，然后使用对称加密进行传输数据。最后再结合数字证书认证（包含公钥）从而避免黑客使用 DNS 劫持目标地址。

[http1.0/1.1/2.0 之间的区别:](https://www.cnblogs.com/heluan/p/8620312.html)



## 常见web 攻击技术，如何解决

1. Dos 攻击，利用合理的请求去占用服务器资源使其无法再向外提供服务
2. DDos 攻击，Dos 攻击的升级版
3. XSS 攻击，不法分子利用网页开发漏洞向网页注入恶意代码。通常发生在具有评论，发表文章内容的网站。如果网站直接呈现用户输入的内容，有可能会让黑客输入恶意代码从而让浏览器解析产生不良影响。解决方案：一个信念，两个利用
4. CSRF 攻击，黑客盗用用户的信息冒充用户发送恶意请求来攻击网站



## vue 双向数据绑定原理

vue 实例在创建时会通过 defineProperty 劫持所有属性的 setter 和 getter，并且给使用者添加一个 watcher 观察者，当 vue 实例数据变动或者视图上对应的数据变动，便会通过watcher 观察者进行一个双向通知，从而使数据得到一个双向绑定。



## 



## 地址栏输入url 后的动作

1. 构建请求行

```javascript
// 请求方法是 GET,路径为根路径，HTTP 协议版本为 1.1
GET / HTTP/1.1
```

1. 查找强缓存，如果命中则直接使用。
2. DNS 解析域名找到服务器 ip，浏览器提供 DNS 数据缓存功能，如果一个域名已经解析过，则会将结果进行缓存，下次处理直接走缓存。
3. 与服务端建立 TCP 三次握手连接
4. 客户端发送请求
5. 服务端处理请求并响应内容
6. 如果请求头或响应头中包含 Connection: keep-alive，则建立持久连接，否则关闭 TCP 连接。
7. 客户端解析页面并进行布局渲染



## 性能优化

1. 静态内容采用 CDN 的方式引用
2. 优化图片等大资源的加载，懒加载
3. css 采用 link 的方式引用，js 放在 body 尾部引入
4. 尽量使用 transform 和 opacity 属性来实现动画从而减少重绘重排
5. 合理降低请求量，将合并请求资源
6. link 放在 head 之间，script 通过 defer 属性，放在 head 中





## 哪几种情况会造成跨域，如何解决

1. 不同源——协议号，子域名，主域名，端口号（原因）
2. nigix 反向代理
3. cors 跨域资源共享，由服务端设置Access-Control-Allow-Origin 响应由



## 常见浏览器五大内核

IE-Trident



Safari-Webkit（旧版本 Chrome 是 Webkit 内核，2013 年已更新为 Blink 内核）



火狐-Gecko



Chrome\Opera-Blink



## 利用多个域名储存网站资源更有效

1. CDN 缓存更方便
2. 突破浏览器并发限制
3. 节约cookie 带宽
4. 节约主域名连接数，优化页面响应速度
5. 防止不必要的安全问题



## vue watch 对象不能使用箭头函数

因为 js 代码分为预编译和执行阶段，watch 中的函数在预编译时如果使用箭头函数则会使this 值指向window 而不是 vue 实例。



## ES6 模块和CommonJs

1. ES6 输入值的引用，CommonJS 输入值的拷贝
2. ES6 是编译时输入接口，CommonJS 是运行时加载



## 