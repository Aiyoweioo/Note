const path = require('path')
// const DonePlugin = require('./plugins/DonePlugins')
// const AsyncPlugins = require('./plugins/AsyncPlugins')
const FileListPLugin = require('./plugins/FileListPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineSourcePlugins = require('./plugins/InlineSourcePlugins')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  //watch:true,
  //devtool: 'source-map',
  // resolveLoader: {
  //   // 别名
  //   modules:  ['node_modules', path.resolve(__dirname, 'loader')]
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:[MiniCssExtractPlugin.loader, 'css-loader']
      },
    //   {
    //     test: /\.less$/,
    //     use: ['style-loader', 'css-loader', 'less-loader']
    //   },
    //   {
    //     test: /\.(jpeg|jpg|gif|png|svg)$/,
    //     use: {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 200*1024
    //       }
    //     }
    //   },
    //  {
    //    test: /\.js$/,
    //    use: {
    //      loader: 'banner-loader',
    //      options: {
    //        text: 'olivia',
    //        filename: path.resolve(__dirname, 'banner.js')
    //      }
    //    }
    //  },
    //  {
    //   test: /\.js$/,
    //   use: {
    //     loader: 'babel-loader',
    //     options: {
    //      presets: [
    //        "@babel/preset-env"
    //      ]
    //     }
    //   }
    // }
  ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // new DonePlugin(), // 同步
    // new AsyncPlugins() ,// 异步
    new FileListPLugin({
      filename: 'list.md'
    }),
    new InlineSourcePlugins({
      match: /\.(js|css)$/
    })
  ]
}