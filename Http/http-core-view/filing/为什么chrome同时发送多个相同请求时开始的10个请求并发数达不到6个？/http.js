const { createServer } = require("http");

createServer(function (req, res) {
  setTimeout(() => {
    res.writeHead(200, {
      "Content-type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      // "Cache-Control": "Cache-control" // 设置Cache-Control会解决浏览器的同请求缓存锁问题
    });
    res.write(
      JSON.stringify({
        errno: 0,
        message: "",
        data: true,
      })
    );
    res.end();
  }, 2000);
}).listen(3000, () => {
  console.log("server in listen on 3000");
});
