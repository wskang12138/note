# [webxue](http://webxue.cn/)

### Fetch请求的简易封装

>Fetch请求是原生JavaScript基于Promise封装的请求方式，请注意低版本浏览器的兼容问题。

Fetch请求是原生JavaScript基于Promise封装的请求方式，请注意低版本浏览器的兼容问题

```js
// 获取接口返回数据
const fetchRequest = (option = {}) => {
    const defaultOpt = {
      // 请求地址
      url: "",
      // 请求方式
      method: "get",
      // 请求头信息
      headers: {},
      // 其他参数
      other: {},
      // 接口参数
      data: {}
    }

// 参数整合
option = Object.assign({}, defaultOpt, option);

// fetch请求参数
const fetchOption = {
  headers: option.headers,
  method: option.method,
  ...option.other
};

// 处理请求方式
if (option.method.toLowerCase() == "get") {
  // get方法将参数拼接在url后面
  const values = Object.values(option.data);
  const keys = Object.keys(option.data);
  const arr = [];
  for (let i = 0; i &lt; values.length; i++) {
    arr.push(`${keys[i]}=${values[i]}`)
  }
  const str = arr.join("&amp;");
  option.url += `?${str}`;
} else if (option.method.toLowerCase() == "post") {
  // post请求将参数转为JSON字符串传给body
  fetchOption.body = JSON.stringify(option.data);
}

// 请求方法
const fetchData = await fetch(option.url, fetchOption);
const response = await fetchData.json();
return response;
}
```

```js
// 调用
const res = await fetchRequest({
    url:"
https://xxx.com/api/xxx
"
})
```

**微信授权登录，uniapp微信授权登录，wap2app微信授权登录，h5plus微信授权登录**

```js
uni.login({
    provider: 'weixin',
    success: function(loginRes) {
        // uniapp为我们封装了微信登陆，loginRes参数里含有我们需要的openid,unionid,access_token等参数
        let openid = loginRes.authResult.openid;
        let unionid = loginRes.authResult.unionid;
        let access_token = loginRes.authResult.access_token;
        if(unionid){
            // 我们拿到openid、unionid、access_token等参数之后调用后端接口传给后端需要的参数
            // 编写我们的业务逻辑
            // openid,access_token,unionid
        }else{
            // unionid在某些情况下是不存在的【当且仅当该移动应用已获得该用户的 userinfo 授权时，才会出现该字段】(文档中的原话)
            // 所以这里使用原生xhr请求获取unionid
            let xhr = new plus.net.XMLHttpRequest();
            // 传给微信服务器openid和access_token来获取unionid
            xhr.open( "GET", "https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+openid );
            xhr.send();
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4 && xhr.status == 200){
                    let res = JSON.parse(xhr.responseText)
                    unionid = res.unionid;
                    // 这里我们就可以拿到openid、unionid、access_token等参数
                    // 然后调用后端接口传给后端需要的参数来编写我们的业务逻辑
                    // openid,access_token,unionid
                }else if(xhr.readyState == 4 && xhr.status != 200){
                    // console.log( "请求失败："+xhr.readyState );
                    uni.showToast({
                        title: '微信登录出错',
                        icon: 'none'
                    })
                }
            }
        }
    },
    fail: function() {
        uni.showToast({
            title: '微信登录出错',
            icon: 'none'
        })
    }
});
```

**Wap2APP(使用的是H5+API)(APP端)**

