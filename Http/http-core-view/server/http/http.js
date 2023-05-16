const { createServer } = require("http");
const url = require("url");
const fs = require("fs");
const { resolve } = require("path");
const crypto = require("crypto");

createServer(function (req, res) {
  setTimeout(() => {
    const { pathname } = url.parse(req.url);
    let _return = null;
    switch (pathname) {
      case "/":
        const data = fs.readFileSync(resolve(__dirname, "../../index.html"));
        return res.end(data);
      case "/Etag.png":
        res.statusCode = 200;
        _return = fs.readFileSync(
          resolve(__dirname, "../../assets/cache-Etag.png")
        );
        break;
      default:
        res.statusCode = 404;
    }
    setTimeout(() => {
      res.end(_return);
    }, 0);
  }, 0);
}).listen(3000, () => {
  console.log("server in listen on 3000");
});
