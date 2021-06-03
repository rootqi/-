<template>
  <el-row>
    <el-col
      :span="8"
      v-for="(item, index) in videoList"
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
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentDate: new Date(),
      videoList: [],
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

  mounted() {
    axios
      .post("http://127.0.0.1:3000/api/video/getMyVideos", {
        userID: window.sessionStorage.getItem("userProfile"),
      })
      .then((res) => {
        console.log(res);
        this.videoList = res.data.data;
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