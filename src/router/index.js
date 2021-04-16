/*
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-03-01 14:52:26
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-04-16 19:01:18
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/commonViews',
    component: Layout,
    meta: {
      title: 'demo',
      icon: 'table',
    },
    children: [
      {
        path: 'commonFormDemo',
        name: 'CommonFormDemo',
        component: () => import('@/views/commonViews/commonFormDemo/index.vue'),
        meta: {
          title: '表单控件demo',
          icon: 'table',
          affix: true,
        },
      },
      {
        path: 'commonTableDemo',
        name: 'CommonTableDemo',
        component: () =>
          import('@/views/commonViews/commonTableDemo/index.vue'),
        meta: {
          title: '表格控件demo',
          icon: 'table',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/indexManage',
    component: Layout,
    meta: {
      title: '可视化echarts',
      icon: 'table',
    },
    children: [
      {
        path: 'dataAnalysis1',
        name: 'DataAnalysis1',
        component: () => import('@/views/indexManage/dataAnalysis1/index'),
        meta: {
          title: '可视化1',
          icon: 'nested',
        },
      },
      {
        path: 'dataAnalysis',
        name: 'DataAnalysis',
        component: () => import('@/views/indexManage/dataAnalysis/index'),
        meta: {
          title: '可视化2',
          icon: 'nested',
        },
      },
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/indexManage/indexPage/index'),
        meta: {
          title: '可视化3',
          icon: 'nested',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
