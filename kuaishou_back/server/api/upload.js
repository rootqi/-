const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const pathLib = require('path');

//设置 视频文件存放位置
const uploadVideo = multer({
    dest:'public/uploads/video/'
});
//上传视频
router.post('/uploadVideo',uploadVideo.single('file'),(req,res)=>{
    if (req.file) {
        let file = req.file;
        let newName = file.path+pathLib.parse(file.originalname).ext;  //修改path
        fs.rename(file.path,newName,(err)=>{   //修改path
            if (err) {
                return res.status(200).json({
                    code:0,
                    msg:'服务器繁忙！'
                })
            }else {
                return res.status(200).json({
                    code:200,
                    msg:'上传完成',
                    title:pathLib.parse(file.originalname).name,
                    videoUrl:'http://192.168.1.101:3000/uploads/video/'+file.filename+pathLib.parse(file.originalname).ext
                })
            }
        })
    }else {
        return res.status(200).json({
            code:404,
            msg:'服务器繁忙！'
        })
    }
});

//设置 视频文件存放位置
const uploadAvater = multer({
    dest:'public/uploads/avatar/'
});
//上传头像
router.post('/uploadAvatar',uploadAvater.single('file'),(req,res)=>{
    if (req.file) {
        let file = req.file;
        let newName = file.path+pathLib.parse(file.originalname).ext;  //修改path
        fs.rename(file.path,newName,(err)=>{   //修改path
            if (err) {
                return res.status(200).json({
                    code:0,
                    msg:'服务器繁忙！'
                })
            }else {
                return res.status(200).json({
                    code:200,
                    msg:'上传完成',
                    title:pathLib.parse(file.originalname).name,
                    avatarUrl:'http://192.168.1.101:3000/uploads/avatar/'+file.filename+pathLib.parse(file.originalname).ext
                })
            }
        })
    }else {
        return res.status(200).json({
            code:404,
            msg:'服务器繁忙！'
        })
    }
});

module.exports = router;