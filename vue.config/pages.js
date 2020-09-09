/**
 * @desc        构建多页面应用，页面的配置 pages.js
 * @author      yijie
 * @createTime  2020-09-05 15:09
 * @log[0]      2020-09-05 15:09 yijie 创建了该文件
 */
const pages = {
  index: {
    // page 的入口
    entry: 'src/main.js',
    // 模板来源
    template: (_ => {
      if (process.env.NODE_ENV === '') {
        return '/'
      } else if (process.env.NODE_ENV === 'production') {
        return 'public/index.pro.html'
      } else if (process.env.NODE_ENV === 'development') {
        return 'public/index.dev.html'
      }
      return 'public/index.pro.html'
    })(),
    // 在 dist/index.html 的输出
    filename: 'index.html',
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', 'index']
  }
}
module.exports = pages