```js
// 第一步先获取微信服务
plus.oauth.getServices( function(services){
    var wx = null;
    // 遍历所有的服务列表,获取到微信服务
    for(var i = 0;i<services.length;i++){
        if(services[i].id == 'weixin'){
            wx = services[i];
            break;
        }
     }
     // 如果没有微信服务,检查一下前提【manifest.json是否配置】
     if(!wx){
        plus.nativeUI.alert('当前环境不支持微信登陆');
        return false;
     }
     // 第二步获取微信授权
     wx.authorize(function(event){
         // plus.nativeUI.alert("授权成功："+JSON.stringify(event));
         if(!wx.authResult){
             // 第三步微信登录
             wx.login(function(res){
                 // 这里res参数同样包含有后端需要的参数
                 var access_token = res.target.authResult.access_token;
                 var openid = res.target.authResult.openid;
                 var unionid = res.target.authResult.unionid;
                 var data = {
                     openid:openid,
                     access_token:access_token,
                     unionid:unionid
                 }
                 // 但同样有些情况unionid是获取不到的,所以使用原生xhr请求传入access_token和openid获取unionid
                 if(!data.unionid){
                     var xhr = new plus.net.XMLHttpRequest();
                     xhr.open( "GET", "https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+openid );
                     xhr.send();
                     xhr.onreadystatechange = function () {
                         if(xhr.readyState == 4 && xhr.status == 200){
                             let res = JSON.parse(xhr.responseText)
                             data.unionid = res.unionid;
                             // 这里就拿到了unionid
                             // 接下来编写业务逻辑
                         }else if(xhr.readyState == 4 && xhr.status != 200){
                             console.log( "请求失败："+xhr.readyState );
                         }
                     }
                  }else{
                     data.unionid = res.target.authResult.unionid;
                     // 这里拿到了login时候的unionid
                     // 接下来编写业务逻辑
                  }
                }, function(e){
                   plus.nativeUI.alert("登录认证失败:"+JSON.stringify(e));
                } );
            }else{
                plus.nativeUI.alert("已经授权认证!");
            }
        }, function(err){
            plus.nativeUI.alert("授权失败");
        }, {
            scope:'snsapi_userinfo'
        });
    }, function(e){
        plus.nativeUI.alert("获取服务列表失败："+e.message+" - "+e.code);
    } );
```

**解决IOS右滑返回上一页空白的问题，H5+Plus禁止IOS右滑返回上一级**

```js
document.addEventListener('plusready', function() {
    // 禁止ios右滑返回(右滑显示空白页)
    plus.webview.currentWebview().setStyle({
        'popGesture': 'none'
        });
}, false)
```











### Nodejs依赖multiparty上传图片、nodejs上传图片出现unsupported content-type

