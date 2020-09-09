/**
 * @desc    axios配置文件 config.js
 * @author  yijie
 * @date    2020-09-09 21:21
 * @log[0]  2020-09-09 21:21 yijie 创建了config.js文件
 */
export default {
  // 请求超时时间
  timeout: 60 * 1000,
  heards: {
    // 将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }
}
