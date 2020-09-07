/**
 * @desc      主页面js文件 home.js
 * @author    yijie
 * @date      2020-09-07
 * @logs[0]   yijie 2020-09-07 创建了文件home.js
 */
import markData from '@modules/door/components/user/markData'

export default {
  name: 'home',
  components: {
    markData
  },
  props: {},
  data () {
    return {
      carousels: [{
        title: '计算机协会火热招新',
        message: '计算机协会火热招新中，欢迎大家加入计协大家庭',
        url: 'http://hniecs.club',
        backgroundImage: '/static/images/door/logo.big.png'
      }, {
        title: '百度一下，你就知道',
        message: '本协会已与百度达成战略合作关系',
        url: 'http://baidu.com',
        backgroundImage: 'https://www.baidu.com/img/flexible/logo/pc/result.png'
      }, {
        title: '谷歌一下，你就知道',
        message: '本协会已与谷歌达成战略合作关系',
        url: 'http://google.com',
        backgroundImage: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }, {
        title: '必应一下，你就知道',
        message: '本协会已与必应达成战略合作关系',
        url: 'http://bing.com',
        backgroundImage: 'https://cn.bing.com/sa/simg/hpc27i.png'
      }]
    }
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * 前往轮播图详情页面
     * @param carousel 轮播图字典
     */
    toDetailUrl (carousel) {
      window.open(carousel.url, '_blank')
    }
  },
  mounted () {
  }
}
