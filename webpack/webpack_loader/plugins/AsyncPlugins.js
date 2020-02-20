class AsyncPlugins {
  apply (compiler) { // 绑定发射的钩子
    console.log("AsyncPlugins")
    compiler.hooks.emit.tapAsync('AsyncPlugins', (compliation, callback) => {
      setTimeout(() => {
        console.log("使用tapAsync文件发射,等一秒")
        callback()
      }, 1000)
    })
    compiler.hooks.emit.tapPromise('AsyncPlugins', (compliation, callback) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("使用tapPromise文件发射，,等两秒")
          resolve()
        }, 2000)
      })
    })
  }
}

module.exports = AsyncPlugins