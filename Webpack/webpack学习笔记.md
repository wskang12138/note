# webpack学习

# 1.webpack 是什么

## 1.webpack 是什么

- **webpack 是一个静态的模块化打包工具，为现代的 JavaScript 应用程序；**
- 上面的解释进行拆解：
  - **打包 bundler**：webpack 可以将帮助我们进行打包，所以它是一个打包工具 
  - **静态的 static**：这样表述的原因是我们最终可以将代码打包成最终的静态资源（部署到静态服务器）；
  - **模块化 module**：webpack 默认支持各种模块化开发，ES Module、CommonJS、AMD 等；
  - **现代的 modern**：我们前端说过，正是因为现代前端开发面临各种各样的问题，才催生了 webpack 的出现和发展；

## 2.Webpack 的安装

- webpack 的安装目前分为两个：**webpack、webpack-cli**
- 它们是什么关系呢？
  - 执行 webpack 命令，会执行 node_modules 下的.bin 目录下的 webpack；
  - webpack 在执行时是依赖 webpack-cli 的，如果没有安装就会报错；
  - 而 webpack-cli 中代码执行时，才是真正利用 webpack 进行编译和打包的过程；
  - 所以在安装 webpack 时，我们需要同时安装 webpack-cli（第三方的脚手架事实上是没有使用 webpack-cli 的，而是类似于自 己的 vue-service-cli 的东西）

> npm install webpack webpack-cli –g # 全局安装
>
> npm install webpack webpack-cli –D # 局部安装

## 3.Webpack 的默认打包

- 我们可以通过 webpack 进行打包，之后运行打包之后的代码

  - 在目录下直接执行 webpack 命令

    **webpack**

- 生成一个 dist 文件夹，里面存放一个 main.js 的文件，就是我们打包之后的文件：

  - 这个文件中的代码被压缩和丑化了；
  - 另外我们发现代码中依然存在 ES6 的语法，比如箭头函数、const 等，这是因为默认情况下 webpack 并不清楚我们打包后的文 件是否需要转成 ES5 之前的语法，后续我们需要通过 babel 来进行转换和设置；

- 我们发现是可以正常进行打包的，但是有一个问题，webpack 是如何确定我们的入口的呢？

- 事实上，当我们运行 webpack 时，webpack 会查找当前目录下的 src/index.js 作为入口；

  - 所以，如果当前项目中没有存在 src/index.js 文件，那么会报错；

  - 当然，我们也可以通过配置来指定入口和出口

    **npx webpack --entry ./src/main.js --output-path ./build**

## 4.创建局部的 webpack

- 前面我们直接执行 webpack 命令使用的是全局的 webpack，如果希望使用局部的可以按照下面的步骤来操作。

- 第一步：创建 package.json 文件，用于管理项目的信息、库依赖等

  **npm init**

- 第二步：安装局部的 webpack

  **npm install webpack webpack-cli -D**

- 第三步：使用局部的 webpack

  **npx webpack**

- 第四步：在 package.json 中创建 scripts 脚本，执行脚本打包即可

  ![image-20230411113440523](data:image/png;base64,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) **npm run build**

## 5.Webpack 配置文件

- 在通常情况下，webpack 需要打包的项目是非常复杂的，并且我们需要一系列的配置来满足要求，默认配置必然是不可以的。
- 我们可以在根目录下创建一个 webpack.config.js 文件，来作为 webpack 的配置文件：

