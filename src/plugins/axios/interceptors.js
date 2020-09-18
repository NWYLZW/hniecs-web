/**
 * @desc    拦截器 interceptors.js
 * @author  yijie
 * @date    2020-09-09 21:51
 * @logs[0] 2020-09-09 21:51 yijie 创建了interceptors.js文件
 * @logs[1] 2020-09-18 10:03 yijie 删除不必要的处理
 */
export default {
  // 请求拦截器
  request: [
    config => {
      return config
    },
    error => {
      error.data = {
        code: 500,
        message: '服务器异常'
      }
      return Promise.reject(error)
    }
  ],
  // 响应拦截器
  response: [
    // 响应后的执行函数
    response => {
      // 清除本地存储中的token,如果需要刷新token，在这里通过旧的token跟服务器换新token，将新的token设置的vuex中
      if (response.data && response.data.code === 401) {
        localStorage.removeItem('sessionToken')
      }
      // 只返回response中的data数据
      return response.data
    },
    error => {
      const response = error.response
      if (error) {
        // 请求已发出，但不在2xx范围内
        require('./errorHandler.js').default(response.status, response.statusText)
        return Promise.reject(error)
      } else {
        // 断网
        return Promise.reject(error)
      }
    }
  ]
}
