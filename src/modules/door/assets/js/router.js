/**
 * @desc      门户模块路由文件 router.js
 * @author    yijie
 * @date      2020-09-07
 * @logs[0]   yijie 2020-09-07 创建了文件router.js
 * @logs[1]   yijie 2020-09-11 添加userRouter路由
 */
import indexRouter from './index/router.js'
import userRouter from './user/router.js'

export default [
  ...indexRouter,
  ...userRouter
]
