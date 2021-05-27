var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();

// 添加用户喜欢的视频
router.post('/addUserLike', (req, res) => {
    var sql = $sql.userlike.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.userID, params.avatarUrl, params.nickname, params.videoID, params.videoUrl, params.videoTitle, params.videoDesc],
        function (err, result) {
            console.log(err);
            if (err) {
                console.log(err);
                return res.status(200).json({
                    code: 404,
                    msg: '关注失败!'
                });
            }
            if (result) {
                console.log(result);
                return res.status(200).json({
                    code: 200,
                    msg: '关注成功!'
                });
            }
        })
});

//取消点赞
router.post('/deleteUserLike', (req, res) => {
    var sql = $sql.userlike.delete;
    var params = req.body;
    sql += " where userID = '" + params.userID + "'" +
        " and videoID = '" + params.videoID + "'"
    conn.query(sql,
        function (err, result) {
            console.log(err);
            if (err) {
                return res.status(200).json({
                    code: 404,
                    msg: '取消关注失败!'
                });
            }
            if (result) {
                return res.status(200).json({
                    code: 200,
                    msg: '取消关注成功!'
                });
            }
        })
});

//获取喜欢视频
router.post('/getMyLike', (req, res) => {
    var sql = $sql.userlike.select_videoMyLike;
    var params = req.body;
    sql += " where userID = '" + params.userID + "'";
    conn.query(sql,
        function (err, result) {
            console.log(err);
            if (err) {
                return res.status(200).json({
                    code: 404,
                    msg: '获取视频库失败!'
                });
            }
            if (result) {
                let results = JSON.stringify(result);
                results = JSON.parse(results);
                return res.status(200).json({
                    code: 200,
                    msg: '视频库获取成功!',
                    data: results.reverse(),
                });
            }
        })
});

//查看此视频是否为用户喜欢
router.post('/getIfMyLike', (req, res) => {
    var sql = $sql.userlike.select_videoMyLike;
    var params = req.body;
    sql += " where userID = '" + params.userID + "'"
        +  " and videoID = '" + params.videoID + "'";
    conn.query(sql,
        function (err, result) {
            console.log(err);
            if (err) {
                return res.status(200).json({
                    code: 404,
                    msg: '获取失败!'
                });
            }
            if (result) {
                let results = JSON.stringify(result);
                results = JSON.parse(results);
                return res.status(200).json({
                    code: 200,
                    msg: '获取成功!',
                    data: results,
                });
            }
        })
});

module.exports = router;