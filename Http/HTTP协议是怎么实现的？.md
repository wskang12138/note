# HTTP协议是怎么实现的？

## 前言

在上层应用开发中，`HTTP`协议可以说是最常见，使用最频繁的网络协议了。在网上也有非常多的文章进行解读，但是大部分都是讲解`HTTP`协议的内容和使用，很少有人讲`HTTP`协议是怎么实现的。网络协议可以涉及很大的广度和深度，不是一篇文章就能讲清楚的，我这里更多的是提供一个思路供读者来思考。本篇文章会基于`iOS`平台来进行说明，但是并不代表这篇文章只针对`iOS`开发，因为协议是跨平台的，其中涉及到的编程思想也是。本文会分四个部分进行讲解：

1. 第一部分：数据是如何在网络上进行传输的。这部分主要让你对`网络模型`和各层协议有一个基础的了解，如果您对这部分比较了解，可以直接从第二部分看起。
2. 第二部分：`HTTP`协议数据是如何转换为`TCP`数据收发的。
3. 第三部分：`HTTP`协议中`Request`和`Response`的解析和相关逻辑处理。
4. 第四部分：修改`HTTP`底层实现，完成自有需求。



## 数据是如何在网络上进行传输的

数据遵循网络协议进行收发，讲到网络协议，就绕不开`OSI模型`和`TCP/IP参考模型`，它们有不同的层次划分，`OSI模型`分为7层，`TCP/IP参考模型`分为4层。网上有很多将`TCP/IP参考模型`映射到`OSI模型`的说法，由于`TCP/IP参考模型`和`OSI模型`不能精确地匹配，还没有一个完全正确，或者说权威的答案，一般认为的对应关系图示如下：
![img](https://raw.githubusercontent.com/StudyData/ImageHost/master/picgo/20211225201250.png)

HTTP协议属于最上层`应用层`，`网络模型`是比较抽象的，在实际编码时，上层应用的开发者一般只接触到应用层，开发者只需要把一个`HTTP Reques`丢入网络框架，请求完成后就会返回一个`HTTP Response`，但是它的底层是怎么实现的类？我们先看下图：
![img](https://raw.githubusercontent.com/StudyData/ImageHost/master/picgo/20211223163145.png)
从上图我们可以看到HTTP数据是如何在客户端与服务端之间交互的，网络模型虽然很复杂，但是从某个角度看，可以说是”套娃”，在`RFC 1122`中描述的沿着不同的层应用数据的封装递减图示如下：
![img](https://raw.githubusercontent.com/StudyData/ImageHost/master/picgo/20211223151159.png)
上图中最上层的`Data`数据代表应用层协议数据，在`HTTP`协议中，`HTTP`的`request`报文和`response`报文都包含有`header`，`TCP`和`IP`也都有`header`，它们通过层层”套娃”后发送。

现在我们对数据如何通过网络传输稍微有了一个整体的概念，但是细节是不清楚的。从上述内容中，可以看到，`HTTP`数据是转换为`TCP`数据进行传输，对于`传输层`及以下的内容在这里就不做说明，这里主要讲`应用层`的`HTTP数据`是如何通过`传输层`传输的，以及如何解析的。

## `HTTP`协议数据是如何转换为`TCP`数据收发的

一般来讲，各系统都会给用户提供`HTTP`网络框架，例如`iOS`的`NSURLSession`，在系统的`HTTP`网络框架之上，开发者社区又会开发出各种易用版本的封装，例如`AFNetworking`。对上层开发者来说，`HTTP`协议的使用一般就是一个框架封装好的`Request`对象，甚至只是一个`URL`，使用框架请求完成后，返回一个`Response`对象，它的底层实现是隐藏的。

我们都知道，计算机的底层是二进制，数据传输也不例外。要把`Request`对象从主机传输到服务器，那么必须把它转换为二进制，那么它是怎么转换的？又是怎么传输的？

### HTTP协议是怎么转换成二进制的？

网络框架的`Request`对象为了易用性，经过了层层封装，要传输出去，必须将它转换为二进制数据：`Request对象 -> 符合HTTP协议的Request字符串 -> 二进制数据`。

HTTP协议中的请求报文：
![img](https://raw.githubusercontent.com/StudyData/ImageHost/master/picgo/20211223155455.png)
响应报文：
![img](https://raw.githubusercontent.com/StudyData/ImageHost/master/picgo/20211223170116.png)

按照图示请求报文格式，我们可以将`Request`对象转换为符合`HTTP`协议的字符串并转换为字节流。样例代码如下：

```
/// 创建NSURLRequest
NSURL *url = [NSURL URLWithString:@"https://www.baidu.com"];
NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];

/// 将NSURLRequest转换为二进制数据（这里只针对POST和GET请求进行说明）
+ (NSData *)httpRequestDataWithRequest:(NSURLRequest *)request {
    NSMutableString * requestStrFrmt = [NSMutableString string];
    NSURL * url = request.URL;
    NSString *requestURI = url.path;
    //解析请求行
    if ([request.HTTPMethod isEqualToString:@"POST"]) {
        if (!url.path || url.path.length == 0) {
            requestURI = @"/";
        }
    }
    else if ([request.HTTPMethod isEqualToString:@"GET"]) {
        if (url.path.length > 0  && url.query.length > 0) {
            requestURI = [NSString stringWithFormat:@"%@?%@", url.path, url.query];
        } else if (url.path.length > 0) {
            requestURI = url.path;
        } else if (url.query.length > 0) {
            requestURI = url.query;
        } else {
            requestURI = @"/";
        }
    }
    
    [requestStrFrmt appendFormat:@"%@ %@ HTTP/1.1\r\n", request.HTTPMethod, requestURI];
    if ([request.allHTTPHeaderFields objectForKey:@"Host"] == nil) {
        [requestStrFrmt appendFormat:@"Host: %@\r\n", url.host];
    }
    
    //解析请求头
    for (NSString * key in request.allHTTPHeaderFields.allKeys) {
        [requestStrFrmt appendFormat:@"%@: %@\r\n", key, request.allHTTPHeaderFields[key]];
    }
    
    //解析请求数据（body）
    if ([request.HTTPMethod isEqualToString:@"POST"] && request.HTTPBody) {
        [requestStrFrmt appendFormat:@"Content-Length: %@\r\n", @(request.HTTPBody.length)];
        //请求头以两个CRLF结束
        [requestStrFrmt appendString:@"\r\n"];
        NSData *headerData = [requestStrFrmt dataUsingEncoding:NSUTF8StringEncoding];
        NSMutableData * requestData = [NSMutableData dataWithData:headerData];
        [requestData appendData:request.HTTPBody];
        return requestData;
    } else {
        //请求头以两个CRLF结束
        [requestStrFrmt appendString:@"\r\n"];
        return [requestStrFrmt dataUsingEncoding:NSUTF8StringEncoding];
    }
}

/// 打印出NSURLRequest报文的文本数据
NSData *data = [NSData httpRequestDataWithRequest:request];
NSString *requestText = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
NSLog(@"%@", requestText);
```

调用通过上述代码，我们可以得到`request`报文的文本数据。样例：

```
GET / HTTP/1.1
Host: www.baidu.com
```

`response`报文可以参考`request`报文进行分析，为了避免篇幅过长，这里就不再做说明了。

### HTTP二进制数据是怎么传输的？

在各操作系统中，通常会为应用程序提供一组应用程序接口，称为套接字接口（socket API），主要作用就是实行进程间通信和网络编程。大白话就是：套接字是用C语言写成的应用程序开发库，它就是一个库。

套接字中的网络套接字，包含有流式套接字（`SOCK-STREAM`），它使用`TCP`协议来实现字节流的传输。通过`socket`框架，将包含`HTTP`数据的`TCP`字节流发送给服务端，服务端通过`socket`框架拿到包含`HTTP`数据的`TCP`字节流后，根据`HTTP`协议进行解析，解析后又被服务端的HTTP网络框架返回，图示如下：
![img](https://raw.githubusercontent.com/StudyData/ImageHost/master/picgo/20211223163025.png)
上述图示只包含`request`报文部分，并不包含`response`报文部分，由于`response`报文的数据传输和这个并无太大区别，这里就不再做额外说明了。

## `HTTP`协议中`Request`和`Response`的解析和逻辑处理

看到这里，我们对HTTP实现应该有了较明朗的了解，但是这其中还是有一些细节需要补充。
用过`Socket`的同学应该都知道，它基于`TCP`是流式传输，会有`半包`和`粘包`问题。一般通过对数据添加`Header`来解决这些问题。我们知道，`HTTP`数据包含两部分，分别是`Header`和`Body`，`HTTP`协议定义`Header`和`Body`之间包含两个`CRLF`，一个`CRLF`是一个回车加一个换行：`\r\n`。通过这个标识，我们可以从`TCP流`中把`HTTP`数据的`Header`分离出来。然后再解析出`Header`中的`Content-Length`字段，它就是`body`的长度，读取这个长度的内容，就可以把Body解析出来。

> 在HTTP/1.1版本，Body的解析还和Transfer-Encoding字段有关，这里就不讨论了。

当然`HTTP协议`不只是包含数据解析部分，还有很多逻辑控制部分，它的响应头和和请求头中有很多控制字段，例如缓存相关的`Etag`，`Last-Modified`等，和数据压缩相关的`Content-Encoding`，`Accept-Encoding`等。系统的网络框架实现了这些控制字段的逻辑，让用户可以开箱即用。

## 修改`HTTP`底层实现，完成自有需求。

对HTTP上层的修改是很常见的，例如[YTKNewwork](https://github.com/yuantiku/YTKNetwork)就在HTTP协议之上，添加了自定义缓存逻辑，可以通过`cacheTimeInSeconds`方法来控制缓存时间。但是对HTTP底层的修改却比较少见，我对这部分的了解，是基于一个特殊需求。

我们都知道手机可以通过`WiFi`或者`蜂窝网络`通道来收发数据，一般情况下，同时连接WiFi和蜂窝网络时，路由会让流量只走`WiFi`通道。但是对于一些WiFi连接工具软件来讲，需要在`无法上网的WiFi`下进行数据获取，以满足WiFi认证上网的需求，这种情况下`蜂窝网络`是可以访问网络的，那么可以让HTTP请求不走默认的`WiFi`通道，通过`蜂窝网络`来请求数据吗？上层的HTTP网络框架是没有这个功能的，但是底层的`socket`框架却提供这个功能，它可以让数据无视路由，从特定接口收发。我们完全可以在socket之上，自己实现HTTP协议中`request`,`response`的解析和逻辑处理，以达成这个功能的支持。当然对HTTP协议的全量支持是无法承受的开发成本，但是满足自我需求的简单实现还是可以的。我把这功能封装成了一个框架：[XXSocketReqeust](https://github.com/xx-li/XXSocketReqeust)，使用方式如下：

```bash
_manager = [[XXSocketRequestManager alloc] init];
NSURLRequest *request = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:@"https://www.baidu.com"]];
/// 使用XXNetworkInterfaceCellular，这个HTTP请求会无视路由，强制走蜂窝网络通道进行请求。
XXSocketDataTask *task = [_manager dataTaskWithRequest:request viaInterface:XXNetworkInterfaceCellular completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
    NSLog(@"error is :%@\n response is %@", error, response);
    NSLog(@"responseObject: %@", [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding]);
}];
[task start];
```

感兴趣的同学可以[下载](https://github.com/xx-li/XXSocketReqeust.git)看看。

## 后记

很多时候网络协议是高冷的，通用的网络协议为了通用和满足各种需求，是非常复杂的。但是我们完全可以针对自己的业务自制协议，或者对协议进行魔改，以满足自我的需求，这其中的难度并没有你想象中的那么高。

## 参考资料

- [XXSocketReqeust](https://github.com/xx-li/XXSocketReqeust)
- [一篇让你彻底了解 http 请求报文和响应报文的结构](https://xie.infoq.cn/article/6f7af61d2f01eee65cee5fdcf)
- [「查缺补漏」巩固你的HTTP知识体系](https://juejin.cn/post/6857287743966281736)
- [网络套接字](https://zh.wikipedia.org/wiki/網路插座)
- [互联网协议套件](https://zh.wikipedia.org/wiki/TCP/IP协议族#TCP/IP参考模型)
- [OSI 7层模型和TCP/IP 4层模型](https://zhuanlan.zhihu.com/p/32059190)

原文链接：https://blog.devlxx.com/2021/12/23/HTTP%E5%8D%8F%E8%AE%AE%E6%98%AF%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0%E7%9A%84%EF%BC%9F/

示例：https://github.com/xx-li/XXSocketReqeust