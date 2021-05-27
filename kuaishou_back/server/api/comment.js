var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();

// 添加视频
router.post('/addComment', (req, res) => {
    var sql = $sql.comment.add;
    var params = req.body;
    conn.query(sql, [params.userID, params.avatarUrl, params.videoID, params.nickname, params.comment],
        function (err, result) {
            console.log(err);
            if (err) {
                return res.status(200).json({
                    code: 404,
                    msg: '评论发表失败!'
                });
            }
            if (result) {
                return res.status(200).json({
                    code: 200,
                    msg: '评论成功!'
                });
            }
        })
});

// 获取评论
router.post('/getAllComments', (req, res) => {
    var sql = $sql.comment.select_allComments;
    var params = req.body;
    sql += " where videoID ='" + params.videoID + "'";
    conn.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(200).json({
                    code: 404,
                    msg: '评论获取失败!'
                });
            }
            if (result) {
                let results = JSON.stringify(result);
                results = JSON.parse(results);
                results = results.reverse();
                return res.status(200).json({
                    code: 200,
                    msg: '评论获取成功!',
                    data: results,
                });
            }
        })
});

module.exports = router;