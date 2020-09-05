/**
 * @desp        项目导入外置组件 index.js
 * @author      yijie
 * @createTime  2020-09-05 14:36
 * @log[0]      2020-09-05 14:36 yijie 创建了该文件
 */

export default Vue => {
  Vue.use(require('./element-ui.js').default)
}
