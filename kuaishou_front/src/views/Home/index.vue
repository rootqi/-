<template>
  <el-container class="home-container">
    <el-header>
      <div id="logo">
        <img src="@/assets/logo.png" alt />
      </div>
      <div style="margin-top: 0px">
        <el-input
          placeholder="请输入内容"
          v-model="search"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="Search(sortForm.empty)"
          ></el-button>
        </el-input>
      </div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item index="upload"
          ><i class="el-icon-upload"></i>上传</el-menu-item
        >
        <el-menu-item index="login"
          ><i class="el-icon-key"></i>登录</el-menu-item
        >
        <!-- 下拉框 -->
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-info"></i></template>
          <el-menu-item @click="wayToAccount"
            ><i class="el-icon-user"></i>个人主页</el-menu-item
          >
          <el-menu-item index="account"
            ><i class="el-icon-setting"></i>账号设置</el-menu-item
          >
          <el-menu-item index="login" @click="logout"
            ><i class="el-icon-switch-button"></i>退出登录</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          unique-opened
          router
        >
          <el-menu-item index="welcome">
            <i class="el-icon-s-home"></i>
            <span slot="title" @click="Search(sortForm.empty)">首页</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-video-camera-solid"></i>
            <span slot="title" @click="Search(sortForm.movie)">电影</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-video-camera"></i>
            <span slot="title" @click="Search(sortForm.TV)">电视剧</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-camera-solid"></i>
            <span slot="title" @click="Search(sortForm.Show)">影视</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-soccer"></i>
            <span slot="title" @click="Search(sortForm.game)">游戏</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-service"></i>
            <span slot="title" @click="Search(sortForm.music)">音乐</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-mobile-phone"></i>
            <span slot="title" @click="Search(sortForm.VLOG)">VLOG</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-microphone"></i>
            <span slot="title" @click="Search(sortForm.documentary)"
              >纪录片</span
            >
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-potato-strips"></i>
            <span slot="title" @click="Search(sortForm.food)">美食</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-sunny"></i>
            <span slot="title" @click="Search(sortForm.funny)">搞笑</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-s-promotion"></i>
            <span slot="title" @click="Search(sortForm.tourism)">旅游</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-magic-stick"></i>
            <span slot="title" @click="Search(sortForm.arts)">综艺</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    //顶部
    return {
      activeIndex: "",
      search: "",
      sortForm: {
        empty: "",
        movie: "movie",
        TV: "TV",
        Show: "Show",
        game: "game",
        music: "music",
        VLOG: "VLOG",
        documentary: "documentary",
        food: "food",
        funny: "funny",
        tourism: "tourism",
        arts: "arts",
      },
    };
  },
  methods: {
    // 退出按钮
    logout() {
      // 删除localStorage中保存的值
      window.localStorage.removeItem("access_token");
      window.sessionStorage.removeItem("searchItem");
      this.$router.push("/login");
    },
    Search(sort) {
      let searchObj = {
        videoTitle: this.search,
        videoSort: sort,
      };
      let str = JSON.stringify(searchObj);
      window.sessionStorage.setItem("searchItem", str);
      if (this.$route.path == "/welcome") {
        this.$router.go(0);
      } else {
        this.$router.push("/welcome");
      }
      this.search = "";
    },

    wayToAccount() {
      if (window.sessionStorage.getItem("userProfile") != null) {
        window.sessionStorage.removeItem("userProfile");
      }
      window.sessionStorage.setItem(
          "userProfile",
          localStorage.getItem("access_token")
        );
        this.$router.go(0);
    },
  },
};
</script>

<style lang="css" scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.home-container {
  height: 100%;
}

.el-header {
  flex-direction: row;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}

.el-aside {
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}

.el-menu {
  border-right: none;
}
</style>