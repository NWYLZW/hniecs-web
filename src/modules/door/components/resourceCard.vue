<!--
  @desc    资源卡片 resourceCard.vue
  @author  yijie
  @date    2020-09-10 20:05
  @logs[0]  2020-09-10 20:05 yijie 创建了resourceCard.vue文件
-->

<template>
  <el-card class="resource" shadow="hover">
    <el-image fit="scale-down"
              :src="resource.previewUrl"/>
    <div class="mask-options">
      <el-button :icon="'el-icon-star' + (resource.is.star?'-on':'-off')" circle/>
      <el-button icon="el-icon-info" circle/>
      <el-button icon="el-icon-share" circle/>
    </div>
    <div class="title">{{ resource.title }}</div>
    <div class="tags">
      <el-tag class="tag"
              :key="index"
              v-for="(tag, index) in resource.tags"
              :type="tag.type">
        <span class="hniecs-iconfont" v-html="tag.iconUTF8"/>{{ tag.name }}
      </el-tag>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'resourceCard',
  props: {
    resource: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.resource {
  position: relative;float: left;
  margin: 10px;
  width: 250px; height: 381px;

  /deep/ .el-card__body {
    padding: 0px;
    .el-image {
      margin: 20px;
      width: 210px; height: 260px;
      border-bottom: 1px solid gray;
      transition: .2s;

      &:hover + .mask-options {
        top: 24px;
      }
    }
    .mask-options {
      position: absolute;
      top: -100%; left: 24px;
      transition: .2s;
    }
    .mask-options:hover {
      top: 24px;
    }

    .title {
      @extend .a-link;
      padding-left: 10px;
      color: #7f7f7f;
      font-weight: bold;
    }
    .tags {
      .tag {
        margin: 5px;
      }
    }
    &:hover .el-image {
      margin: 0px;
      width: 250px; height: 300px;
    }
  }
}
</style>
