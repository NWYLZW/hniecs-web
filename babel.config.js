module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    '@babel/preset-flow'
  ],
  plugins: [
    // vue-property-decorator 配置
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ]
}
