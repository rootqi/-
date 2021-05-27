import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Play from '@/views/Play'
import Profile from '@/views/Profile'
import Upload from '@/views/Upload'
import Welcome from '@/views/Welcome'
import MyVideo from '@/components/myVideo'
import Like from '@/components/Like'
import Test from '@/views/Test'
import Account from '@/views/Account'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/',
    redirect: 'welcome',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta:{requireAuth:true},
        children: [
          {
            path:'/myVideo',
            name: 'myVideo',
            component: MyVideo,
            meta:{requireAuth:true},
          },
          {
            path:'/like',
            name: 'like',
            component: Like,
            meta:{requireAuth:true},
          }
        ]
      },
      {
        path:'/welcome',
        name: 'Welcome',
        component: Welcome
      },
      {
        path: '/play',
        name: 'Play',
        component: Play
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/upload',
        name: 'Upload',
        component: Upload,
        meta:{requireAuth:true}
      },
      {
        path: '/account',
        name: 'Account',
        component: Account,
        meta:{requireAuth:true}
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
