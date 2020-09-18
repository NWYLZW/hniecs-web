/**
 * @desc    开发环境下的基础配置信息 dev.js
 * @author  yijie
 * @date    2020-09-07 00:00
 * @logs[0] 2020-09-07 00:00 yijie 创建了文件dev.js
 * @logs[1] 2020-09-11 00:00 yijie 抽离vueConfig置于config/index.js中统一配置
 * @logs[2] 2020-09-18 13:26 yijie 添加adminRounter
 */
import doorRouter from '@modules/door/assets/js/router.js'
import adminRouter from '@modules/admin/assets/js/router'

const routes = [
  ...doorRouter,
  ...adminRouter
]

const vueConfig = {
  devtools: true
}

export {
  routes,
  vueConfig
}
