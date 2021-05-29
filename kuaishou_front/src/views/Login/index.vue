<template>
  <div>
    <div>
      <video
        data-object-fit="true"
        data-autoplay="true"
        loop
        autoplay
        src="@/assets/video/backvideo.mp4"
        type="video/mp4"
        width="100%"
        height="100%"
      ></video>
    </div>
    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form
        class="loginform"
        ref="loginForm"
        :rules="loginRules"
        :model="loginForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="userID">
          <el-input
            placeholder="用户名"
            prefix-icon="el-icon-user"
            v-model.trim="loginForm.userID"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="loginPassword">
          <el-input
            placeholder="密码"
            show-password
            prefix-icon="el-icon-search"
            v-model.trim="loginForm.loginPassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="formbutton"
            >登录</el-button
          >
          <p
            style="
              font-size: 14px;
              line-height: 30px;
              color: white;
              cursor: pointer;
              float: right;
            "
            @click="showDialog"
          >
            注册
          </p>
        </el-form-item>
      </el-form>
    </div>
    <!-- registerDialog -->

    <el-dialog title="注册" :visible.sync="dialogFormVisible" width="40%">
      <el-form
        :model="registerForm"
        size="mini"
        style="width: 400px"
        :rules="registerRules"
        ref="registerForm"
      >
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input
            v-model.trim="registerForm.nickname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            type="password"
            v-model.trim="registerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          prop="confirmPassword"
        >
          <el-input
            type="password"
            v-model.trim="registerForm.confirmPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
          <el-input v-model.number="registerForm.age"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    var checkNickName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else if(value.length>15) {
        callback(new Error("昵称长度请不要大于15个字"));
      }
      else {
        callback();
      }
    }
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else if (value > 130) {
            callback(new Error("您过于年长了"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        callback(new Error("密码长度不能小于8位"));
      } else if(value.length>15) {
        callback(new Error("密码长度不能大于15位"));
      }
      else {
        if (this.registerForm.confirmPassword !== "") {
          this.$refs.registerForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userID: "",
        loginPassword: "",
      },
      registerForm: {
        nickname: "",
        password: "",
        confirmPassword: "",
        email: "",
        introduction: "这个人很懒，什么都没有留下。。。",
        age: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //注册规则
      registerRules: {
        nickname: [{ validator: checkNickName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
      //登录规则
      loginRules: {
        userID: [{ required: true, message: "请输入账号", trigger: "blur" }],
        loginPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //登录
    login() {
      const self = this;
      self.$refs["loginForm"].validate((valid) => {
        if (valid) {
          console.log(self.loginForm.userID);
          axios
            .post("http://192.168.1.101:3000/api/user/login", {
              userID: self.loginForm.userID,
              password: self.loginForm.loginPassword,
            })
            .then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                window.localStorage.setItem(
                  "access_token",
                  this.loginForm.userID
                );
                this.$router.push("/welcome");
              } else if (res.data.code == 404) {
                this.$message.error("登陆失败!");
              } else if (res.data.code == 400) {
                this.$message.error("账号不存在请注册账号!");
              } else if (res.data.code == 0) {
                this.$message.error("密码错误!");
              }
            });
        }
      });
    },

    //注册
    register() {
      const self = this;
      console.log(self.$refs["registerForm"]);
      self.$refs["registerForm"].validate((valid) => {
        if (valid) {
          //生成随机账号
          var s = ((Math.floor(Math.random() * 10000) % 9) + 1).toString();
          for (var i = 0; i < 8; i++) {
            s = s + (Math.floor(Math.random() * 10000) % 10).toString();
          }
          self.$http
            .post("http://192.168.1.101:3000/api/user/register", {
              userID: s,
              password: self.registerForm.password,
              avatarUrl: "http://192.168.1.101:3000/uploads/avatar/avatar1.jpg",
              age: self.registerForm.age,
              email: self.registerForm.email,
              nickname: self.registerForm.nickname,
              introduction: this.registerForm.introduction,
            })
            .then((response) => {
              console.log(response);
              if (response.data.code == 200) {
                this.$message({
                  message: "注册成功，您的账号为:" + s + ",复制即可",
                  type: "success",
                });
                this.dialogFormVisible = false;
              } else if (response.data.code == 404) {
                alert(response.data.msg);
              }
            })
            .then((error) => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },

    //打开注册界面
    showDialog() {
      this.dialogFormVisible = true;
      this.$refs["registerForm"].resetFields();
    },
  },
};
</script>


<style scoped>
.login_box {
  width: 350px;
  height: 350px;
  /* background-color: #fff; */
  background-color: #51647ab3;
  border-radius: 5px;

  position: absolute;
  left: 80%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.loginform {
  padding: 32px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}
.formbutton {
  width: 100%;
}
.code {
  width: 45%;
}
img {
  /* style="width: 100px; height: 30px; margin-left:5px;vertical-align: middle;" */
  display: line-inline;
  width: 45%;
  height: 28px;
  margin-left: 10px;
  vertical-align: middle;
  border-radius: 3px;
}
.rememberMe {
  color: #fff;
}
</style>