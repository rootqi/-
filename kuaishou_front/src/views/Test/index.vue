<template>
  <div id="example">
    <input type="text" v-model="searchData" placeholder="请输入id或姓名">
    <ul>
      <li v-for="(item,index) in Newitems" :key="index">
        <span>{{item.id}}</span>
        <span>{{item.name}}</span>
        <span>{{item.time}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchData: "",
      items: [
        { id: "1001", name: "哈哈", time: "20170207" },
        { id: "1002", name: "呵呵", time: "20170213" },
        { id: "1103", name: "晓丽", time: "20170304" },
        { id: "1104", name: "小兰", time: "20170112" },
        { id: "1205", name: "财务", time: "20170203" },
        { id: "1206", name: "嘻嘻", time: "20170208" },
        { id: "1307", name: "测试", time: "20170201" }
      ]
    };
  },
  computed: {
    Newitems() {
      var _this = this;
      var Newitems = [];
      _this.items.map(function(item) {
        if (
          item.id.search(_this.searchData) != -1 ||
          item.name.search(_this.searchData) != -1
        ) {
          Newitems.push(item);
        }
      });
      return Newitems;
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
input {
  width: 200px;
  height: 30px;
  line-height: 30px;
  text-indent: 5px;
}
ul li {
  list-style: none;
}
ul li span {
  margin: 0 30px;
  line-height: 30px;
}
</style>