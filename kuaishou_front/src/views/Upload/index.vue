<template>
  <div>
    <el-upload
      class="upload-demo Center"
      ref="upload"
      drag
      :limit="limit"
      :auto-upload="false"
      :action="uploadUrl"
      :before-upload="beforeUploadVideo"
      :on-success="handleVideoSuccess"
      :on-remove="handelVideoRemove"
    >
      <video v-if="videoUrl" width="350px" height="190px" controls="controls">
        <source :src="videoUrl" />
      </video>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        请注意你的视频大小哦，不能超过10M哦。。。
      </div>
    </el-upload>
    <div style="width: 450px" class="marleft">
      <br />
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="添加标题">
          <el-input v-model.trim="form.title"></el-input>
        </el-form-item>
        <el-form-item label="选择分类">
          <el-select v-model.trim="form.sort" placeholder="请选择视频分类">
            <el-option label="电影" value="movie"></el-option>
            <el-option label="电视剧" value="TV"></el-option>
            <el-option label="影视" value="Show"></el-option>
            <el-option label="游戏" value="game"></el-option>
            <el-option label="音乐" value="music"></el-option>
            <el-option label="VLOG" value="VLOG"></el-option>
            <el-option label="纪录片" value="documentary"></el-option>
            <el-option label="美食" value="food"></el-option>
            <el-option label="搞笑" value="funny"></el-option>
            <el-option label="旅游" value="tourism"></el-option>
            <el-option label="综艺" value="arts"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作品描述">
          <el-input type="textarea" v-model.trim="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      limit: 1,
      uploadUrl: "http://192.168.1.101:3000/api/upload/uploadVideo/",
      videoUrl: "",
      form: {
        title: "",
        sort: "",
        desc: "",
      },
    };
  },
  methods: {
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1
      ) {
        this.$message.error(
          "请上传正确的视频格式(mp4/ogg/flv/avi/wmv/rmvb/mov)"
        );
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过50M");
        return false;
      }
      this.isShowUploadVideo = false;
    },

    //上传成功回调
    handleVideoSuccess(res, file) {
      this.videoUrl = res.videoUrl;
      //生成随机videoID
      var s = ((Math.floor(Math.random() * 100000) % 9) + 1).toString();
      for (var i = 0; i < 9; i++) {
        s = s + (Math.floor(Math.random() * 100000) % 10).toString();
      }
      axios
        .post("http://192.168.1.101:3000/api/video/registerVideo/", {
          userID: window.localStorage.getItem("access_token"),
          videoID: s,
          videoUrl: this.videoUrl,
          videoTitle: this.form.title,
          videoSort: this.form.sort,
          videoDesc: this.form.desc,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: "视频注册成功",
              type: "success",
            });
            this.form.title = "";
            this.form.sort = "";
            this.form.desc = "";
          }
        });
    },

    handelVideoRemove(file, fileList) {
      this.videoUrl = "";
    },

    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },

    onSubmit() {
      if (!this.$refs.upload.uploadFiles[0]) {
        this.$message.error("请上传文件");
        return false;
      } else if (
        this.form.title == "" ||
        this.form.sort == "" ||
        this.form.desc == ""
      ) {
        this.$message.error("请将信息填写完整");
        return false;
      } else if(this.form.title.length>20){
        this.$message.error("标题长度过长，最多只能20个字");
      } else if(this.form.desc.length>50){
        this.$message.error("作品描述过长，最多只能50个字");
      }
      else {
        this.$refs["upload"].submit();
      }
    },

    cancel(){
      this.$router.go(-1);
    }
  },
};
</script>

<style scoped>
.Center {
  text-align: center;
}

.marleft {
  margin-left: 350px;
}
</style>