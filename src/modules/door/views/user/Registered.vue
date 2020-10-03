<!--
  @desc     用户注册界面 Registered.vue
  @author   yijie
  @date     2020-09-30 10:40
  @logs[0]  2020-09-30 10:40 yijie 创建了Registered.vue文件
-->

<template>
  <div class="main">
    <div v-loading="isRegistered" class="registered-card">
      <div class="header">
        <div class="back-login" @click="toLogin">
          <i class="hniecs-iconfont"
             style="display: inline-block;transform: rotate(90deg)"
             v-html="'&#xe665;'"/>
          返回登陆
        </div>
        <img class="icon-image" src="@assets/image/logo.svg" alt="None">
        <div class="steps">
          <div
            :key="index"
            v-for="index in 3"
            class="step" :class="{
              'pass': index < curPageIndex,
              'sel': index === curPageIndex
            }"/>
        </div>
      </div>
      <el-form ref="registered-form" :model="form">
        <div
          class="content" :class="{
            'show': curPageIndex === 1
          }">
          <el-form-item label="用户名"
                        prop="userName">
            <el-input v-model="form.userName" placeholder="字母or中文or数字or-or_or.or@ (不能以 数字，特殊字符，中文 开头) 4-12位"/>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input v-model="form.password" placeholder="字母or中文or数字or-or_or.or@ 5-20位" show-password/>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="confirmPassword">
            <el-input v-model="form.confirmPassword" placeholder="再次输入上方密码，进行确认" show-password/>
          </el-form-item>
        </div>
        <div
          class="content" :class="{
            'show': curPageIndex === 2
          }">
          <el-form-item label="真实姓名"
                        prop="realName">
            <el-input v-model="form.realName" placeholder="上交到学校，登记入册(勿乱填)"/>
          </el-form-item>
          <el-form-item label="学号"
                        prop="realName">
            <el-input v-model="form.schoolNum" placeholder="上交到学校，登记入册(勿乱填)"/>
          </el-form-item>
          <el-form-item label="专业"
                        prop="realName">
            <el-input v-model="form.profession" placeholder="上交到学校，登记入册(勿乱填)"/>
          </el-form-item>
          <el-form-item label="班级"
                        prop="realName">
            <el-input v-model="form.classNum" placeholder="上交到学校，登记入册(勿乱填)"/>
          </el-form-item>
        </div>
        <div
          class="content" :class="{
            'show': curPageIndex === 3
          }">
          <el-form-item label="联系QQ"
                        prop="qqNum">
            <el-input v-model="form.qqNum" placeholder="用于拉你进会员群，确认后填写"/>
          </el-form-item>
          <el-form-item label="联系电话"
                        prop="telNum">
            <el-input v-model="form.telNum" placeholder="选填"/>
          </el-form-item>
          <el-form-item label="邀请码"
                        prop="invitationCode">
            <el-input v-model="form.invitationCode" placeholder="扫码财务收款码 交易后的订单号"/>
          </el-form-item>
        </div>
        <div class="bottom-btns">
          <el-button @click="clickBottomBtn(1)" type="primary" v-show="curPageIndex !== 1">上一步</el-button>
          <el-button @click="clickBottomBtn(2)" type="primary" v-if="curPageIndex !== 3">下一步</el-button>
          <el-button @click="clickBottomBtn(3)" type="primary" v-else>提交</el-button>
        </div>
      </el-form>
    </div>
    <remote-js :src="digitalrainSrc"/>
  </div>
</template>

<script src="../../assets/js/user/registered.js"></script>

<style lang="scss" scoped>
@import "~@/modules/door/assets/style/registered.scss";
.content /deep/ .el-form-item {
  margin-bottom: 10px;
  .el-form-item__label {
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-shadow: 0 0 10px gray;
  }
  .el-input__inner {
    background-color: rgba(255, 255, 255, .5);
  }
}
</style>
