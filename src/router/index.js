/**
 * @desc      项目总路由文件 index.js
 * @author    yijie
 * @date      2020-09-05
 * @logs[0]   yijie 2020-09-05 创建了index.js文件
 * @logs[1]   yijie 2020-09-08 添加了pageNotFound页面
 * @logs[2]   yijie 2020-09-11 优化routes的获取，向外封闭
 * @logs[3]   yijie 2020-09-11 登陆拦截
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

/**
 * 路由跳转拦截器
 * to表示即将进入的页面路由，
 * from表示当前导航正要离开的路由
 * next: Function:执行效果依赖 next 方法的调用参数。
 * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
 * next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
 * next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
 * next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
 */
router.beforeEach((to, from, next) => {
  // 根据路由中的meta配置修改页面title
  document.title = (to.meta && to.meta.title) || 'HNIECS'
  // meta中支持配置的路由权限参数
  const unneed = {
    // 默认需要登陆
    login: true,
    // 默认不需要超级管理员权限
    superAdmin: false,
    ...(
      (to.meta && to.meta.unneed) || {}
    )
  }

  const isLogin = sessionStorage.getItem('sessiontoken')
  // 页面未设置为仅登陆查看 未登陆 不是登陆页面
  if (unneed.login && !isLogin && to.path !== '/door/user/login') {
    next({
      path: '/door/user/login',
      query: { redirect: to.fullPath }
    })
  }
  next()
})

export default router
