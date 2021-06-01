import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profileUserID:"",
  },

  getters:{
  },

  mutations: {
    //修改用户
    setProfileUserID(state, val){
      return (state.profileUserID = val);
    }
  },
  actions: {
  },
  modules: {
  }
})
