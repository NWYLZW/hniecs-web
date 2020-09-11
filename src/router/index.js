/**
 * @desc      项目总路由文件 index.js
 * @author    yijie
 * @date      2020-09-05
 * @logs[0]   yijie 2020-09-05 创建了index.js文件
 * @logs[1]   yijie 2020-09-08 添加了pageNotFound页面
 * @logs[1]   yijie 2020-09-11 优化routes的获取，向外封闭
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import errorRouter from '@modules/error/assets/js/router.js'

if (process.env.NODE_ENV === 'development') {
  Vue.use(VueRouter)
}
const modulesRoutes = require('../config').default.routes

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

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = (to.meta && to.meta.title) || 'HNIECS'
  next()
})

export default router
