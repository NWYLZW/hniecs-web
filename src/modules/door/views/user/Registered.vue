<!--
  @desc     用户注册界面 Registered.vue
  @author   yijie
  @date     2020-09-30 10:40
  @logs[0]  2020-09-30 10:40 yijie 创建了Registered.vue文件
-->

<template>
  <div class="main" :style="'background-image: url(' + backgroundImages[curPageIndex-1] + ')'">
    <div class="registered-card">
      <div class="header">
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
            <el-input v-model="form.userName"/>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input v-model="form.password" show-password/>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="confirmPassword">
            <el-input v-model="form.confirmPassword" show-password/>
          </el-form-item>
        </div>
        <div
          class="content" :class="{
            'show': curPageIndex === 2
          }">
          <el-form-item label="真实姓名"
                        prop="realName">
            <el-input v-model="form.realName"/>
          </el-form-item>
          <el-form-item label="学号"
                        prop="realName">
            <el-input v-model="form.schoolNum"/>
          </el-form-item>
          <el-form-item label="专业"
                        prop="realName">
            <el-input v-model="form.profession"/>
          </el-form-item>
          <el-form-item label="班级"
                        prop="realName">
            <el-input v-model="form.classNum"/>
          </el-form-item>
        </div>
        <div
          class="content" :class="{
            'show': curPageIndex === 3
          }">
          <el-form-item label="联系QQ"
                        prop="qqNum">
            <el-input v-model="form.qqNum"/>
          </el-form-item>
          <el-form-item label="联系电话"
                        prop="telNum">
            <el-input v-model="form.telNum"/>
          </el-form-item>
          <el-form-item label="邀请码"
                        prop="invitationCode">
            <el-input v-model="form.invitationCode"/>
          </el-form-item>
        </div>
        <div class="bottom-btns">
          <el-button @click="clickBottomBtn(1)" type="primary" v-show="curPageIndex !== 1">上一步</el-button>
          <el-button @click="clickBottomBtn(2)" type="primary" v-if="curPageIndex !== 3">下一步</el-button>
          <el-button @click="clickBottomBtn(3)" type="primary" v-else>提交</el-button>
        </div>
      </el-form>
    </div>
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
