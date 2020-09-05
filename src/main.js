import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}

// 注册外置插件
require('./plugins').default(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
