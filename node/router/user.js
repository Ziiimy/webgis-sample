var express = require('express');
var pg = require('pg');
var router = express.Router()

//数据库配置
var conString = "postgres://postgres:zjmzjm@localhost/dbtest"; //tcp://用户名：密码@localhost/数据库名


//sql语句
selectSQLString = 'SELECT * FROM users WHERE name = $1';
insertSQLString = 'INSERT INTO users (name, password, tel) VALUES ($1, $2, $3); '
//客户端连接，进行数据插入

router.get('/get', function (req, res) {
    var id = req.query.id;
    var client = new pg.Client(conString);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('clientConnection Error:' + isErr.message);
            client.end();
            return;
        }
        console.log('connection success...\n');
        client.query(selectSQLString, [id], function (isErr, results) {
            if (isErr) {
                res.send({
                    status: 'fail',
                    data: results.rows
                });
                console.log('query Error' + isErr.message)
            } else {
                console.log('query success...\nresults is' + results);
                res.send({
                    status: 'success',
                    data: results.rows
                });
            }
            client.end();
        })


    });
});

router.post('/register', function (req, res) {
    var id = req.body.id;
    var password = req.body.password;
    var tel = req.body.tel;
    var client = new pg.Client(conString);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('clientConnection Error:' + isErr.message);
            client.end();
            return;
        }
        console.log('connection success...\n');
        client.query(insertSQLString, [id, password, tel], function (isErr, results) {
            if (isErr) {
                res.send({
                    status: 'fail',
                    message: 'insert error'
                });
                console.log('query Error' + isErr.message)
            } else {
                console.log('query success...\nresults is' + results);
                res.send({
                    status: 'success',
                    message: 'insert success'
                });
            }
            client.end();
        })


    });
});

module.exports = router;