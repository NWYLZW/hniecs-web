/**
 * @desp        开发服务器配置 devServer.js
 * @author      yijie
 * @createTime  2020-09-05 15:11
 * @log[0]      2020-09-05 15:11 yijie 创建了该文件
 */
const envs = require('./envs.js')

const apiHosts = [
  'http://www2.fengzli.cn'
]
const allowedHosts = [
  '.fengzli.cn'
]

const publicHost = envs.publicHost || 'localhost'

const devServer = {
  hot: true,
  https: false,
  host: '0.0.0.0',
  port: 9090,
  public: publicHost + '/dev_web/',

  // 配置apis
  proxy: {
    '/dev_web/api': {
      // 跨域
      changeOrigin: true,
      target: apiHosts[0],
      pathRewrite: {
        '^/dev_web/api': apiHosts[0] + '/php_v1_api/'
      }
    }
  },

  // 允许访问的域名们
  allowedHosts
}

module.exports = devServer
