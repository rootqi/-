import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.use(VueAxios,axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//路由拦截
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if(localStorage.getItem('access_token')){ //判断本地是否存在access_token
      next();
    }else {
　　　　　　next({
　　　　　　　　path: 'login',
　　　　　　　　query: {
　　　　　　　　　　redirect: to.fullPath
　　　　　　　　},
　　　　　　})

    }
  }
  else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if(to.fullPath == "/login"){
    if(localStorage.getItem('access_token')){
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
  }
});
