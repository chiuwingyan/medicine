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
import Factory  from '@/components/common/factory'
import saleroomGraph from '@/components/common/saleroom-graph'
import salesVolumeGraph from '@/components/common/sales-volume-graph'
//仓库管理员
import managerWorking from '@/components/manager/manager-working'
import purchase from '@/components/manager/purchase'
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
        },
        {
          path: 'factory',
          component: factory,
          name: '查看厂商列表',
        },
        {
          path: 'saleroom-graph',
          component: saleroomGraph,
          name: '查看药店销额统计图',
        },
        {
          path: 'sales-volume-graph',
          component: salesVolumeGraph,
          name: '查看药品销量统计图',
        }
      ]
    },
    {
      path: '/cashier',
      component: Cashier
    },
    {
      path: '/manager',
      component: Manager,
      redirect: '/manager/main/manager',
      children:[
        {
          path: 'main/:type',
          component: Main,
          name: '首页'
        },
        {
          path: 'manager-working',
          component: managerWorking,
          name: '我的工作台',
          redirect: 'purchase',
          children:[
            {
              path: 'purchase',
              component: purchase,
              name: '药品进货'
            },
          ]
        },
      ]
    }
  ]
})
