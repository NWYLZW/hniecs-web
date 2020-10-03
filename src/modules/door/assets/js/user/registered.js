/**
 * @desc    注册界面js registered.js
 * @author  yijie
 * @date    2020-09-30 10:47
 * @logs[0] 2020-09-30 10:47 yijie 创建了registered.js文件
 */
import doorRpc from '@modules/door/assets/js/rpc.js'

export default {
  name: 'registered',
  components: {
    'remote-js': {
      render (createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src } })
      },
      props: {
        src: { type: String, required: true }
      }
    }
  },
  data () {
    return {
      // 字符雨js文件路径
      digitalrainSrc: process.env.BASE_URL + 'static/js/special/digitalrain.js',
      // 是否正在登陆
      isRegistered: false,
      // 当前正在填写的表单序号
      curPageIndex: 1,
      // 表单字典
      form: {
        // 用户名
        userName: '',
        // 密码
        password: '',
        // 确认密码
        confirmPassword: '',
        // 真实姓名
        realName: '',
        // 学号
        schoolNum: '',
        // 专业
        profession: '',
        // 班级
        classNum: '',
        // qq号码
        qqNum: '',
        // 电话号码
        telNum: '',
        // 邀请码
        invitationCode: ''
      }
    }
  },
  methods: {
    /**
     * 点击了底部的按钮
     * @param clickIndex  按钮的序号
     */
    clickBottomBtn: function (clickIndex) {
      switch (clickIndex) {
        case 1:
          // 上一步
          this.curPageIndex -= 1
          break
        case 2:
          // 下一步
          this.curPageIndex += 1
          break
        case 3:
          // 提交
          this.isRegistered = true
          doorRpc.user.registered({
            userName: this.form.userName,
            password: this.form.password,
            realName: this.form.realName,
            schoolNum: this.form.schoolNum,
            profession: this.form.profession,
            classNum: this.form.classNum,
            qqNum: this.form.qqNum,
            telNum: this.form.telNum,
            invitationCode: this.form.invitationCode
          }).then(_ => {
            this.$message({
              type: 'success',
              message: '注册成功'
            })
          }).catch(_ => {
            this.$message({
              type: 'error',
              message: _.message
            })
          }).finally(_ => {
            this.isRegistered = false
          })
          break
        default:
          break
      }
    },
    /**
     * 前往登陆界面
     */
    toLogin () {
      this.$router.push({
        name: 'login',
        query: this.$route.query
      })
    }
  }
}
