class DonePlugins {
  apply (compiler) {
    console.log("DonePlugins")
    compiler.hooks.done.tap('DonePlugin', (status) => {
      console.log("编译完成")
    })
  }
}

module.exports = DonePlugins