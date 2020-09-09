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
      carousels: [],
      // 文章
      articles: [],
      // 是否展示服务
      showServices: true,
      // 服务
      services: [],
      // 是否展示友链
      showWebs: true,
      // 友情链接
      webs: []
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
      if (web.is.build) {
        this.$message({
          type: 'warning',
          message: '你访问的页面正在紧张建设中'
        })
      }
      if (web.url && !web.is.ban) {
        if (web.is.toNewPage) {
          window.open(web.url, '_blank')
        } else {
          window.location.href = web.url
        }
      }
    },
    refresh_services () {
      return new Promise((resolve, reject) => {
        this.$axios.get('/static-json/door/home/services')
          .then(response => {
            this.services = response
            resolve()
          })
      })
    },
    refresh_webs () {
      return new Promise((resolve, reject) => {
        this.$axios.get('/static-json/door/home/webs')
          .then(response => {
            this.webs = response
            resolve()
          })
      })
    },
    refresh_articles () {
      return new Promise((resolve, reject) => {
        this.$axios.get('/static-json/door/home/articles')
          .then(response => {
            response.forEach(item => {
              item.showTitle = function () {
                const maxLength = 8
                if (this.title.length > maxLength) {
                  this.showTooltip = true
                  return this.title.slice(0, maxLength) + '...'
                }
                this.showTooltip = false
                return this.title
              }
            })
            this.articles = response
            resolve()
          })
      })
    },
    refresh_carousels () {
      return new Promise((resolve, reject) => {
        this.$axios.get('/static-json/door/home/carousels')
          .then(response => {
            this.carousels = response
            resolve()
          })
      })
    }
  },
  mounted () {
    Promise.all([
      this.refresh_services(),
      this.refresh_webs(),
      this.refresh_articles(),
      this.refresh_carousels()
    ]).then(_ => {
    })
  }
}
