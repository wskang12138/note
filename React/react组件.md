#### 组件分类



1. 函数式组件，适用于简单组件

1. 类式组件，适用于复杂组件（带有状态state）

```jsx
class MyComponent extends React.Component {
	render() {
        	return {
                <div>Hello React</div>
            }
    }
}
// render 放在MyComponent 的原型上，供实例对象使用
```

1. 执行ReactDOM.render(, document.querySelector('#id'));

1. 1. React解析组件标签
   2. 如果是函数式组件，则直接调用函数
   3. 如果是类式组件，则new 一个该类的实例并通过该实例调用到其原型上的render方法
   4. 将render返回的虚拟DOM 转为真实DOM 并呈现到页面上



#### 组件实例的三大核心属性



##### 组件状态state



1. 用于储存数据，状态的改变代表着数据的改变，从而驱动着视图的改变

1. 状态不可直接更改，要借助内置API：ReactComponent原型对象的setState 方法更改。是一种**合并**而不是替换。

1. state 的setState更新在函数内部调用是**异步**的，在setState 后并不能立即获取到state 的新的值，其更新时机是React 重新渲染组件。通常不要直接依靠state 旧的值去更新一个新值。要实现借助旧数据的功能，可通过让setstate 接受一个函数而不是一个对象来实现，该函数中通过接受旧state 数据作为参数来改变下一个state 值。因为函数能保存着当前的值，在组件重新渲染时链式调用setState 从而能达到目的。



##### props



1. 需要对props 进行限制

```plain
static propTypes = {
name: PropTypes.限定类型.isRequired
}
static defaultProps = {
sex: '不男不女'
}
```

1. props 是只读的，所有 React 组件都必须像纯函数那样保护它们的props 不会修改

1. 组件类构造器接受props并且通过super 传递给父类，会影响是否能在构造器中通过this 访问到props 。一般实际开发中不需要这些类的构造器。

1. 函数组件可以通过参数接收props 并使用



##### refs



1. 用于辨识组件返回的DOM 的内容，以调用。

1. 字符串类型的ref 存在一个效率问题。效率比较低。可以用回调函数的方式或createRef 的方式调用。

```plain
ref={currentNode => {this.input = currentNode}}
```

1. 通过内联回调函数的方式绑定ref ，会在类组件更新过程中被执行两次。

1. React.createRef() 可以返回一个容器用于储存被ref 存储的节点。一个容器只能存储一个结点。

1. react16.0 出来的useRef 钩子更好用。



#### 受控组件和非受控组件



1. 非受控组件对输入类DOM元素的数据是现取现用，其数据的处理交由原始DOM进行控制，例如直接改变、获取input控件中获取的值，不借助state状态对数据进行操控。

1. 受控组件将输入类DOM元素的数据进行一个state 储存（从而加以控制）。省略了ref 的绑定数据。



#### 组件的生命周期



1. 渲染组件

```javascript
ReactDOM.render(<ComponentName/, documenet.querySelector()>)
```

1. 卸载组件

```javascript
ReactDOM.unmountedComponentAtNode(document.querySelector())
```

1. 组件挂载前

```javascript
componentWillMount()
```

1. 挂载组件，组件已经被渲染到真实DOM 中

```javascript
componentDidMount(){}
```

1. 组件卸载前

```javascript
componentWillUnmount()
```

1. 组件是否接收新的props

```javascript
componentWillReceiveProps // 第一次接收时不触发
```

1. 组件是否要更新

```javascript
shouldComponentUpdate() // 默认返回true
```

1. 组件更新前

```javascript
componentWillUpdate()
```

1. 组件更新后

```javascript
componentDidUpdate(preProps, preState, snapshotVal) // 能够获取更新前的props 和state和快照值
```

1. 

1. 新版本中除了componentWillUnmount ，其他旧版本中带will 的声明周期钩子都需要加上UNSAFE_ 的前缀，否则在18+版本中无法生效。

1. 得到一个派生的状态，用于一个罕见的用例，即state 的值任何时候都取决于props.

```javascript
static getDerivedStateFromProps() {
	return null; // 必须返回一个对象或者null,若返回state 对象,则无法更新内容
}
```

1. 在更新前获取组件类原信息快照

```javascript
getSnapshotBeforeUpdate() {
    return null; // 必须返回内容或者null,
}
```

1. 



#### 组件事件处理



1. 事件采用小驼峰式的命名规范

1. jsx 语法需要传入一个函数（大括号），而不是字符串的形式

1. 不能通过返回false 来阻止默认行为，必须通过调用preventDefault

```javascript
function(e) {
	e.prevetnDefault()
}
```

1. class 组件内的方法不会主动绑定this，如果在render 方法中给元素绑定事件是直接通过this.event 的方法去调用，则在其event 方法中this 指向是undefined。通过箭头函数的回调形式或者函数表达式结合箭头函数的形式和解决这个问题。

```jsx
// 声明时通过函数表达式结合箭头函数，未来编写方向，在绑定时需要传递参数通过bind 方法返回函数复制。
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

// 绑定时通过箭头函数回调，这种方式传递给子组件时，这些组件可能会进行额外的重新渲染，带来一定的性能影响。
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```



#### 条件渲染



1. react 的条件渲染也是通过if 或 条件运算符（三目运算，短路门）来决定。

1. 借助一个变量来储存需要渲染的元素。



#### 循环渲染·列表



1. react 通常借助map 方法实现内容的循环渲染，思想是借助本身存在内容的data 数组，改造其中的item 内容为渲染元素。在输出的时候直接通过花括号引用变量便可。 需要为渲染的内容指定一个兄弟节点间唯一的key 值，后续便于虚拟DOM 对比产生变化的节点以对应到真是DOM 上。

```jsx
const data = [1,2,3];
const showList = data.map(item => <div>item<div/>);

render() => <div>{showList}</div>
```



#### form 表单



1. react 将表单的内容绑定的state 中，需要手动鉴定改变事件并且赋予修改值操作（此刻怀念一下vue 的双向绑定)

1. 对于selected 属性，react 在根标签上通过赋值value 进行对比产生selected 状态。



#### 状态提升



1. 定义：多个组件需要享用共同的数据，将他们提升到共同的父组件上去。通过由父组件传递响应方法和数据过子组件从而达成组件间的数据传输。



#### 组件组合嵌套



1. 对于未知组件的子组件内容，可以在自身留一个{{props.children}} 入口来接受后续调用其组件时传入的内容。(vue 的默认插槽)

```jsx
// 父组件
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

// 后续调用
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

1. 除children 外，如果需要在父组件的特定位置插入子组件，可通过自定义变量来约束后续子组件的插入位置。（vue 的具名插槽）

```jsx
// 父组件
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

// 后续调用
function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```