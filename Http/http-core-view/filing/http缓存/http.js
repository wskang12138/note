const { createServer } = require("http");
const url = require("url");
const fs = require("fs");
const { resolve } = require("path");
const crypto = require("crypto");

createServer(function (req, res) {
  setTimeout(() => {
    const { pathname } = url.parse(req.url);
    console.log(req.method, req.url);
    let _return = null;
    switch (pathname) {
      case "/":
        const data = fs.readFileSync(resolve(__dirname, "index.html"));
        return res.end(data);
      case "/Expires.png": // 强制缓存
        res.writeHead(200, {
          // Expires强制缓存过期时间（绝对时间）
          Expires: new Date(Date.now() + 1000 * 3600).toUTCString(),
        });
        _return = fs.readFileSync(
          resolve(__dirname, "../../assets/cache-Expires.png")
        );
        break;
      case "/MaxAge.png": // 强制缓存
        res.writeHead(200, {
          "Cache-Control": "max-age=2000",
        });
        _return = fs.readFileSync(
          resolve(__dirname, "../../assets/cache-MaxAge.png")
        );
        break;
      case "/LastModified.png": // 协商缓存 last-modified
        const { mtime } = fs.statSync(
          resolve(__dirname, "../../assets/cache-LastModified.png")
        );
        const ifModifiedSince = req.headers["if-modified-since"];
        if (ifModifiedSince === mtime.toUTCString()) {
          res.statusCode = 304;
          return res.end();
        }

        res.setHeader("last-modified", mtime.toUTCString());
        res.setHeader("Cache-Control", "no-cache");
        _return = fs.readFileSync(
          resolve(__dirname, "../../assets/cache-LastModified.png")
        );
        break;
      case "/Etag.png": // ETag
        const fileHash = crypto
          .createHash("sha256")
          .update(
            fs.readFileSync(resolve(__dirname, "../../assets/cache-Etag.png"))
          )
          .digest("base64");
        const etag = req.headers["if-none-match"];
        if (etag === fileHash) {
          res.statusCode = 304;
          return res.end();
        }

        res.writeHead(200, {
          Etag: fileHash,
        });
        _return = fs.readFileSync(
          resolve(__dirname, "../../assets/cache-Etag.png")
        );
        break;
      default:
        res.statusCode = 404;
    }
    setTimeout(() => {
      res.end(_return);
    }, 2000);
  }, 0);
}).listen(3000, () => {
  console.log("server in listen on 3000");
});
