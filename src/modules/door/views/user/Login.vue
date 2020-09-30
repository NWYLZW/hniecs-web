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
      <div class="login-main-form" v-loading="isLogin">
        <div class="label with-bottom__border">SIGN UP</div>
        <el-form class="login-form" ref="loginForm" :model="form" :rules="rules">
          <el-form-item @keypress.native.enter="login" prop="userName">
            <el-input v-model="form.userName" placeholder="用户名"/>
          </el-form-item>
          <el-form-item @keypress.native.enter="login" prop="pwd">
            <el-input v-model="form.pwd" placeholder="密码" show-password/>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="isRemenberMe">记住我</el-checkbox>
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

<script src="../../assets/js/user/login.js"></script>

<style lang="scss" scoped>
@import "~@/modules/door/assets/style/login.scss";
</style>
