<template>
  <div>
    <el-upload
      class="avatar-uploader Center"
      ref="upload"
      :limit="1"
      :auto-upload="true"
      :action="uploadUrl"
      :show-file-list="true"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div style="width: 450px" class="marleft">
      <br />
      <el-form
        ref="uploadForm"
        :model="uploadForm"
        label-width="80px"
        :rules="auploadRules"
      >
        <el-form-item label="用户名" prop="anickname">
          <el-input v-model.trim="uploadForm.anickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="apassword">
          <el-input v-model.trim="uploadForm.apassword"></el-input>
        </el-form-item>
        <el-form-item
          prop="aemail"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model.trim="uploadForm.aemail"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="adesc">
          <el-input type="textarea" v-model.trim="uploadForm.adesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        callback(new Error("密码长度不能小于8位"));
      } else if (value.length > 15) callback(new Error("密码长度不能大于15位"));
        else callback();
    };
    var validateDesc = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("写点简介吧,亲.."));
      } else if (value.length > 50) {
        callback(new Error("简介不能太长哦,亲.."));
      } else callback();
    };
    return {
      uploadUrl: "http://127.0.0.1:3000/api/upload/uploadAvatar/",
      avatarUrl: "",
      id: "",
      uploadForm: {
        anickname: "",
        apassword: "",
        adesc: "",
        aemail: "",
      },
      auploadRules: {
        anickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        apassword: [{ validator: validatePass, trigger: "blur" }],
        adesc: [{ validator: validateDesc, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.avatarUrl = res.avatarUrl;
      this.$message({
        message: "头像上传成功！",
        type: "success",
      });
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    onSubmit() {
      this.$refs["uploadForm"].validate((valid) => {
        console.log(1111);
        if(valid) {
          axios
            .post("http://127.0.0.1:3000/api/user/updateUser", {
              userID: window.localStorage.getItem("access_token"),
              avatarUrl: this.avatarUrl,
              password: this.uploadForm.apassword,
              nickname: this.uploadForm.anickname,
              email: this.uploadForm.aemail,
              desc: this.uploadForm.adesc,
              id: this.id,
            })
            .then((res) => {
              this.$message({
                message: "修改成功！",
                type: "success",
              });
            });
        } else {
          callback();
        }
      });
    },
  },

  mounted() {
    axios
      .post("http://127.0.0.1:3000/api/user/getUser", {
        userID: window.localStorage.getItem("access_token"),
      })
      .then((res) => {
        console.log(res);
        this.avatarUrl = res.data.data.avatarUrl;
        this.uploadForm.anickname = res.data.data.nickname;
        this.uploadForm.apassword = res.data.data.password;
        this.uploadForm.aemail = res.data.data.email;
        this.uploadForm.adesc = res.data.data.desc;
        this.id = res.data.data.id;
      });
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>