<template>
  <div style="width: 1250px; height: 620px; overflow: auto">
    <el-row>
      <el-col
        :span="8"
        v-for="(item, index) in currentPageVideoList"
        :key="index"
      >
        <el-card :body-style="{ padding: '0px' }">
          <video
            width="350"
            height="250"
            @click="
              playvideo(
                item.videoUrl,
                item.videoTitle,
                item.videoDesc,
                item.userID,
                item.videoID
              )
            "
            ref="video"
            :src="item.videoUrl"
          ></video>
          <div style="padding: 14px" id="describe">
            <span>{{ item.videoTitle }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.videoDesc }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentDate: new Date(),
      videoList: [],
      currentPageVideoList: [],
      search: "",
    };
  },
  methods: {
    playvideo(url, title, desc, userID, videoID) {
      this.$router.push({
        path: "/play",
        query: {
          url: url,
          title: title,
          desc: desc,
          ifLike: false,
          userID: userID,
          videoID: videoID,
        },
      });
    },
  },

  beforeMount() {
    //搜索当前观看用户数据
    if(localStorage.getItem("access_token") == null){
      return false;
    }else {
       axios
      .post("http://127.0.0.1:3000/api/user/getUser/", {
        userID: localStorage.getItem("access_token"),
      })
      .then((res) => {
        console.log("登录用户信息获取成功");
        window.sessionStorage.setItem("LoginUserAvatar",res.data.data.avatarUrl);
        window.sessionStorage.setItem("LoginUserNickname",res.data.data.nickname);
      });
    }
  },

  mounted() {
    let that = this;
    let videoSort = "";
    if (sessionStorage.getItem("searchItem") == null) {
      this.search = "";
    } else {
      this.search = JSON.parse(
        window.sessionStorage.getItem("searchItem")
      ).videoTitle;
      videoSort = JSON.parse(window.sessionStorage.getItem("searchItem"))
        .videoSort;
      console.log(videoSort);
    }
    axios
      .post("http://127.0.0.1:3000/api/video/getAllVideos/", {
        search: this.search,
        videoSort: videoSort,
      })
      .then((res) => {
        that.videoList = res.data.data;
        that.currentPageVideoList = "";
        that.currentPageVideoList = res.data.data;
      });
  },
};
</script>

<style scoped>
#describe {
  text-align: left;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>