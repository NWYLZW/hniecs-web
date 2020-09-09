/**
 * @desc    拦截器 interceptors.js
 * @author  yijie
 * @date    2020-09-09 21:51
 * @log[0]  2020-09-09 21:51 yijie 创建了interceptors.js文件
 */
import store from '@store'

export default {
  // 请求拦截器
  request: [
    config => {
      // 从vuex里获取token
      const token = store.state.token
      // 如果token存在就在请求头里添加
      token && (config.headers.token = token)
      return config
    },
    error => {
      error.data = {
        code: 1001,
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
        localStorage.removeItem('token')
      }
      // 只返回response中的data数据
      return response.data
    },
    error => {
      if (error) {
        // 请求已发出，但不在2xx范围内
        require('./errorHandler.js').default(error.status, error.data.msg)
        return Promise.reject(error)
      } else {
        // 断网
        return Promise.reject(error)
      }
    }
  ]
}
