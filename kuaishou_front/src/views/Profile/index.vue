<template>
  <el-container>
    <el-header height="150px">
      <div>
        <img
          :src="avatarUrl"
          height="100"
          width="100"
          style="border-radius: 50%"
          alt
        />
          <div>
            <span>用户名:</span><span>{{ nickname }}</span>
            <div><span>唯一西瓜ID:</span><span>{{ userID }}</span></div>
          </div>
      </div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="myVideo"
          >我的视频<div>{{ myVideo }}</div></el-menu-item>
        <el-menu-item index="like"
          >我喜欢的<div>{{ Ilike }}</div></el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      activeIndex: "",
      handleSelect: "",
      avatarUrl: "",
      nickname: "",
      userID: "",
      Ilike: "",
      myVideo: "",
    }
  },

  mounted(){
    console.log("userID:"+sessionStorage.getItem("userProfile"));
    axios.post('http://192.168.1.101:3000/api/user/getUser', {
      userID: window.sessionStorage.getItem("userProfile"),
    }).then((res) => {
      this.avatarUrl = res.data.data.avatarUrl;
      this.nickname = res.data.data.nickname;
      this.userID = res.data.data.userID;
    });
  },

  computed: {
    userIdData(){
      return this.$store.state.profileUserID;
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding-top: 0;
  margin-top: 0;
  align-items: center;
}

.el-main {
  /* background-color: #070707; */
  color: rgb(15, 12, 12);
  text-align: center;
}
</style>