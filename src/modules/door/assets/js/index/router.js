/**
 * @desc      门户模块入口应用的路由文件 router.js
 * @author    yijie
 * @date      2020-09-07
 * @logs[0]   yijie 2020-09-07 创建了文件router.js
 */

export default [{
  path: '/door/index/index',
  name: 'door-index-index',
  component: _ => import(
    /* webChunkName: "door-index" */
    '@modules/door/views/index/Index.vue'
  ),
  meta: {
    title: '湖南工程学院计算机协会'
  },
  children: [{
    path: '/door/index/home',
    name: 'door-index-home',
    component: _ => import(
      /* webChunkName: "door-index" */
      '@modules/door/views/index/Home.vue'
    ),
    meta: {
      title: '湖南工程学院计算机协会 首页'
    }
  }, {
    path: '/door/index/resource',
    name: 'door-index-resource',
    component: _ => import(
      /* webChunkName: "door-index" */
      '@modules/door/views/index/Resource.vue'
    ),
    meta: {
      title: '协会资源'
    }
  }, {
    path: '/door/index/mall',
    name: 'door-index-mall',
    component: _ => import(
      /* webChunkName: "door-index" */
      '@modules/door/views/index/Mall.vue'
    ),
    meta: {
      title: '协会集市'
    }
  }]
}]
