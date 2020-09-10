/**
 * @desc    字体管理帮助 fontHelper.js
 *          接收node 参数将字体文件名设置为新字体文件名
 * @author  yijie
 * @date    2020-09-10 16:02
 * @log[0]  2020-09-10 16:02 yijie 创建了fontHelper.js文件
 */
const fs = require('fs')

const config = {
  remoteFileName: 'font_2049434_urfa2u8hvn',
  path: {
    'font.scss': './src/assets/style/font.scss',
    'ali-symbol-font.dev.js': './public/index.dev.html',
    'ali-symbol-font.pro.js': './public/index.pro.html'
  }
}

config.remoteFileName = process.argv.splice(2)[0] || config.remoteFileName

const replaceFontFileName = (filePath, re, replacedStr) => {
  let fileContent = fs.readFileSync(
    filePath
  ).toString()
  fs.writeFileSync(filePath,
    fileContent.replace(re, replacedStr)
  )
  console.log(filePath + '文件修改成功')
}

const filePathList = [
  config.path['font.scss'],
  config.path['ali-symbol-font.dev.js'],
  config.path['ali-symbol-font.pro.js'],
]
for (let i = 0; i < filePathList.length; i++) {
  replaceFontFileName(
    filePathList[i],
    /at.alicdn.com\/t\/(.*)\./g,
    'at.alicdn.com/t/' + config.remoteFileName + '.')
}
