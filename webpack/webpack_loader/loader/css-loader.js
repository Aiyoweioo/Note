/**css-loader 用来解析@import这种语法，包括css中的引入图片 */

/* less代码：
@base: #666;
body {
  background: @base;
  background-image: url('../src/2.png');
}
将less代码分成三部分
第一部分：
@base: #666;
body {
  background: @base;
  background-image:
第二部分：使用require将其打包
url('./2.png');
第三部分：
}
*/
function loader (source) {
  let reg = /url\((.+?)\)/g // 匹配url(),(.+?)为惰性匹配，参考链接： https://www.cnblogs.com/ysk123/p/9896850.html
  let pos = 0 // 代码的位置
  let current
  let arr = ['let list = []'] // 最后要拼出一个字符串的结果

  while (current = reg.exec(source)) {
    let [matchUrl, group] = current //[匹配的路径，匹配到的正则()分组] 
    // console.log("matchUrl: ",matchUrl, "group: ",group) // matchUrl:  url('./2.png') group:  './2.png'
    let last = reg.lastIndex - matchUrl.length // 代码的长度-匹配url()的长度
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`) // 拼入第一部分的代码
    pos = reg.lastIndex
    arr.push(`list.push('url('+ require(${group}) +')')`)  // 把url里的内容（正则（）里的内容）弄成require的写法，拼入第二部分的代码--》url(require('../src/2.png'))
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`) // 拼入地址之后到结尾的代码--》一个回车}
  arr.push(`module.exports = list.join('')`) // 数组通过module.exports导出
  // console.log("arr.join('\r\n'): ", arr.join('\r\n'))
  /**打印结果：
    let list = []
    list.push($(JSON.stringfy(source.slice(position, last)))
    last.push('url('+require($(group)+')')
    list.push($JSON.stringfy(source.slice(position)))
    module.exports=list.join('')
   */
  return arr.join('\r\n')

}

module.exports = loader