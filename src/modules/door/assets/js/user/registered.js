/**
 * @desc    注册界面js registered.js
 * @author  yijie
 * @date    2020-09-30 10:47
 * @logs[0] 2020-09-30 10:47 yijie 创建了registered.js文件
 */
export default {
  name: 'registered',
  data () {
    return {
      // 背景图列表
      backgroundImages: [
        process.env.BASE_URL + 'static/images/door/backgroundImages/01.png',
        process.env.BASE_URL + 'static/images/door/backgroundImages/02.png',
        process.env.BASE_URL + 'static/images/door/backgroundImages/04.png'
      ],
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
          this.curPageIndex += 1
          break
        case 3:
          // 提交
          break
        default: break
      }
    }
  }
}
