## ES2015(ES6)

### 类 class

**类没有变量提升，需要先声明再使用，不属于顶层对象。本质上是一个函数。相当于构造函数的语法糖。**



```javascript
class Person {
    // 类中的方法不用再加function 关键字,construtor 为构造函数（实例所有），方法之间不需要逗号进行隔开
    // construtor 为每个类必须拥有，如果没有显式调用，则默认构造一个空的construtor。
 construtor(name) {
 	this.name = name;
 }
 say() {console.log('say');} // 该方法放在Person 类的原型上（Person.prototype)，供其实例调用。
}
// 通过关键字 extends 进行继承，通过super 访问父类中的数据,必须放在子类构造函数this 的最前面。
class Chinese extends Person {
    constructor(x,y) {
        super(x);
        this.special = y;
    }
}
```



-  类中所有的局部方法都开启了严格模式， 

-  类中直接写赋值语句相当于给类的实例添加一个属性，其作用和在construtor中给this赋值结果一样。 

-  类中的所有方法都是不可枚举的。 

-  类的所有实例共享一个原型对象。 

-  类也可以使用表达式进行声明。 

-  类方法中的this指向实例，在单独提出来使用会导致错误。 

```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined，类内部使用严格模式，此时this为undefined,找不到print方法。
```



##### 实例成员和静态成员

**通过构造函数中this 添加的成员，实例成员只能通过实例化来对象访问，不能通过构造函数来访问**

**静态成员为添加到构造函数上的成员，只能通过构造函数来访问，不能供实例对象使用。声明时带有static关键字**



### let

1.  具有块级作用域 

1.  不存在变量提升 

1.  **存在暂时性死区**  

```plain
let temp = 1;
if(true) {
	console.log(temp); // 会报错
	let temp = 2;
}
```



### const

1. 声明常量时需要赋予初始值，同样具有块级作业域

1. 不存在变量提升，存在暂时性死区

1. 声明变量的内存地址不可更改



### 对象解构

```javascript
let {0: first,1: last} = [1,2] || {}; // 解构的对象不能为 undefined 或 null
为了提高代码的健壮性，给解构的对象赋予一个默认对象
```



**用途**

1. 交换值

1. 函数返回多个值

1. 提取 JSON 数据

1. 变量 map 结构

1. 加载模块的指定的方法



### 箭头函数

**箭头函数没有自己的 this，箭头函数内的 this 指向函数定义生效时的执行上下文（上层对象）**



```plain
let obj = {
	name: 'xiaoming',
	say: () => {
		alert(this.name);
	}
}

obj.say() // undefined ,因为对象是不能产生作用域的
```



### 剩余参数

```plain
function sum (...args) {

}
```



### yield

```javascript
function* count() {
    let saleList = [1,2,3];
    for(let value of saleList) {
        yield value;
    }
}
```



如果你看到某个函数中有yield，说明这个函数已经是个生成器了

yield可以用来加强控制，懒汉式加载

调用函数指针和调用生成器是两码事，注意上面的运行结果，countAppleSales和myArr。

需要next()函数配合使用，每次调用返回两个值：分别是value和done，代表迭代结果和是否完成

函数next()是个迭代器对象，传参可以缺省，默认调用函数，可无限调用，循环结束后返回undefined。



### 拓展运算符

用于传递不确定数量的参数，拥有迭代器Iterator 的数据结构才可以使用。

不能直接展开对象，通过字面量的方式可以使用拓展运算符进行展开。

```javascript
let newObj = {...obj};
```



### Symbol

用于标识一个独一无二的值，常用对象的作标识符。

```javascript
let s = Symbol('s1'); // 不能用new 命令进行创建
let s2 = Symbol('s1'); 
s === s2 // false

s.decription() // 变量的描述
Symbol.for(param); 给创建symbol 方式会被进行全局登记。
Symbol.keyFor(param); 查找一个登记过的Symbol 变量
```



特点：1. 不能与其他类型的数据进行运算；2. 通过Object.getOwnPropertySymbols(obj) 获取symbol 属性



### Iterator

定义：它是一种接口，为各种不同的数据结构提供统一的访问机制。

原生部署了Symbol.iterator 接口的数据类型：**数组、字符串、Set、Map、TypeScript、NodeList、函数的arguments**



手写变量对象必须要有 next 方法，可以拥有 return 和 throw 方法。

```javascript
[Symbol.iterator]() {
      return {
        next() {
          return { value: 1, done: false };
        },
        return() {
          file.close();
          return { value: 2, done: true };
        }
      };
    },
```



### Generator 函数

定义：语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。为js 实现了惰性求值。

执行 Generator 函数会返回一个**遍历器对象（iterator 对象)**，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以通过next 依次遍历 Generator 函数内部的每一个状态。



```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator(); // 返回的是指向Generator 对象内部状态的指针对象（Iterator 遍历器对象)
```



Generator 的自执行需要依靠执行器，例如co 模块。

**yiled 没有返回值**，手动调用next 方法传递的参数便是上一个yiled 的返回值，next 的结果是yiled 表达式的值。

`yiled*` 表达式，相当于自动遍历一个Generator 函数。

```javascript
function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}

var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"

function* outer2() {
  yield 'open'
  yield* inner()
  yield 'close'
}

var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"
```



### async 函数

**一句话，async 函数就是 Generator 函数的语法糖，其实现基于Promise的诞生。**async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成 await，仅此而已。await 后面可以接一个promise 对象，也可以接原始数据类型表达式，即可实现同步或异步的封装。

