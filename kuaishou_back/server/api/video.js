var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();

// 添加视频
router.post('/registerVideo', (req, res) => {
    var sql = $sql.video.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.userID, params.videoID,
            params.videoUrl, params.videoTitle, params.videoSort, params.videoDesc
        ],
        function (err, result) {
            console.log(err);
            if (err) {
                return res.status(200).json({
                    code: 404,
                    msg: '视频注册失败!'
                });
            }
            if (result) {
                return res.status(200).json({
                    code: 200,
                    msg: '视频注册成功!'
                });
            }
        })
});

// 添加视频
router.post('/getAllVideos', (req, res) => {
    var sql = $sql.video.select_allVideo;
    var params = req.body;
    conn.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(200).json({
                    code: 404,
                    msg: '视频库获取失败!'
                });
            }
            if (result) {
                let results = JSON.stringify(result);
                results = JSON.parse(results);
                let search = params.search;
                let sort = params.videoSort;
                let searchResult = [];
                for(let i = 0;i<results.length;i++){
                    // console.log(results[i]);
                    if(results[i].videoTitle.indexOf(search) !=-1 ){
                        searchResult.push(results[i]);
                    }
                }
                let searchSortResult = [];
                if(sort == null){
                    sort = "";
                }
                for(let j = 0; j < searchResult.length ; j++){
                    // console.log(searchResult[j]);
                    if(searchResult[j].videoSort.indexOf(sort) !=-1 ){
                        searchSortResult.push(searchResult[j]);
                    }
                }
                console.log(sort);
                return res.status(200).json({
                    code: 200,
                    msg: '视频库获取成功!',
                    data: searchSortResult.reverse()
                });
            }
        })
});

//获取我的视频
router.post('/getMyVideos' , (req,res) => {
    var sql = $sql.video.select_allVideo;
    var params = req.body;
    sql += " where userID ='" + params.userID + "'";
    console.log(sql);
    conn.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(200).json({
                    code: 404,
                    msg: '视频库获取失败!'
                });
            }
            if (result) {
                console.log(result);
                let results = JSON.stringify(result);
                results = JSON.parse(results);
                return res.status(200).json({
                    code: 200,
                    msg: '视频库获取成功!',
                    data: results.reverse(),
                });
            }
        })
})

module.exports = router;