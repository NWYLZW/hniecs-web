/**
 * @desc      门户模块路由文件 router.js
 * @author    yijie
 * @date      2020-09-07
 * @logs[0]   2020-09-07 yijie 创建了文件router.js
 * @logs[1]   2020-09-11 yijie 添加userRouter路由
 */
const importView = {
  index: view => () =>
    import(
      /* webChunkName: "door-index" */
      '@modules/door/views/index/' + view + '.vue'
    ),
  user: view => () =>
    import(
      /* webChunkName: "door-user" */
      '@modules/door/views/user/' + view + '.vue'
    )
}
export {
  importView
}

export default [
  ...require('./index/router.js').default,
  ...require('./user/router.js').default
]
