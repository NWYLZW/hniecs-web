/**
 * @desc      主页面js文件 home.js
 * @author    yijie
 * @date      2020-09-07
 * @logs[0]   yijie 2020-09-07 创建了文件home.js
 */
import carouselItem from '@modules/door/components/carouselItem'
import markData from '@modules/door/components/user/markData'
import webCard from '@modules/door/components/webCard'

export default {
  name: 'home',
  components: {
    carouselItem,
    markData,
    webCard
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
     * 刷新服务网站列表
     */
    refresh_services () {
      return new Promise((resolve, reject) => {
        this.$axios.get('/static-json/door/home/services')
          .then(response => {
            this.services = response
            resolve()
          })
      })
    },
    /**
     * 刷新友情链接列表
     */
    refresh_webs () {
      return new Promise((resolve, reject) => {
        this.$axios.get('/static-json/door/home/webs')
          .then(response => {
            this.webs = response
            resolve()
          })
      })
    },
    /**
     * 刷新文章列表
     */
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
    /**
     * 刷新轮播列表
     */
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
