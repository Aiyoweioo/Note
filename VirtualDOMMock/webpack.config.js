const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './dist')
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: { // 开发服务器
    contentBase: './dist', // 服务器从哪取数据的目录
    port: 8080, // 默认8080
    compress: true, // 服务器压缩
    open: true // 自动打开浏览器
  }
}