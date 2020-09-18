<!--
  @desc     管理员 管理界面入口 index.vue
  @author   yijie
  @date     2020-09-18 15:45
  @logs[0]  2020-09-18 15:45 yijie 创建了index.vue文件
-->
<template>
  <div class="main">
    <topNavigationBar
      name="HNIECE"
      :nav-items="[{
        url: '/admin/manage/user',
        name: '用户', iconUTF8: '&#xeb95;'
      }]"/>
    <router-view/>
    <bottomProjectMessage/>
  </div>
</template>

<script>
import topNavigationBar from '@components/topNavigationBar'
import bottomProjectMessage from '@components/bottomProjectMessage'

export default {
  name: 'Index',
  components: {
    topNavigationBar,
    bottomProjectMessage
  }
}
</script>

<style lang="scss" scoped>
.main {
}
</style>
