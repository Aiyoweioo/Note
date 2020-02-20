let loaderUtils = require('loader-utils')
function loader(source) {
  // file-loader: 目的是根据图片生成md5 发射到dist目录下，file-loader 返回当前图片路径
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]',
   {content: source})
  this.emitFile(filename, source) // 发射文件
  return `module.exports="${filename}"`
}
loader.raw = true // 转成二进制
module.exports = loader