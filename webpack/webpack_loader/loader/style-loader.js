/**
 * style-loader：将样式通过<style>标签插入到head中
 */

let loaderUtils = require('loader-utils')

function loader (source) {
  let str = `
  let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)`
  // JSON.stringify(source) 不仅将源码都转成字符串，还将回车转成\r\n ==>style.innerHTML = 'body{\r\n background: red}'
  return str
}
// 在style-loader上写了pitch，让style-loader 处理 less-loader 和css-loader拼接的结果
// webpack.config.js顺序：use: ['style-loader', 'css-loader', 'less-loader']
loader.pitch = function (remainingRequest) { // 剩余的请求  less-loader!css-loader!/./background.less
  // console.log("remainingRequest:", remainingRequest)
  // 打印结果： D:\note\webpack_loader\loader\css-loader.js!D:\note\webpack_loader\loader\less-loader.js!D:\note\webpack_loader\src\background.less
  
  // console.log("loaderUtils.stringifyRequest: ", loaderUtils.stringifyRequest(this, '!!' + remainingRequest))
  // 打印结果： !!../loader/css-loader.js!../loader/less-loader.js!./background.less
  let str = `
  let style = document.createElement('style')
  style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})
  document.head.appendChild(style)`
  // // 添加！表示该loader为行内，loaderUtils.stringifyRequest将其路径变为相对路径
  return str
}

module.exports = loader