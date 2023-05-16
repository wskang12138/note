## 描述信息

chrome 浏览器针对于同一个 api 请求地址，同时发送多个请求，最开始的请求发送与预想的浏览器同源 tcp 连接限制 6 个不一致。具体表现为**最开始的 10 个请求，会依此执行，等一个 tcp 断开之后才会发起下一个 tcp 请求**

如果给请求增加任意的不同请求参数，则不会出现此现象，会直接触发浏览器的最大同源并发策略，比如 http1.1 最大 6 个

## 具体产生原因

> chrome 相同请求 Stalled 时间过长

谷歌浏览器针对于相同请求会有一个缓存锁，用来防止相同请求资源的错误加载。

## 解决方案

[设置 Cache-Control 或者 devtool network 勾上 disable cache](https://stackoverflow.com/questions/27513994/chrome-stalls-when-making-multiple-requests-to-same-resource#comment48688998_27513994)
