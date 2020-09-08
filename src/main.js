/**
 * @desc      项目入口文件 main.js
 * @author    yijie
 * @date      2020-09-05
 * @logs[0]   yijie 2020-09-05 创建了文件main.js
 * @logs[0]   yijie 2020-09-07 抽离出devtools的开启与关闭到config.dev.js and config.pro.js中
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 修改原生对象方法
import '@assets/js/nativeObject/Object'
import '@assets/js/nativeObject/Date'
import '@assets/js/nativeObject/Number'

Vue.config.productionTip = false

// 注册外置插件
require('./plugins').default(Vue)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = (to.meta && to.meta.title) || 'hnie-cs'
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
