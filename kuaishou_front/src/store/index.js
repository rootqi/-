import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:111,
    search:"",
    //定义路由表
    routerlist:[]
  },

  getters:{
    getSearch(state){
      return state.search;
    }
  },

  mutations: {
    //角色的路由表
    rolerRouter(state,value){
      state.routerlist = value
    },

    toSearch(state, tosearch){
      state.search = tosearch;
    }
  },
  actions: {
  },
  modules: {
  }
})
