var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function (res, result) {
    if (typeof result === 'undefined') {
        res.send('err');
    } else {
        res.send(result);
    }
}

// 增加用户接口
router.post('/register', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    conn.query(sql, [params.userID, params.password,
            params.avatarUrl, params.nickname, params.age, params.email, params.introduction
        ],
        function (err, result) {
            console.log(err);
            if (err) {
                return res.status(200).json({
                    code: 404,
                    msg: '注册失败!'
                });
            }
            if (result) {
                return res.status(200).json({
                    code: 200,
                    msg: '注册成功!'
                });
            }
        })
});

//查找用户接口
router.post('/login', (req, res) => {
    var sql_userID = $sql.user.select_userID;
    var params = req.body;
    if (params.userID) {
        sql_userID += " where userID ='" + params.userID + "'";
    }
    conn.query(sql_userID, params.userID, function (err, result) {
        if (err) {
            return res.status(200).json({
                code: 404,
                msg: '登录失败!'
            });
        }
        if (result[0] === undefined) { //查询不出userID，data 返回400
            return res.status(200).json({
                code: 400,
                msg: '账号不存在，请注册账号!'
            });
        } else {
            var resultArray = result[0];
            if (resultArray.password === params.password) {
                return res.status(200).json({
                    code: 200,
                    msg: '登录成功!'
                });
            } else {
                return res.status(200).json({
                    code: 0,
                    msg: '密码错误!'
                });
            }
        }
    })
});

//获取用户信息
router.post('/getUser', (req, res) => {
    var select_user = $sql.user.select_userID;
    var params = req.body;
    if (params.userID) {
        select_user += " where userID ='" + params.userID + "'";
    }
    conn.query(select_user, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(200).json({
                code: 404,
                msg: '信息获取失败!'
            });
        }
        if (result[0] === undefined) {
            return res.status(200).json({ //找不到用户
                code: 400,
                msg: '信息获取失败!'
            });
        } else {
            return res.status(200).json({
                code: 200,
                msg: '获取信息成功!',
                data: {
                    userID: params.userID,
                    avatarUrl: result[0].avatarUrl,
                    nickname: result[0].nickname,
                    password: result[0].password,
                    email: result[0].email,
                    desc: result[0].introduction,
                    id: result[0].id,
                }
            });
        }
    })
});

//更新用户信息
router.post('/updateUser', (req, res) => {
    var sql_update = $sql.user.update_user;
    var params = req.body;
    if (params.userID) {
        sql_update += " password='" + params.password +
            "', avatarUrl='" + params.avatarUrl +
            "', nickname='" + params.nickname +
            "', email='" + params.email +
            "', introduction='" + params.desc +
            "' where id='" + params.id + "'";
    }
    conn.query(sql_update, params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(200).json({ //找不到用户
                code: 404,
                msg: '更新失败!'
            });
        }
        if (result.affectedRows === undefined) {
            return res.status(200).json({ //找不到用户
                code: 400,
                msg: '更新失败!'
            });
        } else {
            return res.status(200).json({
                code: 200,
                msg: '更新成功!'
            });
        }
    })
});


module.exports = router;