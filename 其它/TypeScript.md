develop by [@Microsoft ]()

# 对象索引类型

对象索性类型无法直接赋予变量。只能是基本 type。

![img](https://cdn.nlark.com/yuque/0/2023/png/12905753/1678324864139-f31627be-d341-461a-bbb1-9d050cc8e3e8.png)

```typescript
// wrong
type Person = { [k: 'li' | 'wang']: string }

// true
type Name = 'li' | 'wang'
type Person = { [k in Name]: string }
```

# 工具类型

1. `Omit<T, K>`获得 T 中除类型 K 外的类型
2. `Pick<T, K>` 获得 T 中的 K 类型
3. `Partial<>`将类型中的所有选项变为可选，同 `?`
4. `Required<>`
5. `Record<T, U>`将类型T映射为 T-> U 的对象类型
6. [更多](https://www.jianshu.com/p/050cc5ba098a)



# 非空断言

应用场景：在上下文中类型检查器无法断定类型时，通过后缀表达式操作符`!`用于断言操作对象是非`null`和非`undefined`类型。即`x!`将从 `x`值域中排除`null`和`undefined`。

注意：只是在编译阶段跳过类型检查，实际编译结果仍会输出 `undefined`，如果目标值存在 null 和 ud 的可能。

# 配置

```plain
yarn init 配置yarn管理仓库
yarn add typescript --dev 添加开发环境下的typescript依赖
yarn tsc --init 生成typescript 配置文件
yarn tsc demo.ts 编译
```



# 强类型和弱类型

类型安全角度分类。主要区别是语言语法层面是否限制实参的类型。在编译阶段便会产生相对应的信息。强类型语言不允许数据任意的隐式类型转换。

变量类型允许随时改变的特点，不是强弱类型的差异。

# 静态类型和动态类型

类型检查的角度区分。静态类型在声明时类型就是确定的，后续无法进行更改。动态类型与之相反。

![img](https://cdn.nlark.com/yuque/0/2021/png/12905753/1628992416156-6d460e65-3eba-456a-9c8a-2fb8bf2ef73b.png)

## Js 和 Ts

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。JavaScript 是一门解释型语言[[4\]](https://ts.xcatliu.com/introduction/what-is-typescript.html#link-4)，没有编译阶段，所以它是动态类型。



静态类型是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 **TypeScript 是静态类型**。



**TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错**。而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查。Typescript 不是强类型语言。

## 强类型语言的好处

- 错误更早暴露
- 代码更智能，编码更准确
- 重构更牢靠
- 减少不必要的判断

# 新特性

1. 类和实现接口
   构造函数中使用public 声明参数，相当于创建了**同名的成员变量**。

```typescript
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```



# 基础类型

1. any，动态类型，代表任意类型，默认不标识变量类型的变量都是any 类型

1. number，双精度64位浮点值，表示整数和分数

1. string

1. boolean

1. 数组泛型，方法一：在**数据类型后面加上[ ]**，方法二：使用数组泛型：**Array<number>**

1. 元组类型Tuple，用来表示已知元素数量和类型的数组。各自的元素类型不必相同，但对应位置上的元素类型必须相同。[string, number]

向元组添加数据时不会报错，在获取对应越界位置的数据时会报错。

1. 枚举类型 enum。意义：给一组数值添加更易理解的别名；储存固定值。

```javascript
// 当不指定具体值时，数字枚举类型第一个值开始进行累加，如果第一个值也缺失则从零开始累加。
// 字符串枚举需要手动指定所有值
// 常量枚举在enum 前面使用const 关键字，转换成es3后为具体的对应数值
enum PostStatus {
 Draft = 0,
 UnPublished = 1,
 Published = 2
}

// 双向访问
PostStatus.Draft // 0
PostStatus[0] // Drafts
```

1. void，用于表示空值，声明函数时表示无返回值，声明变量时表示 undefined 或 null

1. null，表示对象值缺失；undefined，初始化变量为一个未定义的值。这两个类型是所有类型的子类型。（只在默认情况下，如果在 tsconfig 中开启了 strickNullChecks 或 strict 模式，则不生效）
2. never，表示从不会出现的值。使用场景如下案例：

```typescript
interface Foo {
  type: 'foo'
}
interface Bar {
  type: 'bar'
}
type All = Foo | Bar
// switch 中判断
function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
// 当未来 All 类型被修改为 Foo | Bar | Baz，但 switch 语法中又没有添加上对 Baz 类型的判断，
// 则在 default 中，Baz 无法赋值给 never，则会报错
```

1. object，泛指非原始类型。可接收对象，数组，方法。如果想特指具体的对象类型，可使用对象字面量的形式（这种情况下声明和实现的对象属性必须一致）故一般应使用接口来实现对象类型。

```javascript
const obj: { name: string } = { name: 'lili'};
```

- string，number，boolean 在非严格模式下可以将值设置为 undefined 或 null



# 声明变量

1. 声明变量没有赋予类型，则自动为任意类型

1. 声明变量时赋予某个类型的值，则ts会自动进行类型推论（会在编写编译阶段暴露错误，但依旧生成js文件并且不影响其执行）。

```typescript
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```



# 函数

1. 参数个数需要一致
2. 可选参数：在参数后面跟问号的形式设置。可选参数必须放在必须参数的后面。可选参数的类型默认添加有undefined.
3. 默认参数。添加了默认值的参数也即是可选参数。

```typescript
function(price:number = 1.0)
```

1. 接收任意参数：利用es6 的展开运算，将一个数组展开。
2. 函数表达式声明时如果不手动给变量添加类型声明，默认通过类型推论进行定义。

```javascript
// 如果对匿名函数进行类型声明，左侧变量默认是类型推论
const func: (a: number, b: number) => number = function (a: number, b: number): number {
 return 0; 
}
```

1. 重载

# 联合类型

通过管道符 `|`设置类型。

当 Typescript 无法确定一个联合类型的变量到底是哪个类型时，只能访问此联合类型的所有类型里的公共属性或方法。



# 类型断言

针对某些无法识别出来的变量类型，手动指明变量的类型，用于访问其类型的方法，并不属于类型转换。（Trust me）

```typescript
const num = [1,2,3].filter(val => val > 2);
// 方法一
const res = num as number;
// 方法二, JSX、TSX 下与标签产生冲突，不建议使用
const res2 = <number>num;
```



# 接口 Interface

意义：对类进行行为的抽象或约定一个对象中应该有哪些成员及类型。只作为数据类型结构约束使用，编译后不存在。 

## 任意属性：

定义了任意属性的接口，则确定属性和可选属性都必须是它的类型的子集。（限制性很高）一个接口只能定义一个任意属性，多个类型使用联合类型。



```typescript
interface Person {
    name: string;
    age?: number; // 可选成员
    [propName: string]: string | number; // 任意属性，值为联合类型
  	readonly sex: string; // readonly 指定经过初始化后不能更改
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// 动态接口
interface Cache {
	[key: string]: string 
}

const cache: Cache = {};

cache.foo = 'foo';
cache.bar = 1; // 报错
```



# 类型别名 type

用于给手写类型起一个新名字。可作用于原始值（没有什么意义），联合类型，元组等。

与接口的区别：

1. 接口可以拓展，type 不能 extends 或 implement。但是 type 可以通过交叉实现 interface 的 extends 行为。

```javascript
interface Name {
    name: string;
}
interface User extends Name {
    age: number;
}
let stu:User={name:'wang',age:10}

// 上面的扩展可以用type交叉类型来实现
type Name = {
    name: string;
}
type User = Name & { age: number  };
let stu:User={name:'wang',age:1}
console.log(stu)

// interface 扩展 type
type Name = {
    name: string;
}
interface User extends Name {
    age: number;
}
let stu:User={name:'wang',age:1}

// type 与 interface 交叉
interface Name {
    name: string;
}
type User = Name & {
    age: number;
}
let stu:User={name:'wang',age:1}
```

1. 接口可以定义多次，最终会合并为单个接口。type 不可以定义多次。
2. type 能使用 in 生产映射类型。interface 不可以。

```javascript
type Keys = "name" | "sex"

type DulKey = {
    [key in Keys]: string    // 类似for...in
}

let stu: DulKey = {
    name: "wang",
    sex: "man"
}
```

# 只读属性

只允许第一次给**接口对象**赋值时进行赋值。通过`readonly`关键字进行定义。

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
```



# 类Class

ts 中不能直接在构造函数中声明自身变量，需要先在外边进行声明。

```typescript
class Person {
  // 类的属性必须要有一个初始值, 可以在声明时或构造函数中进行赋值
	name: string; // 设置初始值 name: string = 'lili'，ES7 语法
  age: number;
  protected readonly gender: string; // readonly 应该跟在访问修饰符的后面
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}
```

# 类的访问修饰符

- private 声明私有属性，只能在类的内部进行访问
- public 默认值
- protected 受保护的，也不能在外部访问，但可以由自身及其子类继承者访问。



# 类与接口

接口：具有相同一系列特征的，实现具有不同的方式的一类对象。

类：由类引申出来的父子类具备某些相同特征上相同的实现方式。

```typescript
interface EatAndRun {
  eat (food: string): void;
  run (distance: number): void;
}

class Person implements EatAndRun {
  eat (food: string): void {
    console.log(`优雅地吃${food}`);
  }
  run (distance: number): void {
    console.log(`直立行走${distance}`);
  }
}

class Animals implements EatAndRun { // 实现多个接口通过逗号关联
  eat (food: string): void {
    console.log(`呼噜呼噜地吃${food}`);
  }
  run (distance: number): void {
    console.log(`四脚爬行${distance}`);
  }
}

建议： 接口的约束应该尽可能精确，类通过实现多个接口更合理
```

# 抽象类及抽象方法

抽象类和接口的意义实现类似，抽象类针对更大的一个描述。抽象类只能被继承，不能被实现。

class 前加abstract 。

抽象方法不需要方法体。

```typescript
abstract class Animal {
  eat (food: string): void {
    console.log(`呼噜呼噜地吃${food}`);
  }

  abstract run (distance: number): void
}

class Cat extends Animal {
  run(distance: number): void {
    console.log(`四脚爬行${distance}`);
  }
}

const cat = new Cat();
cat.eat('草');
cat.run(100)
```



# 中文错误提示

命令行：tsc 命令后接 --locale zh-CN

vscode: 在设置中搜索typescript local 设置为 zh-CN



# 隐式类型推断

声明变量时会根据初始赋值对变量进行类型判断。后续对该变量赋予不是相同类型的值时便会报语法错误。

为了方便后续维护，应该为每个变量手动指定类型。



# 泛型

声明函数，接口，类时不指定具体类型，在使用时才指定的一种声明方式。

使用：将不明确的类型定义成一个参数，使用时传入具体的类型。

eg: Array 设置时并不会知道具体会储存什么类型的参数，所有它其实便为一个泛型。

```typescript
function CreateArray<T> (length: number, value: T) {
  return Array<T>(length).fill(value);
}
```

**泛型约束**

使用泛型时未能确定类型，不能随意操作其属性或方法。通过手动限定泛型范围能解除这一问题。

```typescript
interface WithLength {
  length: number
}

function DemoFunc<T extends WithLength> (arg: T): T {
  console.log(arg.length);
  return arg;
}
  
```

**泛型接口**

```typescript
interface Genericity {
  <T>(length: number, value: T): Array<T>;
}

let createArray: Genericity;
createArray = function<T>(length: number, value: T): Array<T> {
	// toDo...
}
```

## 应用场景

当函数、接口或类：

- 需要作用到很多类型
- 需要被用到很多地方

## 泛型工具

### Partial

将类型的属性**「变成可选」。**

### Required

将类型的属性**「变成必填」。**

### Mutable

功能是将类型的属性**「变成可修改」**

### Readonly

功能是将类型的属性**「变成只读」**

### ReturnType

功能是用来得到一个函数的返回值类型

# 声明文件

用于兼容普通的js模块。

eg: 使用第三方依赖时，如果不是使用ts编写的不会出现类型限制。通过declare 手动进行类型声明。其他如引用 css module，导入 svg，png，jpg 等文件都需要进行 declare 声明。

通常将声明语句放到单独的文件中，必须以 d.ts 为后缀。全局声明文件 global.d.ts。

**全局变量**的声明文件主要语法：

- declare var 
- declare function 
- declare class 
- declare enum
- declare namespace （含有子属性的）全局对象
- interface 和 type 全局类型

```typescript
declare function demoFunc(input: number): number;
```

实际开发中安装依赖时可以先查看是否具有独立的类型声明模块进行选择安装。



**模块插件**

declare module 用于拓展原有模块

```javascript
declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}
```

# 枚举类型

- 只读属性，默认从0递增，可以自定义初始值。
- 枚举成员值：

- - 可以没有初始值
  - 可以是对常量成员的引用
  - 可以是常量表达式
  - 可以是非常量表达式

- 常量枚举在编译阶段被删除，枚举成员只能是常量成员，并且不能包含计算成员。
- 键与值互相映射。不会为字符串枚举成员生成反向映射
- 手动赋值和递增赋值可能会重复，TypeScript 不会自动纠正
- 计算所得项后的属性需要手动赋值

# 内置对象

HTMLElement、Event、NodeList 等。

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

# tsconfig.json

```json
// 在此列举常用项目，完整内容访问 https://www.tslang.cn/docs/handbook/tsconfig-json.html
{
  "baseUrl": '.', // 导入模块时的解析路径的起止地方
  "path": {}, // 定义类似别名的存在
  "typeRoots": ["node_modules/@types"], // 指定 ts 查找全局类型声明文件的路径
  "types": ["jquery"], // 引入 typeRoots 下的某个部分,例 jQuery，默认全部 @types
  "compilerOptions": {
    /* 指定 ECMAScript 的目标版本: 
      'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. 
      */
     "target": "es5",
  
    /* 指定模块代码的生成方式: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
     "module": "commonjs",

    /* 编译过程中需要引入的库的列表，比如 ES6 */
     "lib": [],

    /* 允许编译 JS 文件 */
     "allowJs": true,
  
    /* 检查 JS 文件*/
     "checkJs": true,

    /* 指定 JSX 代码生成的模式: 'preserve', 'react-native', or 'react'. 
       'react' 模式下：TS 会直接把 jsx 编译成 js 
       'preserve' 模式下：TS 不会把 jsx 编译成 js，会保留 jsx 
       */
     "jsx": "preserve",

    /* 生成相应的类型声明文件 —— '.d.ts' */
     "declaration": true,
  
    /* 声明文件的输出路径 */
     "declarationDir": "./",
  
    /* 要包含的类型声明路径列表 */
     "typeRoots": [],
  
    /* 要导入的声明文件包，默认导入上面声明文件目录下的所有声明文件 */
     "types": [],
    
    /* 指定输入文件的根目录，用于控制输出目录的结构 */
     "rootDir": "./",
    
    /*  输出的时候移除注释 */
     "removeComments": true,

    /* 开启所有的严格检查配置 */
    "strict": true,
    /* 不允许使用隐式的 any 类型 */
     "noImplicitAny": true,

    /* 不允许把 null、undefined 赋值给其他类型变量 */
     "strictNullChecks": true,

    /* 不允许函数参数双向协变 */
     "strictFunctionTypes": true,

    /* 使用 bind/call/apply 时，严格检查函数参数类型 */
     "strictBindCallApply": true,

    /* 类的实例属性必须初始化 */
     "strictPropertyInitialization": true,

    /* 不允许 this 有隐式的 any 类型，即 this 必须有明确的指向*/
     "noImplicitThis": true,

    /* 在严格模式下解析并且向每个源文件中注入 use strict */
    "alwaysStrict": true,

    /**************额外的语法检查配置，这种检查交给 eslint 就行，没必要配置**************/

    /* 有未使用到的本地变量时报错 */
    "noUnusedLocals": true,

    /* 有未使用到的函数参数时报错 */
    "noUnusedParameters": true,

    /* 每个分支都要有返回值 */
    "noImplicitReturns": true,

    /* 严格校验 switch-case 语法 */
    // "noFallthroughCasesInSwitch": true,
  },
  /* 指定需要编译的单个文件列表 */
   "files": [],

  /* 指定需要编译的文件/目录 */
   "include": [
      // 只写一个目录名等价于 "./src/**/*"
      "src"
    ]

  /* 需要排除的文件或目录 */
   "exclude": []

  /* 配置文件继承 */
   "extends": "./tsconfig.base.json"
}
```



# API 接口

1. keyof 用于获取某种类型的所有键，返回类型是联合类型

```javascript
interface Person {
  name: string,
  gender: string
}

type K1 = keyof Person; // name | gender
type K2 = keyof Person[]; // 	number | length | push...
```



# 问题收集

1. "React" 指 UMD 全局，但当前文件是模块。请考虑改为添加导入。ts(2686)的问题。

场景：umi 项目有时需要引入 react 模块，有时不用引入也不会报错。

方案：umi 项目 tsconfig.json 文件下 jsx 由 react-jsx 改为 react。这样便会检查所有 tsx 或 jsx 文件，没有引入 React 的会自动提示。

已在 global.d.ts 中使用**三斜线指令**什么编译过程中自动引入的文件，例如 react、react-dom 则不需要在每个组件引入 react。