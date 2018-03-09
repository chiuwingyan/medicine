import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Main from 'components/main'
import Root from 'components/root/root'
import Cashier from 'components/cashier/cashier'
import Manager from 'components/manager/manager'
import purchaseExl from 'components/root/purchase-exl'
import medicineList from 'components/root/medicine-list'
import userList from 'components/root/user-list'
import factory from 'components/common/factory'
import returnFactoryExl from 'components/root/returnFactory-exl'
import sellReturn from 'components/root/sellReturn-exl'
import sellRecord from 'components/root/sellRecord-exl'
import Factory  from 'components/common/factory'
import saleroomGraph from 'components/common/saleroom-graph'
import salesVolumeGraph from 'components/common/sales-volume-graph'
//仓库管理员
import managerWorking from 'components/manager/manager-working'
import purchase from 'components/manager/purchase'
import mediType from 'components/common/medi-type'
import returntoFactory from 'components/manager/returntoFactory'
const exlForm= r => require.ensure([], () => r(require('components/manager/exlForm')), 'chunkname1')
const purchaseExlM=r => require.ensure([], () => r(require('components/manager/purchase-exl')), 'chunkname1')
const returnExl=r => require.ensure([], () => r(require('components/manager/return-exl')), 'chunkname1')
const cashierWorking = r => require.ensure([], () => r(require('components/cashier/cashier-working')), 'chunkname1')
const sell = r => require.ensure([], () => r(require('components/cashier/sell')), 'chunkname1')
const casellReturn = r => require.ensure([], () => r(require('components/cashier/sell-return')), 'chunkname1')

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
          name:'首页',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'purchase-exl',
          component: purchaseExl,
          name:'进货统计报表',
          meta: {
            requireAuth: true,  
          },
        },
        {
          path: 'medicine-list',
          component: medicineList,
          name: '药品列表',
          meta: {
            requireAuth: true,  
          },
        },
        {
          path: 'user-list',
          component: userList,
          name: '用户列表',
          meta: {
            requireAuth: true, 
          },
        },
        {
          path: 'factory',
          component: factory,
          name: '厂商管理',
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'returnFactory-exl',
          component: returnFactoryExl,
          name: '仓库退货统计报表',
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'sellReturn-exl',
          component: sellReturn,
          name: '销售退货统计报表',
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'sellRecord-exl',
          component: sellRecord,
          name: '售出统计报表',
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'factory',
          component: factory,
          name: '查看厂商列表',
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'saleroom-graph',
          component: saleroomGraph,
          name: '查看药店销额统计图',
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'sales-volume-graph',
          component: salesVolumeGraph,
          name: '查看药品销量统计图',
          meta: {
            requireAuth: true,
          },
        }
      ]
    },
    {
      path: '/cashier',
      component: Cashier,
      redirect: '/cashier/main/cashier',
        children: [{
            path: 'main/:type',
            component: Main,
            name: '首页',
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'cashier-working',
            component: cashierWorking,
            name: '我的工作台',
            redirect: {
              name: '药品销售及药品列表'
            },
            children: [{
                path: 'sell',
                component: sell,
                name: '药品销售及药品列表',

                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'sell-return',
                component: casellReturn,
                name: '药品退货',
                meta: {
                  requireAuth: true,
                },
              }
            ]
          },
          {
            path: 'formExl',
            component: exlForm,
            name: '统计报表',
            redirect: {
              name: '我的进货统计报表'
            },
            children: [{
                path: 'purchase-exl',
                component: purchaseExlM,
                name: '我的进货统计报表',
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'return-exl',
                component: returnExl,
                name: '我的退货统计报表',
                meta: {
                  requireAuth: true,
                },
              }
            ]
          },
          {
            path: 'factory',
            component: factory,
            name: '厂商管理',
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'medi-type',
            component: mediType,
            name: '药品类型管理',
            meta: {
              requireAuth: true,
            },
          },

        ]

    },
    {
      path: '/manager',
      component: Manager,
      redirect: '/manager/main/manager',
      children:[
        {
          path: 'main/:type',
          component: Main,
          name: '首页',
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'manager-working',
          component: managerWorking,
          name: '我的工作台',
          redirect: {
            name: '药品进货及药品管理'
          },
          children:[
            {
              path: 'purchase',
              component: purchase,
              name: '药品进货及药品管理',
              meta: {
                requireAuth: true,
              },
            },
            {
              path: 'returntoFactory',
              component: returntoFactory,
              name: '药品退货',
              meta: {
                requireAuth: true,
              },
            }
          ]
        },
        {
          path: 'formExl',
          component: exlForm,
          name: '统计报表',
          redirect: {
            name: '我的进货统计报表'
          },
          children: [
            {
              path: 'purchase-exl',
              component: purchaseExlM,
              name: '我的进货统计报表',
              meta: {
                requireAuth: true,
              },
            },
           {
              path: 'return-exl',
              component: returnExl,
              name: '我的退货统计报表',
              meta: {
                requireAuth: true,
              },
            }
          ]
        },
        {
          path: 'factory',
          component: factory,
          name: '厂商管理',
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'medi-type',
          component: mediType,
          name: '药品类型管理',
          meta: {
            requireAuth: true,
          },
        },

      ]
    }
  ]
})
