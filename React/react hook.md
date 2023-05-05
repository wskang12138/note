#### 定义

1. 用于在函数组件中也使用state 以及其React 新特性

1. 未来开发倾向

1. 提供了更直接的API:props, state, context, refs, 以及生命周期



#### useState

1. 用于创建一个state ，返回创建的值和更新它的函数，更新函数不是Class 组件setState 的合并方式，而是替换方式。接受唯一参数用于初始化state 的值

```jsx
function componentDemo() {
	const [count, setCount] = useState(1); // 数组解构的方式进行赋值
}
```

1. 组件内通过多次使用useState 创建对应的state

1. 给useState 传入一个计算state 的函数，该函数在初始渲染时调用，后续修改state中的值需要借助修改函数去修改。
2. 更新函数可以传入一个函数用于异步更新值。

```javascript
setCount(prevState => prevState++);
```



#### useEffect（副作用函数）

赋值给 useEffect 的函数会在**组件渲染到屏幕之后**执行。

清除动作也是在下次组件重新渲染后执行。

1. 对照class 中的生命周期函数 `componentDidMount`、`componentDidUpdate`和`componentWillUnmount`的组合，在组件渲染到屏幕后执行。

1. React 会在每次渲染的时候调用副作用函数，包括第一次渲染的时候，能够获取到最新的state(在不指定依赖项的情况下，state 每次发生改变，都会产生重新渲染）。
2. 接受一个具体值或者一个函数，函数第一个参数为自身 state 值，以返回的值作为更新数据。

1. 只能在函数最外层调用，不能在循环、条件判断或子函数中调用

1. effect 返回的是一个函数通常用于清除操作，在 React组件卸载时或组件多次渲染时，执行下一个 effect 前调用上一个 effect 的清除，同样在组件重新渲染后执行。

1. 设置依赖项的 Effect 副作用函数，函数体内调用的函数如果有使用到 state 值无法获取到最新的 state 值。（对于变化频率较大的 state 值，可通过添加一个辅助 state 值进行控制）
2. 设置依赖项的 Effect，只在组件重渲染后根据依赖项决定是否执行内部的函数。（分清 Vue Watcher）

```jsx
function Example() {
	const [count, setCount] = useState(1); // 初始化count为1并设置更新它的方法setCount
	useEffect(() => { // 相当于componentDidMount 和componentDidUpdate
		document.titile = `${count} 次点击`;
	});
	return (
		<button onClick={() => setCount(count + 1)} >Click Me</button>
	);
}
```



#### useLayoutEffect

其函数签名与 useEffect 相同，但它**会在****所有的 DOM 变更之后****同步调用** effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

与useEffect的区别是，useEffect在组件完成页面渲染（painting ）后异步执行；useLayoutEffect在组件完成 render 树，渲染内容到界面前**同步**执行的。通常情况下把对DOM的操作放在useLayoutEffect中去，避免页面的闪烁。

![img](https://cdn.nlark.com/yuque/0/2021/png/12905753/1632358526958-c8e03100-1f8d-4ebc-b734-2bfa2f8f1163.png)

#### 自定义Hook



1. 解决Hook 重用的问题，抽取实现逻辑到javascript 函数里。

1. **必须以use 开头**命名自定义Hook函数。

1. 在两个组件间使用相同的useEffect不会共享state值。

1. 本质上就是单独写一个useEffect的包装函数。



```jsx
// 包装
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

// 使用
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```



#### useContext



1. 不使用组件嵌套便订阅React 的Context
2. 给不同组件之间共享相同的数据

```javascript
// 第一步使用React Context API生成一个外部Context
const AppContext = React.createContext();
// 封装形式如下
<AppContext.Provider value={{
  username: 'superawesome'
}}>
  <div className="App">
    <Navbar/>
    <Messages/>
  </div>
</AppContext.Provider>
// Navbar 和 Messages 组件内通过useContext钩子获取共享对象
const { usename } = useContext(AppContext);
```



#### useReducer



1. 通过reducer 来管理组件本地复杂的state。

1. 适用于state嵌套复杂，不同的state之间存在依赖的情况



```javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```



#### useRef



1. 返回一个可变的ref对象，该对象在组件整个生命周期内保持不变。可用于获取元素原生 DOM 或者自定义组件所暴露出来的 ref 方法（函数式子组件通过 useImperativeHandle 定义暴露给父组件的 ref 方法）。当通过`ref=`绑定组件时，便可命令式地访问该组件。使用React.createRef，每次重新渲染组件都会重新创建ref。
2. 更新 current 的值并不会重渲染。
3. 不仅可用于DOM refs。ref对象是一个**current属性**可变且可容纳任意值的通用容器，类似于一个class的实例属性。
4. `useRef`仅在 Mount 时期初始化对象，在 Update 时期返回 Mount 时期的结果。在一次完整的生命周期中，`useRef`保留的引用始终不会改变。
5. **forwordRef**。函数组件无法像类组件一样接收ref属性。使用forwordRef暴露给父组件的实例值。
6. 当组件被 connect 和 forward 共同应用时，需要将 **forward 包裹在最外层**。[参考](https://juejin.cn/post/7041843124926152717#heading-5)

useRef，useImperativeHandel，forwardRef 三者用法：https://blog.csdn.net/qq_32615575/article/details/116980867

1. 直接绑定和函数式绑定

- 直接绑定返回的 ref 对象在组件的整个生命周期内保持不变，而函数绑定每次渲染时都会创建一个新的函数实例，所以 React 会清空旧的 ref 并设置新的。
- 直接绑定不会通知你 ref 对象内容的变化，而函数绑定可以在回调函数中执行一些操作，例如设置状态或者添加事件监听器。
- 直接绑定只能用于类组件或者 HTML 元素，而函数绑定可以用于 任何组件，包括函数组件

1. 



```jsx
// 声明
const ele = useRef(null);
// 绑定
<MyComponent ref={ele} />
// 使用ref对象储存状态值
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });
}
```



#### useCallBack

用于保存一个回调函数，接收第二个参数作为函数是否重新渲染的依赖项。常用于减少组件的render时的非必要重复渲染以达到性能优化。

```jsx
const callbackContainer = useCallBack(
	() => {
    /toDo/
  },
  [依赖项]
)

useCallback(fn, deps) 相当于 useMemo(() => fn, deps);
```

#### useMemo

保存return 返回的结果，主要用于缓存计算结果的值，eg: 计算的状态。

依赖项数组不会作为参数传给“创建”函数。

```javascript
const memoValue = useMemo(() => demoFn(a,b), [a,b]);
```

**注: 不要滥用 useCallback 和 useMemo. 通常结合两个场景综合考虑是否应用：**

- **函数需要进行大量运算**
- **需要比较引用的场景。eg: 重新渲染会受到别的依赖项的影响**

#### Hook 规则

1. 只在最顶层使用Hook, 不要在循环，条件或嵌套函数中调用Hook

1. 只在React 函数中调用Hook

1. React 依靠Hook 的调用顺序辨别state 对应的useState 方法。

```javascript
// ------------
// 首次渲染
// ------------
useState('Mary')           // 1. 使用 'Mary' 初始化变量名为 name 的 state
useEffect(persistForm)     // 2. 添加 effect 以保存 form 操作
useState('Poppins')        // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
useEffect(updateTitle)     // 4. 添加 effect 以更新标题

// -------------
// 二次渲染
// -------------
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
useEffect(persistForm)     // 2. 替换保存 form 的 effect
useState('Poppins')        // 3. 读取变量名为 surname 的 state（参数被忽略）
useEffect(updateTitle)     // 4. 替换更新标题的 effect
```