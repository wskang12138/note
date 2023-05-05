## React18

### useId

同一组件在客户端和服务端生成唯一 ID

### 

## createPortal

Portal 提供了一种将子节点渲染到存在于父组件以外 DOM 节点的方案。

```javascript
<div ref={tempRef}>
    {
      createPortal(
        <div className={`${style['right-menu-wrapper']} ${(visiblity || visible) ? style['right-menu-wrapper-show'] : ''}`}
          onClick={(e) => { e.preventDefault(); changeVisible(false) }}
        >
          <div
            className={`${style['right-menu-container']} ${classnames}`}
            style={{ top: pos[1], left: pos[0] + 10 }}
          >
            <ul>{menuItemRender}</ul>
          </div>
        </div>
        , document.body)
    }
  </div>
```

## lazy 懒加载

1. 只支持默认导出

1. 需要通过Suspense 组件进行包裹，并设置fallback内容

```jsx
const Component = React.lazy(() => import('./Componetns'));

render() {
    return (
    <Suspense fallback={<div>Loading...</div>}>
            <Component />
     </Suspense>
    )
}
```



## Context

为了满足一个组件树访问全局的数据。从而不用使用props 在嵌套父子组件下进行逐层数据传递。

```jsx
const Theme = React.createContext('light'); // 创建一个默认为light 的context
function App() {
	return (
		<Theme.Provider value='dark'> <!-- 通过context 对象的Provider 方法传入值 -->
		<Childrens/>
		</Theme>
	)
}

function Children() {
	static contextType = Theme;// 实验性的public class fields 语法class 组件使用contextType 进行消费
	return (
		<Button theme={this.context}/>
	)
}

|| Children.contextType = Theme;

function Son() {
	const theme = useContext(Theme); // 函数组件使用useContext 进行消费
	return (
		<Button theme={theme}/>
	)
}
```



### 模块化

将需要共享的context 数据单独编写成一个文件，在需要的组件内进行导入

```javascript
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(
  themes.dark // 默认值
);
```



### Context.Consumer

```jsx
<MyContext.Consumer>
{value => /* 基于context 的值进行渲染*/}
</MyContext.Consumer>
```



## 过度重渲染

如果context Provider 传递的值是另外定义的，则当其父组件重渲染时，后代的所有消费组件都会进行重渲染，因为value 属性被赋予了新的对象，可以把其值存放到父组件的state 里避免这个问题。



## 错误边界

部分UI 的js 逻辑错误不应该导致整个应用的的奔溃，引入错误边界从而解决这个问题。



### 定义

错误边界时一种React 组件，这种组件可捕获并打印发生在其子组件树**渲染期间**任何位置的JS 错误，并且渲染出备用UI。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。无法捕获**组件内的自定义事件**的错误。



如果一个 class 组件中定义了 `static getDerivedStateFromError()` 或 `componentDidCatch()` 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 `static getDerivedStateFromError()` 渲染备用 UI ，使用 `componentDidCatch()` 打印错误信息



### 用法

定义一个错误边界组件，包裹需要监控的组件树。

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}


<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```



### 新

自React16 起，任何未被错误边界捕获的错误将会导致整个React 组件树被卸载。



## Fragments

相当于使用 <></>。当是通过数组进行遍历渲染的话则可使用 Fragment 进行包裹。

当组件返回多个元素，允许将子列表分组，而**无需用父节点包裹**。唯一可传递给Fragments 的值时 **key**。在使用循环渲染的时候需要传递key 值。

```jsx
function Component() {
	return (
	<React.Fragment>
	 <td>Hello</td>
	 <td>World</td>
	</React.Fragment>
	)
}

// 语法糖
return (
	<>
	 <td>Hello</td>
	 <td>World</td>
	</>
	)
```



## 高阶组件

### 定义

高阶组件是**参数和返回值都是组件**的函数。用于返回将具有相同功能的组件，只有一些差入的组件，达到复用。不应该修改原始组件的内容，而是将其他功能进行包装。



### 注意

1. 不要在render 方法中使用HOC，这样每次渲染都是一个新的组件，React 会卸载和重新挂载新组件。



## JSX

### 定义

React.createElement(componet, props, ...children ) 的语法糖



### 使用

1.  使用点语法引用组件
   在一个模块中导出很多React 组件时，通过点语法直接获取其中需要使用的  

```javascript
function Picker() {
	return <MyComponets.DatePicker />
}
```

1.  小写字母被编译成html 元素，大写字母编译成组件。 

1.  不能将表达式作为React 元素类型，通过赋值变量可解决这一问题。 

1.  props 的默认值为**true** 

1.  通过展开运算符在传递props 时非常方便 

1.  jsx 会移除内容之间的空行 

1.  条件渲染中有些falsy 值仍然会被React 渲染，比如数字0。通过设置短路符前面的表达式总为布尔值可解决。 



## Render Props

### 定义

在React 组件之间使用一个prop值为函数的共享代码的技术。**render prop 是一个用于告知组件需要渲染什么内容的函数** 

```jsx
<MyComponent render={data => (
	<h1>Hello {data.target}</h1>
	)}
</>
```



### 用途

解决组件之间的横切关注点。就是使具有某一核心功能的组件渲染特定模式的内容。