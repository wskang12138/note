# Commonjs & Es Module

### CommonJs



[https://juejin.cn/post/6994224541312483336](https://juejin.cn/post/6994224541312483336#heading-3)

 特点 

●在 commonjs 中每一个 js 文件都是一个单独的模块，我们可以称之为 module；

●该模块中，包含 CommonJS 规范的核心变量: exports、module.exports、require；

●exports 和 module.exports 可以负责对模块中的内容进行导出；

●require 函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；

●同步加载并执行模块文件

●可以在任意上下文，动态加载模块

 require 大致流程 

●require 会接收一个参数——文件标识符，然后分析定位文件，分析过程我们上述已经讲到了，加下来会从 Module 上查找有没有缓存，如果有缓存，那么直接返回缓存的内容。

●如果没有缓存，会创建一个 module 对象，缓存到 Module 上，然后执行文件，加载完文件，将 loaded 属性设置为 true ，然后返回 module.exports 对象。借此完成模块加载流程。

●模块导出就是 return 这个变量的其实跟 a = b 赋值一样， 基本类型导出的是值， 引用类型导出的是引用地址。

●exports 和 module.exports 持有相同引用，因为最后导出的是 module.exports， 所以对 exports 进行赋值会导致 exports 操作的不再是 module.exports 的引用



●

### Es Module 

特点 

●ES6 module 的引入和导出是静态的，import 会自动提升到代码的顶层 ，import , export 不能放在块级作用域或条件语句中

●ES6 模块提前加载并执行模块文件，

  