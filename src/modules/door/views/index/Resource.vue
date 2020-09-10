<!--
  @desc     资源页面 Resource页面
  @author   yijie
  @date     2020-09-07
  @logs[0]  yijie 2020-09-07 创建了文件Resource.vue
-->
<template>
  <div class="Resource-main">
    <el-carousel height="450px" direction="vertical" :autoplay="false">
      <el-carousel-item
        :key="index"
        v-for="(carousel, index) in carousels">
        <carouselItem :carousel="carousel"/>
      </el-carousel-item>
    </el-carousel>
    <el-tabs
      class="tabs"
      @tab-click="tabChange"
      v-model="activeName">
      <el-tab-pane
        label="全部" name="all"
        class="pane">
        <resourceCard
          :resource="resource"
          :key="index"
          v-for="(resource, index) in resources"/>
      </el-tab-pane>
      <el-tab-pane
        label="工具" name="setting"
        class="pane">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script src="../../assets/js/index/resource.js"></script>

<style lang="scss" scoped>
@import "~@/modules/door/assets/style/resource.scss";
</style>
