/**
 * @desc      开发环境下的基础配置信息 config.dev.js.js
 * @author    yijie
 * @date      2020-09-07
 * @logs[0]   yijie 2020-09-07 创建了文件config.dev.js.js
 */
import Vue from 'vue'
import doorRouter from '@modules/door/assets/js/router.js'

const routes = [
  ...doorRouter
]

Vue.config.devtools = true

export {
  routes
}
