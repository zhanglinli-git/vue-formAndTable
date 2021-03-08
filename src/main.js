/*
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-03-01 14:52:26
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-08 11:37:19
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/permission' // permission control
// 自定义权限指令
import permission from '@/directive/permission'
import { Toolbar } from '@/components'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.use(permission)
Vue.component('Toolbar', Toolbar)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
