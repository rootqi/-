<template>
  <div id="app">
    <router-view v-if="msg"></router-view>
  </div>
</template>
<script>
export default {
  provide(){
    return {
      reload: this.reload,
    }
  },
  data(){
    return {
      msg: true,
    }
  },
  methods: {
    reload(){
      this.msg = false;
      this.$nextTick(function(){
        this.msg = true;
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
