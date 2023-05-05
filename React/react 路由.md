# react-router-cache-route

带缓存功能的路由组件。

**如果只想要单纯的** **<KeepAlive />** **功能，试试** [react-activation](https://github.com/CJY0208/react-activation)

# 配置

create-react-app 脚手架并没有默认安装 react-router

```plain
npm install react-router --dev-save
```



# 概念

1. [React Router 教程](https://www.jianshu.com/p/6583b7258e78)

1. ReactRouter 包含三大组件：Router、Route、Link

1. Router 有五种子组件 

- -  浏览器路由组件，根据History API 监测和同步url 的变化，渲染相应的组件。提供四个属性： 

- - - basename:  路由默认根路径

- - - forceRefresh: boolean 类型，设置导航过程中整个页面是否刷新

- - - getUserConfirmation: 函数类型，导航需要确认时执行的函数

- - - keyLength: 数字类型， location.key 的长度，默认是6

- -  hash 类型url 路由组件

- -  内存路由组件

- - Native 路由组件

- - 地址不改变的静态路由组件



# 用法

1. react-router 相当于React的一个组件，本身是一个容器，需要在内部进行路由定义。

```plain
import {Router, Route, hashHistory } from 'react-router';
/* compontents code... */
render ({
	<Router history={hashHistory}
		<Route path="/" component={App} />
	</Router>
}, document.getElementById('root'))
```



1.  实际开发中将路由另外编写在一个文件中，用数组储存，然后再在项目根组件进行循环渲染。 

1.  路由通配符规则

   

1.  Swich
   只渲染匹配到的唯一一个<路由组件>或<重定向组件>  

```jsx
<Switch>
	<Route path="/" components={Home} />
	<Route path="/index" components={Index} />
</Switch>
```

1.  Exact
   设置路由为精确匹配 



## Route 渲染

### 三种方式

1.  component 

1.  render
   用于额外的渲染逻辑 

1.  children
   传入一个match 参数，用于跳转路径和location 的匹配，无论是否匹配都会渲染其组件，但可以通过match 设置渲染哪个组件  

```plain
<Route path='/home' children={match => {
{match ? <Home/> : <Abount/>}
}}
```



### 传入参数

#### match

1. params

1. path

1. url



#### location

1. pathname

1. search

1. state



#### history

1. go

1. goBack

1. goForward

1. push

1. replace



## 路由模糊精准查询

1. 路由匹配的内容顺序不能改变，必须包含

1. 使用exact 开启精准匹配。



## 知识点

1. 页面中的Link 和 route 应该由同一个Router 进行管理（包裹）

1. 使用NavLink 可以渲染标签中追加一个active 类名，通过activeClass 属性传递点亮类名。

1. 封装NativeLink 组件减少重复代码的编写

1. 多级路径刷新页面产生外部css 样式丢失 

- - 使用绝对路径引用外部样式

- - 使用%PUBLIC_URL% 代替相对路径前缀（脚手架中适用)

- - 使用HashRouter 代替BrowserRouter(# 后面的内容不随着请求发送)

1. Redirect 用于实现路由在没有匹配项的情况下重定向到某一链接（Router 中使用）



## 嵌套路由

1. 每次点击Link 路由都会触发一次路由重新匹配。