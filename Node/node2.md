# fs 文件系统模块

## **fs** 文件系统模块

1. **fs.readFile() 方法，用来读取指定文件中的内容**
2. **fs.writeFile() 方法，用来向指定的文件中写入内容**

使用 fs 模块来操作文件，则需要使用如下的方式先导入它：

![image-20221229194650031](http://zimo.aizhaiyu.com/assets/img/1.b2364d7d.png)

### **fs.readFile()**的语法格式

![image-20221229194833495](http://zimo.aizhaiyu.com/assets/img/1.2.8b5bee62.png)

l 参数 1：必选参数，字符串，表示文件的路径。

l 参数 2：可选参数，表示以什么编码格式来读取文件。

参数 3：必选参数，文件读取完成后，通过回调函数拿到读取的结果

示例：

![image-20221229195131584](http://zimo.aizhaiyu.com/assets/img/1.3.50bff666.png)

### **fs.writeFile() **的语法格式

![image-20221229195254715](http://zimo.aizhaiyu.com/assets/img/1.4.f0c3447b.png)

参数 1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。

参数 2：必选参数，表示要写入的内容。

参数 3：可选参数，表示以什么格式写入文件内容，默认值是 utf8。

参数 4：必选参数，文件写入完成后的回调函数。

示例：

![image-20221229195342620](http://zimo.aizhaiyu.com/assets/img/1.5.20f86701.png)

## path 路径模块

**path 模块是 Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。**

![image-20221230204108361](http://zimo.aizhaiyu.com/assets/img/2.1.476c7adb.png)

### **1.路径拼接**

**path.join() **的语法格式

![image-20221230204501439](http://zimo.aizhaiyu.com/assets/img/2.2.c139c603.png)

**注意：今后凡是涉及到路径拼接的操作，都要使用 path.join() 方法进行处理。不要直接使用 + 进行字符串的拼接。**

### 2.**获取路径中的文件名**

**path.basename()的语法格式**

![image-20221230204848125](http://zimo.aizhaiyu.com/assets/img/2.3.c91b2bf6.png)

参数解读：

path 必选参数，表示一个路径的字符串

ext 可选参数，表示文件扩展名

返回: 表示路径中的最后一部分

示例：

![image-20221230205015261](http://zimo.aizhaiyu.com/assets/img/2.4.a2ac7883.png)

### 3.**获取路径中的文件扩展名**

使用 path.extname() 方法，可以获取路径中的扩展名部分

![image-20221230205134401](data:image/png;base64,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v6h8y7ff/vefuXvdQGdbDkRERNRaWiGnPjVj0zE7Im+NFvazfztNBpUo45J49TX//uBIOT5++Wzd5l1sjAEgWgg94POTXLUUYyuV8rafX/ntr//m2l/f8sC6rq7i/nZ8JSIiosnRCs/9n5rUS3uUvGJOdY5kbt+UualhKuZpbYlPh5+o+lp1pAkYFNtyYRB4NDPJi2ZUn4fwhi3F65s+fNKS/GescyLNWrXmYo8wHxZzWWVKJSIiakXPvpw6vjgpEUAl1LzAsKT6bCBjk3EBE/iC8CMjIiKiA3j2FSLHnvsXoydO66QWt+dkXH5kREREdEDcL5KIiIiIWhFzKhERERG1IuZUIiIiImpFzKlERERE1IqYU4mIiIioFTGnEhEREVErYk4lIiIiolbEnEpERERErYg5lYiIiIhaEXMqEREREbUi5lQiIiIiakXMqURERETUiphTiYiIiKgVMacSERERUStiTiUiIiKiVsScSkREREStiDmViIiIiFoRcyoRERERtSLmVCIiIiJqRcypRERERNSKmFOJiIiIqBUxpxIRERFRK2JOJSIiIqJWxJxKRERERK2IOZWIiIiIWhFzKhERERG1IuZUIiIiImpFzKlERERE1IqMqk52H4iIiIiI9qKqxhiWVImIiIiotRhjTF/flCCw3vvJ7gwREREREbz3gbXT+qaYE1css9Y6x5xKRERERJPPOW+sXbFimTn9tOdO6e1xzrGkSkRERESTy3t1zk3p7T791OeaRQvnnnP2yhnT++IkSZKUy6qIiIiI6JmnqkmSxkkyY3rfOWevXLxobiAi5569UlV/dd0N2weHXOqcc5PdTyIiIiL60xIEQTab6e3pPufslS865/kiItdddx2ANE0fWbvx5lvuvPOue7f1b/fei8hk95aIiIiI/ucb24JqWt+U5cuPOfV5KxYunBuGoar+f9EnuyzzyDvnAAAAAElFTkSuQmCC)

示例：

![image-20221230205235830](http://zimo.aizhaiyu.com/assets/img/2.6.525d6a20.png)

## http 模块

**什么是** **http** **模块**？

回顾：什么是客户端、什么是服务器？

在网络节点中，负责消费资源的电脑，叫做客户端；负责对外提供网络资源的电脑，叫做服务器。

http 模块是 Node.js 官方提供的、用来**创建 web 服务器**的模块。通过 http 模块提供的 **http.createServer()** 方法，就能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。

如果要希望使用 http 模块创建 Web 服务器，则需要先导入它：

![image-20221230213128693](http://zimo.aizhaiyu.com/assets/img/3.fb03ab09.png)

### **创建最基本的** **web** **服务器**

调用 http.createServer() 方法，即可快速创建一个 web 服务器实例：

![image-20221230213334135](http://zimo.aizhaiyu.com/assets/img/3.1.a013a6bd.png)

为服务器实例绑定 request 事件

![image-20221230213416761](http://zimo.aizhaiyu.com/assets/img/3.3.97b03e22.png)

调用服务器实例的 .listen() 方法，即可启动当前的 web 服务器实例：

![image-20221230213439232](http://zimo.aizhaiyu.com/assets/img/3.4.69a1ec2a.png)

### **req** **请求对象**

只要服务器接收到了客户端的请求，就会调用通过 server.on() 为服务器绑定的 request 事件处理函数。

如果想在事件处理函数中，访问与客户端相关的**数据**或**属性**，可以使用如下的方式：

![image-20221230213621296](http://zimo.aizhaiyu.com/assets/img/3.5.7d16077d.png)

### 解决中文乱码问题

当调用 res.end() 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式：

![image-20221230220504209](http://zimo.aizhaiyu.com/assets/img/3.6.87d96ae5.png)

## **Node.js** **中的模块化**

Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是：

1. 内置模块（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等）
2. 自定义模块（用户创建的每个 .js 文件，都是自定义模块）
3. 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）

### 1.加载模块

使用强大的 require() 方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用

![image-20230101202319510](http://zimo.aizhaiyu.com/assets/img/5.49d61ddf.png)

### 2.**模块作用域**

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做**模块作用域**。

![image-20230101202410583](http://zimo.aizhaiyu.com/assets/img/5.1.276d9c81.png)

### 3.**module** **对象**

在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息，打印如下：

![image-20230101202509040](http://zimo.aizhaiyu.com/assets/img/5.2.d89b80e4.png)

### 4.**module.exports** **对象**

在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。

外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。

**注意点**：

使用 require() 方法导入模块时，导入的结果，**永远以** **module.exports** **指向的对象为准**。

![image-20230101202635782](http://zimo.aizhaiyu.com/assets/img/5.3.44ab4a42.png)

### 5.**exports** **对象**

由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 exports 对象。默认情况下，exports 和 module.exports 指向同一个对象。最终共享的结果，还是以 module.exports 指向的对象为准。

![image-20230101202724209](http://zimo.aizhaiyu.com/assets/img/5.4.fd6a104b.png)

### 6.**exports** **和** **module.exports** **的使用误区**

时刻谨记，require() 模块时，得到的永远是 module.exports 指向的对象：

![image-20230101203333303](http://zimo.aizhaiyu.com/assets/img/5.5.9f4bb417.png)

**注意：**为了防止混乱，建议大家不要在同一个模块中同时使用 exports 和 module.exports

### 7.**Node.js** **中的模块化规范**

Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。

CommonJS 规定：

① 每个模块内部，module 变量代表当前模块。

②module 变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。

③ 加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。

## **Express**

### 1.基本使用：

先安装 express

![image-20230102120956548](http://zimo.aizhaiyu.com/assets/img/6.1.d08505d0.png)

#### **监听** **GET** **请求**

通过 app.get() 方法，可以监听客户端的 GET 请求，具体的语法格式如下：

![image-20230102121048844](http://zimo.aizhaiyu.com/assets/img/6.2.1e9d99aa.png)

#### **监听** **POST** **请求**

通过 app.post() 方法，可以监听客户端的 POST 请求，具体的语法格式如下：

![image-20230102121112911](http://zimo.aizhaiyu.com/assets/img/6.3.898fdb70.png)

#### 把内容响应给客户端

通过 res.send() 方法，可以把处理好的内容，发送给客户端：

![image-20230102121200082](http://zimo.aizhaiyu.com/assets/img/6.4.12f4f3b7.png)

#### **获取** **URL** **中携带的查询参数**

通过 req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：

![image-20230102121233067](http://zimo.aizhaiyu.com/assets/img/6.5.4a40b181.png)

#### **获取** **URL** 中的动态参数

通过 req.params 对象，可以访问到 URL 中，通过 **:** 匹配到的动态参数：

![image-20230102121310105](http://zimo.aizhaiyu.com/assets/img/6.6.bfb77974.png)

### 2.**托管静态资源**

#### express.static()

express 提供了一个非常好用的函数，叫做 express.static()，通过它，我们可以非常方便地创建一个静态资源服务器，例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

![image-20230102151513880](http://zimo.aizhaiyu.com/assets/img/6.7.b59a07c7.png)

现在，你就可以访问 public 目录中的所有文件了：

http://localhost:3000/./images/bg.jpg

http://localhost:3000/css/style.css

http://localhost:3000/js/login.js

**注意：**Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。

因此，存放静态文件的目录名不会出现在 URL 中。

#### **托管多个静态资源目录**

如果要托管多个静态资源目录，请多次调用 express.static() 函数：

![image-20230102151630869](http://zimo.aizhaiyu.com/assets/img/6.8.4fa30eb6.png)

访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件。

#### 挂载路径前缀

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：

![image-20230102151715819](http://zimo.aizhaiyu.com/assets/img/6.9.a0a0236e.png)

现在，你就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：

http://localhost:3000/public/./images/kitten.jpg

http://localhost:3000/public/css/style.css

http://localhost:3000/public/js/app.js

### 3. **nodemon**

在编写调试 Node.js 项目的时候，如果修改了项目的代码，则需要频繁的手动 close 掉，然后再重新启动，非常繁琐。

现在，我们可以使用 nodemon（https://www.npmjs.com/package/nodemon） 这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。

**安装** **nodemon**

![image-20230102151826871](http://zimo.aizhaiyu.com/assets/img/6.10.7003dad4.png)

**使用** **nodemon**

当基于 Node.js 编写了一个网站应用的时候，传统的方式，是运行 node app.js 命令，来启动项目。这样做的坏处是：代码被修改之后，需要手动重启项目。

现在，我们可以将 node 命令替换为 nodemon 命令，使用 nodemon app.js 来启动项目。这样做的好处是：代码被修改之后，会被 nodemon 监听到，从而实现自动重启项目的效果。

![image-20230102151902896](http://zimo.aizhaiyu.com/assets/img/6.11.70fc1539.png)

### 4. **Express** **路由**

#### **路由的使用**

在 Express 中使用路由最简单的方式，就是把路由挂载到 app 上，示例代码如下：

![image-20230102152015412](http://zimo.aizhaiyu.com/assets/img/6.12.6280c814.png)

#### 模块化路由

为了方便对路由进行模块化的管理，Express **不建议**将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。

将路由抽离为单独模块的步骤如下：

① 创建路由模块对应的 .js 文件

② 调用 express.Router() 函数创建路由对象

③ 向路由对象上挂载具体的路由

④ 使用 module.exports 向外共享路由对象

使用 app.use() 函数注册路由模块

#### **创建路由模块**

![image-20230102152120795](http://zimo.aizhaiyu.com/assets/img/6.13.3b0357e0.png)

#### **注册路由模块**

![image-20230102152150037](http://zimo.aizhaiyu.com/assets/img/6.14.2b59111a.png)

#### 为路由模块添加前缀

类似于托管静态资源时，为静态资源统一挂载访问前缀一样，路由模块添加前缀的方式也非常简单：

![image-20230102152238379](http://zimo.aizhaiyu.com/assets/img/6.15.6db55f52.png)

### 5.**Express** 中间件

#### 1. **什么是中间件**

中间件（Middleware ），特指业务流程的中间处理环节。

#### 2.**Express** 中间件的调用流程

当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

![image-20230102152448092](http://zimo.aizhaiyu.com/assets/img/6.16.1c11e9dd.png)

#### 3. **Express** 中间件的格式

Express 的中间件，本质上就是一个 **function** **处理函数**，Express 中间件的格式如下：

![image-20230102152541905](http://zimo.aizhaiyu.com/assets/img/6.17.039e2fd0.png)

注意：中间件函数的形参列表中，必须包含 next 参数。而路由处理函数中只包含 req 和 res。

#### 4. **next** **函数的作用**

**next** **函数**是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。

![image-20230102152620819](http://zimo.aizhaiyu.com/assets/img/6.18.1c11e9dd.png)

#### 5.定义中间件函数

可以通过如下的方式，定义一个最简单的中间件函数：

![image-20230102152702891](http://zimo.aizhaiyu.com/assets/img/6.19.c517e408.png)

#### 6.全局生效的中间件

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。

通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件，示例代码如下：

![image-20230102152739483](http://zimo.aizhaiyu.com/assets/img/6.20.549369c3.png)

简化形式：

![image-20230102152848825](http://zimo.aizhaiyu.com/assets/img/6.21.8546f7a6.png)

#### 7.中间件的作用

多个中间件之间，**共享同一份** **req** **和** **res**。基于这样的特性，我们可以在上游的中间件中，**统一**为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

![image-20230102152932569](http://zimo.aizhaiyu.com/assets/img/6.22.1c11e9dd.png)

#### 8.定义多个全局中间件

可以使用 app.use() 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用，示例代码如下：

![image-20230102153013997](http://zimo.aizhaiyu.com/assets/img/6.23.1a01f392.png)

#### 9.局部生效的中间件

**不使用** app.use() 定义的中间件，叫做局部生效的中间件，示例代码如下：

![image-20230102153048436](http://zimo.aizhaiyu.com/assets/img/6.24.310500ad.png)

#### 10.定义多个局部中间件

可以在路由中，通过如下两种等价的方式，使用多个局部中间件：

![image-20230102153135037](http://zimo.aizhaiyu.com/assets/img/6.25.a1bf40d4.png)

#### 11.了解中间件的 5 个使用注意事项

① 一定要在路由之前注册中间件

② 客户端发送过来的请求，可以连续调用多个中间件进行处理

③ 执行完中间件的业务代码之后，不要忘记调用 next() 函数

④ 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码

⑤ 连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象

#### 12.中间件的分类

为了方便大家理解和记忆中间件的使用，Express 官方把常见的中间件用法，分成了 5 大类，分别是：

① 应用级别的中间件

通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件，叫做应用级别的中间件

② 路由级别的中间件

绑定到 express.Router() 实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上

③ 错误级别的中间件

错误级别中间件的**作用**：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

**格式**：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)。

![image-20230102153359662](http://zimo.aizhaiyu.com/assets/img/6.26.92049c1c.png)

**注意：**错误级别的中间件，必须注册在所有路由之后！

④ Express 内置的中间件

 自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

 ① express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）

 ② express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

 ③ express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

![image-20230102153453889](http://zimo.aizhaiyu.com/assets/img/6.27.8ba47d37.png)

⑤ 第三方的中间件

 非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率。

 例如：在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。使用步骤如下：

 ① 运行 npm install body-parser 安装中间件

 ② 使用 require 导入中间件

 ③ 调用 app.use() 注册并使用中间件

 **注意：**Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。

### 6.使用 Express 写接口

#### 1.**创建基本的服务器**

![image-20230102153654160](http://zimo.aizhaiyu.com/assets/img/6.28.008f2339.png)

#### 2.**创建** **API** **路由模块**

![image-20230102153719893](http://zimo.aizhaiyu.com/assets/img/6.29.cd4d03fe.png)

#### 3.**编写** **GET** **接口**

![image-20230102153741532](http://zimo.aizhaiyu.com/assets/img/6.30.90f3070d.png)

#### 4.**编写** **POST** **接口**

![image-20230102153801073](http://zimo.aizhaiyu.com/assets/img/6.31.e62a81df.png)

注意：如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({ extended: false }))

#### 5.**CORS** **跨域资源共享**

**接口的****跨域问题**

刚才编写的 GET 和 POST 接口，存在一个很严重的问题：不支持跨域请求。

解决接口跨域问题的方案主要有两种：

① CORS（主流的解决方案，推荐使用）

② JSONP（有缺陷的解决方案：只支持 GET 请求）

#### 6.**使用** **cors** **中间件****解决跨域问题**

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。

使用步骤分为如下 3 步：

① 运行 npm install cors 安装中间件

② 使用 const cors = require('cors') 导入中间件

在路由之前调用 app.use(cors()) 配置中间件

#### 7.**什么是** **CORS**

CORS （Cross-Origin Resource Sharing，跨域资源共享）由一系列 HTTP 响应头组成，**这些** **HTTP** **响应头决定浏览器是否阻止前端** **JS** **代码跨域获取资源**。

浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可以解除浏览器端的跨域访问限制。

![image-20230102153935223](http://zimo.aizhaiyu.com/assets/img/6.32.a0f07263.png)

![image-20230102153950420](http://zimo.aizhaiyu.com/assets/img/6.33.4897125f.png)

**CORS** **的注意事项**

①CORS 主要在服务器端进行配置。客户端浏览器**无须做任何额外的配置**，即可请求开启了 CORS 的接口。

②CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。

## node 中的 MySQL

### 1.**在项目中操作数据库的步骤**

① 安装操作 MySQL 数据库的第三方模块（mysql）

② 通过 mysql 模块连接到 MySQL 数据库

③ 通过 mysql 模块执行 SQL 语句

#### 1.**安装** **mysql** **模块**

mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。

想要在项目中使用它，需要先运行如下命令，将 mysql 安装为项目的依赖包：

```text
npm i mysql
 
        Copied!
    
```

1

#### 2.**配置** **mysql** **模块**

在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下：

![image-20230102200556605](http://zimo.aizhaiyu.com/assets/img/7.1.f6cdacd1.png)

#### 3.**测试** **mysql** **模块能否正常工作**

调用 db.query() 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果：

![image-20230102200630258](http://zimo.aizhaiyu.com/assets/img/7.2.268404ad.png)

### 2.**使用** **mysql** **模块操作** **MySQL** **数据库**

**查询数据**

查询 users 表中所有的数据：

![image-20230102200816114](http://zimo.aizhaiyu.com/assets/img/7.3.b6070fa2.png)

**插入数据**

向表中新增数据时，如果数据对象的每个属性和数据表的字段**一一对应**，则可以通过如下方式快速插入数据：

![image-20230102200846245](http://zimo.aizhaiyu.com/assets/img/7.4.007111df.png)

**更新数据的便捷方式**

更新表数据时，如果数据对象的每个属性和数据表的字段**一一对应**，则可以通过如下方式快速更新表数据：

![image-20230102200919182](http://zimo.aizhaiyu.com/assets/img/7.5.29e410e9.png)

**删除数据**

在删除数据时，推荐根据 id 这样的唯一标识，来删除对应的数据。示例如下：

![image-20230102200943286](http://zimo.aizhaiyu.com/assets/img/7.6.260d0823.png)

## 前后端的身份认证

### 1.**Web** **开发模式**

目前主流的 Web 开发模式有两种，分别是：

① 基于服务端渲染的传统 Web 开发模式

② 基于前后端分离的新型 Web 开发模式

#### 1.服务端渲染的 Web 开发模式

服务端渲染的概念：服务器发送给客户端的 HTML 页面，是在服务器通过字符串的拼接，动态生成的。因此，客户端不需要使用 Ajax 这样的技术额外请求页面的数据。代码示例如下：

![image-20230102201309686](http://zimo.aizhaiyu.com/assets/img/8.4dfd26f0.png)

#### **2.** **服务端渲染的优缺点**

优点：

① **前端耗时少。**因为服务器端负责动态生成 HTML 内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电。

② **有利于****SEO\****。**因为服务器端响应的是完整的 HTML 页面内容，所以爬虫更容易爬取获得信息，更有利于 SEO。

缺点：

① **占用服务器端资源。**即服务器端完成 HTML 页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力。

② **不利于前后端分离，开发效率低。\**使用服务器端渲染，则\**无法进行分工合作**，尤其对于**前端复杂度高**的项目，不利于项目高效开发。

#### 3.**前后端分离的 **Web 开发模式

前后端分离的概念：前后端分离的开发模式，**依赖于** **Ajax** **技术的广泛应用**。简而言之，前后端分离的 Web 开发模式，就是**后端只负责提供** **API** **接口，前端使用** **Ajax** **调用接口**的开发模式。

#### 4.**前后端分离的优缺点**

优点：

① **开发体验好。**前端专注于 UI 页面的开发，后端专注于 api 的开发，且前端有更多的选择性。

② **用户体验好。**Ajax 技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。

③ **减轻了服务器端的渲染压力。**因为页面最终是在每个用户的浏览器中生成的。

缺点：

① **不利于** **SEO\****。**因为完整的 HTML 页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。（解决方案：利用 Vue、React 等前端框架的 **SSR** （server side render）技术能够很好的解决 SEO 问题！）

#### 5. **如何选择** **Web** **开发模式**

**不谈业务场景而盲目选择使用何种开发模式都是耍流氓。**

l 比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的 SEO，则这时我们就需要使用服务器端渲染；

l 而类似后台管理项目，交互性比较强，不需要考虑 SEO，那么就可以使用前后端分离的开发模式。

另外，具体使用何种开发模式并不是绝对的，为了**同时兼顾**了**首页的渲染速度**和**前后端分离的开发效率**，一些网站采用了首屏服务器端渲染 + 其他页面前后端分离的开发模式。

### 2.**身份认证**

#### **1.** **什么是****身份认证**

**身份认证**（Authentication）又称“身份验证”、“鉴权”，是指**通过一定的手段，完成对用户身份的确认**。

l 日常生活中的身份认证随处可见，例如：高铁的验票乘车，手机的密码或指纹解锁，支付宝或微信的支付密码等。

l 在 Web 开发中，也涉及到用户身份的认证，例如：各大网站的**手机验证码登录**、**邮箱密码登录**、**二维码登录**等。

#### 2.**为什么需要身份认证**

身份认证的目的，是为了**确认当前所声称为某种身份的用户，确实是所声称的用户**。例如，你去找快递员取快递，你要怎么证明这份快递是你的。

在互联网项目开发中，如何对用户的身份进行认证，是一个值得深入探讨的问题。例如，如何才能保证网站不会错误的将“马云的存款数额”显示到“马化腾的账户”上。

#### **3.** **不同开发模式下的****身份认证**

对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案：

① 服务端渲染推荐使用 **Session** **认证机制**

② 前后端分离推荐使用 **JWT** **认证机制**

#### 4.**Session** **认证机制**

了解 HTTP 协议的无状态性是进一步学习 Session 认证机制的必要前提。

HTTP 协议的无状态性，指的是客户端**的每次** **HTTP** **请求都是独立的**，连续多个请求之间没有直接的关系，**服务器不会主动保留每次** **HTTP** **请求的状态**。

![image-20230102201741251](http://zimo.aizhaiyu.com/assets/img/8.1.4d4ef9ba.png)

#### 5.**如何突破** **HTTP** **无状态的限制**

对于超市来说，为了方便收银员在进行结算时给 VIP 用户打折，超市可以为每个 VIP 用户发放会员卡。

![image-20230102201818860](http://zimo.aizhaiyu.com/assets/img/8.2.021ba82c.png)

注意：现实生活中的**会员卡身份认证方式**，在 Web 开发中的专业术语叫做 **Cookie**。

#### 6.**什么是** **Cookie**

Cookie 是**存储在用户浏览器中的一段不超过** **4 KB** **的字符串**。它由一个名称（Name）、一个值（Value）和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成。

不同域名下的 Cookie 各自独立，每当客户端发起请求时，会**自动**把**当前域名下**所有**未过期的** **Cookie** 一同发送到服务器。

**Cookie**的几大特性：

① 自动发送

② 域名独立

③ 过期时限

4KB 限制

#### 7.**Cookie** **在身份认证中的作用**

客户端第一次请求服务器的时候，服务器**通过响应头的形式**，向客户端发送一个身份认证的 Cookie，客户端会自动将 Cookie 保存在浏览器中。

随后，当客户端浏览器每次请求服务器的时候，浏览器会**自动**将身份认证相关的 Cookie，**通过请求头的形式**发送给服务器，服务器即可验明客户端的身份。

![image-20230102202005438](http://zimo.aizhaiyu.com/assets/img/8.3.8dc8e19f.png)

#### **8 .Cookie** 不具有安全性

由于 Cookie 是存储在浏览器中的，而且**浏览器也提供了读写** **Cookie** **的** **API**，因此 **Cookie** **很容易被伪造**，不具有安全性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。

![image-20230102202105064](http://zimo.aizhaiyu.com/assets/img/8.5.330eedfa.png)

**注意：****千万不要使用** **Cookie** **存储重要且隐私的数据**！比如用户的身份信息、密码等。

#### 9.提高身份认证的安全性

为了防止客户伪造会员卡，收银员在拿到客户出示的会员卡之后，可以**在收银机上进行刷卡认证**。只有收银机确认存在的会员卡，才能被正常使用。

![image-20230102202208237](http://zimo.aizhaiyu.com/assets/img/8.6.e7d95928.png)

这种“**会员卡** **+** **刷卡认证**”的设计理念，就是 Session 认证机制的精髓。

#### 10.**Session** 的工作原理

![image-20230102202251486](http://zimo.aizhaiyu.com/assets/img/8.7.1e9bd359.png)

### **3.Express** **中使用** **Session** **认证**

#### 1.**安装** **express-session** **中间件**

在 Express 项目中，只需要安装 express-session 中间件，即可在项目中使用 Session 认证：

![image-20230102202350852](http://zimo.aizhaiyu.com/assets/img/8.8.d68d163b.png)

#### 2.**配置** **express-session** **中间件**

express-session 中间件安装成功后，需要通过 app.use() 来注册 session 中间件，示例代码如下：

![image-20230102202429838](http://zimo.aizhaiyu.com/assets/img/8.9.3badfe01.png)

#### 3.**向** **session** **中****存数据**

当 express-session 中间件配置成功后，即可通过 **req.session** 来访问和使用 session 对象，从而存储用户的关键信息

![image-20230102202506329](http://zimo.aizhaiyu.com/assets/img/8.10.6c3bc5da.png)

#### 4.**从** **session** **中****取数据**

可以直接从 **req.session** 对象上获取之前存储的数据，示例代码如下：

![image-20230102202608400](http://zimo.aizhaiyu.com/assets/img/8.11.2be8ae55.png)

#### 5.**清空** **session**

调用 **req.session.destroy\****()** 函数，即可清空服务器保存的 session 信息。

![image-20230102202646981](http://zimo.aizhaiyu.com/assets/img/8.12.5a662131.png)

### 4.**JWT** **认证机制**

#### **1.** **了解** **Session** 认证的局限性

Session 认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，**需要做很多额外的配置**，才能实现跨域 Session 认证。

注意：

当前端请求后端接口**不存在跨域问题**的时候，**推荐使用** **Session** 身份认证机制。

当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制。

#### **2.** **什么是** **JWT**

JWT（英文全称：JSON Web Token）是目前**最流行**的**跨域认证解决方案**。

#### 3.**JWT** 的工作原理

![image-20230102202805283](http://zimo.aizhaiyu.com/assets/img/8.13.1f88f807.png)

总结：用户的信息通过 Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。

#### **4. JWT** 的组成部分

JWT 通常由三部分组成，分别是 Header（头部）、Payload（有效荷载）、Signature（签名）。

三者之间使用英文的“.”分隔，格式如下：

![image-20230102202902601](http://zimo.aizhaiyu.com/assets/img/8.14.aad6d892.png)

下面是 JWT 字符串的示例

![image-20230102202922980](http://zimo.aizhaiyu.com/assets/img/8.15.3fc520d6.png)

#### 5.**JWT** 的三个部分各自代表的含义

JWT 的三个组成部分，从前到后分别是 Header、Payload、Signature。

其中：

l **Payload** 部分**才是真正的用户信息**，它是用户信息经过加密之后生成的字符串。

l Header 和 Signature 是**安全性相关**的部分，只是为了保证 Token 的安全性。

![image-20230102203001965](http://zimo.aizhaiyu.com/assets/img/8.16.31a7ed3c.png)

#### 6.**JWT** 的使用方式

客户端收到服务器返回的 JWT 之后，通常会将它储存在 localStorage 或 sessionStorage 中。

此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串，从而进行身份认证。推荐的做法是**把** **JWT** **放在** **HTTP** **请求头的** **Authorization** **字段中**，格式如下：

![image-20230102203052928](http://zimo.aizhaiyu.com/assets/img/8.17.62c819c9.png)

#### 7.**安装** **JWT** **相关的包**

运行如下命令，安装如下两个 JWT 相关的包：

![image-20230102203130517](http://zimo.aizhaiyu.com/assets/img/8.18.28219242.png)

其中：

**jsonwebtoken** 用于**生成** **JWT** **字符串**

**express-\**\**jwt\** 用于**将** **JWT** **字符串解析还原成** **JSON** **对象**

#### 8.**导入** **JWT** **相关的包**

使用 **require()** 函数，分别导入 JWT 相关的两个包：

![image-20230102203206243](http://zimo.aizhaiyu.com/assets/img/8.19.28f08e0e.png)

#### 9.**定义** **secret** **密钥**

为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于**加密**和**解密**的 secret 密钥：

① 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串

② 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密

![image-20230102203245932](http://zimo.aizhaiyu.com/assets/img/8.20.7e1e4c01.png)

#### 10.**在登录成功****后生成** **JWT** **字符串**

调用 **jsonwebtoken** 包提供的 **sign()** 方法，将用户的信息加密成 JWT 字符串，响应给客户端：

![image-20230102203311642](http://zimo.aizhaiyu.com/assets/img/8.21.560f6734.png)

#### 11.**将** **JWT** 字符串还原为 **JSON** **对象**

客户端每次在访问那些有权限接口的时候，都需要主动通过**请求头中的** **Authorization** **字段**，将 Token 字符串发送到服务器进行身份认证。

此时，服务器可以通过 **express-****jwt** 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象：

![image-20230102203416522](http://zimo.aizhaiyu.com/assets/img/8.22.fce058a5.png)

#### 12.**使用** **req.user** **获取用户信息**

当 express-jwt 这个中间件配置成功之后，即可在那些有权限的接口中，使用 **req.user** 对象，来访问从 JWT 字符串中解析出来的用户信息了，示例代码如下：

![image-20230102203448875](http://zimo.aizhaiyu.com/assets/img/8.23.747a1012.png)

#### 13.**捕获解析** **JWT** **失败后产生的错误**

当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串**过期**或**不合法**，会产生一个**解析失败**的错误，影响项目的正常运行。我们可以通过 **Express** **的错误中间件**，捕获这个错误并进行相关的处理，示例代码如下：

![image-20230102203521521](http://zimo.aizhaiyu.com/assets/img/8.24.93bdd2bd.png)