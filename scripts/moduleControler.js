/**
 * @desp        module管理控制 moduleControler.js
 * @author      yijie
 * @createTime  2020-09-05 16:05
 * @log[0]      2020-09-05 16:05 yijie 创建了该文件
 */
const fs    = require('fs')

const tool  = require('./tool')

const config = {
  // modulesPath: '../src/modules'
  modulesPath: './',
  module_config: {
    assets_name     : 'assets',
    components_name : 'components',
    views_name      : 'views'
  }
}

class moduleControler {
  _modules = []

  static create () {
    return new Promise((resolve, reject) => {
      this.init()
        .then(args => {
          resolve(new moduleControler(args))
        }).catch(err => {
          reject(err)
        })
    })
  }
  static init () {
    return new Promise((resolve, reject) => {
      Promise.all([
        tool.getFoldersByPath(config.modulesPath)
      ]).then(([folders]) => {
        resolve({
          modules: folders
        })
      }).catch(err => {
        reject(err)
      })
    })
  }

  _getInput (label) {
    return new Promise(resolve => {
      const rl = require('readline')
        .createInterface(process.stdin, process.stdout)

      rl.question(label, input => {
        rl.close()
        resolve(input)
      })
    })
  }
  constructor ({modules}) {
    this._modules = modules
  }

  menus = [{
    name:     '模块列表',
    message:  '展示已有模块列表',
    fun:      _ => {
      return new Promise((resolve, reject) => {
        this.showModules()
        resolve()
      })
    }
  },{
    name:     '创建模块',
    message:  '创建一个新的应用模块',
    fun:      _ => {
      return new Promise((resolve, reject) => {
        this.mkNewModule()
          .then(message => {
            console.log(message)
            moduleControler.init()
              .then(({modules}) => {
                this._modules = modules
                resolve()
              }).catch(err => {
                console.log(err)
                reject()
              })
          }).catch(err => {
            console.log(err)
            resolve()
          })
      })
    }
  },]
  menu () {
    console.log('=====================================')
    this.menus.forEach((item, index) => {
      console.log((index + 1) + '.', item.name)
    })
    console.log('=====================================')
    return new Promise((resolve, reject) => {
      this._getInput('输入你的选择')
        .then(index => {
          this.menus[index - 1].fun()
            .then(resolve)
            .catch(reject)
        })
    })
  }

  showModules () {
    console.log('现在已有' + this._modules.length + '个模块')
    this._modules.forEach((module, index) => {
      console.log((index+1)+ '.', module)
    })
  }
  _mkModule (moduleName, module_config) {
    const modulePath = config.modulesPath + moduleName

    const assets_name     = (module_config && module_config.assets_name)      || '/assets'
    const components_name = (module_config && module_config.components_name)  || '/components'
    const views_name      = (module_config && module_config.views_name)       || '/views'

    const createFolderByPrint = path => {
      return new Promise((resolve, reject) => {
        tool.createFolder(path)
          .then(path => {
            console.log('create folder success =>' + path)
            resolve(path)
          }).catch((err, path) => {
            console.log('create folder error =>' + path)
            reject(err, path)
          })
      })
    }
    const createAssets = _ => {
      return new Promise((resolve, reject) => {
        createFolderByPrint(modulePath + assets_name)
          .then(path => {
            Promise.all([
              createFolderByPrint(modulePath + assets_name + '/css'),
              createFolderByPrint(modulePath + assets_name + '/image'),
              createFolderByPrint(modulePath + assets_name + '/js')
            ]).then(([css_path, image_path, js_path]) => {
              resolve()
            }).catch(reject)
          }).catch(reject)
      })
    }

    return new Promise((resolve, reject) => {
      fs.mkdir(modulePath, err => {
        if (err) {
          reject(err)
        }
        Promise.all([
          createAssets(),
          createFolderByPrint(modulePath + components_name),
          createFolderByPrint(modulePath + views_name),
        ]).then(_ => {
          resolve('新模块创建成功')
        }).catch((err, path)=> {
          reject(err)
        })
      })
    })
  }
  mkNewModule () {
    return new Promise((resolve, reject) => {
      this._getInput('输入新模块名: ')
        .then(newModuleName => {
          if (this._modules.indexOf(newModuleName) !== -1) {
            reject('目录下已存在该名字模块')
            return;
          }
          this._mkModule(newModuleName, config.module_config)
            .then(message => {
              resolve(message)
            }).catch(reject)
        })
    })
  }
}

const moduleControlerPromise = moduleControler.create()

moduleControlerPromise
  .then(mc => {
    const fun = _ => {
      mc.menu()
        .then(fun)
        .catch(_ => {})
    }
    fun()
  }).catch(err => {
    console.log(err)
  })
