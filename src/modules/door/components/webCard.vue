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
      <div class="mask"
        :class="{
          'is-build': web.is.build
        }">
        <svg class="hniecs-iconsymbol build-svg" aria-hidden="true">
          <use xlink:href="#hniecs-building-001"/>
        </svg>
      </div>
    </el-card>
  </el-tooltip>
</template>

<script>
export default {
  name: 'webCard',
  props: {
    // 网站信息字典
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

  &:hover .mask.is-build {opacity: 1;}
  .mask {
    position: absolute;
    top: 0;left: 0;
    width: 100%; height: 100%;

    opacity: 0;
    background-color: rgba(0, 0, 0, .5);

    transition: .2s;
    .build-svg {
      $size: 72px;

      position: relative;
      top: calc(50% - #{$size}/2);left: calc(50% - #{$size}/2);
      width: $size; height: $size;
    }
  }
}
</style>
