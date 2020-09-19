<!--
  @desc     管理员 用户管理界面入口 User.vue
  @author   yijie
  @date     2020-09-18 15:52
  @logs[0]  2020-09-18 15:52 yijie 创建了User.vue文件
-->
<template>
  <div class="admin-manage-user">
    <router-tab :tabs="[
        '/admin/manage/user'
      ]"/>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-manage-user {
  padding: 30px;
  /deep/ .router-tab__item.is-active,
  /deep/ .router-tab__item:hover {
    color: map-get($use-colors, background);
  }
}
</style>