首先肯定需要先下载依赖包npm install multiparty -s然后引入const multiparty = require('multiparty');router.post('/upload',(req,res)=&gt;{ //注意：这里必须事先定义静态资源路径，不懂得下方有联系方式可以问我 let form = new multiparty.Form({ uploadDir:'./upload/' }); //该模块主要是

```bash
npm install multiparty -s
```

然后引入

```bash
const multiparty = require('multiparty');
```

```js
router.post('/upload',(req,res)=>{
    //注意：这里必须事先定义静态资源路径，不懂得下方有联系方式可以问我
    let form = new multiparty.Form({
        uploadDir:'./upload/'
    });
    //该模块主要是对前端传过来的file做一个formData的处理
    form.parse(req,(err,fields,file) => {
        if(err){
            res.json({code:0,msg:
上传失败,失败原因${err.message}
})
            return false;
        }
        let imgUrl =  file.file[0].path;//本地路径
        let msg = '上传成功';
        res.send({code:1,msg,imgUrl})
    });
})
```



前端上传

```js
<!--必须声明 multipart/form-data -->
<form action="http://localhost:8003/api/upload/test" method="post" enctype="multipart/form-data">
    <input type="file" name="file" id="">
    <input type="submit" value="上传">
</form>
```

**Nodejs怎样定时任务，自动备份MongoDB数据库，并记录日志**

安装模块 `npm install node-schedule -S`

```js
const schedule = require('node-schedule');//引入定时任务模块
```

```js
function scheduleCronstyle(){
    schedule.scheduleJob('10 * * * * *', function(){
        console.log('scheduleCronstyle:' + new Date());//定时执行内容
    });
}
scheduleCronstyle();
```



```js
*  *  *  *  *  *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ |
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

打开CMD执行命令

安装模块 `npm install child_process -S`

```js
const process = require('child_process');//引入cmd模块
const cmd = 'ipconfig';//cmd执行内容
```

```js
process.exec(cmd, function(error, stdout, stderr) {
    if (error) {
        console.log('Error:'+ error);//失败
    } else if (stderr.lenght > 0) {
        console.log('Stderr:'+stderr.toString())//标准错误输出
    } else {
        console.log('Success')//成功
    }
});
```

**日志写入**

**安装模块 `npm i fs -S`**

使用方法

```js
const fs = require('fs');//引入fs模块
```

```js
let year = (new Date()).getFullYear();//获取年
let month = ((new Date()).getMonth()+1) > 9 ? ((new Date()).getMonth()+1) : '0' + ((new Date()).getMonth()+1);//获取月
let date = (new Date()).getDate() > 9 ? (new Date()).getDate() : '0' + (new Date()).getDate();//获取日
let hour = (new Date()).getHours() > 9 ? (new Date()).getHours() : '0' + (new Date()).getHours();//获取时
let minute = (new Date()).getMinutes() > 9 ? (new Date()).getMinutes() : '0' + (new Date()).getMinutes();//获取分
let seconds = (new Date()).getSeconds() > 9 ? (new Date()).getSeconds() : '0' + (new Date()).getSeconds();//获取秒
let str = 
${year}-${month}-${date} ${hour}:${minute}:${seconds} 备份

fs.writeFile(path,
\n${str}
, {flag:'a+'},(err) =>{  //path指的是存储文件路径,如: C:\backup\[数据库名]\.log  我这里存储在备份数据库目录下
    if(err){
        console.log(err)
    }
})
```

[详情](https://blog.csdn.net/qq_41980461/article/details/106709505)

**总结**

```js
const schedule = require('node-schedule');//引入定时任务模块
const process = require('child_process');//引入cmd模块
const fs = require('fs');//引入fs模块

//cmd执行内容
//数据库地址及端口 如:127.0.0.1:27017
//要备份的数据库名称 如:test
//备份路径如:C:\backup
const cmd = 'mongodump -h [数据库地址:端口] -d [要备份的数据库名称] -o [备份路径]';


function scheduleCronstyle(){
    schedule.scheduleJob('0 0 23 * * 7', function(){  //每周日的23时整
        process.exec(cmd, function(error, stdout, stderr) {  //在cmd中执行上方定义的命令
            if (error) {
                console.log('Error:'+ error); //错误
            } else if (stderr.lenght > 0) {
                console.log('Stderr:'+stderr.toString())  //标准性错误
            } else {
                //成功之后写入日志
                let year = (new Date()).getFullYear();//获取年
                let month = ((new Date()).getMonth()+1) > 9 ? ((new Date()).getMonth()+1) : '0' + ((new Date()).getMonth()+1);//获取月
                let date = (new Date()).getDate() > 9 ? (new Date()).getDate() : '0' + (new Date()).getDate();//获取日
                let hour = (new Date()).getHours() > 9 ? (new Date()).getHours() : '0' + (new Date()).getHours();//获取时
                let minute = (new Date()).getMinutes() > 9 ? (new Date()).getMinutes() : '0' + (new Date()).getMinutes();//获取分
                let seconds = (new Date()).getSeconds() > 9 ? (new Date()).getSeconds() : '0' + (new Date()).getSeconds();//获取秒
                let str = 
${year}-${month}-${date} ${hour}:${minute}:${seconds} 备份

                fs.writeFile(path,
\n${str}
, {flag:'a+'},(err) =>{ //path 为存储路径 如:C:\backup\[数据库名]\.log  我这里存储在备份数据库目录下
                    if(err){
                        console.log(err)
                    }
                })
            }
        });
    });
}
```

```js
scheduleCronstyle();
```

**最后在终端中使用node执行该js文件就可以定时备份数据库并记录备份时间**



### HTTPS配置，SSL证书配置



**Appache服务器：**https://help.aliyun.com/knowledge_detail/95493.html

**Tomcat服务器：**https://help.aliyun.com/knowledge_detail/95496.html

**Nginx服务器：**https://help.aliyun.com/knowledge_detail/95491.html

**IIS服务器：**https://help.aliyun.com/knowledge_detail/95502.html



### Nginx配置二级域名

**前言**

昨天我的域名[webxue.cn](http://webxue.cn/article/webxue.cn)备案成功,今天就迫不及待地来解析,来这里记录一下解析过程

**过程**

**DNS解析**

第一步当然是需要前往`域名管理后台`,将你的`域名`解析到你的`服务器`,我这里在`万网`购买的域名,所以就登录[阿里云域名管理后台](https://dns.console.aliyun.com/#/dns/domainList)进行解析.

![img](https://i.328888.xyz/2023/04/26/ivrkYP.png)

选择`添加记录`开始解析

![img](https://i.328888.xyz/2023/04/26/ivrOmA.png)

![img](https://i.328888.xyz/2023/04/26/ivr7yL.png)

`记录类型`这里我们选择 `A` 类型,用来将域名解析到服务器的`80`端口

```
记录值`我们填写服务器的`ip地址
主机记录`这里如果填写 `@` 则指的是解析 `一级域名`,如果填写`其他`,则表示解析 `二级域名
```

从上图中也可以看到我解析了一个 `webxue.cn` 和 `tst.webxue.cn`

**Nginx配置**

这时我进入服务器,我的服务器是`centos`,``置x`在`/etc/nginx`下

![img](https://i.328888.xyz/2023/04/26/iv3EJc.png)

然后进入`conf.d`目录

```bash
cd /etc/nginx/conf.d
ls
```

这里面有一个 `default.conf`

![img](https://i.328888.xyz/2023/04/26/ivRNCq.png)

接下来在 `default.conf` 中配置 `一级域名`, 一级域名我是通过 `反向代理` 实现, 所以只需要关注 `server_name` 和 `proxy_pass` 即可

`server_name` 需要跟访问域名一致, 所以我这里是 `webxue.cn`
`proxy_pass` 是服务器上运行的服务, 当访问这个域名的时候代理到服务器上的这个服务
![img](https://i.328888.xyz/2023/04/26/ivcQp5.png)

这个 `一级域名` 就配置好了

**二级域名**

这时配置二级域名, 使用 `cp` 命令将 `default.conf` 复制一份出来, 命名为 `tst.webxue.cn.conf`

```bash
cp default.conf ./tst.webxue.cn.conf
ls
```

![img](https://i.328888.xyz/2023/04/26/ivpAVk.png)

然后配置 `tst.webxue.cn.conf`
![img](https://i.328888.xyz/2023/04/26/ivpeld.png)

这里我们同样只需要关注 `server_name` 和 `location`
`server_name` 与二级域名一致, 所以这里是 `tst.webxue.cn`
`location` 下配置 `root` 和 `index`

- `root` 指的是这个域名访问到哪个目录
- `index` 指的是默认访问这个目录下的哪个文件, 这里就是 `index.html`

**最后**

在 `linux` 中我们通常使用 `esc` 进入文件命令, 执行 `:wq` 用来保存并退出当前文件, 然后我们执行下列命令重启 `nginx` , 接下来你的两个域名都可以正常访问, 并且访问不同项目了

```bash
nginx -s reload
```

**结语**

我是一名前端程序员, 但不止于前端, 如果文章有帮助到你, 欢迎常来常往, 如果你觉得哪里欠妥, 欢迎评论区讨论, 一起学习, 一起进步~, 最后, 再次感谢你能看到此处!