## StrictMode

开发模式下检查组件语法。

1. 不安全的生命周期
2. 过时 API 的警告
3. 检测意外的副作用

## 组件实例和组件类

https://www.itranslater.com/qa/details/2128117617998169088

1. `React.Component<any, any> `指代组件实例，
2. `React.ComponentClass<any>`和 `typeof React.Component`指代组件类。



## React.memo 和 useMemo

#### class 组件

1. `React.pureComponent`，每次更新前对 props 和 state 进行浅比较，没有改变则不进行渲染。
2. `componentShouldUpdate`生命周期函数，拿 state 和 props 做比较，返回布尔值决定是否渲染。

#### 函数组件

1. `React.memo`包裹组件，父组件的 props 没有发生改变则不渲染子组件。传入第二个参数判断，返回布尔值决定是否更新渲染组件。`React.memo`仅检查 props 的变化，当组件内部使用 state 或 context 变化时，仍会重新渲染组件。
2. `useMemo`处理组件内某部分的渲染。

## create-react-app 设置路径别名

[正常配置](https://www.cnblogs.com/aurora-ql/p/14124326.html)

[使用 typescript 的 create-react-app](https://blog.csdn.net/qq_29311407/article/details/105512725)

## react 高阶组件

高阶组件的定义是接收以组件为参数并返回组件作为结果。

例子：路由鉴权中，将路由鉴权业务封装到一个高阶组件中，在路由导航中传入对应的跳转路由，避免在功能路由中多次编写鉴权操作。



## useMemo 进行性能优化

封装组件时考虑组件的功能大小，小组件的性能优化应该交由上层组件进行操作，从而避免组件间数据传递导致视图更新的 BUG。

### 复杂组件中封装小组件

避免直接套用组件，应该在引用组件时给组件添加一层 Wrapper 包装，限制其盒子大小，从而能更好地维护和编写样式。



## 组件内外声明变量

```typescript
const page = 0
const limit = 10

const Table = () => {
    return (
      ...
    )
}
```

在组件外部声明的变量会被共用。如果该组件在多个地方被引用时，会共享其值。



## React.onClick 事件

React onClick 事件是合成事件，没有绑定到真实 DOM 上，而是在 document 处监听所有支持的事件，当事件冒泡至 document 时，React 将事件内容封装并交由真正的处理函数运行。

React 中 event 事件是 syntheticEvent（合成事件），合成事件有对原生 stopPropagation 进行封装，但没有对 stopImmediatePropagation 进行封装，在 react 的事件中没有stopImmediatePropagation 函数。但可以通过 event.nativeEvent.stopImmediatePropagation 进行调用。

- 合成事件的监听器是统一注册在 document 上的，且仅有冒泡阶段。所以原生事件的监听器响应总是比合成事件的监听器早。
- 阻止原生事件的冒泡后，会阻止合成事件的监听器执行。
- 

**Reack.****onClickCapture** **这是捕获阶段的合成事件**

https://juejin.cn/post/6844903502729183239

## [ React 中 useState 同步和异步](https://blog.csdn.net/weixin_42420703/article/details/104585427)

由 React 引发的事件处理如 onClick 为异步，除此外的调用都是同步（指绕过 React 本身的控制）



### initalState

组件内声明的函数只在组件初始渲染时被调用，后续重新渲染时会被忽略。

```css
function Demo() {
  function func() {
    console.log('nothing');
  }
}
```

### State 内部比较方式

Hook 内部State 使用Object.is 比较新旧值是否相同（浅比较）。与Class组件不同，当修改State值没有变化，则不会发生变化。



## 组件加载异步任务

1. 在 useEffect 使用 async 包装异步请求
2. 如果在异步请求结果返回前摧毁组件，但后续还需要更新组件内部 state 等，则会报错。解决方案：

1. 1. 在 useEffect 钩子里返回一个状态码 ifUnMounted，前面 fetch promise 根据 ifUnMounted 判断是否继续更新组件

1. 使用 AbortController 直接终止网络请求

## [ 事件池](https://blog.csdn.net/weixin_42420703/article/details/104585427)

React 的事件对象被封装到综合事件对象上`SyntheticEvent` ，在事件处理程序运行后，对象将被重用并且所有属性都将被消失。所有如果需要在事件处理程序后访问事件对象的属性，需要调用 `e.persist()`。

```javascript
function handleChange(e) {
  // Prevents React from resetting its properties:
  e.persist();

  setTimeout(() => {
    console.log(e.target.value); // Works
  }, 100);
}
```