/**
 * @desc      项目入口文件 main.js
 * @author    yijie
 * @date      2020-09-05
 * @logs[0]   yijie 2020-09-05 创建了文件main.js
 * @logs[1]   yijie 2020-09-07 抽离出devtools的开启与关闭到config.dev.js and config.pro.js中
 * @logs[2]   yijie 2020-09-10 抽离出productionTip
 * @logs[3]   yijie 2020-09-10 集成nativeObject
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@assets/js/nativeObject'

// 注册外置插件
require('./plugins').default(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
