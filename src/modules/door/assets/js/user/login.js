/**
 * @desc    登陆界面 login.js
 * @author  yijie
 * @date    2020-09-30 10:45
 * @logs[0] 2020-09-30 10:45 yijie 创建了login.js文件
 */
export default {
  name: 'Login',
  data () {
    return {
      // 是否正在登陆
      isLogin: false,
      // 是否记住我
      isRemenberMe: false,
      // 是否展示注册入口
      showRegisterEntrance: true,
      // 登陆表单
      form: {
        userName: '',
        pwd: ''
      },
      // 表单验证规则
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 12, message: '用户名长度错误', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 20, message: '密码长度错误', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    isRemenberMe () {
      localStorage.setItem('login-isRemenberMe', this.isRemenberMe)
      if (!this.isRemenberMe) {
        localStorage.removeItem('remenber-user-loginData')
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
      if (this.$route.query.redirect === undefined) {
        this.$router.push({ name: 'door-index-home' })
      } else {
        this.$router.push(this.$route.query.redirect)
      }
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
      this.isLogin = true
      this.validateLoginForm(
      ).then(_ => {
        this.$store
          .dispatch(
            'user/login',
            [this.form.userName, this.form.pwd]
          ).then(_ => {
            this.isLogin = false
            this.loginSuccess()
          }).catch(err => {
            this.isLogin = false
            this.$message({
              type: 'error',
              message: err.message
            })
          })
      }).catch(_ => {
        this.isLogin = false
      })
    },
    /**
     * 前往注册页面
     */
    toRegisterView () {
      this.$router.push({
        name: 'registered',
        query: this.$route.query
      })
    }
  },
  mounted () {
    this.isRemenberMe = (localStorage.getItem('login-isRemenberMe') === 'true')
    if (this.isRemenberMe) {
      let user = localStorage.getItem('remenber-user-loginData')
      if (user != null) {
        user = JSON.parse(user)
        this.form.userName = user.userName
        this.form.pwd = '密码已加密'
      }
    }
  }
}
