/**
 * 生成一个文件描述打包文件的插件
 */

class FileListPlugin {
  constructor ({filename}) {
    this.filename = filename
  }
  apply (compiler) {
    // 文件已经准备好，要进行发射
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      let assets = compilation.assets // assets里包含保存的资源
      console.log("assets", assets)
      let content = `## 文件名 资源大小\r\n` // 文件里默认的字符串
      //  Object.entries()将文件转成数组 [[bundle.js, {}], [index.html, {}]]
      // 如资源：'index.html': { source: [Function: source], size: [Function: size] }
      Object.entries(assets).forEach(([filename, statObj]) => {
        content += `-${filename}  ${statObj.size()}\r\n`
      })
      // 把生成的文件也添加到资源对象里
      assets[this.filename] = {
        source() {
          return content
        },
        size() {
          return content.length
        }
      }
    })
  }
}

module.exports = FileListPlugin