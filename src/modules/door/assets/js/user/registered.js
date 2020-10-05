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
    clickBottomBtn (clickIndex) {
      switch (clickIndex) {
        case 1:
          // 上一步
          this.curPageIndex -= 1
          break
        case 2:
          // 下一步
          this.checkValue(
          ).then(_ => {
            this.curPageIndex += 1
          }).catch(e => {
            this.$message({
              type: 'warning',
              message: e.message
            })
          })
          break
        case 3:
          // 提交
          if (!RegExp('^[0-9]{6,16}$').test(this.form.qqNum)) {
            this.$message({
              type: 'warning',
              message: 'qq号码不符合格式要求'
            })
            return
          }
          if (this.form.telNum !== '' && !RegExp('^1[3-9]\\d{9}$').test(this.form.telNum)) {
            this.$message({
              type: 'warning',
              message: '电话号码不符合格式要求'
            })
            return
          }
          if (!RegExp('^\\S{1,50}$').test(this.form.invitationCode)) {
            this.$message({
              type: 'warning',
              message: '邀请码不符合格式要求'
            })
            return
          }
          this.isRegistered = true
          doorRpc.user.registered({
            userName: this.form.userName,
            password: this.form.password,
            realName: this.form.realName,
            schoolNum: this.form.schoolNum,
            profession: this.form.profession,
            classNum: this.form.classNum,
            qqNum: this.form.qqNum,
            ...(_ => {
              if (this.form.telNum === '') {
                return {}
              } else {
                return {
                  telNum: this.form.telNum
                }
              }
            })(),
            invitationCode: this.form.invitationCode
          }).then(_ => {
            this.$message({
              type: 'success',
              message: '注册成功'
            })
            this.toLogin()
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
      location.href = process.env.BASE_URL + 'door/user/login'
    },
    /**
     * 校验当前页面输入值是否正确
     */
    checkValue () {
      return new Promise((resolve, reject) => {
        const specialCharPattern = '-,_,.,@'
        const zhPattern = '\u4E00-\u9FA5'
        const letterPattern = 'a-z,A-Z'

        let min, max, pattern
        switch (this.curPageIndex) {
          case 1:
            min = 3; max = 12
            pattern = '^' + '[' + letterPattern + ']' + '[' + zhPattern + ',' + letterPattern + ',\\d,' + specialCharPattern + ']{' + min + ',' + max + '}'
            if (!RegExp(pattern).test(this.form.userName)) {
              reject(new Error('用户名不符合格式要求'))
            }

            min = 5; max = 20
            pattern = '^[' + letterPattern + ',\\d,' + specialCharPattern + ']{' + min + ',' + max + '}'
            if (!RegExp(pattern).test(this.form.password)) {
              reject(new Error('密码不符合格式要求'))
            }
            if (this.form.password !== this.form.confirmPassword) {
              reject(new Error('确认密码和原密码不一致'))
            }
            break
          case 2:
            if (!RegExp('^[\u4E00-\u9FA5]{2,5}$').test(this.form.realName)) {
              reject(new Error('真实姓名不符合格式要求'))
            }
            if (!RegExp('^20[0-9]{10}$').test(this.form.schoolNum)) {
              reject(new Error('学号不符合格式要求'))
            }
            if (!RegExp('^[\u4E00-\u9FA5]{2,20}$').test(this.form.profession)) {
              reject(new Error('专业名不符合格式要求'))
            }
            if (!RegExp('^[0-9]{4}$').test(this.form.classNum)) {
              reject(new Error('班级号不符合格式要求'))
            }
            break
          default:
            reject(new Error('发生了未知错误'))
            break
        }
        resolve()
      })
    }
  }
}
