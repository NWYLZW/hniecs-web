<!--
    @desc     door.index入口页面 Index页面
    @author   fengzili
    @date     2020-09-07
    @logs[0]  fengzili 2020-09-07 创建了文件Index.vue
-->
<template>
  <div class="main">
    <topNavigationBar
      name="HNIECE"
      :nav-items="[{
        url: '/door/index/index',
        name: '首页', iconUTF8: '&#xe7a7;'
      }, {
        url: '/door/index/index',
        name: '资源', iconUTF8: '&#xe743;'
      }, {
        url: '/door/index/index',
        name: '集市', iconUTF8: '&#xe74e;'
      }]"/>
    <router-view/>
  </div>
</template>

<script>
import topNavigationBar from '@/components/topNavigationBar'

export default {
  name: 'Index',
  components: {
    topNavigationBar
  }
}
</script>

<style scoped>

</style>
