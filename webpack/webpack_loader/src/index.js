/**loader顺序的内容 */
// 原本： require('./inlineA.js') 先将inline-loader先导入，因此在前面加！
// let str = require('!inline-loader!./inlineA.js')

/**自定义babel-loader的内容 */
// class Olivia {
//   constructor () {
//     this.name = 'Olivia'
//   }
//   getName() {
//     console.log(this.name)
//   }
// }
// let person = new Olivia
// person.getName()

/**自定义file-loader，url-loader的内容 */
// import picture from './2.png'
// let img = document.createElement('img')
// img.src = picture
// document.body.appendChild(img)

/**自定义less-loader,css-loader, style-loader */
// import './background.less'

/* 自定义InlineSourcePlugin插件例子 */
import './index.css'