/**
 * @desc    项目导入外置组件 index.js
 * @author  yijie
 * @date    2020-09-05 14:36
 * @logs[0]  2020-09-05 14:36 yijie 创建了该文件
 * @logs[1]  2020-09-09 21:37 yijie 添加了axios
 */

export default Vue => {
  Vue.prototype.$axios = require('./axios').default
  Vue.use(require('./element-ui.js').default)
  Vue.use(require('./vue-router-tab.js').default)
}
