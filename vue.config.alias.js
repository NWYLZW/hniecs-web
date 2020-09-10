/**
 * @desc    由于 Vue CLI 3 不再使用传统的 webpack 配置文件，故 WebStorm 无法识别别名
 *          可给 WebStorm 识别别名使用
 *          进入 WebStorm preferences -> Language & Framework -> JavaScript -> Webpack，选择这个文件即可
 *          vue.config.alias
 * @author  yijie
 * @date    2020-09-09 13:47
 * @logs[0]  2020-09-09 13:47 yijie 创建了该文件 vue.config.alias
 */
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      // 公用静态资源文件夹
      '@assets': resolve('src/assets'),
      // 公用组件文件夹
      '@components': resolve('src/components'),
      // store文件夹
      '@store': resolve('src/store'),
      // mock文件夹
      '@mock': resolve('src/mock'),
      // 模块组
      '@modules': resolve('src/modules')
    }
  }
}
