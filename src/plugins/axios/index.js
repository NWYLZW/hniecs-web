/**
 * @desc    axios插件 index.js
 * @author  yijie
 * @date    2020-09-09 21:14
 * @log[0]  2020-09-09 21:14 yijie 创建了index.js文件
 * @log[1]  2020-09-09 21:52 yijie 抽离拦截器
 */
import axios from 'axios'

// 创建实例
const _axios = axios.create(require('./config.js').default)
// 请求拦截器
_axios.interceptors.request.use(
  ...require('./interceptors.js').default.response
)
// 响应拦截器
_axios.interceptors.response.use(
  ...require('./interceptors.js').default.response
)
export default _axios
