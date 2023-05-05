## React Hooks 库，致力于提供常用且高质量Hooks

### Async

#### useRequest

一个强大的管理异步请求的Hook.

- 自动请求/手动请求
- SWR（如果有缓存数据，先使用缓存数据，背后发送新请求）
- 缓存/预加载
- 屏幕聚焦重新请求
- 轮询
- 防抖
- 节流
- 并行请求
- 依赖请求
- loading delay（有效防止闪烁）
- 分页
- 加载更多，数据恢复 + 滚动位置恢复

### UI

#### useDrop & useDrag

帮助处理拖拽中进行数据转移

**useDrop** 可以单独使用来接收文件、文字和网址的拖拽。

**useDrag** 允许拖拽一个dom节点，需要配合useDrop使用。

### SideEffect

#### useDebounce

处理防抖，绑定值



#### useDebounceFn

处理防抖函数



#### useInterval

处理setInterval



#### useThrottle

处理节流，绑定值



#### useThrottleFn

处理节流函数



#### use Timeout

处理setTimeout

### LifeCycle（生命周期）

#### useDebounceEffect

为useEffect 增加防抖能力



#### useMount

在组件mount 时执行



#### useThrottleEffect

在useEffect 增加节流能力



#### useTrackedEffect

追踪触发useEffect的依赖变化。查看每次effect执行时发生变化的依赖项。



#### useUnmount

组件卸载时，执行方法



#### useUnmountedRef

获取当前组件是否卸载，用于避免因组件卸载后更新状态而导致的内存泄漏



#### useUpdate

强制组件重新渲染



#### useUpdateEffect

只在依赖更新时执行useEffect。忽略首次渲染。



#### useUpdateLayoutEffect

只在依赖更新时执行useLayoutEffect。忽略首次渲染。

### State

#### useCookieState

将状态持久化储存在cookie中



#### useCountDown

管理倒计时



#### useHistoryTravel

管理状态变化历史，快速在状态变化历史中穿梭。



#### useLocalStorageState

将状态持久化储存到localStorage 中



#### useNetwork

管理网络连接状态



#### useToggle

用于在两个状态值之间切换



#### useWebSocket

处理WebSocket



#### useWhyDidYouUpdate

输出导致组件rerender（重渲染） 的原因，配合bug查找。



#### useEventListener

优雅使用addEventLisener



#### useExternal

动态向页面中加载或卸载外部资源



#### useFullscreen

处理dom全屏



#### useKeyPress

优雅管理keyup和keydown键盘事件，支持键盘组合键



#### useTextSelection

实时获取用户当前选择的文本内容及位置



#### useTitle

设置页面标题



### Advanced（先进的）

#### useEventEmitter

用于组件间通信



#### useReactive

提供一种数据响应式的操作体验，不要需要再另外定义useState，直接修改属性即可刷新视图



#### useSafeState

组件卸载后异步回调内的setState 不再执行，避免因组件卸载后更新状态导致的内存泄漏。