/**
 * @desc      生产环境下的基础配置信息 config.pro.js.js
 * @author    fengzili
 * @date      2020-09-07
 * @logs[0]   fengzili 2020-09-07 创建了文件config.pro.js.js
 */
import Vue from 'vue'
import doorRouter from '@modules/door/assets/js/router.js'

const routes = [
  ...doorRouter
]

Vue.config.devtools = false

export {
  routes
}
