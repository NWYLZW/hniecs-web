<!--
  @desc     网站小卡片
  @author   yijie
  @date     2020-09-10
  @logs[0]  yijie创建了该文件
-->
<template>
  <el-tooltip
    effect="dark" placement="bottom"
    :content="web.is.build?'建设中':web.message">
    <el-card class="web" @click.native="toWeb(web)">
      <img class="icon" :src="web.icoUrl" alt="">
      <div class="label">{{ web.title }}</div>
    </el-card>
  </el-tooltip>
</template>

<script>
export default {
  name: 'webCard',
  props: {
    web: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    /**
     * 前往网站
     * @param web
     */
    toWeb (web) {
      if (web.is.build) {
        this.$message({
          type: 'warning',
          message: '你访问的页面正在紧张建设中'
        })
      }
      if (web.url && !web.is.ban) {
        if (web.is.toNewPage) {
          window.open(web.url, '_blank')
        } else {
          window.location.href = web.url
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.web {
  @extend .a-link;
  position: relative;float: left;
  margin: 9px;
  width: 128px; height: 148px;

  /deep/ .el-card__body {
    padding: {
      top: 10px;bottom: 10px;
      left: 14px;right: 14px;
    };
  }
  .icon {
    width: 100px;height: 100px;
  }
  .label {
    width: 100%;
    text-align: center;

    font: {
      size: 18px;
      weight: bold;
    };
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
