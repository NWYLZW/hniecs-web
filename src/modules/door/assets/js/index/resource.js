/*
* @desc:       资源页面js文件 resource.js
* @author:     fengzili
* @createTime: 2020-09-07
*/
export default {
  name: 'resource',
  components: {},
  props: {},
  data () {
    const tags = [{
      name: '热门',
      type: 'danger',
      iconUTF8: '&#xe7a5;'
    }, {
      name: '工具',
      type: 'info',
      iconUTF8: '&#xe76e;'
    }, {
      name: '编程',
      type: 'info',
      iconUTF8: '&#xe6f2;'
    }]
    return {
      activeName: 'all',
      resources: [{
        title: 'VC++6.0 编译器',
        url: 'http://pic.pc6.com/up/2016-3/2016324173047.jpg',
        previewUrl: 'http://pic.pc6.com/up/2016-3/2016324173047.jpg',
        is: {
          star: true
        },
        tags
      }, {
        title: 'dev c++',
        url: 'https://sc.filehippo.net/images/t_app-cover-l,f_auto/p/4095d654-96d0-11e6-87f8-00163ed833e7/1383785401/dev-c-screenshot.png',
        previewUrl: 'https://sc.filehippo.net/images/t_app-cover-l,f_auto/p/4095d654-96d0-11e6-87f8-00163ed833e7/1383785401/dev-c-screenshot.png',
        is: {
          star: false
        },
        tags
      }]
    }
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * 替换页面
     */
    tabChange () {
    }
  },
  mounted () {
  }
}
