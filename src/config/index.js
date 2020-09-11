/**
 * @desc    配置使用与输出文件 index.js
 * @author  yijie
 * @date    2020-09-11 09:46
 * @logs[0] 2020-09-11 09:46 yijie 创建了index.js文件
 * @logs[1] 2020-09-11 14:10 yijie 添加 productionTip
 */
import Vue from 'vue'
const config = (_ => {
  if (process.env.NODE_ENV === '') {
    return require('../config/pro.js')
  } else if (process.env.NODE_ENV === 'production') {
    return require('../config/pro.js')
  } else if (process.env.NODE_ENV === 'development') {
    return require('../config/dev.js')
  } else {
    return require('../config/pro.js')
  }
})()

const routes = config.routes
for (const vueConfigKey in config.vueConfig) {
  Vue.config[vueConfigKey] = config.vueConfig[vueConfigKey]
}
Vue.config.productionTip = false

export default {
  routes
}
