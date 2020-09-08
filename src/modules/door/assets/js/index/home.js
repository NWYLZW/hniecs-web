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
      // 轮播图
      carousels: [{
        title: '计算机协会招新火热进行中',
        message: '计算机协会招新火热进行中，欢迎大家加入计协大家庭',
        url: 'http://hniecs.club',
        backgroundImage: process.env.BASE_URL + 'static/images/door/logo.big.png'
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
      }],
      // 文章
      articles: [{
        title: '计算机协会开始招新了',
        showTooltip: false,
        showTitle: function () {
          const maxLength = 8
          if (this.title.length > maxLength) {
            this.showTooltip = true
            return this.title.slice(0, maxLength) + '...'
          }
          this.showTooltip = false
          return this.title
        },
        content: '又到了一年一度的招新季，迎来了我们新一届的2020级新生...',
        author: 'yijie',
        dateTime: new Date('2020/09/07').getTime()
      }],
      // 是否展示友链
      showWebs: false,
      // 友情链接
      webs: [{
        title: '协会主站',
        icoUrl: '/favicon.ico?time=2020-09-08 21:00',
        url: '/',
        message: '湖南工程学院计算机协会主站点'
      }, {
        title: 'afirehong',
        icoUrl: 'http://afirehong.cn/usr/themes/Miracles/favicon.ico?time=2020-09-08 21:00',
        url: 'http://afirehong.cn/',
        message: 'afirehong'
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
    },
    /**
     * 前往一个友情连接
     * @param web
     */
    toWeb (web) {
      if (web.url) {
        console.log(web)
        window.location.href = web.url
      }
    }
  },
  mounted () {
  }
}