![image-20230411113938152](http://zimo.aizhaiyu.com/assets/img/2.60c5f97f.png)

继续执行 webpack 命令，依然可以正常打包

**npm run build**

## 6.指定配置文件

- 如果我们的配置文件并不是 webpack.config.js 的名字，而是其他的名字呢？

  - 比如我们将 webpack.config.js 修改成了 wk.config.js；

  - 这个时候我们可以通过 --config 来指定对应的配置文件；

    **webpack --config wk.config.js**

- 但是每次这样执行命令来对源码进行编译，会非常繁琐，所以我们可以在 package.json 中增加一个新的脚本：

![image-20230411114250433](http://zimo.aizhaiyu.com/assets/img/3.c2b77e1f.png)

之后我们执行 npm run build 来打包即可。

## 7.Webpack 的依赖图

- webpack 到底是如何对我们的项目进行打包的呢？
  - 事实上 webpack 在处理应用程序时，它会根据命令或者配置文件找到入口文件；
  - 从入口开始，会生成一个 **依赖关系图**，这个**依赖关系图**会包含应用程序中所需的所有模块（比如.js 文件、css 文件、图片、字 等）；
  - 然后遍历图结构，打包一个个模块（根据文件的不同使用不同的 loader 来解析）；

![image-20230411114745679](http://zimo.aizhaiyu.com/assets/img/4.ed6452e7.png)

## 8.使用 loader

### 1.css-loader 的使用

![image-20230411115812203](http://zimo.aizhaiyu.com/assets/img/5.e73b4394.png)

- 上面的错误信息告诉我们需要一个 loader 来加载这个 css 文件，但是 loader 是什么呢？

  - loader 可以用于**对模块的源代码进行转换**；
  - 我们可以将 css 文件也看成是一个模块，我们是**通过 import 来加载**这个模块的；
  - 在加载这个模块时，**webpack 其实并不知道如何对其进行加载**，我们必须制定对应的 loader 来完成这个功能；

- 那么我们需要一个什么样的 loader 呢？

  - 对于加载 css 文件来说，我们需要一个可以读取 css 文件的 loader；
  - 这个 loader 最常用的是 css-loader；

- css-loader 的安装：

  **npm install css-loader -D**

### 2.loader 配置方式

- **配置方式表示的意思是在我们的 webpack.config.js 文件中写明配置信息：**
- module.rules 中允许我们配置多个 loader（因为我们也会继续使用其他的 loader，来完成其他文件的加载）
- 这种方式可以更好的表示 loader 的配置，也方便后期的维护，同时也让你对各个 Loader 有一个全局的概览；
- module.rules 的配置如下：
- rules 属性对应的值是一个数组：[Rule]
- 数组中存放的是一个个的 Rule，Rule 是一个对象，对象中可以设置多个属性：
  - **test 属性**：用于对 resource（资源）进行匹配的，通常会设置成正则表达式；
  - **use 属性**：对应的值时一个数组：[UseEntry]
  - UseEntry 是一个对象，可以通过对象的属性来设置一些其他属性
  - **loader：**必须有一个 loader 属性，对应的值是一个字符串；
  - **options**：可选的属性，值是一个字符串或者对象，值会被传入到 loader 中；
  - **query：**目前已经使用 options 来替代；
  - **传递字符串（如：use: [ 'style-loader' ]）是 loader 属性的简写方式（如：use: [ { loader: 'style-loader'} ]）**；
- **loader 属性：** Rule.use: [ { loader } ] 的简写。

### 3.Loader 的配置代码

![image-20230411121244149](http://zimo.aizhaiyu.com/assets/img/6.5779c62b.png)

### 4.认识 style-loader

- 我们已经可以通过 css-loader 来加载 css 文件了

  - 但是你会发现这个 css 在我们的代码中并没有生效（页面没有效果）。

- 这是为什么呢？

  - 因为 css-loader 只是负责将.css 文件进行解析，并不会将解析之后的 css 插入到页面中；
  - 如果我们希望再完成插入 style 的操作，那么我们还需要另外一个 loader，就是 style-loader；

- 安装 style-loader：

  **npm install style-loader -D**

### 5.配置 style-loader

- 那么我们应该如何使用 style-loader：

  - 在配置文件中，添加 style-loader；

  - 注意：因为 loader 的执行顺序是从右向左（或者说从下到上，或者说从后到前的），所以我们需要将 style-loader 写到 cssloader 的前面；

    ![image-20230411121858091](http://zimo.aizhaiyu.com/assets/img/7.e961ca4d.png)

重新执行编译 npm run build，可以发现打包后的 css 已经生效了

### 6.less-loader 处理 less 文件

- 在我们开发中，我们可能会使用**less、sass、stylus 的预处理器来编写 css 样式**，效率会更高。

- 那么，如何可以让我们的**环境支持这些预处理器**呢？

  - 首先我们需要确定，less、sass 等编写的 css 需要通过工具转换成普通的 css；

- 但是在项目中我们会编写大量的 css，它们如何可以自动转换呢？

- 这个时候我们就可以使用 less-loader，来自动使用 less 工具转换 less 到 css；

  **npm install less-loader -D**

**配置 webpack.config.js**

![image-20230411133853357](http://zimo.aizhaiyu.com/assets/img/8.9b321816.png)

执行 npm run build less 就可以自动转换成 css，并且页面也会生效了

## 9.认识 PostCSS 工具

- 什么是 PostCSS 呢？
  - PostCSS 是一个通过 JavaScript 来转换样式的工具；
  - 这个工具可以帮助我们进行一些 CSS 的转换和适配，比如自动添加浏览器前缀、css 样式的重置；
  - 但是实现这些功能，我们需要借助于 PostCSS 对应的插件；
- 如何使用 PostCSS 呢？主要就是两个步骤：
- 第一步：查找 PostCSS 在构建工具中的扩展，比如 webpack 中的 postcss-loader；
- 第二步：选择可以添加你需要的 PostCSS 相关的插件；

### 1.postcss-loader

- 我们可以借助于构建工具：

  - 在 webpack 中使用 postcss 就是使用 postcss-loader 来处理的；

- 我们来安装 postcss-loader：

  **npm install postcss-loader -D**

- 我们修改加载 css 的 loader：（配置文件已经过多，给出一部分了）

  注意：因为 postcss 需要有对应的插件才会起效果，所以我们需要配置它的 plugin；

![image-20230411135233205](http://zimo.aizhaiyu.com/assets/img/9.558db029.png)![image-20230411135334585](http://zimo.aizhaiyu.com/assets/img/10.a73c0dd9.png)

### 2.单独的 postcss 配置文件

因为我们需要添加前缀，所以要安装**autoprefixer**：

**npm install autoprefixer -D**

- 我们可以将这些配置信息放到一个单独的文件中进行管理：
- 在根目录下创建 postcss.config.js

![image-20230411135736972](http://zimo.aizhaiyu.com/assets/img/11.176ad059.png)

### 3.postcss-preset-env

- 事实上，在配置 postcss-loader 时，我们配置插件并不需要使用 autoprefixer。

- 我们可以使用另外一个插件：**postcss-preset-env**

- postcss-preset-env 也是一个 postcss 的插件；

- 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或者运行时环境添加所需的 polyfill；

- 也包括会自动帮助我们添加 autoprefixer（所以相当于已经内置了 autoprefixer）；

- 首先，我们需要安装 postcss-preset-env：

  **npm install postcss-preset-env -D**

- 之后，我们直接修改掉之前的 autoprefixer 即可：

  ![image-20230411140116683](http://zimo.aizhaiyu.com/assets/img/12.8a50a3fc.png)

- 注意：我们在使用某些 postcss 插件时，也可以直接传入字符串（可以不用 require 直接写字符串）

![image-20230411140206944](http://zimo.aizhaiyu.com/assets/img/13.c2bb4d46.png)

## 10.webpack 处理图片

- 当前使用的 webpack 版本是 webpack5：

  - 在 webpack5 之前，加载这些资源我们需要使用一些 loader，**比如 raw-loader 、url-loader、file-loader**；
  - 在 webpack5 开始，我们可以直接**使用资源模块类型（asset module type）**，来替代上面的这些 loader；

- 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

  - **asset/resource** 发送一个单独的文件并导出 URL。

  - 之前通过使用 file-loader 实现；

  - asset/inline 导出一个资源的 data URI。

    - 之前通过使用 url-loader 实现；

  - **asset/source** 导出资源的源代码 （少用）

  - 之前通过使用 raw-loader 实现；

  - asset

     

    在导出一个 data URI 和发送一个单独的文件之间自动选择。

    - 之前通过使用 url-loader，并且配置资源体积限制实现；

### 1 .asset module type 的使用

![image-20230411142809035](http://zimo.aizhaiyu.com/assets/img/14.104fd19d.png)

- 自定义文件的输出路径和文件名

  - 方式一：修改 output，添加 assetModuleFilename 属性； （不推荐）

    ![image-20230411143724959](http://zimo.aizhaiyu.com/assets/img/15.9618ac24.png)

  - 方式二：在 Rule 中，添加一个 generator 属性，并且设置 filename；（推荐）

![image-20230411143830128](http://zimo.aizhaiyu.com/assets/img/16.05cec26c.png)

**介绍几个最常用的占位符**

- [ext]： 处理文件的扩展名；
- [name]：处理文件的名称；
- [hash]：文件的内容，使用 MD4 的散列函数处理，生成的一个 128 位的 hash 值（32 个十六进制）

![image-20230411144508529](http://zimo.aizhaiyu.com/assets/img/17.edbe5ed2.png)

开发中如何使用：

- 开发中我们往往是

  小的图片需要转换

  ，但是

  大的图片直接使用图片即可

  - 这是因为**小的图片转换 base64**之后可以**和页面一起被请求，减少不必要的请求过程；**
  - 而**大的图片也进行转换**，**反而会影响页面的请求速度；**

- 我们需要两个步骤来实现：

- 步骤一：**将 type 修改为 asset；**

- 步骤二：添加一个**parser 属性**，并且制定 dataUrl 的条件，添加 maxSize 属性；

![image-20230411150233966](http://zimo.aizhaiyu.com/assets/img/18.eaa9c336.png)

## 11.babel 处理 js

- Babel 到底是什么呢？
  - Babel 是一个工具链，主要用于旧浏览器或者环境中将 ECMAScript 2015+代码转换为向后兼容版本的 JavaScript；
  - 包括：语法转换、源代码转换等；

![image-20230411151209794](http://zimo.aizhaiyu.com/assets/img/19.e4622171.png)

### babel-loader

- 在实际开发中，我们通常会在构建工具中通过配置 babel 来对其进行使用的，比如在 webpack 中。

  - 那么我们就需要去安装相关的依赖：

    **npm install babel-loader -D**

  - 需要转换箭头函数，那么我们就可以使用箭头函数转换相关的插件：

    **npm install @babel/plugin-transform-arrow-functions -D**

  - 需要 const,let 转 var 使用 plugin-transform-block-scoping 来完成这样的功能

    **npm install @babel/plugin-transform-block-scoping -D**

- 我们可以设置一个规则，在加载 js 文件时，使用我们的 babel：

![image-20230411153305394](http://zimo.aizhaiyu.com/assets/img/20.22b57f87.png)

### babel-preset(预设)

如果我们一个个去安装使用插件，那么需要手动来管理大量的 babel 插件，我们可以直接给 webpack 提供一个 preset，webpack 会根据我们的预设来加载对应的插件列表，并且将其传递给 babel。

- 比如常见的预设有三个：
  - env
  - react
  - TypeScript
- 安装 preset-env：

**npm install @babel/preset-env**

![image-20230411153852596](http://zimo.aizhaiyu.com/assets/img/21.a3bc38de.png)

## 12.webpack 处理 vue 文件

需要使用 vue-loader：

**npm install vue-loader -D**

在 webpack 的模板规则中进行配置

![image-20230411154118643](data:image/png;base64,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)

另外我们需要配置对应的 Vue 插件

![image-20230411154519742](http://zimo.aizhaiyu.com/assets/img/23.0d413f9c.png)

重新打包即可支持 App.vue 的写法。

如果打包依然会报错，这是因为我们必须添加@vue/compiler-sfc 来对 template 进行解析：（这个一般下载 vue 会自带有的）

**npm install @vue/compiler-sfc -D**

## 13.resolve 模块解析

webpack 使用 enhanced-resolve 来解析文件路径；

webpack 能解析三种文件路径

- 绝对路径
  - 由于已经获得文件的绝对路径，因此不需要再做进一步解析。
- 相对路径
  - 在这种情况下，使用 import 或 require 的资源文件所处的目录，被认为是上下文目录；
  - 在 import/require 中给定的相对路径，会拼接此上下文路径，来生成模块的绝对路径；
- 模块路径
  - 在 resolve.modules 中指定的所有目录检索模块；
  - 默认值是 ['node_modules']，所以默认会从 node_modules 中查找文件；
  - 我们可以通过设置别名的方式来替换初识模块路径，后面讲解 alias 的配置；

### extensions 和 alias 配置

- extensions 是解析到文件时自动添加扩展名：
  - 默认值是 **['.wasm', '.mjs', '.js', '.json']**；
  - 所以如果我们代码中想要添加加载 .vue 或者 jsx 或者 ts 等文件时，我们必须自己写上扩展名；否则打包失败
- 另一个非常好用的功能是配置别名 alias：
  - 特别是当我们项目的目录结构比较深的时候，或者一个文件的路径可能需要 ../../../这种路径片段；
  - 我们可以给某些常见的路径起一个别名；

![image-20230411160808255](http://zimo.aizhaiyu.com/assets/img/24.451f2136.png)

## 14.认识 Plugin

- Loader 是用于**特定的模块类型**进行转换；
- Plugin 可以**用于执行更加广泛的任务**，比如打包优化、资源管理、环境变量注入等；

### 1.CleanWebpackPlugin 插件

- 每次修改了一些配置，重新打包时，都需要手动删除 dist 文件夹：

  - 我们可以借助于一个插件来帮助我们完成，这个插件就是**CleanWebpackPlugin；**

- 首先，我们先安装这个插件：

  **npm install clean-webpack-plugin -D**

- 之后在插件中配置

![image-20230411161340568](http://zimo.aizhaiyu.com/assets/img/25.0c3a520d.png)

也可不下载插件，**在 output 下配置 clean：true**

![image-20230411161728810](http://zimo.aizhaiyu.com/assets/img/26.769f5ada.png)

### 2.HtmlWebpackPlugin 插件

- 我们的 HTML 文件是编写在根目录下的，而最终打包的 dist 文件夹中是没有 index.html 文件的。
- 在进行项目部署的时，必然也是需要有对应的入口文件 index.html；
- 所以我们也需要对 index.html 进行打包处理；

对 HTML 进行打包处理我们可以使用另外一个插件：HtmlWebpackPlugin；

**npm install html-webpack-plugin -D**

![image-20230411162148250](http://zimo.aizhaiyu.com/assets/img/27.97d3687f.png)

**自定义 HTML 模板**

- 如果我们想在自己的模块中加入一些比较特别的内容：
- 比如**添加一个 noscript 标签**，在用户的 JavaScript 被关闭时，给予响应的提示；
- 比如在开发 vue 或者 react 项目时，我们需要一个可以挂载后续**组件的根标签**

这个我们需要一个属于自己的 index.html 模块：

![image-20230411162508066](http://zimo.aizhaiyu.com/assets/img/28.bc076c64.png)

- 在配置 HtmlWebpackPlugin 时，我们可以添加如下配置：
  - template：指定我们要使用的模块所在的路径；
  - title：在进行 htmlWebpackPlugin.options.title 读取时，就会读到该信息

![image-20230411163006095](http://zimo.aizhaiyu.com/assets/img/29.310bc728.png)

### 3.DefinePlugin 插件

DefinePlugin 允许在编译时创建配置的全局常量，是一个 webpack 内置的插件（不需要单独安装）：

![image-20230411163937711](http://zimo.aizhaiyu.com/assets/img/30.e041ffd8.png)

## 15.Mode 配置

- Mode 配置选项，可以告知 webpack 使用相应模式的内置优化：
  - 默认值是 production（什么都不设置的情况下）；
  - 可选值有：'**none**' | '**development**' | '**production**'；

这几个选项有什么样的区别

![image-20230411164128330](http://zimo.aizhaiyu.com/assets/img/31.eb11ab98.png)

两个模式默认配置

![image-20230411164244361](http://zimo.aizhaiyu.com/assets/img/32.1782dcfa.png)

## 16.搭建本地服务器

为了完成自动编译，webpack 提供了几种可选的方式：

- webpack watch mode；
- webpack-dev-server（常用）；
- webpack-dev-middleware；

### webpack-dev-server

安装 webpack-dev-server

**npm install webpack-dev-server -D**

修改配置文件，启动时加上 serve 参数：

![image-20230411165405356](http://zimo.aizhaiyu.com/assets/img/33.4e8b1060.png)

### host 配置

- host 设置主机地址：
  - **默认值是 localhost；**
  - 如果希望其他地方也可以访问，可以设置为 0.0.0.0；
- localhost 和 0.0.0.0 的区别：
- localhost：本质上是一个域名，通常情况下会被解析成 127.0.0.1;
- 127.0.0.1：回环地址(Loop Back Address)，表达的意思其实是我们主机自己发出去的包，直接被自己接收;
- 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ;
- 而回环地址，是在网络层直接就被获取到了，是不会经常数据链路层和物理层的;
- 比如我们监听 127.0.0.1 时，在同一个网段下的主机中，通过 ip 地址是不能访问的;
- 0.0.0.0：监听 IPV4 上所有的地址，再根据端口找到不同的应用程序;
- 比如我们监听 0.0.0.0 时，在同一个网段下的主机中，通过 ip 地址是可以访问的;
- port 设置监听的端口，默认情况下是 8080
- open 是否打开浏览器：
  - 默认值是 false，设置为 true 会打开浏览器；
  - 也可以设置为类似于 Google Chrome 等值；
- compress 是否为静态文件开启 gzip compression：
- 默认值是 false，可以设置为 true；

![image-20230411170247157](http://zimo.aizhaiyu.com/assets/img/34.7d0d538d.png)

# webpack 进阶

# 一、 source-map的使用

## 1.认识source-map

- 我们的代码通常运行在浏览器上时，是通过打包压缩的，也就是真实跑在浏览器上的代码，和我们编写的代码其实是有**差异的**； 比如ES6的代码可能被转换成ES5； 对应的代码行号、列号在经过编译后肯定会不一致； 代码进行**丑化压缩**时，会将**编码名称**等修改；我们使用了**TypeScript**等方式编写的代码，最终转换成**JavaScript**；
- 当代码报错需要**调试时（debug）**，调试**转换后的代码**是很困难的
- 那么如何可以调试这种转换后不一致的代码呢？答案就是source-map
  - source-map是从**已转换的代码**，映射到**原始的源文件**；
  - 使浏览器可以重构原始源并在**调试器中显示重建的原始源**；

## 2.使用source-map

### 2.1未使用的问题

![img](http://zimo.aizhaiyu.com/assets/img/1.b1ca583e.png)

> 没配置source-map上面错误的话，无法准确找到源文件的位置。浏览器只会报出打包后的 文件错误位置

### 2.2使用source-map

![img](http://zimo.aizhaiyu.com/assets/img/2.aa82fd87.png)

> 配置之后打包后运行脚本，就可以准确指定错误的源文件位置。会生成一个.map文件。是用来打包后的文件映射源文件。

在打包后的文件中：

![img](http://zimo.aizhaiyu.com/assets/img/3.9c227d53.png)

> 注释自动添加。浏览器会根据我们的注释，查找相应的source-map，并且根据source-map还原我们的代码，方便进行调试。

**在Chrome中，我们可以按照如下的方式打开source-map：**

![img](http://zimo.aizhaiyu.com/assets/img/4.58ab03d0.png)

## 3.分析source-map文件

1. 最初source-map生成的文件大小是原始文件的10倍，第二版减少了约50%，第三版又减少了50%，所以目前一个133kb的文件， 最终的source-map的大小大概在300kb。
2. source-map文件结构

![img](http://zimo.aizhaiyu.com/assets/img/5.540b8ab0.png)

- version：当前使用的版本，也就是最新的第三版；
- sources：从哪些文件转换过来的source-map和打包的代码（最初始的文件）；
- names：转换前的变量和属性名称（因为我目前使用的是development模式，所以不需要保留转换前的名称）；
- mappings：source-map用来和源文件映射的信息（比如位置信息等），一串base64 VLQ（veriable-length quantity可变 长度值）编码；
- file：打包后的文件（浏览器加载的文件）；
- sourceContent：转换前的具体代码信息（和sources是对应的关系）；
- sourceRoot：所有的sources相对的根目录；

## 4. 打包生成source-map

1. 如何在使用webpack打包的时候，生成对应的source-map呢？ 
   - webpack为我们提供了非常多的选项（目前是26个），来处理source-map；
   - 官方文档： https://webpack.docschina.org/configuration/devtool/
   - 选择不同的值，生成的source-map会稍微有差异，打包的过程也会有性能的差异，可以根据不同的情况进行选择；
2. 这几个值不会生成source-map -
   - false：不使用source-map，也就是没有任何和source-map相关的内容。
   - none：production模式下的默认值（什么值都不写） ，不生成source-map。
   - eval：development模式下的默认值，不生成source-map
     - 但是它会在eval执行的代码中，添加 //# sourceURL=；
     - 它会被浏览器在执行时解析，并且在调试面板中生成对应的一些文件目录，方便我们调试代码；

![img](http://zimo.aizhaiyu.com/assets/img/6.beea090d.png)

### 4.1 eval值的效果

![img](http://zimo.aizhaiyu.com/assets/img/7.d2cb6dfd.png)

> 这是打包后的代码效果和浏览器查看效果

### 4.2 source-map值效果

![img](http://zimo.aizhaiyu.com/assets/img/8.df67f2e5.png)

> 生成一个独立的source-map文件，并且在bundle文件中有一个注释，指向source-map文件；

### 4.3 不常用的值

![img](http://zimo.aizhaiyu.com/assets/img/9.7ca83bac.png)

1. eval-source-map值

   **eval-source-map：会生成sourcemap，但是source-map是以DataUrl添加到eval函数的后面**

2. inline-source-map值

   **inline-source-map：会生成sourcemap，但是source-map是以DataUrl添加到bundle文件的后面**

3. cheap-source-map值

   **会生成sourcemap，但是会更加高效一些（cheap低开销），因为它没有生成列映射（Column Mapping）  因为在开发中，我们只需要行信息通常就可以定位到错误了**

![img](http://zimo.aizhaiyu.com/assets/img/10.aa0baa3d.png)

1. cheap-source-map和cheap-module-source-map

   **cheap-source-map和cheap-module-source-map的区别：**

   ![img](http://zimo.aizhaiyu.com/assets/img/11.eb9cd344.png)

2. hidden-source-map值

   hidden-source-map： 

   - 会生成sourcemap，但是不会对source-map文件进行引用；
   - 相当于删除了打包文件中对sourcemap的引用注释；

   ```js
   // 被删除掉的
   //# sourceMappingURL=bundle.js.map
    
           Copied!
       
   ```

   1
   2

   - 如果我们手动添加进来，那么sourcemap就会生效了

3. nosources-source-map值

   **会生成sourcemap，但是生成的sourcemap只有错误信息的提示，不会生成源代码文件；**

### 4.4 多个值的组合

- 事实上，webpack提供给我们的26个值，是可以进行多组合的。

- 组合的规则如下：

- **inline**-|**hidden**-|**eval**：三个值时三选一；

- **nosources**：可选值；

- **cheap**可选值，并且可以跟随**module**的值；

  **[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map**

- 那么在开发中，最佳的实践是什么呢？

  - 开发阶段：推荐使用 source-map或者cheap-module-source-map

    这分别是vue和react使用的值，可以获取调试信息，方便快速开发；

  - 测试阶段：推荐使用 source-map或者cheap-module-source-map

  测试阶段我们也希望在浏览器下看到正确的错误提示；

  - 发布阶段：false、缺省值（不写）

# 二、babel核心的使用

## 1. 为什么需要babel

- 事实上，在开发中我们很少直接去接触babel，但是babel对于前端开发来说，目前是不可缺少的一部分：开发中，我们想要使用ES6+的语法，想要使用TypeScript，开发React项目，它们都是离不开Babel的；
- Babel是一个工具链，主要用于旧浏览器或者缓解中将ECMAScript 2015+代码转换为向后兼容版本的JavaScript； 包括：语法转换、源代码转换、Polyfill实现目标环境缺少的功能等；

![img](http://zimo.aizhaiyu.com/assets/img/12.fe6c4843.png)

## 2.Babel命令行使用

**babel本身可以作为一个独立的工具（和postcss一样），可以不和webpack等构建工具配置来单独使用。**

- 如果我们希望在命令行尝试使用babel，需要安装如下库：

  - @babel/core：babel的核心代码，必须安装；
  - @babel/cli：可以让我们在命令行使用babel；

  **npm install @babel/cli @babel/core**

- 使用babel来处理我们的源代码：

- src：是源文件的目录；

- --out-dir：指定要输出的文件夹dist； Babel命令行使用

  **npx babel src --out-dir dist**

## 3.Babel中使用插件

- 我们需要转换箭头函数，那么我们就可以使用箭头函数转换相关的插件：

  **npm install @babel/plugin-transform-arrow-functions -D**

  **npx babel src --out-dir dist --plugins=@babel/plugin-transform-arrow-functions**

- 查看转换后的结果：我们会发现 const 并没有转成 var

- 这是因为 plugin-transform-arrow-functions，并没有提供这样的功能；

- 我们需要使用 plugin-transform-block-scoping 来完成这样的功能；

  **npm install @babel/plugin-transform-block-scoping -D **

```
**npx babel src --out-dir dist --plugins=@babel/plugin-transform-block-scoping ,@babel/plugin-transform-arrow-functions**
 
        Copied!
    
```

## 4.Babel的预设preset

- 如果要转换的内容过多，一个个设置是比较麻烦的，我们可以使用预设（preset）
- 安装@babel/preset-env预设：

**preset npm install @babel/preset-env -D**

- 执行如下命令：

  **npx babel src --out-dir dist --presets=@babel/preset-env**

## 5.Babel的底层原理

- babel是如何做到将我们的一段代码（ES6、TypeScript、React）转成另外一段代码（ES5）的呢？
- 从一种源代码（原生语言）转换成另一种源代码（目标语言），就是编译器，事实上我们可以将babel看成就是一个编译器。
- Babel编译器的作用就是将我们的源代码，转换成浏览器可以直接识别的另外一段源代码；
- Babel也拥有编译器的工作流程：

1. 解析阶段（Parsing）
2. 转换阶段（Transformation）
3. 生成阶段（Code Generation）

## 6.babel编译器执行原理

**Babel的执行阶段**

![img](http://zimo.aizhaiyu.com/assets/img/13.92051e81.png)

**这只是一个简化版的编译器工具流程，在每个阶段又会有自己具体的工作**

![img](http://zimo.aizhaiyu.com/assets/img/14.505b3051.png)

## 7.webpack使用babel-loader

**在实际开发中，我们通常会在构建工具中通过配置babel来对其进行使用的，比如在webpack中。**

安装相关的依赖：

**npm install babel-loader @babel/core**

我们可以设置一个规则，在加载js文件时，使用我们的babel：

![img](http://zimo.aizhaiyu.com/assets/img/15.312e0b9a.png)

我们必须指定使用的插件才会生效

![img](http://zimo.aizhaiyu.com/assets/img/16.36ad8e72.png)

## 8.babel-preset

**如果我们一个个去安装使用插件，那么需要手动来管理大量的babel插件，我们可以直接给webpack提供一个preset， webpack会根据我们的预设来加载对应的插件列表，并且将其传递给babel。**

比如常见的预设有三个：

- **env**
- **react**
- **TypeScript**

安装preset-env：

**npm install @babel/preset-env**

![img](http://zimo.aizhaiyu.com/assets/img/17.76e64bcd.png)

## 9.babel转React的jsx

- 我们编写react代码时，react使用的语法是jsx，jsx是可以直接使用babel来转换的。
- 对react jsx代码进行处理需要如下的插件：
- **@babel/plugin-syntax-jsx**
- **@babel/plugin-transform-react-jsx**
- **@babel/plugin-transform-react-display-name**

但是开发中，我们并不需要一个个去安装这些插件，我们依然可以使用preset来配置：

**npm install @babel/preset-react -D**

![img](http://zimo.aizhaiyu.com/assets/img/31.1fc20b07.png)

> .js和.jsx后缀的文件都需要转js

![img](http://zimo.aizhaiyu.com/assets/img/29.5ec06234.png)

## 10.webpack编译Typescript

在项目开发中，我们会使用TypeScript来开发，那么TypeScript代码是需要转换成JavaScript代码。 可以通过TypeScript的compiler来转换成JavaScript

**npm install typescript -D**

另外TypeScript的编译配置信息我们通常会编写一个tsconfig.json文件：

**tsc --init**

生成配置文件如下：

![img](http://zimo.aizhaiyu.com/assets/img/30.6248a75a.png)

可以运行 npx tsc来编译自己的ts代码（这是不需要在webpack环境运行）

**npx tsc**

### 1.webpack使用ts-loader

我们希望在webpack中使用TypeScript，那么我们可以使用ts-loader来处理ts文件：

**npm install ts-loader -D**

1. 配置ts-loader

![img](http://zimo.aizhaiyu.com/assets/img/32.e65d8fe2.png)

1. 通过npm run build打包即可

### 2.webpack使用babel-loader

除了可以使用TypeScript Compiler来编译TypeScript之外，也可以使用Babel,

- Babel是有对TypeScript进行支持；
- 我们可以使用插件： **@babel/tranform-typescript；**
- 但是更推荐直接使用preset：**@babel/preset-typescript；**

安装：

**npm install @babel/preset-typescript -D**

使用：

![img](http://zimo.aizhaiyu.com/assets/img/33.017bf6fa.png)

### 3.ts-loader和babel-loader选择

那么我们在开发中应该选择ts-loader还是babel-loader呢？

1. 使用ts-loader（TypeScript Compiler）

- 直接编译TypeScript，那么只能将ts转换成js；
- 如果我们还希望在这个过程中添加对应的polyfill，那么ts-loader是无能为力的；
- 我们需要借助于babel来完成polyfill的填充功能；

1. 使用babel-loader（Babel）

- 来直接编译TypeScript，也可以将ts转换成js，并且可以实现polyfill的功能；
- 但是babel-loader在编译的过程中，不会对类型错误进行检测；

那么在开发中，我们如何可以同时保证两个情况都没有问题呢？

### 4.编译TypeScript最佳实践

TypeScript官方文档有对其进行说明：

![img](http://zimo.aizhaiyu.com/assets/img/34.ba4954da.png)

**也就是说我们使用Babel来完成代码的转换，使用tsc来进行类型的检查。**

但是，如何可以使用tsc来进行类型的检查呢？

- 在这里，我在scripts中添加了两个脚本，用于类型检查；

- 我们执行 npm run type-check可以对ts代码的类型进行检测；

- 我们执行 npm run type-check-watch可以实时的检测类型错误；

  ![img](http://zimo.aizhaiyu.com/assets/img/35.883b136c.png)

# 三、浏览器兼容性(browserslist）

**这里指的兼容性是针对不同的浏览器支持的特性：比如css特性、js语法之间的兼容性；**

查询到浏览器的市场占有率网站：["Can I use" usage table(opens new window)](https://caniuse.com/usage-table)

## 1.认识browserslist工具

- 我们如何可以在css兼容性和js兼容性下共享我们配置的兼容性条件呢？
  - 就是当我们设置了一个条件： > 1%；
  - 我们表达的意思是css要兼容市场占有率大于1%的浏览器，js也要兼容市场占有率大于1%的浏览器；
  - 如果我们是通过工具来达到这种兼容性的，比如postcss-preset-env、babel、autoprefixer等
- 那就要使用Browserslist；
- Browserslist是什么？Browserslist是一个在不同的前端工具之间，共享目标浏览器和Node.js版本的配置

## 2.browserslist浏览器查询过程

编写类似于这样的配置

```text
> 1%
last 2 versions
not dead
 
        Copied!
    
```

1
2
3

这些工具会根据我们的配置来获取相关的浏览器信息，以方便决定是否需要进行兼容性的支持：

- 条件查询使用的是caniuse-lite的工具，这个工具的数据来自于caniuse的网站上；

![img](http://zimo.aizhaiyu.com/assets/img/18.d7780e5c.png)

## 3.Browserslist编写常用规则

- defaults：Browserslist的默认浏览器（> 0.5%, last 2 versions, Firefox ESR, not dead）。
- 5%：通过全局使用情况统计信息选择的浏览器版本。
- dead：24个月内没有官方支持或更新的浏览器
- last 2 versions：每个浏览器的最后2个版本

## 4.命令行使用browserslist

**可以直接通过命令来查询某些条件所匹配到的浏览器：**

**npx browserslist ">1%, last 2 version, not dead"**

![img](http://zimo.aizhaiyu.com/assets/img/19.6c46a81b.png)

> browserslist 在我们下载babel或者webpack中自带了browserlist。无需再次独立安装

## 5.配置browserslist

- 配置browserslist两种方案：

  - 方案一：在package.json中配置；

  ![img](http://zimo.aizhaiyu.com/assets/img/20.6028ca1b.png)

  - 方案二：单独的一个配置文件.browserslistrc文件；

![img](http://zimo.aizhaiyu.com/assets/img/21.696097b9.png)

## 6.默认配置和条件关系

如果没有配置，那么也会有一个默认配置：

![img](http://zimo.aizhaiyu.com/assets/img/22.cc40dfcf.png)

我们编写了多个条件之后，多个条件之间关系

![img](http://zimo.aizhaiyu.com/assets/img/23.7a16a360.png)

> 逗号隔开是或的意思，and连接是并的意思，not是非的意思

## 7.设置目标浏览器 browserslist

- 我们最终打包的JavaScript代码，是需要跑在目标浏览器上的，那么如何告知babel我们的目标浏览器呢？
  - browserslist工具 （推荐）
  - target属性（了解，不推荐）

![img](http://zimo.aizhaiyu.com/assets/img/24.412e4a0e.png)

> - 如果两个同时配置了,配置的targets属性会覆盖browserslist；
> - **但是在开发中，更推荐通过browserslist来配置，因为类似于postcss工具，也会使用browserslist，进行统一浏览器的适配**

## 8.Babel的配置文件

我们可以将babel的配置信息放到一个独立的文件中，babel给我们提供了两种配置文件的编写：

- babel.config.json（或者.js，.cjs，.mjs）文件； （推荐）
- .babelrc.json（或者.babelrc，.js，.cjs，.mjs）文件；(不推荐，以往的形式)

> .babelrc.json：早期使用较多的配置方式，但是对于配置Monorepos项目是比较麻烦的；
>
> babel.config.json（babel7）：可以直接作用于Monorepos项目的子包，更加推荐；

![img](http://zimo.aizhaiyu.com/assets/img/25.461e569c.png)

# 四、polyfill的使用

## 1.Polyfill是什么

- 理解：更像是应该填充物（垫片），一个补丁，可以帮助我们更好的使用JavaScript；
- 为什么时候会用到polyfill呢？
- 比如我们使用了一些语法特性（例如：Promise, Generator, Symbol等以及实例方法例如Array.prototype.includes等）
- 但是某些浏览器压根不认识这些特性，必然会报错；
- 我们可以使用polyfill来填充或者说打一个补丁，那么就会包含该特性了；

## 2.使用Polyfill

- babel7.4.0之后，可以通过单独引入core-js和regenerator-runtime来完成polyfill的使用：

  **npm install core-js regenerator-runtime --save**

![img](http://zimo.aizhaiyu.com/assets/img/26.e8e82991.png)

**需要在babel.config.js文件中进行配置，给preset-env配置一些属性：**

- **useBuiltIns**：设置以什么样的方式来使用polyfill；

- corejs

  ：设置corejs的版本，目前使用较多的是3.x的版本，比如现在使用的是3.8.x的版本；

  - 另外corejs可以设置是否对提议阶段的特性进行支持；设置 proposals属性为true即可；

## 3.useBuiltIns属性设置

**useBuiltIns属性有三个常见的值**

- 第一个值：false
  - 打包后的文件不使用polyfill来进行适配；
  - 并且这个时候是不需要设置corejs属性的；
- 第二个值：usage (推荐)
- 会根据源代码中出现的语言特性，自动检测所需要的polyfill；
- 这样可以确保最终包里的polyfill数量的最小化，打包的包相对会小一些；
- 可以设置corejs属性来确定使用的corejs的版本；

![img](http://zimo.aizhaiyu.com/assets/img/27.18bc0768.png)

- 第三个值：entry
  - 如果我们依赖的某一个库本身使用了某些polyfill的特性，**但是因为我们使用的是usage，所以之后用户浏览器可能会报错； 所以，如果你担心出现这种情况，可以使用 entry**；
  - 并且需要在入口文件中添加 `import 'core-js/stable'; import 'regenerator-runtime/runtime';
  - 这样做会根据 browserslist 目标导入所有的polyfill，但是对应的包也会变大；

![img](http://zimo.aizhaiyu.com/assets/img/28.49d5d510.png)

# 五、webpack开发服务器配置

## 1.devServer的static

**devServer中static对于我们直接访问打包后的资源其实并没有太大的作用，它的主要作用是如果我们打包后的资源，又依赖于 其他的一些资源，那么就需要指定从哪里来查找这个内容**

- 比如在index.html中，我们需要依赖一个 abc.js 文件，这个文件我们存放在 public文件 中；
- 在index.html中，我们应该如何去引入这个文件呢？ ✓ 比如代码是这样的：< script src="./public/abc.js"></ script>；
- 但是这样打包后浏览器是无法通过相对路径去找到这个文件夹的；会报错

解决：

- 所以代码是这样的：< script src="./abc.js">< /script>;
- 设置static即可；

![img](http://zimo.aizhaiyu.com/assets/img/36.b4470d63.png)

## 2.Proxy代理

**proxy是我们开发中非常常用的一个配置选项，它的目的设置代理来解决跨域访问的问题**

比如我们的一个api请求是 http://localhost:8888，但是本地启动服务器的域名是 http://localhost:8080，这个时候发送网 络请求就会出现跨域的问题；

- 那么我们可以将请求先发送到一个代理服务器，代理服务器和API服务器没有跨域的问题，就可以解决我们的跨域问题了；
- 我们可以进行设置：
- target：表示的是代理到的目标地址，
- pathRewrite：默认情况下，我们的 /api 也会被写入到URL中，如果希望删除，可以使用pathRewrite；

![img](http://zimo.aizhaiyu.com/assets/img/37.d0de3c8a.png)

## 3.changeOrigin的解析

**changeOrigin其实是要修改代理请求中的headers中的host属性：**

hangeOrigin:true是一个可选的配置项，用于设置是否改变请求头中的origin属性。当设置为true时，请求头中的origin属性会被改变为目标服务器的地址，以避免跨域问题。这个配置项通常用于开发环境中，当我们需要在本地开发环境中调用远程服务器的API时，需要设置changeOrigin:true来避免跨域问题。 在实际应用中，需要根据具体情况来判断是否需要配置 changeOrigin 修改 host。如果存在跨域请求的问题，且目标服务器未配置跨域访问的允许，那么配置 changeOrigin 修改 host 是必要的。否则，可以不进行配置。

![img](http://zimo.aizhaiyu.com/assets/img/38.1d6252a2.png)

**推荐配置changeOrigin：true**

## 4.historyApiFallback

**historyApiFallback是开发中一个非常常见的属性，它主要的作用是解决SPA页面在路由跳转之后，进行页面刷新时，返回404 的错误。**

- boolean值：默认是false

- 如果设置为true，那么在刷新时，返回404错误时，会自动返回 index.html 的内容；

  ![img](http://zimo.aizhaiyu.com/assets/img/39.a44088ee.png)

- object类型的值，可以配置rewrites属性：

- 可以配置from来匹配路径，决定要跳转到哪一个页面；

- 事实上devServer中实现historyApiFallback功能是通过connect-history-api-fallback库的：

- 查看[connect-history-api-fallback (opens new window)](https://github.com/bripkens/connect-history-api-fallback)文档

# 六、webpack性能优化方案

- webpack的性能优化较多，我们可以对其进行分类：
- **优化一：打包后的结果，上线时的性能优化。（比如分包处理、减小包体积、CDN服务器等）**
- **优化二：优化打包速度，开发或者构建时优化打包速度。（比如exclude、cache-loader等）**
- 大多数情况下，我们会更加侧重于优化一，这对于线上的产品影响更大。
- 在大多数情况下webpack都帮我们做好了该有的性能优化：
- 比如配置mode为production或者development时，默认webpack的配置信息；
- 但是我们也可以针对性的进行自己的项目优化；

## 1.性能优化 - 代码分离

- 代码分离（Code Splitting）是webpack一个非常重要的特性：
  - 它主要的目的是将代码分离到不同的bundle中，之后我们可以按需加载，或者并行加载这些文件；
  - 比如默认情况下，所有的JavaScript代码（业务代码、第三方依赖、暂时没有用到的模块）在首页全部都加载，就会影响首页 的加载速度；
  - 代码分离可以分出更小的bundle，以及控制资源加载优先级，提供代码的加载性能；
- Webpack中常用的代码分离有三种：
  - **入口起点：使用entry配置手动分离代码；**
  - **防止重复：使用Entry Dependencies或者SplitChunksPlugin去重和分离代码；**
  - **动态导入：通过模块的内联函数调用来分离代码；**

### 1.1 入口起点优化

1. **入口起点的含义非常简单，就是配置多入口：**

- **比如配置一个index.js和main.js的入口；**
- **他们分别有自己的代码逻辑；**

![img](http://zimo.aizhaiyu.com/assets/img/40.7daeb8e4.png)

1. **多入口优化-Entry Dependencies(入口依赖)**

- 假如我们的index.js和main.js都依赖两个库：axios
  - 如果我们单纯的进行入口分离，那么打包后的两个bunlde都有会有一份axios
  - 事实上我们可以对他们进行共享；

![img](http://zimo.aizhaiyu.com/assets/img/41.bb57f4a6.png)

### 1.2 动态导入(dynamic import)

- **另外一个代码拆分的方式是动态导入时，webpack提供了两种实现动态导入的方式：**
  - **第一种，使用ECMAScript中的 import() 语法来完成，也是目前推荐的方式；**
  - 第二种，使用webpack遗留的 require.ensure，目前已经不推荐使用；
- 比如我们有一个模块 bar.js：
- 该模块我们希望在代码运行过程中来加载它（比如判断一个条件成立时加载）；
- 因为我们并不确定这个模块中的代码一定会用到，所以最好拆分成一个独立的js文件；
- 这样可以保证不用到该内容时，浏览器不需要加载和处理该文件的js代码；
- 这个时候我们就可以使用动态导入；

![img](http://zimo.aizhaiyu.com/assets/img/42.04ccf72a.png)

- 注意：使用动态导入bar.js：
  - 在webpack中，通过动态导入获取到一个对象；
  - 真正导出的内容，在该对象的default属性中，所以我们需要做一个简单的解构；

1. **动态导入的文件命名**

因为动态导入通常是一定会打包成独立的文件的，所以并不会再cacheGroups中进行配置；

那么它的命名我们通常会在output中，通过 chunkFilename 属性来命名；

希望修改name的值，可以通过magic comments（魔法注释）的方式

![img](http://zimo.aizhaiyu.com/assets/img/43.008d3029.png)

### 1.3自定义分包-SplitChunks

- 第三种分包的模式是splitChunk，它底层是使用SplitChunksPlugin来实现的：
  - 因为该插件webpack已经默认安装和集成，所以我们并不需要单独安装和直接使用该插件；
  - 只需要提供SplitChunksPlugin相关的配置信息即可；

1. Webpack提供了SplitChunksPlugin默认的配置，我们也可以手动来修改它的配置：

- 比如默认配置中，chunks仅仅针对于异步（async）请求，我们可以设置为initial或者all；

![img](http://zimo.aizhaiyu.com/assets/img/44.f79c4aa7.png)

1. **SplitChunks自定义配置解析**

**常用配置解析**

- **Chunks:**
  - 默认值是async
  - 另一个值是initial，表示对通过的代码进行处理
  - all表示对同步和异步代码都进行处理
- **minSize：**
- 拆分包的大小, 至少为minSize；
- 如果一个包拆分出来达不到minSize,那么这个包就不会拆分；
- **maxSize：**
- 将大于maxSize的包，拆分为不小于minSize的包；
- **cacheGroups：**
- 用于对拆分的包就行分组，比如一个lodash在拆分之后，并不会立即打包，而是会等到有没有其他符合规则的包一起来打包；
- test属性：匹配符合规则的包；
- name属性：拆分包的name属性；
- filename属性：拆分包的名称，可以自己使用placeholder属性；

![img](http://zimo.aizhaiyu.com/assets/img/45.cdedb26f.png)

1. **解决注释的单独提取**

在生产环境下默认webpack在进行分包时，有对包中的注释进行单独提取。

![img](http://zimo.aizhaiyu.com/assets/img/54.45fbc3bc.png)

这个包提取是由另一个插件默认配置的原因（默认为true，改为false即可）

![img](http://zimo.aizhaiyu.com/assets/img/55.a6335604.png)

1. **optimization.chunkIds配置**

**optimization.chunkIds配置用于告知webpack模块的id采用什么算法生成**

- 有三个比较常见的值：
- **natural**：按照数字的顺序使用id；
- **named：development**下的默认值，一个可读的名称的id；
- **deterministic**：确定性的，在不同的编译中不变的短数字id
- 在webpack4中是没有这个值的；
- 那个时候如果使用natural，那么在一些编译发生变化时，就会有问题；

最佳实践：

- 开发过程中，我们推荐使用**named**；
- 打包过程中，我们推荐使用**deterministic**；

![img](http://zimo.aizhaiyu.com/assets/img/46.9e5993d3.png)

1. **optimization.runtimeChunk配置**

- 配置runtime相关的代码是否抽取到一个单独的chunk中：
  - runtime相关的代码指的是在运行环境中，对模块进行解析、加载、模块信息相关的代码；
  - 比如我们的component、bar两个通过import函数相关的代码加载，就是通过runtime代码完成的；
- 抽离出来后，有利于浏览器缓存的策略：
- 比如我们修改了业务代码（main），那么runtime和component、bar的chunk是不需要重新加载的；
- 比如我们修改了component、bar的代码，那么main中的代码是不需要重新加载的；
- 设置的值：
- true/multiple：针对每个入口打包一个runtime文件；
- single：打包一个runtime文件；
- 对象：name属性决定runtimeChunk的名称；

![img](http://zimo.aizhaiyu.com/assets/img/52.23248182.png)

> 会打包出单独的js文件。单独模块

1. **Prefetch和Preload**

webpack v4.6.0+ 增加了对预获取和预加载的支持。

- 在声明 import 时，使用下面这些内置指令，来告知浏览器：

  - prefetch(预获取)：将来某些导航下可能需要的资源
  - preload(预加载)：当前导航下可能需要资源

  ![img](http://zimo.aizhaiyu.com/assets/img/47.9e67e3c4.png)

**与 prefetch 指令相比，preload 指令有许多不同之处：**

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。

## 2.性能优化-CDN

CDN称之为内容分发网络（Content Delivery Network或Content Distribution Network，缩写：CDN）， 它是指通过相互连接的网络系统，利用最靠近每个用户的服务器； 更快、更可靠地将音乐、图片、视频、应用程序及其他文件发送给用户； 来提供高性能、可扩展性及低成本的网络内容传递给用户；

- 在开发中，我们使用CDN主要是两种方式：
  - 方式一：打包的所有静态资源，放到CDN服务器， 用户所有资源都是通过CDN服务器加载的；
  - 方式二：一些第三方资源放到CDN服务器上；

### 1.1配置CDN服务器

**可以直接修改publicPath，在打包时添加上自己的CDN地址；**

![img](http://zimo.aizhaiyu.com/assets/img/49.0fbb4cbc.png)

### 1.2配置第三方库的CDN服务器

通常一些比较出名的开源框架都会将打包后的源码放到一些比较出名的、免费的CDN服务器上：

- 国际上使用比较多的是unpkg、JSDelivr、cdnjs；
- 国内也有一个比较好用的CDN是bootcdn；

项目中，我们如何去引入这些CDN呢？

- 第一，在打包的时候我们不再需要对类似于lodash或者axios这些库进行打包；
- 第二，在html模块中，我们需要自己加入对应的CDN服务器地址；

**第一步，我们可以通过webpack配置，来排除一些库的打包：**

**第二步，在html模块中，加入CDN服务器地址：**

![img](http://zimo.aizhaiyu.com/assets/img/50.cb082d08.png)

## 3.性能优化-提取css文件

MiniCssExtractPlugin可以帮助我们将css提取到一个独立的css文件中，该插件需要在webpack4+才可以使用。

安装 mini-css-extract-plugin：

**npm install mini-css-extract-plugin -D**

**配置rules和plugins：**

![img](http://zimo.aizhaiyu.com/assets/img/51.9cc50ae5.png)

> 注意：1.**style-loader**打包样式是放到标签内联上的，2. **minicssExtractPlugin**打包独立css文件然后link标签引入css。

## 4. 性能优化-打包文件命名(Hash,ContentHash,ChunkHash)

- 在我们给打包的文件进行命名的时候，会使用placeholder，placeholder中有几个属性比较相似：
  - hash、chunkhash、contenthash
  - hash本身是通过MD4的散列函数处理后，生成一个128位的hash值（32个十六进制）；
- hash值的生成和整个项目有关系：
- 比如我们现在有两个入口index.js和main.js；
- 它们分别会输出到不同的bundle文件中，并且在文件名称中我们有使用hash；
- 这个时候，如果修改了index.js文件中的内容，那么hash会发生变化；
- 那就意味着两个文件的名称都会发生变化；
- chunkhash可以有效的解决上面的问题，它会根据不同的入口进行借来解析来生成hash值：
- 比如我们修改了index.js，那么main.js的chunkhash是不会发生改变的；
- contenthash表示生成的文件hash名称，只和内容有关系：
- 比如我们的index.js，引入了一个style.css，style.css有被抽取到一个独立的css文件中；
- 这个css文件在命名时，如果我们使用的是chunkhash；
- 那么当index.js文件的内容发生变化时，css文件的命名也会发生变化；
- 这个时候我们可以使用contenthash；

![img](http://zimo.aizhaiyu.com/assets/img/53.44d26dd1.png)

> 推荐使用**contenthash**，可以让没改动的文件文件名一样，然后用户浏览器还能使用以前的缓存文件

## 5.性能优化-JS-CSS代码压缩

### 1.Terser介绍和安装

- 什么是Terser呢？
  - Terser是一个JavaScript的解释（Parser）、Mangler（绞肉机）/Compressor（压缩机）的工具集；
  - 早期我们会使用 uglify-js来压缩、丑化我们的JavaScript代码，但是目前已经不再维护，并且不支持ES6+的语法；
  - Terser是从 uglify-es fork 过来的，并且保留它原来的大部分API以及适配 uglify-es和uglify-js@3等；
- Terser可以帮助我们压缩、丑化我们的代码，让我们的bundle变得更小。
- Terser是一个独立的工具，它可以单独安装：
- **全局安装 npm install terser -g**
- **局部安装 npm install terser -D**

> 这里就不介绍单独使用了，主要讲在webpack使用

### 2.Terser在webpack压缩JS

- 真实开发中，我们不需要手动的通过terser来处理我们的代码，我们可以直接通过webpack来处理：
  - 在webpack中有一个minimizer属性，在**production**模式下，默认就是使用**TerserPlugin**来处理我们的代码的；
  - 如果我们对默认的配置不满意，也可以自己来创建**TerserPlugin**的实例，并且覆盖相关的配置；
- **首先，我们需要打开minimize，让其对我们的代码进行压缩（默认production模式下已经打开了）**
- 其次，**我们可以在minimizer创建一个TerserPlugin：**
- extractComments：默认值为true，表示会将注释抽取到一个单独的文件中；
- 在开发中，我们不希望保留这个注释时，可以设置为false；
- parallel：使用多进程并发运行提高构建的速度，默认值是true
- 并发运行的默认数量： os.cpus().length - 1；
- 我们也可以设置自己的个数，但是使用默认值即可；
- terserOptions：设置我们的terser相关的配置
  - compress：设置压缩相关的选项；
  - mangle：设置丑化相关的选项，可以直接设置为true；
  - toplevel：顶层变量是否进行转换；
  - keep_classnames：保留类的名称；
  - keep_fnames：保留函数的名称；

![img](http://zimo.aizhaiyu.com/assets/img/56.ef1270e2.png)

### 3.Terser在webpack压缩CSS

- CSS压缩通常是去除无用的空格等，因为很难去修改选择器、属性的名称、值等；
- CSS的压缩我们可以使用另外一个插件：css-minimizer-webpack-plugin；
- css-minimizer-webpack-plugin是使用cssnano工具来优化、压缩CSS（也可以单独使用）；

安装 css-minimizer-webpack-plugin：

**npm install css-minimizer-webpack-plugin -D**

在optimization.minimizer中配置：

![img](http://zimo.aizhaiyu.com/assets/img/57.07f76754.png)

## 6.性能优化-webpack实现Tree Shaking

- 什么是Tree Shaking呢？

  - Tree Shaking是一个术语，在计算机中表示消除死代码（dead_code）；
  - 最早的想法起源于LISP，用于消除未调用的代码（纯函数无副作用，可以放心的消除，这也是为什么要求我们在进行函数式 编程时，尽量使用纯函数的原因之一）；
  - 后来Tree Shaking也被应用于其他的语言，比如JavaScript、Dart；

- JavaScript的Tree Shaking：

- 对JavaScript进行Tree Shaking是源自打包工具rollup（后面我们也会讲的构建工具）；

- 这是因为Tree Shaking依赖于ES Module的静态语法分析（不执行任何的代码，可以明确知道模块的依赖关系）；

- webpack2正式内置支持了ES2015模块，和检测未使用模块的能力；

- 在webpack4正式扩展了这个能力，并且通过 package.json的 sideEffects属性作为标记，告知webpack在编译时，哪里文 件可以安全的删除掉；

- webpack5中，也提供了对部分CommonJS的tree shaking的支持；

  > [webpack/changelog-v5: Temporary repo for the changelog for webpack 5 (github.com)(opens new window)](https://github.com/webpack/changelog-v5#commonjs-tree-shaking)

### 1. JS实现Tree Shaking

- webpack实现Tree Shaking采用了两种不同的方案：
  - **usedExports：通过标记某些函数是否被使用，之后通过Terser来进行优化的；**
  - **sideEffects**：**跳过整个模块/文件，直接查看该文件是否有副作用**；

1. **usedExports实现**
   - 将mode设置为development模式：
     - 为了可以看到 usedExports带来的效果，我们需要设置为 development 模式
     - 因为在 production 模式下，webpack默认的一些优化会带来很大的影响。
   - 设置usedExports为true和false对比打包后的代码：
   - 在usedExports设置为true时，会有一段注释：**unused harmony export mul；**
   - 这段注释的意义是什么呢？**告知Terser在优化时，可以删除掉这段代码；**

![img](http://zimo.aizhaiyu.com/assets/img/65.a9f86e4e.png)

- 这个时候，我们讲 minimize设置true：
- usedExports设置为false时，mul函数没有被移除掉；
- usedExports设置为true时，mul函数有被移除掉；
- **usedExports实现Tree Shaking是结合Terser来完成的。**

![img](http://zimo.aizhaiyu.com/assets/img/66.ff923aea.png)

1. **sideEffects实现**

- sideEffects用于告知webpack compiler哪些模块时有副作用的：
  - 副作用的意思是这里面的代码有执行一些特殊的任务，不能仅仅通过export来判断这段代码的意义；
- **在package.json中设置sideEffects的值：**
- 如果我们将sideEffects设置为false，就是告知webpack可以安全的删除未用到的exports；
- 如果有一些我们希望保留，可以设置为数组；
- 比如我们有一个format.js、style.css文件：
- 该文件在导入时没有使用任何的变量来接受；
- 那么打包后的文件，不会保留format.js、style.css相关的任何代码；

![img](http://zimo.aizhaiyu.com/assets/img/67.a9f7e60f.png)

1. 在项目中对JavaScript的代码进行TreeShaking呢（生成环境）？（项目中最佳实践）
   - **在optimization中配置usedExports为true，来帮助Terser进行优化；**
   - **在package.json中配置sideEffects，直接对模块进行优化；**

### 2.CSS实现TreeShaking

- 上面我们学习的都是关于JavaScript的Tree Shaking，那么CSS也可以进行Tree Shaking操作

  - CSS的Tree Shaking需要借助于一些其他的插件；
  - 在早期的时候，我们会使用PurifyCss插件来完成CSS的tree shaking，但是目前该库已经不再维护了（最新更新也是在4年前 了）；
  - 目前我们可以使用另外一个库来完成CSS的Tree Shaking：PurgeCSS，也是一个帮助我们删除未使用的CSS的工具；

- 安装PurgeCss的webpack插件：

  **npm install purgecss-webpack-plugin -D**

**webpack配置PurgeCss**

- paths：表示要检测哪些目录下的内容需要被分析，这里我们可以使用glob；
- 默认情况下，Purgecss会将我们的html标签的样式移除掉，如果我们希望保留，可以添加一个safelist的属性；

![img](http://zimo.aizhaiyu.com/assets/img/76.be243117.png)

## 7.Scope Hoisting(作用域提升）

- Scope Hoisting从webpack3开始增加的一个新功能；
- 功能是对作用域进行提升，并且让webpack打包后的代码更小、运行更快；
- 默认情况下webpack打包会有很多的函数作用域，包括一些（比如最外层的）IIFE：
  - 无论是从最开始的代码运行，还是加载一个模块，都需要执行一系列的函数；
  - Scope Hoisting可以将函数合并到一个模块中来运行；
- 使用Scope Hoisting非常的简单，webpack已经内置了对应的模块：
  - 在production模式下，默认这个模块就会启用；
  - 在development模式下，我们需要自己来打开该模块；

![img](http://zimo.aizhaiyu.com/assets/img/68.4f5e5e50.png)

## 8. 性能优化-Webpack对文件压缩

### 1.什么是HTTP压缩

- HTTP压缩是一种内置在 服务器 和 客户端 之间的，以改进传输速度和带宽利用率的方式；
- HTTP压缩的流程什么呢？
- 第一步：HTTP数据在服务器发送前就已经被压缩了；（可以在webpack中完成）
- 第二步：兼容的浏览器在向服务器发送请求时，会告知服务器自己支持哪些压缩格式；
- 第三步：服务器在浏览器支持的压缩格式下，直接返回对应的压缩后的文件，并且在响应头中告知浏览器；

### 2.目前的流行压缩格式

- 目前的压缩格式非常的多：
- compress – UNIX的“compress”程序的方法（历史性原因，不推荐大多数应用使用，应该使用gzip或deflate）；
- deflate – 基于deflate算法（定义于RFC 1951）的压缩，使用zlib数据格式封装；
- **gzip – GNU zip格式（定义于RFC 1952），是目前使用比较广泛的压缩算法；**
- br – 一种新的开源压缩算法，专为HTTP内容的编码而设计；

### 3. Webpack配置文件压缩

- webpack中相当于是实现了HTTP压缩的第一步操作，我们可以使用CompressionPlugin。
  - 第一步，安装CompressionPlugin：
    - **npm install compression-webpack-plugin -D**
  - 第二步，使用CompressionPlugin即可：

![img](http://zimo.aizhaiyu.com/assets/img/71.ca2f5989.png)

## 9. 性能优化-HTML代码压缩

- 我们之前使用了HtmlWebpackPlugin插件来生成HTML的模板，事实上它还有一些其他的配置：

  - inject：设置打包的资源插入的位置

  - true、 false 、body、head

  - cache：设置为true，只有当文件改变时，才会生成新的文件（默认值也是true）

  - minify：默认会使用一个插件html-minifier-terser

    ![img](http://zimo.aizhaiyu.com/assets/img/72.f4076898.png)

# 七、webpack配置分离

当我们实际项目的开发过程中，webpack.config.js文件中的某些配置只是在开发环境中有依赖，并不想让其打包到生产环境中去，比如webpack-dev-server,有些配置是开发环境不需要，生产环境需要，比如压缩js代码的配置，因此对这里的配置做一个分离。

## 1.webpack配置文件分离

首先我们可以在项目根路径中创建一个config文件夹，并且在文件夹中创建common.js、dev.config.js、prod.config.js。

- commmon中放公共的配置
- dev中放开发环境下的配置
- prod中放生产环境下的配置

![img](data:image/png;base64,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)

## 2.区分webpack环境

在package.json的scripts中修改脚本，并且执行的时候会把**env**传入进去

![img](http://zimo.aizhaiyu.com/assets/img/59.cdc56d91.png)

## 3.配置各个环境文件

这里就分离自己的配置。如果你的配置需要根据需要的环境分离。

1. **comment(公共配置)**

![img](http://zimo.aizhaiyu.com/assets/img/60.866d1fea.png)

> 注意： **entry**写上相对路径时，并不是相对于文件所在的路径，而是相对于context配置的路径。对于context，webpack的解释：基础目录，一个绝对路径，用于从配置中解析入口点(entry)和加载程序(loader)。

1. **development（开发环境）**

![img](http://zimo.aizhaiyu.com/assets/img/61.9a9feb48.png)

1. **production（生产环境）**

![img](http://zimo.aizhaiyu.com/assets/img/62.50cd1e69.png)

## 4.配置文件进行合并

- 生产环境：生产配置文件 + 公共配置文件
- 开发环境：开发环境文件 + 公共配置文件

文件区分好了，现在主要是合并配置

- webpack就提供一个合并配置的插件，安装即可：
- **npm i webpack-merge -D**

在common.config.js中的代码

![img](http://zimo.aizhaiyu.com/assets/img/63.d3d0018d.png)

**common.config.js中的getCommonConfig写成函数的作用。**

![img](http://zimo.aizhaiyu.com/assets/img/64.4e851768.png)

> 总体思路：
>
> 1. 抽取开发和生产环境的配置文件
>
> 2. 将配置文件导出的是一个函数, 而不是一个对象
>
> 3. 从上向下查看所有的配置属性应该属于哪一个文件
>
>    **comm/dev/prod**
>
> 4. 单独的配置文件进行定义化css加载: 使用的不同的loader可以根据isProduction动态获取

# 八、webpack打包分析

## 1. 打包的时间分析

- 如果我们希望看到每一个loader、每一个Plugin消耗的打包时间，可以借助于一个插件：speed-measure-webpack-plugin
  - 注意：该插件在最新的webpack版本中存在一些兼容性的问题（和部分Plugin不兼容）
  - 截止2021-3-10日，但是目前该插件还在维护，所以可以等待后续是否更新；
  - 我这里暂时的做法是把不兼容的插件先删除掉，也就是不兼容的插件不显示它的打包时间就可以了；
- 第一步，安装speed-measure-webpack-plugin插件

 **npm install speed-measure-webpack-plugin -D**

- 第二步，使用speed-measure-webpack-plugin插件
- 创建插件导出的对象 SpeedMeasurePlugin；
- 使用 smp.wrap 包裹我们导出的webpack配置；

 ![img](http://zimo.aizhaiyu.com/assets/img/73.194b0dc8.png)

## 2.打包后文件分析

- 使用非常直观查看包大小的工具是webpack-bundle-analyzer工具 。

- 第一步，我们可以直接安装这个工具：

  **npm install webpack-bundle-analyzer -D**

- 第二步，我们可以在webpack配置中使用该插件：

![img](http://zimo.aizhaiyu.com/assets/img/75.6fd5e083.png)

- 在打包webpack的时候，这个工具是帮助我们打开一个8888端口上的服务，我们可以直接的看到每个包的大小。
- 比如有一个包时通过一个Vue组件打包的，但是非常的大，那么我们可以考虑是否可以拆分出多个组件，并且对其进行懒加载；
- 比如一个图片或者字体文件特别大，是否可以对其进行压缩或者其他的优化处理；

![img](http://zimo.aizhaiyu.com/assets/img/74.a40f87d0.png)