http://www.ruanyifeng.com/blog/2015/05/async.html 阮一峰



**async 函数自带执行器，**调用async 后会自执行。其返回值是promise 对象。

`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

`async`函数的返回值是 **Promise 对象**，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。

进一步说，`async`函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖。

`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。

- 我们可以将await关键字后面执行的代码，看做是包裹在`(resolve, reject) => {函数执行}`中的代码;

- await的下一条语句，可以看做是`then(res => {函数执行})`中的代码，如果不是promise 对象，返回值是其本身。



### Promise

**三个状态**

pending 准备中、fulfilled 已完成、rejected 已失败

```javascript
var promise = new Promise(function (resolve, reject) {
  // ...

  if (/* 异步操作成功 */){
    resolve(value);
  } else { /* 异步操作失败 */
    reject(new Error());
  }
});
```



**注意点：**

1.  promise 内部的错误不会影响到外部的代码 

1.  promise.all 将多个promise 实例包装成一个新的promise 实例，只有参数中的所有promise 实例都为fulfilled 状态时，包装的实例才是fulfilled 状态，此时，**参数的返回值会组成一个数组**，传递给包装实例的回调函数。如果有一个参数实例的状态为reject，则会将第一个reject 的结果传递给包装实例的回调函数。promise.race 用法和promise.all 同样，只不过当参数里**有一个的状态**率先改变便会传递哥Promise.race 实例。 

1.  promise.allSettled 同样是将多个promise 实例包装成一个新的promise 实例，等到所有promise 实例都有结果后包装实例便会结束，无论其结果为fulfilled 状态还是reject 状态。 

1.  promise.then 的返回值是promise 对象，如果回调函数里没有返回值，则接受回调函数的参数为undefined,其状态为resolve 状态，除非手动调用Promise.reject() 

```javascript
new Promise((resolve, reject) => {
        resolve('第一层promise');
        console.log('promise 里');
      })
      .then(value => {
        console.log(value);
        return '第二层promise'; // 相当于 resolve('第二层promise')
        return Promise.reject('第二层promise'); // 相当于 reject('第二层promise')
      })
      .then(value => {
        console.log(value);
      }, err => {
        console.error(err);
      })
```



1.  Promise1 resolve 返回另一Promise2 ，则Promise1 的状态失效，其状态由Promise2 决定，即后面的then 由Promise1 中的状态决定。 

1.  promise.finally 方法不管对象状态如何最后都会触发的事件。 



### 解构赋值

1.  对应对象的解构赋值，如果想要重定义一个新的属性名进行接受，则：  

```javascript
const {foo: l, bar: j} = {foo: 'lili', bar: 'zuen '};
// l: lili 
// j: zuen
// 通过冒号进行隔开是模式声明
```



### Es 模块

导出

- `export *`

- `export default *`



导入

- `import * as  foo from  ** `，不在乎默认导出和常规导出，都将其归在foo 对象中。

- `import {*} from **`

- `export * from **`



导入的模块会先运行，后执行。ES 模块是解析时加载，CommonJs 是执行时加载。



### Proxy

通俗来说，就是用于给对象设置一层保护层，使用proxy函数对对象进行包裹，可以自定义其属性的访问输出和更改操作。

proxy 代理了target，target对象里的this指向会变为proxy。



https://www.jianshu.com/p/2f4b6377adad



## ES2017

##### for...of 感知 await

```javascript
async function downloadContent(urls) {
  for (const url of urls) {
    const content = await makeRequest(url);
    console.log(content);
  }
}

async function downloadContent(urls) {
  await Promise.all(urls.map(
    async url => {
      const content = await makeRequest(url);
      console.log(content);
    }));
}
```



## ES2020

### 可选链

`?.`用于访问对象未知位置的值，若不存在返回undefined而不是报错。



### globalThis

js被用于浏览器，Node，webWorkers等，不同的环境具有不同的全局对象命名方式。使用globalThis始终指向全局对象。



### 动态导入

可以将导入关键字当作函数使用，返回Promise。

```plain
document.getElementById('btn')
.addEventListener('click', async() => {
	const { myFunc } = await import('./modules.js');
	myFunc()
})
```



### 空值合并运算符

`??` 会比较操作符两侧的值，如果左侧的值是undefined或null，则返回右侧的值。



### BigInt

能够定义超过Numbers安全整数限制的数值。

```javascript
let maxNum = Number.MAX_SAFE_INTEGER
console.log(maxNum) // 90071992547400991

maxNumber ++ // 90071992547400992

maxNumber ++ // 90071992547400992

// 声明并使用大整数
maxNum = BigInt(maxNum) + 10n
console.log(maxNum) // 90071992547401002n
```



### Promise.allSettled

与Promise.all 使用方法一样，只不过是包括了全部rejected的情况。



## ES2021

### 空值赋值运算符 ??=

```javascript
let a = 0;
let b = 1;
let c = '非空';
let d = null;
c ??= a; // 非空
d ??= b; // 1
```



当空值赋值运算符左侧为null或undifined时，将右侧的值赋给左侧。其他情况一律不赋值。



### String.replaceAll

相当于`String.replace`使用全局匹配的用法。



### Promise.any

与`Promise.race`的区别是，`promise.race`当其中某个状态变化便会返回结果，`promise.any`是直到某个异步promise状态变为resolve才会返回结果，全部rejected则报错。



### 数值分隔符

可以在数字中使用下划线`_`进行分割以便于阅读。

```javascript
let num1 = 100_000;
```