<!--
    @desc     头部导航条 topNavigationBar组件
    @author   fengzili
    @date     2020-09-07
    @logs[0]  fengzili 2020-09-07 创建了文件topNavigationBar.vue
-->
<template>
  <div class="main">
    <div class="left">
      <div class="icon">
        <img alt="" :src="leftIconSrc"/>
      </div>
      <div class="name">{{ name }}</div>
      <div class="navs">
        <div
          :key="index"
          v-for="(navItem, index) in navItems"
          @click="changeNavItem(navItem)"
          class="nav item"
          :class="{
            'sel': selItem === navItem
          }">
          <span class="icon hniecs-iconfont" v-html="navItem.iconUTF8"></span>
          <span class="title">{{ navItem.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topNavigationBar',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    },
    navItems: {
      type: Array,
      default: _ => {
        return []
      }
    }
  },
  data () {
    return {
      leftIconSrc: require('@assets/logo.png'),
      selItem: undefined
    }
  },
  computed: {},
  watch: {},
  methods: {
    changeNavItem (navItem) {
      this.selItem = navItem
      if (this.$route.path !== navItem.url) {
        this.$router.push(navItem.url)
      }
    }
  },
  mounted () {
    this.selItem = this.navItems[0]
  }
}
</script>

<style lang="scss" scoped>
.cant-sel {
  user-select: none;
}
.pointer {
  cursor: pointer;
}

.main {
  @extend .Regular;

  $paddings: 100px;

  position: relative;
  padding: 0 $paddings;
  width: calc(100% - 2*#{$paddings}); height: 72px;
  background-color: map-get($use-colors, background);
  border-radius: 0 0 16px 16px;
  box-shadow: 0 0 15px black;
  > .left {
    @extend .cant-sel;
    $size: 64px;
    top: calc(50% - 32px);

    position: relative;
    height: $size;
    line-height: $size;

    .with-margin-right {
      float: left;
      margin-right: 10px;
    }
    > .icon {
      @extend .with-margin-right;
      width: $size; height: $size;
      > img {
        @extend .pointer;
        width: 100%;height: 100%;
        image-rendering: pixelated;
      }
    }
    > .name {
      @extend .with-margin-right,.pointer;
      color: map-get($use-colors, font-color);
      font: {
        size: 24px;
        weight: 600;
      };
    }
    > .navs {
      @extend .with-margin-right;
      height: $size;

      > .nav.item {
        @extend .with-margin-right, .pointer;
        display: flex;
        justify-content: center;
        min-width: 120px; height: $size;
        text-align: center;
        border-bottom: 4px solid rgba(0, 0, 0, 0);
        color: map-get($use-colors, font-color);
        text-shadow: 0 0 0 map-get($use-colors, font-color);
        transition: .2s;

        > .icon {
          position: relative; float: left;
          font-size: $size/3;
          line-height: $size;
        }
        > .title {
          position: relative; float: left;
        }
      }
      > .nav.item.sel {
        font-size: 20px;
        border-bottom: 4px solid map-get($use-colors, border);
        text-shadow: 0 0 10px map-get($use-colors, font-color);
      }
    }
  }
}
</style>
