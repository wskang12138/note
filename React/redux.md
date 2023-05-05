## 用途

1. 大型应用使用

1. 组件状态需要共享

1. 与服务器大量交互，view 视图需要从多来源获取数据
2. 数据储存到内存中

## Store

1. 保持数据的地方，整个应用只能有一个store

1. 通过createStore 函数生成Store



## State

1. Store 储存数据的地方

1. 通过store.getState 方式获取state 数据

1. 一个state 对应一个view



## Action

1. state 的改变必须要经过Action 的方式进行操作

1. action 是一个对象



```plain
const action = {
	type: /* state 的名称， 必须 */,
	payload: /* 携带的信息数据 */
}
```



1. store.dispatch() 是发出action 的唯一方式。



## Reducer

1. store 收到Action 后通过计算给出新的state 的过程被称为Reducer。

1. 本质是一个函数，接受Action 和当前State 作为参数，返回一个新的state 值。



```plain
const reducer = (state, action) => {
	/* TODO */ 
	return new_state;
}
```



1. Reducer 是一个纯函数，函数里面不能改变state, 必须返回一个全新的对象



## subscribe

1. 监听函数，一旦state 发生改变，便自动执行



```plain
store.subscribe(listener);
```