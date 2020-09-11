<!--
  @desc     用户登陆界面 Login.vue
  @author   yijie
  @date     2020-09-11 15:39
  @logs[0]  2020-09-11 15:39 yijie Login.vue文件
-->

<template>
  <div class="main">
    <div class="login-card">
      <div class="left">
        <div class="top-community-name">HNIECS</div>
        <div class="center-message">Let's Start Now!</div>
        <div class="bottom-to-about">
          <i class="hniecs-iconfont">&#xe601;</i> 关于我们
        </div>
      </div>
      <div class="right">
        <div class="right-top-icon">
          <i class="hniecs-iconfont">&#xe66b;</i>
        </div>
        <div class="right-bottom-copyright">
          © [2020] [湖南工程学院计算机协会]
        </div>
      </div>
      <div class="login-main-form">
        <div class="label with-bottom__border">SIGN UP</div>
        <el-form class="login-form" ref="loginForm" :model="form" :rules="rules">
          <el-form-item prop="userName">
            <el-input v-model="form.userName" placeholder="用户名"/>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input v-model="form.pwd" placeholder="密码" show-password/>
          </el-form-item>
          <el-form-item>
            <el-button class="sumbit-login" type="primary" @click="login">登陆</el-button>
          </el-form-item>
          <el-form-item v-if="showRegisterEntrance">
            <div class="to-register">
              没有账号?点击这里申请一个👉
              <el-link
                @click="toRegisterView"
                type="primary"
                :underline="false">register now</el-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 是否展示注册入口
      showRegisterEntrance: true,
      // 登陆表单
      form: {
        userName: '',
        pwd: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度错误', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 登陆成功
     */
    loginSuccess () {
      this.$message({
        type: 'success',
        message: '登陆成功'
      })
      this.$router.push(this.$route.query.redirect)
    },
    /**
     * 表单验证
     */
    validateLoginForm () {
      return new Promise((resolve, reject) => {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            resolve()
          }
          reject(new Error())
        })
      })
    },
    /**
     * 登陆
     */
    login () {
      if (process.env.NODE_ENV === 'development') {
        sessionStorage.setItem('sessionToken', 'development')
        this.loginSuccess()
        return
      }
      this.validateLoginForm(
      ).then(_ => {
        if (this.form.userName === 'hniecs-community-ub2i5BU7') {
          sessionStorage.setItem('sessionToken', 'production-hack-model')
          this.loginSuccess()
        }
      }).catch(_ => {
      })
    },
    /**
     * 前往注册页面
     */
    toRegisterView () {
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/ui/special-effects.scss';
.main {
  position: absolute;
  width: 100%; height: 100%;

  background-image: url("#{$base-path}/static/images/door/login-background-image-01.jpg");

  .login-card {
    $login-card-size: (
      width: 1000px,
      height: 600px
    );

    position: absolute;

    top: calc(50% - #{map-get($login-card-size, height)}/2);
    left: calc(50% - #{map-get($login-card-size, width)}/2);
    width: map-get($login-card-size, width); height: map-get($login-card-size, height);

    border-radius: 16px;
    box-shadow: 0 0 10px #d0d0d0;

    overflow: hidden;

    .left {
      position: relative;float: left;
      padding: 20px;
      width: calc(50% - 40px); height: calc(100% - 40px);
      backdrop-filter: saturate(180%) blur(20px);

      color: map-get($use-colors, font-color);
      .top-community-name {
        position: relative;
        top: 0;
        font-size: 20px;
        font-weight: bold;
      }
      .center-message {
        position: relative;
        top: 40%;
        font-size: 26px;
      }
      .bottom-to-about {
        @extend .a-link;
        position: relative;
        top: 85%;
        font-size: 14px;
      }
    }
    .right {
      position: relative;float: left;
      width: 50%; height: 100%;
      background-color: rgba(255, 255, 255, .8);
      backdrop-filter: saturate(180%) blur(20px);

      .right-top-icon {
        @extend .a-link;
        position: absolute;
        top: 20px; right: 20px;

        font-size: 20px;
      }
      .right-bottom-copyright {
        position: absolute;
        bottom: 20px; right: 20px;
        font-size: 12px;

        color: #7f7f7f;
      }
    }

    .login-main-form {
      position: absolute;
      padding: 10px;
      left: calc(50% - 225px); top: calc(50% - 250px);
      width: 430px; height: 480px;

      border-radius: 16px;
      box-shadow: 0 0 10px #d0d0d0;
      background-color: #ffffff;
      > .label.with-bottom__border {
        margin: {
          top: 10px;bottom: 30px;
          left: calc(50% - 50px);
        };
        width: 100px; height: 50px;
        text-align: center;
        font-size: 20px;
        line-height: 50px;
        font-weight: bold;
        color: #7b7b7b;

        border-bottom: 3px solid #1f9aff;
      }

      .login-form {
        height: calc(100% - 93px);
        /deep/ .el-input {
          padding: 10px;
          width: calc(100% - 20px);
          .el-input__inner {
            border: none;
            border-bottom: 1px solid #a5a5a5;
            border-radius: 0;
          }
        }
        .sumbit-login {
          @extend .colorful-streamer-button;
          margin-top: 60px;
          margin-left: calc(50% - 100px);
          width: 200px;
          border-radius: 100px;
        }
        .to-register {
          width: 100%;
          text-align: center;
        }
      }
    }
  }
}
</style>
