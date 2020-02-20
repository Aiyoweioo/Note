let path = require('path')
class P {
  apply(compiler) {
    compiler.hooks.emit.tap('emit', () => {
      console.log(" hook emit")
    })
  }
}
class P1 {
  apply(compiler) {
    compiler.hooks.run.tap("run", () => {
      console.log(" hook run")
    })
  }
}
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
   rules: [
     {
       test: /\.less$/,
       use: [
          path.resolve(__dirname, 'loader', 'style-loader'),
          path.resolve(__dirname, 'loader', 'less-loader')
       ]
     }
   ]
  },
  plugins: [
    new P(),
    new P1()
  ]
}