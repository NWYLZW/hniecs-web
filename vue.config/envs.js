/**
 * @desp        获取run项目后的命令行参数 envs.js
 * @author      yijie
 * @createTime  2020-09-05 15:05
 * @log[0]      2020-09-05 15:05 yijie 创建了该文件
 */
const argv = process.argv.splice(3)
const match = /^--env\.(.*)=(.*)/
const envs = {}
for (let i = 0; i < argv.length; i++) {
  const arg = argv[i]
  const envMatch = arg.match(match)
  envs[envMatch[1]] = envMatch[2]
}

module.exports = envs
