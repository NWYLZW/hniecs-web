/**
 * @desc      项目总路由文件 index.js
 * @author    yijie
 * @date      2020-09-05
 * @logs[0]   yijie 2020-09-05 创建了index.js文件
 * @logs[0]   yijie 2020-09-08 添加了pageNotFound页面
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import errorRouter from '@modules/error/assets/js/router.js'

let modulesRoutes = []
if (process.env.NODE_ENV === '') {
} else if (process.env.NODE_ENV === 'production') {
  modulesRoutes = require('../config.pro.js').routes
} else if (process.env.NODE_ENV === 'development') {
  Vue.use(VueRouter)
  modulesRoutes = require('../config.dev.js').routes
} else {
}

const baseRoutes = [
  ...errorRouter, {
    path: '',
    name: 'index',
    redirect: '/door/index/index'
  }, {
    path: '*',
    redirect: '/error/index/pageNotFound'
  }]

const routes = [
  ...modulesRoutes,
  ...baseRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
