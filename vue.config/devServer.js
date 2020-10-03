/**
 * @desc        开发服务器配置 devServer.js
 * @author      yijie
 * @createTime  2020-09-05 15:11
 * @logs[0]     2020-09-05 15:11 yijie 创建了该文件
 * @logs[1]     2020-10-03 17:58 yijie 添加staticApiHost, springApiHost, staticApiPath, springApiPath均从启动参数中获取
 */
const envs = require('./envs.js')

const apiHosts = {
  'static-json': 'http://' +
    (envs.staticApiHost || 'hniecs.com'),
  'spring-api': 'http://' +
    (envs.springApiHost || 'localhost:10000')
}
const apiPaths = {
  'static-json': envs.staticApiPath || '/static-json/',
  'spring-api': envs.springApiPath || '/'
}

const allowedHosts = [
  '.hniecs.com',
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
      target: apiHosts['static-json'],
      pathRewrite: {
        '^/static-json/': apiHosts['static-json'] + apiPaths['static-json']
      }
    },
    '/spring-api/': {
      // 跨域
      changeOrigin: true,
      target: apiHosts['spring-api'],
      pathRewrite: {
        '^/spring-api/': apiHosts['spring-api'] + apiPaths['spring-api']
      }
    }
  },

  // 允许访问的域名们
  allowedHosts
}

module.exports = devServer
