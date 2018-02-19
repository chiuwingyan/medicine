import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Main from '@/components/main'
import Root from '@/components/root/root'
import Cashier from '@/components/cashier/cashier'
import Manager from '@/components/manager/manager'
import purchaseExl from '@/components/root/purchase-exl'
import medicineList from '@/components/root/medicine-list'
import userList from '@/components/root/user-list'
import factory from '@/components/common/factory'
import returnFactoryExl from '@/components/root/returnFactory-exl'
import sellReturn from '@/components/root/sellReturn-exl'
import sellRecord from '@/components/root/sellRecord-exl'
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
          path: 'purchase-exl',
          component: purchaseExl,
          name:'进货统计报表',
        },
        {
          path: 'medicine-list',
          component: medicineList,
          name: '药品列表',
        },
        {
          path: 'user-list',
          component: userList,
          name: '用户列表',
        },
        {
          path: 'factory',
          component: factory,
          name: '厂商管理',
        },
        {
          path: 'returnFactory-exl',
          component: returnFactoryExl,
          name: '仓库退货统计报表',
        },
        {
          path: 'sellReturn-exl',
          component: sellReturn,
          name: '销售退货统计报表',
        },
        {
          path: 'sellRecord-exl',
          component: sellRecord,
          name: '售出统计报表',
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
