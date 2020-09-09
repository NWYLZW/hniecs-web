/**
 * @desc        module管理控制 modulesControler.js
 * @author      yijie
 * @createTime  2020-09-05 16:05
 * @log[0]      2020-09-05 16:05 yijie 创建了该文件
 */
const fs    = require('fs')

const tool  = require('./tool')
String.prototype.format = function (args) {
  var result = this;
  if (arguments.length > 0) {
    if (arguments.length === 1 && typeof (args) == "object") {
      for (var key in args) {
        if (args[key] !== undefined) {
          var reg = new RegExp("({" + key + "})", "g");
          result = result.replace(reg, args[key]);
        }
      }
    } else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) {
          var reg = new RegExp("({)" + i + "(})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
  }
  return result;
}
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                      // 月份
    "d+": this.getDate(),                           // 日
    "h+": this.getHours(),                          // 小时
    "m+": this.getMinutes(),                        // 分
    "s+": this.getSeconds(),                        // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds()                     // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

const config = {
  // 模块组路径
  modulesPath: '../src/modules/',
  moduleConfig: {
    // 静态文件 文件夹名
    assets_name     : '/assets',
    // 组件 文件夹名
    components_name : '/components',
    // 路由视图 文件夹名
    views_name      : '/views',
    // 模块文档 文件夹名
    docs_name       : '/docs'
  }
}

/**
 * rpc 文件助手
 * @type {{generateRpcJsFileByJson(*)}}
 */
const rpcHelper = {
  /**
   * 通过rpcJson 生成一个rpc.js文件
   * @param rpcJSON
   */
  generateRpcJsFileByJson(rpcJSON) {
    return rpcJSON
  }
}

/**
 * 模块组控制对象
 */
class modulesControler {
  _modules = []

  /**
   * 创建一个modulesControler实例
   * @returns {Promise<unknown>}  .then(mc => {}).catch(err => {})
   */
  static create () {
    return new Promise((resolve, reject) => {
      this.init()
        .then(args => {
          resolve(new modulesControler(args))
        }).catch(err => {
          reject(err)
        })
    })
  }
  /**
   * 初始化modulesControler实例的数据
   * @returns {Promise<unknown>} .then(args => {}).catch(err => {})
   */
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
  /**
   * 模块组控制对象 构造方法
   * @param modules 模块组
   */
  constructor ({modules}) {
    this._modules = modules
  }

  /**
   * 获取用户的一个输入
   * @param label   输入前的提示信息
   * @returns {Promise<unknown>} .then(input => {})
   * @private
   */
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

  // 菜单
  menus = [{
    name:     '模块列表',
    message:  '展示已有模块列表',
    fun:      _ => {
      return new Promise((resolve, reject) => {
        modulesControler.init()
          .then(({modules}) => {
            this._modules = modules
            this.showModules()
            resolve()
          }).catch(err => {
            console.log(err)
            reject()
          })
      })
    }
  }, {
    name:     '创建模块',
    message:  '创建一个新的应用模块',
    fun: _ => {
      return new Promise((resolve, reject) => {
        this.mkNewModule()
          .then(message => {
            console.log(message)
            resolve()
          }).catch(err => {
          console.log(err)
          resolve()
        })
      })
    }
  }, {
    name:     '生成接口',
    message:  '通过module下面的rpc.json自动生成rpc.js文件',
    fun: _ => {
      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }, {
    name:     '生成文档',
    message:  '根据项目下所有的项目相关文件信息，在doc目录下生成指定路径、内容、格式的markdown格式文档',
    fun: _ => {
      return new Promise((resolve, reject) => {
        // TODO 根据项目下所有的项目相关文件信息，在doc目录下生成指定路径、内容、格式的markdown格式文档
        console.log('待开发')
        resolve()
      })
    }
  }, {
    name:     '帮助',
    message:  '输入指令序号，获取指令的介绍信息',
    fun: _ => {
      return new Promise((resolve, reject) => {
        this._getInput('输入指令序号，获取指令的介绍信息\n>>>> ')
          .then(index => {
            if (this.menus[index - 1] === undefined) {
              console.log('未知输入')
              reject()
              return;
            }
            console.log(this.menus[index - 1].name, '指令相关信息:\n' + this.menus[index - 1].message)
            resolve()
          })
      })
    }
  },]
  /**
   * 展示一个菜单
   * @returns {Promise<unknown>} .then(_ => {}).catch(err => {})
   */
  menu () {
    console.log('==========模块控制帮助工具==========')
    let isPrintLn = false;
    for (let i = 0; i < this.menus.length; i++) {
      isPrintLn = false;
      process.stdout.write(
        (i + 1) + '. ' + this.menus[i].name.padEnd(16, ' ')
      );
      if ((i+1) % 2 === 0) {
        isPrintLn = true;
        process.stdout.write('\n');
      }
    }
    if (!isPrintLn) {
      process.stdout.write('\n');
    }
    console.log('====================================')

    return new Promise((resolve, reject) => {
      this._getInput('>>>> ')
        .then(index => {
          if (this.menus[index - 1] === undefined) {
            console.log('未知输入')
            reject()
            return;
          }
          this.menus[index - 1].fun()
            .then(resolve)
            .catch(reject)
        })
    })
  }

  /**
   * 展示已有的模块
   */
  showModules () {
    console.log('现在已有' + this._modules.length + '个模块')
    this._modules.forEach((module, index) => {
      console.log((index+1)+ '.', module)
    })
  }

  /**
   * 创建一个模块
   * @param moduleMessage         模块信息字典 {moduleName, module_CN_Name, createAuthorName}
   * @param moduleConfig          模块配置
   * @returns {Promise<unknown>}  .then(messasge => {}).catch(err)
   * @private
   */
  _mkModule (moduleMessage, moduleConfig) {
    const modulePath      = config.modulesPath + moduleMessage.moduleName

    const assets_name     = (moduleConfig && moduleConfig.assets_name)      || '/assets'
    const components_name = (moduleConfig && moduleConfig.components_name)  || '/components'
    const views_name      = (moduleConfig && moduleConfig.views_name)       || '/views'
    const docs_name       = (moduleConfig && moduleConfig.docs_name)        || '/docs'

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
    const createTemplateFile = (filePath, templateFilePath, format_fun) => {
      return new Promise((resolve, reject) => {
        fs.readFile(templateFilePath, (error, data) => {
          if (error) {
            reject(error)
          }
          tool.newFile(
            filePath, format_fun(
              data.toString()
            )
          ).then(resolve).catch(reject)
        })
      })
    }
    const createAssets = _ => {
      return new Promise((resolve, reject) => {
        createFolderByPrint(modulePath + assets_name)
          .then(assetsPath => {
            const createJsFolder = JsFolderPath => {
              return new Promise((resolve, reject) => {
                createFolderByPrint(JsFolderPath)
                  .then(assetsJsPath => {
                    Promise.all([
                      createFolderByPrint(assetsJsPath + '/common'),
                      tool.newFile(assetsJsPath + '/rpc.json', '[]'),
                      createTemplateFile(assetsJsPath + '/rpc.js', './template/rpc.js', file_content => {
                        return file_content.format({
                          moduleName  : moduleMessage.moduleName + ' ' + moduleMessage.module_CN_Name,
                          author      : moduleMessage.createAuthorName,
                          createDate  : new Date().format('yyyy-MM-dd')
                        })
                      }),
                    ]).then(resolve)
                  }).catch(reject)
              })
            }

            Promise.all([
              createFolderByPrint(assetsPath + '/css'),
              createFolderByPrint(assetsPath + '/image'),
              createJsFolder(assetsPath + '/js')
            ]).then(_ => {
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
          // TODO 添加index.md
          createFolderByPrint(modulePath + docs_name),
        ]).then(_ => {
          resolve(`新模块${moduleMessage.module_CN_Name}创建成功`)
        }).catch((err, path)=> {
          reject(err)
        })
      })
    })
  }
  /**
   * 创建一个新的模块
   * @returns {Promise<unknown>} .then(messasge => {}).catch(err)
   */
  mkNewModule () {
    return new Promise((resolve, reject) => {
      this._getInput('输入新模块名字: ')
        .then(moduleName => {
          if (this._modules.indexOf(moduleName) !== -1) {
            reject('目录下已存在该名字模块')
            return;
          }
          this._getInput('输入新模块中文名字: ').then(module_CN_Name => {
            this._getInput('输入创建者名字: ').then(createAuthorName => {
              this._mkModule({
                moduleName, module_CN_Name, createAuthorName
              }, config.moduleConfig).then(message => {
                resolve(message)
              }).catch(reject)
            })
          })
        })
    })
  }
}

const moduleControlerPromise = modulesControler.create()

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
