/**
 * @desc    管理模块路由文件 router.js
 * @author  yijie
 * @date    2020-09-07 00:00
 * @logs[0] 2020-09-07 00:00 yijie 创建了文件router.js
 * @logs[1] 2020-09-19 15:09 yijie 将manage应用视图导入移至该文件
 */

const importView = {
  manage: view => () =>
    import(
      /* webChunkName: "admin-manage" */
      '@modules/admin/views/manage/' + view + '.vue'
    ),
  user: view => () =>
    import(
      /* webChunkName: "admin-user" */
      '@modules/admin/views/user/' + view + '.vue'
    )
}
export {
  importView
}

export default [
  ...require('./mannage/router.js').default
]
