/*将less转化为css
*/
let less = require('less')

function loader (source) {
  let css
  // console.log(source, 2222)
  less.render(source, (err, output) => { //less.render()第一个参数是源码，第二个参数是失败和成功的结果
    // console.log(output)
    css = output.css // output.css就是less转为css的结果
  })
  // css = css.replace(/\n/g, '\\n')
  return css
}

module.exports = loader