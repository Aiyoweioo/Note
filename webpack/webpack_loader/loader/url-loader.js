let loaderUtils = require('loader-utils')
let mime = require('mime') // 获取文件后缀
function loader(source) {
  let {limit} = loaderUtils.getOptions(this)
  if (limit && limit > source.length) { // 如果文件小于限制，用base64编码，base64格式：data:image/png;base64,编码部分
    // ${mime.getType(this.resourcePath)}代表文件后缀
    return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
  } else { // 大于限制，直接使用file-loader
    return require('./file-loader').call(this, source)
  }
}

loader.raw = true
module.exports = loader