const { createSecureServer } = require("http2");
const fs = require("fs");
const path = require("path");
const url = require("url");
createSecureServer(
  {
    key: fs.readFileSync(
      path.resolve(__dirname, "./../cert/www.dingshiyi.cn.key")
    ),
    cert: fs.readFileSync(
      path.resolve(__dirname, "./../cert/www.dingshiyi.cn_bundle.crt")
    ),
  },
  function (req, res) {
    const { pathname } = url.parse(req.url);
    setTimeout(() => {
      let _end = null;
      switch (pathname) {
        case "/":
          res.statusCode = 200;
          return res.end(
            fs.readFileSync(path.resolve(__dirname, "./../../index.html"))
          );

        case "/serviceWorker.js":
          res.writeHead(200, {
            "Content-Type": "application/javascript",
          });
          _end = res.end(
            fs.readFileSync(path.resolve(__dirname, "./../../serviceWorker.js"))
          );
          break;
        default:
          res.writeHead(200, {
            "Content-Type": "application/json;charset=utf-8",
          });
          _end = JSON.stringify({
            data: null,
            errno: 0,
          });
          break;
      }
      setTimeout(() => {
        res.end(_end);
      }, 2000);
    }, 0);
  }
).listen(8000, () => {
  console.log("server in listen on 8000");
});
