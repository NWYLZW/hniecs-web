/**
 * @desc      项目webpack配置文件
 * @author    yijie
 * @date      2020-09-05
 * @logs[0]   yijie 2020-09-05 创建了vue.config.js文件
 * @logs[1]   yijie 2020-09-07 修改了头部注释的格式
 */
const resolve = dir => require('path').join(__dirname, dir)

const pages = require('./vue.config/pages.js')
const devServer = require('./vue.config/devServer')

module.exports = {
  // 构建多页面应用，页面的配置
  pages,
  // 开发服务器配置
  devServer,

  publicPath: (_ => {
    if (process.env.NODE_ENV === '') {
      return '/'
    } else if (process.env.NODE_ENV === 'production') {
      return '/web/'
    } else if (process.env.NODE_ENV === 'development') {
      return '/dev_web/'
    }
    return '/web/'
  })(),

  // 打包后的文件的输出目录
  outputDir: 'dist',
  // 配置js、css静态资源二级目录的位置
  assetsDir: 'static',

  // 可以在 Vue 组件中使用 template 选项了，会让应用额外增加 10kb 左右。
  runtimeCompiler: true,
  // 不需要生产环境的 source map，加速生产环境构建。
  productionSourceMap: false,

  // 通过 webpack-merge 合并到最终的配置中。
  configureWebpack: config => {
    // 设置一些全局变量名
    config.resolve.alias = {
      // 合并默认配置
      ...config.resolve.alias,
      // 公用静态资源文件夹
      '@assets': resolve('src/assets'),
      // mock文件夹
      '@mock': resolve('src/mock'),
      // 模块组
      '@modules': resolve('src/modules')
    }

    if (process.env.NODE_ENV === '') {
    } else if (process.env.NODE_ENV === 'production') {
      // 生产环境下才使用cdn 加快页面加载速度
      // 开发环境使用cdn会导致项目无法使用vue tool工具
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT'
      }
    } else if (process.env.NODE_ENV === 'development') {
    } else {
    }
  }
}
