/**
 * @desc      门户模块接口层文件 rpc.js
 * @author    yijie
 * @date      2020-09-07
 * @logs[0]   yijie 2020-09-07 创建了rpc.js文件
 */
import axios from '@plugins/axios'
// mock拦截ajax请求 伪造假数据
// import '@mock'

export default {
  user: {
    login () {
      return axios.get()
    }
  }
}
