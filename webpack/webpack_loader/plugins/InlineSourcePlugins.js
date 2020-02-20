/**
 * 把外链标签编成内联标签,结果只生成了一个html文件
 */


const HtmlWebpackPlugin = require('html-webpack-plugin')
class InlineSourcePlugins {
  constructor ({match}) {
    this.reg = match
  }

  // 处理某一个标签的方法
  processTag(tag, compilation) {
    // tag: { tagName: 'link', voidTag: true, attributes: [Object] } 
    // console.log(tag.attributes) // { href: 'main.css', rel: 'stylesheet' } { src: 'bundle.js' }
    let newTag = {}
    let url = '' // 保存文件地址
    // 配置文件的标签和文件地址
    if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style',
        attributes: {type: 'text/css'}
      }
      url = tag.attributes.href // 文件路径
    }
    if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
        attributes: {type: 'application/javascript'}
      }
      url = tag.attributes.src
    }
    // 配置文件的代码
    if (url) {
      newTag.innerHTML = compilation.assets[url].source() // 文件内容放到innerHTML属性中
      delete compilation.assets[url] // 删除原有的资源
      // console.log(compilation.assets[url].source())
      return newTag
    }
    return tag
  }

  // // 处理引入标签的数据
  processTags(data, compilation) {
    //  目前data：headTags: [ { tagName: 'link', voidTag: true, attributes: [Object] } ],
    // bodyTags: [ { tagName: 'script', voidTag: false, attributes: [Object] } ],
    let headTags = []
    let bodyTags = []
    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation))
    }) 
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation))
    })
    //console.log(...data, headTags, bodyTags)
    return {...data, headTags, bodyTags}
  }

  apply(compiler) {
    // 通过webpackPlugin来实现 百度搜索html-webpack-plugin看它的钩子
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      console.log('The compiler is starting a new compilation...')
      // alterAssetTagGroups：修改资源标签组之前
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'alterPlugin',
        (data, callback) => {
          //console.log(data)
          /* {
              headTags: [ { tagName: 'link', voidTag: true, attributes: [Object] } ],
              bodyTags: [ { tagName: 'script', voidTag: false, attributes: [Object] } ],
              outputName: 'index.html',
              plugin: HtmlWebpackPlugin {...
                ...
           */
          data = this.processTags(data, compilation) // 资源都在compilation里面
          callback(null, data) // 成功就把数据返回去
        }
      )
    })
  }
}

module.exports = InlineSourcePlugins

/**按照姜文老师install html-webpack-plugin的过程中，使用getHooks()报错this.htmlWebpackPlugin.getHooks is not a function，
 * install html-webpack-plugin之后就可以正常使用
 */
