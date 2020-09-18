/**
 * @desc    处理错误响应码 errorHandler.js
 * @author  yijie
 * @date    2020-09-09 21:31
 * @logs[0] 2020-09-09 21:31 yijie 创建了errorHandler.js文件
 * @logs[1] 2020-09-18 10:02 yijie 添加 401、403 状态的处理
 */

/**
 * 请求失败后的错误统一处理，更多状态码根据业务扩展
 * @param {Number} status 请求失败的状态码
 * @param {Number} other
 */
export default (status, other) => {
  // 状态码判断
  switch (status) {
    case 401:
      // 401: 未登录状态，跳转登录页
      localStorage.removeItem('sessionToken')
      location.reload()
      break
    case 403:
      // 403 token过期,移除本地存储中的token，跳转登录页
      localStorage.removeItem('sessionToken')
      location.reload()
      break
    case 404:
      // 404请求不存在
      break
    default:
      console.log(other)
  }
}
