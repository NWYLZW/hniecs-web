<!--
  @desc     轮播图 carouselItem.vue
  @author   yijie
  @date     2020-09-10 20:39
  @logs[0]  2020-09-10 20:39 yijie 创建了carouselItem.vue文件
-->

<template>
  <div class="carousel-item">
    <el-image
      style="position: absolute;width: 100%; height: 100%"
      :src="carousel.backgroundImage" fit="scale-down"/>
    <h3 @click="toDetailUrl(carousel)" class="title">{{ carousel.title }}</h3>
    <h5 @click="toDetailUrl(carousel)" class="message">
      {{ carousel.message }}
    </h5>
  </div>
</template>

<script>
export default {
  name: 'carouselItem',
  props: {
    carousel: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    /**
     * 前往轮播图详情页面
     * @param carousel 轮播图字典
     */
    toDetailUrl (carousel) {
      window.open(carousel.url, '_blank')
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.carousel-item {
  height: 100%;
  transition: .3s;
  border-radius: 8px;

  background-color: #e2e2e2;
  $content-width: calc(100% - 40px);
  h3.title {
    @extend .a-link;
    position: relative;
    width: $content-width;
    bottom: calc(-100% + 40px);left: 20px;
    margin: 0;
    margin-bottom: 10px;
    color: #475669;
    text-align: left;
    transition: .2s;
  }
  h5.message {
    @extend .a-link;
    position: relative;
    width: $content-width;
    bottom: -100%;left: 20px;
    color: #b6bac4;
    text-align: left;
    margin: 0;
    transition: .2s;

    word-break:break-all;
    overflow: hidden;
    line-height:1.5em;height: 4.5em;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  &:hover h3.title {
    bottom: calc(-100% + 120px);
  }
  &:hover h5.message {
    bottom: calc(-100% + 120px);
  }
}
</style>
