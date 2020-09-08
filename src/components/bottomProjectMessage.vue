<template>
  <div class="bottomProjectMessage-main">
    <div class="left">
      {{ schoolName }}计算机协会 (HNIECS)原名 {{ schoolName }}网络爱好者协会，是由{{ schoolName }}网络技术和开源软件爱好者、技术宅组成的团体。
    </div>
    <div class="right">
      <div class="contact-us">
        <div class="title">联系我们</div>
        <div class="hniecs-iconfont contact-method">&#xe646; 会长(1003975097)</div>
        <div class="hniecs-iconfont contact-method">&#xe646; 财务(1159496388)</div>
        <div class="hniecs-iconfont contact-method">&#xe600; admin@hniecs.com</div>
        <div class="hniecs-iconfont contact-method">&#xe69e; None</div>
        <div class="hniecs-iconfont contact-method">&#xe6ea; github</div>
        <div class="hniecs-iconfont contact-method">&#xe8c7; telegram(向我们发送邮件申请)</div>
      </div>
      <div class="join-us">
        <div class="title">加入我们</div>
        <el-popover
          width="250"
          placement="top"
          trigger="hover">
          <div slot="reference" class="hniecs-iconfont contact-method">&#xe646; 2020届新生交流群 163484122</div>
          <img class="qrcode" alt="" :src="qqQrcodeSrc"/>
        </el-popover>
      </div>
      <div class="icon">
        <img alt="" :src="rightIconSrc"/>
      </div>
    </div>
    <div class="copyright">© [2020] [湖南工程学院计算机协会]</div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
export default {
  name: 'bottomProjectMessage',
  data () {
    return {
      // 学校名称
      schoolName: '湖南工程学院',
      // 协会图标
      rightIconSrc: require('@assets/image/logo.svg'),
      qqQrcodeSrc: require('@assets/image/qrcode/qq.jpg')
    }
  }
}
</script>

<style lang="scss" scoped>

.qrcode {
  width: 250px;
  height: 420px;
}

.bottomProjectMessage-main {
  background-color: map-get($use-colors, background);
  padding: {
    top: 50px; bottom: 50px;
    left: 300px; right: 300px;
  };

  > .left,> .right{
    float: left;
  }
  > .left {
    padding-top: 10px;
    font-size: 14px;
    color: map-get($use-colors, font-color);
    width: calc(100% - 1000px);
  }
  > .right {
    width: 1000px;

    .contact-us, .join-us {
      float: left;
      margin: {
        left: 20px; right: 20px;
      };
      .title {
        color: map-get($use-colors, font-color);
        font: {
          size: 20px;
          weight: 1000;
        };
      }

      .contact-method {
        @extend .a-link;
        color: map-get($use-colors, font-color);
      }
    }
    .icon {
      float: right;position: relative;
      top: -100px;
      width: 128px; height: 128px;
      img {
        width: 100%; height: 100%;
      }
    }
  }

  > .copyright {
    padding: {
      top: 20px;
    };
    position: relative; float: left;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: map-get($use-colors, font-color);
  }
}
</style>
