var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./router/user')
var homepage = require('./router/homepage')

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");

    next();
});
app.use(bodyParser.urlencoded({  //配置这两行代码
    extended: true
}));
app.use(bodyParser.json());      //配置这两行代码
app.use('/user', user)
app.use('/', homepage)

app.listen(3001);



