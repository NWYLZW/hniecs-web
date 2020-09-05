/**
 * @desp        nodejs帮助方法 tool.js
 * @author      yijie
 * @createTime  2020-09-05 16:24
 * @log[0]      2020-09-05 16:24 yijie 创建了该文件
 */
const fs = require('fs')

/**
 * 获取目录下的文件夹列表
 * @param path 路径
 * @returns {Promise<unknown>} then(foler => {}).catch(err => {})
 */
const getFoldersByPath = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err)
      }
      const folders = []

      const fun = (i) => {
        if(i===files.length){
          resolve(folders)
          return
        }
        fs.stat(path+files[i], (err,stats) => {
          if(stats.isDirectory()){
            folders.push(files[i])
          }
          fun(i+1)
        })
      }
      fun(0);
    })
  })
}

/**
 * 创建一个目录
 * @param path 创建的文件夹路径
 * @returns {Promise<unknown>} then(path => {}).catch((err, path) => {})
 */
const createFolder = path => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
      if (err) {
        reject(err, path)
      }
      resolve(path)
    })
  })
}

module.exports = {
  getFoldersByPath,
  createFolder
}
