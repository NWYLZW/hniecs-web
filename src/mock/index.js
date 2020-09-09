/**
 * @Description mock总路由转发模块
 * @Author      yijie
 * @Date        2020-08-20

 * @logs[0]     yijie 2020-08-20 完善头部注释格式,完成路由分发架构
 * @logs[1]     yijie 2020-08-25 修改头部注释格式，修复post_obj在get模式下无法被JSON.parse解析的错误
 */
// 引入mockjs
import Mock from 'mockjs'
// Mock函数
const { mock } = Mock

/**
 * 获取url中的query参数
 * @param url
 */
function getQueryObject (url) {
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  var obj = {}
  var reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, function (rs, key, value) {
    var name = decodeURIComponent(key)
    var val = decodeURIComponent(value)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
/**
 * 处理mock请求，进行动态导包
 * @param {*} options
 */
function index (options) {
  // 解析url参数
  const execResult = /\/mock_api\/(\w+)\/(\w+)\/(\w+)\??(.*)/.exec(options.url)
  const appName = execResult[1]
  const moduleName = execResult[2]
  const actionName = execResult[3]
  const queryStr = execResult[4]
  const queryObj = getQueryObject(queryStr)

  // 动态导包
  const module = require('@mock/' + appName + '/' + moduleName + '.js').default

  const callbackFun = module[actionName]
  // TODO 设置忽略路由
  // 没有该mock接口
  if (callbackFun === undefined) {
    return {
      error_code: 404,
      error_msg: 'mock接口不存在'
    }
  }
  // 调用mock接口
  return module[actionName]({
    method: options.type,
    query_obj: queryObj,
    post_obj: (_ => {
      try {
        return JSON.parse(options.body)
      } catch (e) {
        return {}
      }
    })()
  })
}
// 使用拦截规则拦截命中的请求
mock(/.*\/mock_api\/.*/, 'get', index)
mock(/.*\/mock_api\/.*/, 'post', index)
