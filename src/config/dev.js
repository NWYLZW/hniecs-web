/**
 * @desc      开发环境下的基础配置信息 dev.js
 * @author    yijie
 * @date      2020-09-07
 * @logs[0]   yijie 2020-09-07 创建了文件dev.js
 * @logs[1]   yijie 2020-09-11 抽离vueConfig置于config/index.js中统一配置
 */
import doorRouter from '@modules/door/assets/js/router.js'

const routes = [
  ...doorRouter
]

const vueConfig = {
  devtools: true
}

export {
  routes,
  vueConfig
}
