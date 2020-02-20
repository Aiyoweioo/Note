function loader (source) {
  let style = `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)`
    //JSON.stringify(source)将代码转成一行
  return style
}
module.exports = loader