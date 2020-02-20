let babelCore = require('@babel/core')
let loaderUtils = require('loader-utils')
function babel (source) {
  // console.log(this.resourcePath) // 结果 D:\note\webpack_loader\src\index.js
  let options = loaderUtils.getOptions(this)  // 获取配置选项
  let callback = this.async() // 函数是异步
  babelCore.transform(source, {
    ...options,
    sourceMap: true,  // 设置源码映射
    filename: this.resourcePath.split('/').pop() // 命名生成的文件名
  }, function (error, result) {
    callback(error, result.code, result.map)  // 返回错误，源码，源码映射
  })
}
module.exports = babel