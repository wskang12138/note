# Dva & Umi

## dva

### 概念

dva = React-Router + Redux + Redux-saga

![img](https://cdn.nlark.com/yuque/0/2021/png/12905753/1629336796956-0669a3f5-4154-4317-ac1e-42aa01c48242.png)

**核心：**

- State，一个对象，保存整个应用状态
- View, React 组件构成的视图层
- Action, 一个对象，描述事件
- connect, 一个函数，绑定State 到 View
- dispatch, 一个函数，发送Action 到 State

### connect

返回的也是一个React组件，称为容器组件。

```js
function mapStateToProps(state) {
  return { demoModel: state.demoModel }
}

connnect(mapStateToProps)(DemoComponent)
```

## umi

[umi 手把手带入门](https://www.yuque.com/umijs/umi)

### 特点

文件即路由，pages 目录下创建的文件umi 自动为其生成相对应的路由，省去了麻烦的路由配置（没有自己配路由文件的前提下）。



开发者只管负责业务代码，umi 负责性能的优化，真正的开箱即用。(nice)

**reducer 和 effect 下的方法参数命名不能自定义，必须使用默认形式。eg: effect 方法的payload,call, select**



### models

用于存放处理数据流的文件。其文件结构一般如下：

```js
export default {
  namespace: 'example', // 这个 model 的名字，必须全局唯一
  state: {
    count: 0,
  }, // 用于储存数据
  reducers: {
    save() { ... },
  }, // 用于修改数据
  effects: {
    *getData() { ... },
  }, // 用于获取数据
  subscriptions: {
    setup() { ... },
  }, // 用于订阅数据
}
```

### reducers

每个**reducer** 都是一个普通函数，接受state 和 action 作为参数，返回新的state



### effects

每个**effect**都是一个生成器函数，用于获取需要的数据，一般是向服务器发起一个请求，或是获取其他model 里的state。为了达到明确分工的作用，无法在effect 中直接修改state，但可以通过**put**方法调用reducer 来修改state。effect函数返回Promise。



### select

用于获取**当前或其他model** 的 `state`。返回 **Promise**。

```js
const data = yield select(states => states[namespace]);
```

**call**

用于执行一个异步函数，常用于发送http 请求，等待服务器响应数据。

```js
const data = yield call(asyncRequest, parameter);
```

**put**

用于触发一个action，这个action 既可以是一个reducer 也可以是一个effect。效果同dispatch，只是在不同的地方，使用不同的的方法名表示。

```js
yield put({type: 'toDoList', payload: { page }});
```

yield 调用put 的同步和异步操作问题。参考文章：

| https://blog.csdn.net/YMX2020/article/details/106674143

总结起来：

- 调用reducer函数，为同步操作。

- 调用非reducer函数，为异步操作。通过put.resolve调用会变成同步操作。

- 使用yield take('asyncinitData/@@end') 可以监听异步操作的完成，会阻塞后面代码的执行。

### subscriptions

用于订阅一个数据源，根据需要使用 dispatch 触发相应的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。 每当其中的监听项有变化时都会导致全部方法都执行一边。项目中常用于页面初始化数据的自动请求，如：

```js
subscriptions: {
  setup({ dispatch, history }) {
    return history.listen(({ pathname, query }) => {
      // 进入 '/home' 路由，发起一个名叫 'query' 的 effect
      if (pathname === '/home') {
        dispatch({ type: 'query' });
      }
    });
  },
  onClick ({dispatch}) {
      document.addEventListener('click',() => {   //这里表示当鼠标点击时就会触发里面的dispatch命令，这里的save就是reducers中的方法名
        dispatch (type:"save")
      })
    },
    history.listen((location) => {
    console.log(location)   //这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
      ....
    })
}
```

subscriptions 是一个**全局**的监听，就是说，当设定触发条件满足时，所有的 subscriptions 都会响应。

**dispatch**

类似 effect 中的 put 方法，你可以在 subscription 的参数、或是一个已经 connect 过的组件的 `props` 中拿到。触发effect 或 reducers 中的动作。**在组件中使用dispatch提交的方法的回调函数中无法获取最新的model中的值**。

**connect**

通过此方法在你的组件中获取到指定 model 的 state 数据。

```js
import { connect } from 'dva';
function App({ user, dispatch }) {
  const handleClick = () => {
    dispatch({ type: 'user/fetchUser' });
  };
  return (
    <div>
      <h2>Hello, {user}</h2>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
export default connect(({ user }) => ({ user }))(App);
```

### mock

前端本地模拟数据，脱离后端的开发进度约束。**只在dev下生效**。

```js
export default {
  '/api/users': ['a', 'b'],
}
```

### mock 请求携带参数

```js
'POST /api/herodetails.json': (req, res) => {
    const { ename } = req.body;
    const hero = herolist.filter(item => item.ename === parseInt(ename, 10))[0];
    res.send(hero);
  },
 // 定义了请求为post 请求，并从请求中获取ename 数据对数组作出了过滤
     
// 发起请求时增加请求头和body 转换
  const data = yield request('/api/herodetails.json', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      ename: 110,
    }),
  });

```

### layouts

约定式的全局路由，相当于路由外面在套一层。

```js
[
  {
    path: '/',
    component: './layouts/index',
    routes: [
      {
        path: '/',
        component: './pages/index',
      },
      {
        path: '/users',
        component: './pages/users',
      },
  	],
  },
]
/* 组件角度 */
<layout>
	<page>1</page>
	<page>2</page>
</layout>
```

### pages

约定 pages 下所有的 `(j|t)sx?` 文件即路由。

#### 基础路由

```js
+ pages/
  + users/
    - index.js
    - list.js
  - index.js
  
  /* 对应的路由配置 */
  [
  {
    path: '/',
    component: './pages/index.js',
  },
  {
    path: '/users/',
    component: './pages/users/index.js',
  },
  {
    path: '/users/list',
    component: './pages/users/list.js',
  },
]
```

#### 动态路由

```js
+ pages/
  + [post]/
    - index.js
    - comments.js
  + users/
    [id].js
  - index.js
  
  /* 对应的路由配置 */
  [
  {
    path: '/',
    component: './pages/index.js',
  },
  {
    path: '/users/:id',
    component: './pages/users/$id.js',
  },
  {
    path: '/:post/',
    component: './pages/$post/index.js',
  },
  {
    path: '/:post/comments',
    component: './pages/$post/comments.js',
  },
]
```

**404.js**

当访问的路由地址不存在时，会自动显示404 页面。只有build之后生效。调试的时候可以访问 `/404` 。



**document.ejs**

若此文件存在，则会覆盖默认的 HTML 模板。需至少包含以下代码，

```html
<div id="root"></div>
```

### global.(j | t)sx

在入口文件最前面被自动引入，可以考虑在此加入 polyfill。umi 区别于其他前端框架，没有显示的程序主入口，如 `src/app.js` 或 `src/index.js`，所以在引用某些模块的时候，如果模块功能要求在程序主入口添加代码时，你就可以写到这个文件。

### global.(css | less | scss | sass)

这个文件不走 css modules，自动被引入，可以写一些全局样式，或者做一些样式覆盖

### 路由导航

1. 命令式

history.push('url')



1. 声明式
   ```js
   <Link to="url"></Link>
   ```

   

## umi-plugin-react

### 配置项

所有功能默认关闭，设置为true开启

- antd 该插件内置
- locale 配置国际化
- title 设置页面标题显示
- script 插在body umi.js 后的外部js文件

## umi-request

### 定义：

[umi-request](https://link.zhihu.com/?target=https%3A//github.com/umijs/umi-request) 是基于 fetch 封装的开源 http 请求库，旨在为开发者提供一个统一的 API 调用方式，同时简化使用方式，提供了请求层常用的功能。

- URL 参数自动序列化

- POST 数据提交方式简化

- Response 返回处理简化

- 请求超时处理

- 请求缓存支持

- GBK 编码处理

- 统一的错误处理方式（注意：默认带有自身的错误处理，如果不需要或者想自定义，需要通过回调函数将其 error.response 返回）

- 请求取消支持

- Node 环境 http 请求
- 拦截器机制
- 洋葱中间件机制

与 **fetch**、**axios** 的区别

![img](https://pic4.zhimg.com/v2-96ed949aa1475afeaf383668f2d41037_r.jpg)



### 使用

get 请求

```js
import request from "umi-request";
request
  .get("/api/v1/xxx?id=1")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
// 也可将 URL 的参数放到 options.params 里
request
  .get("/api/v1/xxx", {
    params: {
      id: 1
    }
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

post 请求

```js
import request from "umi-request";
request
  .post("/api/v1/user", {
    data: {
      name: "Mike"
    }
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

### 通用配置

请求一般都有一些通用的配置，我们不想在每个请求里去逐个添加，例如通用的前缀、后缀、头部信息、异常处理等等，那么可以通过 **extend** 来新建一个 umi-request 实例，从而减少重复的代码量：

```js
import { extend } from "umi-request";

const request = extend({
  prefix: "/api/v1",
  suffix: ".json",
  timeout: 1000,
  headers: {
    "Content-Type": "multipart/form-data"
  },
  params: {
    token: "xxx" // 所有请求默认带上 token 数据
  },
  errorHandler: function(error) {
    /* 异常处理 */
  }
});

export default request;
```

```json
// 内置常见配置
{
  // 'params' 是即将于请求一起发送的 URL 参数，参数会自动 encode 后添加到 URL 中
  // 类型需为 Object 对象或者 URLSearchParams 对象
  params: { id: 1 }, 

  // 'paramsSerializer' 开发者可通过该函数对 params 做序列化（注意：此时传入的 params 为合并了 extends 中 params 参数的对象，
  //  如果传入的是 URLSearchParams 对象会转化为 Object 对象
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  },

  // 'data' 作为请求主体被发送的数据
  // 适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: { name: 'Mike' },

  // 'headers' 请求头
  headers: { 'Content-Type': 'multipart/form-data' },

  // 'timeout' 指定请求超时的毫秒数（0 表示无超时时间）
  // 如果请求超过了 'timeout' 时间，请求将被中断并抛出请求异常
  timeout: 1000,

  // 'prefix' 前缀，统一设置 url 前缀
  // ( e.g. request('/user/save', { prefix: '/api/v1' }) => request('/api/v1/user/save') )
  prefix: '',

  // 'suffix' 后缀，统一设置 url 后缀
  // ( e.g. request('/api/v1/user/save', { suffix: '.json'}) => request('/api/v1/user/save.json') )
  suffix: '',

  // 'credentials' 发送带凭据的请求
  // 为了让浏览器发送包含凭据的请求（即使是跨域源），需要设置 credentials: 'include'
  // 如果只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加credentials: 'same-origin'
  // 要改为确保浏览器不在请求中包含凭据，请使用credentials: 'omit'
  credentials: 'same-origin', // default， omit不携带，include始终携带

  // 'useCache' 是否使用缓存，当值为 true 时，GET 请求在 ttl 毫秒内将被缓存，缓存策略唯一 key 为 url + params 组合
  useCache: false, // default

  // 'ttl' 缓存时长（毫秒）， 0 为不过期
  ttl: 60000,

  // 'maxCache' 最大缓存数， 0 为无限制
  maxCache: 0,

  // 'charset' 当服务端返回的数据编码类型为 gbk 时可使用该参数，umi-request 会按 gbk 编码做解析，避免得到乱码, 默认为 utf8
  // 当 parseResponse 值为 false 时该参数无效
  charset: 'gbk',

  // 'responseType': 如何解析返回的数据，当 parseResponse 值为 false 时该参数无效
  // 默认为 'json', 对返回结果进行 Response.text().then( d => JSON.parse(d) ) 解析
  // 其他(text, blob, arrayBuffer, formData), 做 Response[responseType]() 解析
  responseType: 'json', // default

  // 'errorHandler' 统一的异常处理，供开发者对请求发生的异常做统一处理，详细使用请参考下方的错误处理文档
  errorHandler: function(error) { /* 异常处理 */ },
}
```

中间件拓展

```js
import request from "umi-request";
// 使用 async/await 能让结构、顺序更清晰明了：
request.use(async (ctx, next) => {
  console.log("a1");
  await next();
  console.log("a2");
});
request.use(async (ctx, next) => {
  console.log("b1");
  await next();
  console.log("b2");
});

const data = await request("/api/v1/a");

// 执行顺序如下：
// a1 -> b1 -> b2 -> a2
```

## fetch

[阮一峰教程](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

fetch 请求只有在无法发出或响应时才会拒绝。

get 请求只能通过在 url 中传参

```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json(); // 获取真正的json 内容
  })
  .then(function(myJson) {
    console.log(myJson);
  });


// 通过第二个参数控制请求对象
postData('http://example.com/answer', {answer: 42})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}
```

 AbortController 

abortController 是一个实验室功能，目前除了 IE 其他浏览器的适配性较好。

用于终止网络请求。

示例：

```js
const controller = new AbortController();
let signal = controller.signal;

const downloadBtn = document.querySelector('.download');
const abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {
  controller.abort();
  console.log('Download aborted');
});

function fetchVideo() {
  //...
  fetch(url, {signal}).then(function(response) {
    //...
  }).catch(function(e) {
    reports.textContent = 'Download error: ' + e.message;
  })
}
```

