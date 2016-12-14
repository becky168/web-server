var express = require("express");
var app = express(); //建立Express個體
const PORT = 3000;

var middleware = {
    requireAuthentication: function (req, res, next) {
        console.log("private route hit");
        next();
    },
    logger: function (req, res, next) {
        console.log("Request: " + new Date().toString() + " " + req.method + " " + req.originalUrl);
        next();
    }
};

// app.get("/", function (req, res) {
//     res.send("Hello Express!");
// });

app.use(middleware.logger);

// app.get("/about", function (req, res) {
//     res.send("About Us");
// });
// app.use(middleware.requireAuthentication);
app.get("/about", middleware.requireAuthentication, function (req, res) {
    res.send("About Us");
});

app.use(express.static(__dirname + "/public"));
// 如果要提供影像、CSS 檔案和 JavaScript 檔案等之類的靜態檔案，
// 請使用 Express 中的 express.static 內建中介軟體函數。
// app.use([path,] callback [, callback...])
// Mounts the specified middleware function or functions at the 
// specified path: the middleware function is executed when the 
// base of the requested path matches path.

app.listen(PORT, function () {
    console.log("Express server started on port " + PORT + "!");
});