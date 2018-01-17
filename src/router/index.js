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
      path:'/root',
      component: Root,
      redirect:'/root/main/root',
      children:[
        {
          path:'main/:type',
          component:Main,
          name:'首页'
        },
        {
          path:'2',
          name:'2',
        }
      ]
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
