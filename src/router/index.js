import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Main from '@/components/main'
import Root from '@/components/root/root'
import Cashier from '@/components/cashier/cashier'
import Manager from '@/components/manager/manager'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/main',
      component: Main
    },
    {
      path:'/root',
      component: Root
    },
    {
      path: '/cashier',
      component: Cashier
    },
    {
      path: '/manager',
      component: Manager
    }
  ]
})
