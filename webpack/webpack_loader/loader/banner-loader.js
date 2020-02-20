/**
 * 自定义loader:作用是给匹配的js添加一个注释
 */

// 拿到loader的配置
let loaderUtils = require('loader-utils')
// 校验Loader的模块
let validateOptions = require('schema-utils')
// 读取文件
let fs = require('fs')

function loader(source) {
  let options = loaderUtils.getOptions(this)
  let callback = this.async()
  let schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string'
      },
      filename: {
        type: 'string'
      }
    }
  }
  validateOptions(schema, options, 'banner-loader')  // 自己的校验格式， 自己的写的配置， 对应的loader名字说明哪个loader报错
  if (options.filename) {
    this.cacheable(false) // webpack自动会启动缓存，这里设置不要缓存 ，如果计算量很大时，一般需要缓存
    // this.cacheable && this.cacheable() // 第一次就缓存，之后就再缓存
    this.addDependency(options.filename) // 添加到webpack依赖里面去，启动了watch,如果发生了变化，就重新打包
    fs.readFile(options.filename, 'utf-8', function(err, data) {
      callback(err, `/**${data}**/${source}`)
    })
  } else {
    callback(nul, `/**${options.text}**/${source}`)
  }
  return source
}

module.exports = loader