<template>
  <el-container>
    <el-aside width="500px">
      <div>
        <video
          id="playVideos"
          width="400"
          height="650"
          controls="controls"
          autoplay
        >
          <source :src="videoUrl" />
        </video>
      </div>
    </el-aside>
    <el-main>
      <div>
        <img
          @click="wayToAccount"
          :src="avatarUrl"
          height="50"
          width="50"
          style="border-radius: 50%"
          alt
        />
        <span style="vertical-align: 100%; margin-left: 20px; margin-top: 20px"
          >{{ nickname
          }}<span style="margin-left: 100px; font-size: 15px"
            >收藏
            <el-switch v-model="ifLike" @change="changeLike"></el-switch></span
        ></span>
        <div style="margin-top: 15px">
          <span>{{ desc }}</span>
        </div>
      </div>
      <div style="margin-top: 20px"></div>
      <div style="margin-top: 20px; width: 400px">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="说点什么..."
          v-model.trim="comment"
        >
        </el-input>
        <div style="margin-top: 20px">
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            @click="toComment"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="comment = ''"></el-button>
        </div>
      </div>
      <br />
      <div style="height: 350px; width: 500px; overflow: auto">
        <el-col :span="20" v-for="(item, index) in comments" :key="index">
          <el-card shadow="hover">
            <div>
              <img
                :src="item.avatarUrl"
                height="30"
                width="30"
                style="border-radius: 50%"
                alt
              />
              <span
                style="vertical-align: 100%; margin-left: 10px; font-size: 10px"
                >{{ item.nickname }}</span
              >
              <div style="margin-top: 15px">
                <span>{{ item.comment }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      videoUrl: this.$route.query.url,
      videoTitle: this.$route.query.title,
      desc: this.$route.query.desc,
      avatarUrl: "",
      nickname: "",
      comment: "",
      ifLike: "",
      userID: this.$route.query.userID,
      videoID: this.$route.query.videoID,
      comments: [],
    };
  },

  methods: {
    //收藏操作
    changeLike() {
      if (window.localStorage.getItem("access_token") == undefined) {
        this.$router.push("/login");
        this.$message.error("请登录，无账号的话请注册哦, 亲");
        return false;
      } else if (this.ifLike == true) {
        console.log(this.videoUrl);
        axios
          .post("http://127.0.0.1:3000/api/userlike/addUserLike", {
            videoHolder: this.userID,
            userID: window.localStorage.getItem("access_token"),
            avatarUrl: window.sessionStorage.getItem("LoginUserAvatar"),
            nickname: window.sessionStorage.getItem("LoginUserNickname"),
            videoID: this.videoID,
            videoUrl: this.videoUrl,
            videoTitle: this.videoTitle,
            videoDesc: this.desc,
          })
          .then((res) => {
            // console.log(res);
            // if (res.data.code == 404) {
            //   this.ifLike == false;
            //   alert("关注失败");
            // } else if (res.data.code == 200) {
            //   alert("关注成功");
            // }
          });
      } else {
        axios
          .post("http://127.0.0.1:3000/api/userlike/deleteUserLike", {
            userID: window.localStorage.getItem("access_token"),
            videoID: this.videoID,
          })
          .then((res) => {
            // console.log(res);
            // if (res.data.code == 404) {
            //   alert("取消关注失败");
            // } else if (res.data.code == 200) {
            //   alert("取消关注成功");
            // }
          });
      }
    },

    toComment() {
      if (localStorage.getItem("access_token") == null) {
        this.$router.push("/login");
        this.$message.error("请登录，无账号的话请注册哦, 亲");
        return false;
      }
      if (this.comment.length > 100) {
        this.$message({
          message: "说的太多了哦",
          type: "warning",
        });
        return false;
      } else if (this.comment.length == 0) {
        this.$message({
          message: "您还什么都没说",
          type: "warning",
        });
        return false;
      }

      axios
        .post("http://127.0.0.1:3000/api/comment/addComment", {
          userID: window.localStorage.getItem("access_token"),
          avatarUrl: sessionStorage.getItem("LoginUserAvatar"),
          videoID: this.videoID,
          nickname: window.sessionStorage.getItem("LoginUserNickname"),
          comment: this.comment,
        })
        .then((res) => {
          console.log(res);
          this.$message({
            message: "评论成功",
            type: "success",
          });
          let newComment = {
            nickname: window.sessionStorage.getItem("LoginUserNickname"),
            avatarUrl: sessionStorage.getItem("LoginUserAvatar"),
            comment: this.comment,
          };
          this.comments.unshift(newComment);
          this.comment = "";
        });
    },

    wayToAccount() {
      if (window.sessionStorage.getItem("userProfile") != null) {
        window.sessionStorage.removeItem("userProfile");
      }
      window.sessionStorage.setItem("userProfile", this.userID);
      this.$router.push({
        path: "/myVideo",
      });
    },
  },

  created() {
    //查看该视频是否是此时正在访问平台的用户喜欢的
    if (window.localStorage.getItem("access_token") == null) {
      this.ifLike = false;
    } else {
      axios
        .post("http://127.0.0.1:3000/api/userlike/getIfMyLike", {
          userID: window.localStorage.getItem("access_token"),
          videoID: this.videoID,
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            this.ifLike = false;
          } else {
            this.ifLike = true;
          }
        });
    }
  },

  beforeMount() {
    //搜索所有评论内容
    axios
      .post("http://127.0.0.1:3000/api/comment/getAllComments", {
        videoID: this.videoID,
      })
      .then((res) => {
        console.log(res);
        this.comments = res.data.data;
      });
  },

  mounted() {
    //搜索视频用户数据
    axios
      .post("http://127.0.0.1:3000/api/user/getUser/", {
        userID: this.$route.query.userID,
      })
      .then((res) => {
        console.log(res);
        this.avatarUrl = res.data.data.avatarUrl;
        this.nickname = res.data.data.nickname;
      });
  },
};
</script>

<style scoped>
.attention_space {
  padding-left: 200px;
  vertical-align: 100%;
}

.largefont {
  size: 20px;
}
</style>