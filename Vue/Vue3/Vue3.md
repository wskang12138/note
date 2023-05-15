# Vue3快速上手

## 1.Vue3简介

- 2020年9月18日，Vue.js发布3.0版本，代号：One Piece（海贼王）
- 耗时2年多、[2600+次提交 (opens new window)](https://github.com/vuejs/vue-next/graphs/commit-activity)、[30+个RFC (opens new window)](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次PR (opens new window)](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[99位贡献者(opens new window)](https://github.com/vuejs/vue-next/graphs/contributors)
- github上的tags地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

## 2.Vue3带来了什么

### 1.性能的提升

- 打包大小减少41%
- 初次渲染快55%, 更新渲染快133%
- 内存减少54%

### 2.源码的升级

- 使用Proxy代替defineProperty实现响应式
- 重写虚拟DOM的实现和Tree-Shaking

###  3.拥抱TypeScript

- Vue3可以更好的支持TypeScript

### 4.新的特性

1. Composition API（组合API）
   - setup配置
   - ref与reactive
   - watch与watchEffect
   - provide与inject
   - ......
2. 新的内置组件
   - Fragment
   - Teleport
   - Suspense
3. 其他改变
   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除keyCode支持作为 v-on 的修饰符
   - ......

# 一、创建Vue3.0工程

## 1.使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

## 2.使用 vite 创建

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite官网：https://vitejs.cn

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图

文档: https://cn.vitejs.dev/guide/why.html#the-problems

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

# 二、常用 Composition API

官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html

## 1.拉开序幕的setup

1. 理解：Vue3.0中一个新的配置项，值为一个函数。
2. setup是所有**Composition API（组合API）***“ 表演的舞台 ”*。
3. 组件中所用到的：数据、方法等等，均要配置在setup中。
4. setup函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. 若返回一个渲染函数：则可以自定义渲染内容。（了解）
5. 注意点：
   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed...）中**可以访问到**setup中的属性、方法。
      - 但在setup中**不能访问到**Vue2.x配置（data、methos、computed...）。
      - 如果有重名, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

## 2.ref函数

- 作用: 定义一个响应式的数据

- 语法:

   

  ```
  const xxx = ref(initValue)
  ```

  - 创建一个包含响应式数据的**引用对象（reference对象，简称ref对象）**。
  - JS中操作数据： `xxx.value`
  - 模板中读取数据: 不需要.value，直接：

  ```html
  <div>{{xxx}}</div>
   
          Copied!
      
  ```

  1

- 备注：

  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠`Object.defineProperty()`的`get`与`set`完成的。
  - 对象类型的数据：内部 *“ 求助 ”* 了Vue3.0中的一个新函数—— `reactive`函数。

## 3.reactive函数

作用: 定义一个**对象类型**的响应式数据（基本类型不要用它，要用`ref`函数）

- 语法：`const 代理对象= reactive(源对象)`接收一个对象（或数组），返回一个**代理对象（Proxy的实例对象，简称proxy对象）**
- reactive定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

## 4.Vue3.0中的响应式原理

### vue2.x的响应式

- 实现原理：

  - 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })  
    ```

- 存在问题：

  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

### Vue3.0的响应式

- 实现原理:

  - 通过Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。

  - 通过Reflect（反射）: 对源对象的属性进行操作。

  - MDN文档中描述的Proxy与Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

      ```js
      new Proxy(data, {
      	// 拦截读取属性值
          get (target, prop) {
          	return Reflect.get(target, prop)
          },
          // 拦截设置属性值或添加新属性
          set (target, prop, value) {
          	return Reflect.set(target, prop, value)
          },
          // 拦截删除属性
          deleteProperty (target, prop) {
          	return Reflect.deleteProperty(target, prop)
          }
      })
      
      proxy.name = 'tom'   
       
      ```

## 5.reactive对比ref

- 从定义数据角度对比：
  - ref用来定义：**基本类型数据**。
  - reactive用来定义：**对象（或数组）类型数据**。
  - 备注：ref也可以用来定义**对象（或数组）类型数据**, 它内部会自动通过`reactive`转为**代理对象**。
- 从原理角度对比：
  - ref通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）。
  - reactive通过使用**Proxy**来实现响应式（数据劫持）, 并通过**Reflect**操作**源对象**内部的数据。
- 从使用角度对比：
  - ref定义的数据：操作数据**需要**`.value`，读取数据时模板中直接读取**不需要**`.value`。
  - reactive定义的数据：操作数据与读取数据：**均不需要**`.value`。

## 6.setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined。
- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 `this.$attrs`。
    - slots: 收到的插槽内容, 相当于 `this.$slots`。
    - emit: 分发自定义事件的函数, 相当于 `this.$emit`。

## 7.计算属性与监视

### 1.computed函数

- 与Vue2.x中computed配置功能一致

- 写法

  ```js
  import {computed} from 'vue'
  
  setup(){
      ...
  	//计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
      
  ```

  

### 2.watch函数

- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。

  ```js
  //情况一：监视ref定义的响应式数据
  watch(sum,(newValue,oldValue)=>{
  	console.log('sum变化了',newValue,oldValue)
  },{immediate:true})
  
  //情况二：监视多个ref定义的响应式数据
  watch([sum,msg],(newValue,oldValue)=>{
  	console.log('sum或msg变化了',newValue,oldValue)
  }) 
  
  /* 情况三：监视reactive定义的响应式数据
  			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
  			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(person,(newValue,oldValue)=>{
  	console.log('person变化了',newValue,oldValue)
  },{immediate:true,deep:false}) //此处的deep配置不再奏效
  
  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(()=>person.job,(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true}) 
  
  //情况五：监视reactive定义的响应式数据中的某些属性
  watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true})
  
  //特殊情况
  watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
  },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
   
  ```

  

### 3.watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  
  ```

  

## 8.生命周期

**vue2.x的生命周期**![lifecycle_2](https://v2.cn.vuejs.org/images/lifecycle.png)

**vue3.0的生命周期**![lifecycle_2](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)



- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - `beforeDestroy`改名为 `beforeUnmount`
  - `destroyed`改名为 `unmounted`
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`

## 9.自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。
- 类似于vue2.x中的mixin。
- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。

## 10.toRef

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：`const name = toRef(person,'name')`
- 应用: 要将响应式对象中的某个属性单独提供给外部使用时。
- 扩展：`toRefs` 与`toRef`功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`

# 三、其它 Composition API

## 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。
- 什么时候使用?
  - 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

## 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

## 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由`reactive`生成的**响应式对象**转为**普通对象**。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

## 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

  ```vue
  <template>
  	<input type="text" v-model="keyword">
  	<h3>{{keyword}}</h3>
  </template>
  
  <script>
  	import {ref,customRef} from 'vue'
  	export default {
  		name:'Demo',
  		setup(){
  			// let keyword = ref('hello') //使用Vue准备好的内置ref
  			//自定义一个myRef
  			function myRef(value,delay){
  				let timer
  				//通过customRef去实现自定义
  				return customRef((track,trigger)=>{
  					return{
  						get(){
  							track() //告诉Vue这个value值是需要被“追踪”的
  							return value
  						},
  						set(newValue){
  							clearTimeout(timer)
  							timer = setTimeout(()=>{
  								value = newValue
  								trigger() //告诉Vue去更新界面
  							},delay)
  						}
  					}
  				})
  			}
  			let keyword = myRef('hello',500) //使用程序员自定义的ref
  			return {
  				keyword
  			}
  		}
  	}
  </script>
      
  ```

  

## 5.provide 与 inject

![img](https://v3.cn.vuejs.org/images/components_provide.png)

- 作用：实现**祖与后代组件间**通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
     	......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

     
     

  2. 后代组件中：

     ```js
     setup(props,context){
     	......
         const car = inject('car')
         return {car}
     	......
     }
      
     ```

     

## 6.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

# 四、Composition API 的优势

## 1.Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

## 2.Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

# 五、新的组件

## 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 2.Teleport

什么是Teleport？—— `Teleport` 是一种能够将我们的**组件html结构**移动到指定位置的技术。

```vue
<teleport to="移动位置">
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>我是一个弹窗</h3>
			<button @click="isShow = false">关闭弹窗</button>
		</div>
	</div>
</teleport
```

## 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
- 使用步骤：
  - 异步引入组件

- ```js
  import {defineAsyncComponent} from 'vue'
  const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
  
  ```

- 使用`Suspense`包裹组件，并配置好`default` 与 `fallback`

```bash
<template>
	<div class="app">
		<h3>我是App组件</h3>
		<Suspense>
			<template v-slot:default>
				<Child/>
			</template>
			<template v-slot:fallback>
				<h3>加载中.....</h3>
			</template>
		</Suspense>
	</div>
</template>
 
```

# 六、其他

## 1.全局API的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
        
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：`Vue.xxx`调整到应用实例（`app`）上

    | 2.x 全局 API（`Vue`）    | 3.x 实例 API (`app`)        |
    | ------------------------ | --------------------------- |
    | Vue.config.xxxx          | app.config.xxxx             |
    | Vue.config.productionTip | **移除**                    |
    | Vue.component            | app.component               |
    | Vue.directive            | app.directive               |
    | Vue.mixin                | app.mixin                   |
    | Vue.use                  | app.use                     |
    | Vue.prototype            | app.config.globalProperties |

## 2.其他改变

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
     
            Copied!
        
    ```

    1
    2
    3
    4
    5
    6
    7
    8

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
     
            Copied!
        
    ```

    1
    2
    3
    4
    5
    6
    7
    8
    9

- **移除**keyCode作为 v-on 的修饰符，同时也不再支持`config.keyCodes`

- **移除**`v-on.native`修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
     
            Copied!
        
    ```

    1
    2
    3
    4

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
        
    ```

- **移除**过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......

# 七 、vue3.2setup语法糖

## 简介

> 在vue3中删除了vue2中的data函数，因此，vue3.0要在template中使用某些变量就必须在最后return出来，多次声明变量，不太方便。而在vue3.2版本之后，新增了setup语法糖。 **直接在script标签中添加setup属性就可以直接使用setup语法糖了。**

## setup使用

**使用setup语法糖后，不用写setup函数；组件只需要引入不需要注册；属性和方法也不需要再返回，可以直接在template模板中使用。**

父组件：

```javascript
<template>
    <div>我是父组件</div>

  <div>大家好我是{{name}}</div>
  <button @click="updateName">点我改名字</button>

    <!-- 直接使用引入的组件 -->
    <Children/>
</template>

<script setup>
import Children from "./children.vue"
import { ref} from "vue"

//定义响应式数据
const name = ref("张三")
console.log(name.value)

//定义绑定的函数
function updateName(){
 name.value = "你好啊，紫陌"
}

</script>   
```



子组件：

```html
<template>
  <div>我是子组件</div>
</template>

<script>

</script>  
```



运行结果： ![在这里插入图片描述](https://img-blog.csdnimg.cn/b77ef2ffd111408ab614e1a43e1af7c0.png)

**script setup 是 vue3.2 的新语法糖，并不是新增的功能模块，主要好处有：**

1. 更少的模板内容，代码简洁，不需要写return；
2. 能够使用ts更好的声明props，以及抛出事件；
3. 更好的运行时性能。

### setup语法糖中新增的api

因为没有了setup函数，那么props，emit怎么获取呢？setup script语法糖提供了新的API来供我们使用。

1. defineProps：子组件接收父组件中传来的props
2. defineEmits：子组件调用父组件中的方法
3. defineExpose：子组件暴露属性，可以在父组件中拿到

#### defineProps

父组件：

```javascript
<template>
    <div>我是父组件</div>

    <!-- 直接使用引入的组件 -->
    <Children :age=18 />
</template>

<script setup>
import Children from "./children.vue"

</script>
   
```



子组件：

```javascript
<template>
  <div>我是子组件</div>

  <div>我的年龄是：{{age}}</div>
</template>

<script setup>
//定义props
const props = defineProps({
    age:{
        type:Number,
        default:0
    }
})
</script>

```



运行结果： ![在这里插入图片描述](https://img-blog.csdnimg.cn/028030935b2d47d3abe68ba949547270.png) 直接打印父组件传过来的值。

#### defineEmits

defineEmits 子组件向父组件事件传递

子组件：

```javascript
<template>
  <div>我是子组件</div>

    <button @click="showInfo">展示信息</button>

</template>

<script setup>

//绑定函数，并且发出事件
const emit = defineEmits(['infoBtn'])
function showInfo(){
    emit("infoBtn","showInfo发生了点击")
}
</script>

```

父组件：

```javascript
<template>
    <div>我是父组件</div>

    <!-- 直接使用引入的组件 -->
    <Children @infoBtn="func"/>
</template>

<script setup>
import Children from "./children.vue"

function func(val){
 console.log("父组件监听到了点击",val);
}
</script>
   
```



运行后点击的效果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/bbf7ad06b483437bb08178cb584af463.png)

#### defineExpose

子组件：

```javascript
<template>
  <div>我是子组件</div>

</template>

<script setup>
import {ref ,reactive} from "vue"

//定义子组件的变量
let age = ref(18)
let name = reactive({
    name : "紫陌"
})

//暴露子组件的变量
defineExpose({
    age,
    name
})

</script>    
```



父组件：

```javascript
<template>
    <div>我是父组件</div>

    <!-- 直接使用引入的组件 -->
    <Children ref="info"/>
    <button @click="showInfo">展示</button>
</template>

<script setup>
import Children from "./children.vue"
import { ref } from "vue";

//注册ref，获取组件实例
const info = ref()

function showInfo(){
    console.log('接收ref暴漏出来的值',info.value.age)
    console.log('接收reactive暴漏出来的值',info.value.name)
}
</script>

```



代码运行结果： ![在这里插入图片描述](https://img-blog.csdnimg.cn/9fa553ac8c134e5f974d66fff86888db.png)

# 八、vue-router4

## 前言

> vue-router3和vue-router4区别不是很大，但是还是有一些语法上的差异。

## 路由配置的差异

1. vue-router4 的 **createRouter()** 替换vue-router3 的 **new Router()**
2. router4 的路由模式由 **createWebHistory()** 替换router3 **mode: 'history'**
3. main.js中 router4 的 **.use(router)** 替换router3 **new Vue({ router })**

## 路由模式区别：

| vue-router 3.x | vue-router 4.x         |
| -------------- | ---------------------- |
| history        | createWebHistory()     |
| hash           | createWebHashHistory() |
| abstract       | createMemoryHistory()  |

## vue-router4基本使用

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'

const router = createRouter({ // 区别1
	history:createWebHashHistory(),  // 区别2
	routes 
})

export default router 


// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);
app.use(router).mount('#app');  // 区别3

```



## 路由跳转及参数的使用

**在vue3.x setup中 ， useRouter、useRoute通常用来：**

1. useRouter：进行路由跳转
2. useRoute：获取路由参数

```javascript
<script setup>
	import { useRoute, useRouter } from 'vue-router'
	const router = useRouter();
	const route = useRoute();

	console.log(route); // 获取路由参数
	router.push('/user'); // 进行路由跳转
</script>
```



**vue-router 3.x中 获取路由参数：**

```javascript
//router3和router4一样
在组件中： {{$route.query.id}} 或 {{$route.params.id}}

//router3和router4一样，但是在setup函数就不一样
在 JS 中： this.$route.query.id 或 this.$route.params.id

//setup函数中
<script setup>
	import { useRoute} from 'vue-router'
	const route = useRoute();

	console.log(route.params.id); // 获取路由参数
</script>

```



## 通配符 * 被取消

```javascript
//vue-router 3
{
 path:'*',
 component:()=>import("../components/NotFound.vue")
}
 
//vue-router 4
{
 path:'/:pathMatch(.*)*',
 component:()=>import("../components/NotFound.vue")
}
//是一个正则表达式
```



## keep-alive使用

**可利用keep-alive的 include 或 exclude 属性（include 和 exclude 包含的name 是组件的name不是router name）来设置缓存：**

- include 值为字符串或者正则表达式匹配的组件name会被缓存。
- exclude 值为字符串或正则表达式匹配的组件name不会被缓存。

vue2写法：

```html
<keep-alive exclude="Home">  // 缓存除了Home外的所有组件
   <router-view></router-view>
</keep-alive>

```



vue3写法：

```javascript
	<router-view v-slot="{ Component }">
	    <keep-alive :include="includeList">
	        <component :is="Component" />
	    </keep-alive>
	</router-view>

<script setup>
import { ref } from 'vue';

// 需要缓存的组件name值
const includeList = ref(['login', 'user']); // 缓存login和user组件
</script>
```



**注意：keep-alive 必须用在 router-view 内部**

## 其他的注意事项

1. **router-link 移除了一部分属性**
   移除 **append** 属性
   **tag** 被移除 **event** 被移除
2. **route 的 parent 属性被移除**
3. **pathToRegexpOptions选项被移除，其他内容替换**
4. **routes选项是必填项**
5. **跳转不存在的命名路由报错** 之前跳转到不存在的路由，页面是空的，会重定向根路径，这是不合理的，所以vue3报错了。
6. **缺少必填参数会抛出异常**
7. **命名子路由如果 path 为空的时候，不再追加 /** 之前生成的 url 会自动追加一个 / ，如："/user/"。副作用：给设置了 **redirect** 选项的子路由带来副作用。

# 九、pinia

## 1.pinia介绍

> pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态。就是和vuex一样的实现数据共享。 依据Pinia官方文档，Pinia是2019年由vue.js官方成员重新设计的新一代状态管理器，更替Vuex4成为Vuex5。 Pinia 目前也已经是 vue 官方正式的状态库。适用于 vue2 和 vue3。可以简单的理解成 Pinia 就是 Vuex5。也就是说， Vue3 项目，建议使用Pinia。

[pinia官方文档(opens new window)](https://pinia.web3doc.top/introduction.html)

**Pinia 的优点**

1. pinia 符合直觉，易于学习。
2. pinia 是轻量级状态管理工具，大小只有1KB.
3. pinia 模块化设计，方便拆分。
4. pinia 没有 mutations，直接在 actions 中操作 state，通过 this.xxx 访问响应的状态，尽管可 以直接操作 state，但是还是推荐在 actions 中操作，保证状态不被意外的改变。
5. store 的 action 被调度为常规的函数调用，而不是使用 dispatch 方法或者是 MapAction 辅助函数，这是在 Vuex 中很常见的。
6. 支持多个 store。
7. 支持 Vue devtools、SSR、webpack 代码拆分。

更多查看文档....

## 2.pinia基本使用

1. 首先先安装依赖

```javascript
npm install pinia   
```

1. 在main.js中引入pinia并创建容器挂载到根实例上

```javascript
//引入stores暴露出的pinia的实例
import pinia from './stores'

createApp(App).use(pinia).mount('#app')

```



1. 创建**stores**文件夹和**index.js**文件（这个文件以后基本不用管了）

```javascript
import { createPinia } from "pinia";

const pinia = createPinia()

export default pinia  
```

1. 在**stores**文件夹下创建**counter.js**文件。这个文件就是存有关counter相关的数据。（类似vuex的模块化）

**defineStore** 是需要传参数的，

- 第一个参数是id，就是一个唯一的值，简单点说就可以理解成是一个命名空间.
- 第二个参数就是一个对象，里面有三个模块需要处理，第一个是 state，第二个是 getters，第三个是 actions。

```javascript
//定义关于counter的store
import {defineStore} from 'pinia'

/*defineStore 是需要传参数的，其中第一个参数是id，就是一个唯一的值，
简单点说就可以理解成是一个命名空间.
第二个参数就是一个对象，里面有三个模块需要处理，第一个是 state，
第二个是 getters，第三个是 actions。
*/
const useCounter = defineStore("counter",{
    state:() => ({
        count:66,
    }),
    
    getters: {

  	},

  	actions: {

  	}
})

//暴露这个useCounter模块
export default useCounter   
```




> 注意：返回的函数统一使用useXXX作为命名方案，这是约定的规矩。例如上面的useCounter

1. 然后再组件中使用：

```javascript
<template>
	<!-- 在页面中直接使用就可以了 不用 .state-->
  <div>展示pinia的counter的count值：{{counterStore.count}}</div>

</template>

<script setup>
// 首先需要引入一下我们刚刚创建的store
import useCounter from '../stores/counter'
// 因为是个方法，所以我们得调用一下
const counterStore = useCounter()

</script>
  
```



> 注意：在模板使用 ，不用和vuex一样还要.state,直接点state里面的K

运行效果： **可以用vue3的调试工具看pinia**

![img](https://img-blog.csdnimg.cn/c7d91276654c4c24a6206f74048b865d.png)

### [#](http://zimo.aizhaiyu.com/views/Vue/vue3语法笔记.html#_2-1注意store获取到后不能解构-否则失去响应式)2.1注意Store获取到后不能解构，否则失去响应式

案例需求，点击按钮加一： 一个不解构，一个不解构看看区别。

```javascript
<template>
  <div>展示pinia的counter的count值：{{counterStore.count}}</div>
  <div>展示解构出来的pinia的counter的count值：{{count}}</div>
  <button @click="addCount">count+1</button>
</template>

<script setup>
	import useCounter from '../stores/counter'
	
	const counterStore = useCounter()
	
	const {count} = counterStore
	
	function addCount(){
	  //这里可以直接操作count，这就是pinia好处，在vuex还要commit在mutaitions修改数据
	  counterStore.count++
	}
<script/>
  
```



> 在 vuex 里面是坚决不允许这样子直接操作 state 数据的，pinia是可以的，看看上面的addCount函数直接操作。

运行结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/833a287cca0540d280ecf82f481633e7.png) 解决方案： **pinia提供了一个函数storeToRefs**解决。引用官方API storeToRef 作用就是把结构的数据使用ref做代理

```javascript
import {storeToRefs} from 'pinia'
const counterStore = useCounter()

const {count} = storeToRefs(counterStore)    
```

现在数据都是响应式的了

![在这里插入图片描述](https://img-blog.csdnimg.cn/8a1ca84315d74e229afec74a37204fab.png)

## 3.修改state的数据

重新新建一个user模块 **stores/user.js**

```javascript
//定义一个关于user的store
import {defineStore} from 'pinia'

const useUser = defineStore("user",{
    state:()=>({
        name:"紫陌",
        age:18
    })
})

export default useUser

```




组件中修改数据： **第一种方法：**点击按钮修改数据，这种方法是最直接的修改数据

```javascript
<template>
    <div>
        <h2>名字是：{{name}}</h2>
        <h2>年龄是：{{age}}</h2>
        <button @click="updateStore">修改Store数据</button>
    </div>


</template>

<script setup>
import useUser from '../stores/user'
import {storeToRefs} from 'pinia'

const userStore = useUser()

const {name,age} = storeToRefs(userStore)

function updateStore(){
    //一个个的修改状态
    userStore.name = "zimo"
    userStore.age = 20
}

```



效果：点击也修改了 ![在这里插入图片描述](https://img-blog.csdnimg.cn/3954bb7dd9444663963a75c9397e5bf0.png)

**第二种方法：$patch函数修改**

```javascript
function updateStore(){
    //一个个的修改状态
    // userStore.name = "zimo"
    // userStore.age = 20

    // 一次性修改多个状态
    userStore.$patch({
        name:"zimo",
        age:20
    })
}
   
```

这个方式也可以，效果一样。

第三种方法：$state 方式（这个是替换的方式。）这个基本不用，这里就不多说。可以看查阅文档。

**第四种方法：$reset()函数是重置state数据的**

新增一个重置按钮：

```javascript
function resetStore(){
    userStore.$reset()
}    
```

**运行结果：点击了修改数据按钮之后在点重置按钮就恢复原始的数据。**

![在这里插入图片描述](https://img-blog.csdnimg.cn/adbf45dc9a044cb6ad81ddec6c6299f0.png)

## 4.getters的使用

getters 类似于 vue 里面的计算属性，可以对已有的数据进行修饰。不管调用多少次，getters中的函数只会执行一次，且都会缓存。

1. **最基本的使用** 在counter模块演示了，counter模块：

```javascript
//定义关于counter的store
import {defineStore} from 'pinia'

const useCounter = defineStore("counter",{
    state:() => ({
        count:66,
    }),

    getters:{
        //基本使用
        doubleCount(state) {
            return state.count * 2
        },
    },
})

//暴露这个useCounter模块
export default useCounter
  
```



组件中：

```html
  <div>
        <h1>getters的使用</h1>
        <h2>doubleCount:{{counterStore.doubleCount}}</h2>
    </div> 
```



运行效果： ![在这里插入图片描述](https://img-blog.csdnimg.cn/78c95fbaf58c45cbb11d23b25e6af629.png)

这样就是最基本的使用了。

1. **一个getter引入另外一个getter**

couter模块：

```javascript
getters:{
        //基本使用
        doubleCount(state) {
            return state.count * 2
        },
        //一个getter引入另外一个getter
        doubleCountAddTwo(){
            console.log(this);
            //this.是store实例
            return this.doubleCount + 2
        }
    },
    
```



组件中使用：

```javascript
<div>
        <h1>getters的使用</h1>
        <h2>doubleCount:{{counterStore.doubleCount}}</h2>
        <h2>doubleCountAddTwo:{{counterStore.doubleCountAddTwo}}</h2>
    </div>    
```



运行效果并且看看打印的this：

![在这里插入图片描述](https://img-blog.csdnimg.cn/b4ce861c334b48828d6c4ab8a383f302.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/753c3f4452e040bf99681d8ce0542a6e.png)

3.**getters中用别的store中的数据**

> **在counter模块中拿user模块的store数据。**

count模块：

```javascript
//定义关于counter的store
import {defineStore} from 'pinia'
import useUser from "./user"
const useCounter = defineStore("counter",{
    state:() => ({
        count:66,
    }),

    getters:{
        //基本使用
        doubleCount(state) {
            return state.count * 2
        },
        //一个getter引入另外一个getter
        doubleCountAddTwo(){
            console.log(this);
            //this.是store实例
            return this.doubleCount + 2
        },
        //getters中用别的store中的数据
        showMessage(state){
            console.log(state);
            console.log(this)
            //获取user信息，拿到useUser模块
            const userStore = useUser()
            //拼接信息
            return `name：${userStore.name}--count:${state.count}`
        }
    },
})

//暴露这个useCounter模块
export default useCounter


```

**注意：要引入user模块**

组件中：

```javascript
 <div>
        <h1>getters的使用</h1>
        <h2>doubleCount:{{counterStore.doubleCount}}</h2>
        <h2>doubleCountAddTwo:{{counterStore.doubleCountAddTwo}}</h2>
        <h2>showMessage:{{counterStore.showMessage}}</h2>
    </div>

```



运行结果： ![在这里插入图片描述](https://img-blog.csdnimg.cn/07e8c014424d4571a5cceeedf4eae920.png)

**注意：我打印了this和store，他们都是当前这这个模块的实例**

![在这里插入图片描述](https://img-blog.csdnimg.cn/cb6e133681db4144b095f6d2df5f8222.png) 这样就在counter模块拿到了user模块的数据了。

## 5. actions的使用

> **actions 是可以处理同步，也可以处理异步，同步的话相对来说简单一点.actions类似methods**

1. **先看同步使用**： counter模块使用： 在actions定义了两个函数一个加一的函数，一个加20的函数。

```javascript
//定义关于counter的store
import {defineStore} from 'pinia'
const useCounter = defineStore("counter",{
    state:() => ({
        count:66,
    }),

    actions:{
        increment(state){
            //actions没有state，只能通过this拿store，这里打印
            console.log(state);
            this.count++
        },
        incrementNum(num){
            this.count += num
        }
    }
})

//暴露这个useCounter模块
export default useCounter

```



组件中： actions函数在组件中使用

```html
	<div>
        <h1>actions的使用</h1>
        <h2>count的事值：{{counterStore.count}}</h2>
        <button @click="changeState">count+1</button>
        <button @click="incrementNum">count+20</button>
      </div>

<script setup>
	import useCounter from '../stores/counter'
	const counterStore = useCounter()
	
	function changeState(){
	  counterStore.increment()
	}
	function incrementNum(){
	  counterStore.incrementNum(20)
	}
</script>

```



运行结果并且看看state是什么

初始值是66，点了一次加1和点了一次加20 ![在这里插入图片描述](https://img-blog.csdnimg.cn/e9f0c0f392d64d54815862c6be2459f1.png)

> ```
>   注意：**state的结果是undefined** 所以actions只能通过this访问store。getter的话state和this都能访问。
>  
>         Copied!
>     
> ```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9a8917ee3c084764be014b3230cd256f.png)

1. **异步操作使用**

**在 actions 处理异步的时候呢，我们一般是与 async 和 await 连用。** counter模块： 这里大致演示，具体还看自己怎么使用。

```javascript
    state:() => ({
        count:66,
        list:[]
    }),
	actions:{
        //大概演示这个异步流程
        async axiosData(){
            const res = await fetch("http://-----------------")
            if(code ==200){
                //收到数据保存到store
                this.list = res.data.list
                return "ok"
            }
        }

    }
```



组件使用：

```html
<template>
      <!-- 遍历store的数据 -->
      <div v-for="item in counterStore.list"></div>
</template>

<script setup>
import useCounter from '../stores/counter'
const counterStore = useCounter()

counterStore.axiosData().then(res =>{
  console.log("成功",res);
})
</script>
    
```

就这样可以啦！！！

是不是比vuex简洁很多。。。

## 6.数据的持久化

pinia支持扩展插件

我们想实现数据持久化

> **npm i pinia-plugin-persist**

```javascript
export const useUserStore = defineStore({
  state () {
    return {
      count: 0,
      num: 101,
      list: [1, 2, 3, 4 ]
    }
  },
  persist: {
    enabled: true, // 开启缓存  默认会存储在本地localstorage
    storage: sessionStorage, // 缓存使用方式
    paths:[] // 需要缓存键 
  }
})
```

