/**
 * @desc        开发服务器配置 devServer.js
 * @author      yijie
 * @createTime  2020-09-05 15:11
 * @logs[0]      2020-09-05 15:11 yijie 创建了该文件
 */
const envs = require('./envs.js')

const apiHosts = [
  // 'http://hniecs.com',
  'http://hniecs.fengzli.cn',
  'http://localhost:10000'
]
const allowedHosts = [
  // '.hniecs.com',
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
    '/static-json/': {
      // 跨域
      changeOrigin: true,
      target: apiHosts[0],
      pathRewrite: {
        '^/static-json/': apiHosts[0] + '/static-json/'
      }
    },
    '/spring-api/': {
      // 跨域
      changeOrigin: true,
      target: apiHosts[1],
      pathRewrite: {
        '^/spring-api/': apiHosts[1]
      }
    }
  },

  // 允许访问的域名们
  allowedHosts
}

module.exports = devServer
