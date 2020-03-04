
- [1. 概念](#1-%e6%a6%82%e5%bf%b5)
- [2. Loader加载器](#2-loader%e5%8a%a0%e8%bd%bd%e5%99%a8)
  - [2.1. loader的特点](#21-loader%e7%9a%84%e7%89%b9%e7%82%b9)
  - [2.2. loader的执行顺序](#22-loader%e7%9a%84%e6%89%a7%e8%a1%8c%e9%a1%ba%e5%ba%8f)
  - [2.3. 如果我们采用了两种解析loader的方式，他们的执行是什么样的呢？](#23-%e5%a6%82%e6%9e%9c%e6%88%91%e4%bb%ac%e9%87%87%e7%94%a8%e4%ba%86%e4%b8%a4%e7%a7%8d%e8%a7%a3%e6%9e%90loader%e7%9a%84%e6%96%b9%e5%bc%8f%e4%bb%96%e4%bb%ac%e7%9a%84%e6%89%a7%e8%a1%8c%e6%98%af%e4%bb%80%e4%b9%88%e6%a0%b7%e7%9a%84%e5%91%a2)
  - [2.4. loader的禁用](#24-loader%e7%9a%84%e7%a6%81%e7%94%a8)
- [3. Plugin](#3-plugin)
- [4. mode配置](#4-mode%e9%85%8d%e7%bd%ae)
- [5. 基本配置](#5-%e5%9f%ba%e6%9c%ac%e9%85%8d%e7%bd%ae)
- [6. webpack.config.js配置](#6-webpackconfigjs%e9%85%8d%e7%bd%ae)
- [7. 本地服务webpack-dev-server配置](#7-%e6%9c%ac%e5%9c%b0%e6%9c%8d%e5%8a%a1webpack-dev-server%e9%85%8d%e7%bd%ae)
- [8. html-webpack-plugin打包html文件](#8-html-webpack-plugin%e6%89%93%e5%8c%85html%e6%96%87%e4%bb%b6)
  - [8.1. 路径](#81-%e8%b7%af%e5%be%84)
  - [8.2. 多入口文件](#82-%e5%a4%9a%e5%85%a5%e5%8f%a3%e6%96%87%e4%bb%b6)
- [9. 处理css](#9-%e5%a4%84%e7%90%86css)
- [10. 处理js](#10-%e5%a4%84%e7%90%86js)
  - [10.1. es6转es5 转es7的语法 其他不兼容的高级语法](#101-es6%e8%bd%aces5-%e8%bd%aces7%e7%9a%84%e8%af%ad%e6%b3%95-%e5%85%b6%e4%bb%96%e4%b8%8d%e5%85%bc%e5%ae%b9%e7%9a%84%e9%ab%98%e7%ba%a7%e8%af%ad%e6%b3%95)
    - [10.1.1. 语法检查eslint](#1011-%e8%af%ad%e6%b3%95%e6%a3%80%e6%9f%a5eslint)
- [11. 图片/字体加载file-loader和图片优化url-loader](#11-%e5%9b%be%e7%89%87%e5%ad%97%e4%bd%93%e5%8a%a0%e8%bd%bdfile-loader%e5%92%8c%e5%9b%be%e7%89%87%e4%bc%98%e5%8c%96url-loader)
  - [11.1. 图片处理](#111-%e5%9b%be%e7%89%87%e5%a4%84%e7%90%86)
  - [11.2. 图片压缩](#112-%e5%9b%be%e7%89%87%e5%8e%8b%e7%bc%a9)
- [12. 清除目录、拷贝文件夹、版权声明](#12-%e6%b8%85%e9%99%a4%e7%9b%ae%e5%bd%95%e6%8b%b7%e8%b4%9d%e6%96%87%e4%bb%b6%e5%a4%b9%e7%89%88%e6%9d%83%e5%a3%b0%e6%98%8e)
- [13. 定义环境变量](#13-%e5%ae%9a%e4%b9%89%e7%8e%af%e5%a2%83%e5%8f%98%e9%87%8f)
- [14. noParse某些包是独立的个体没有依赖, include, exclude，只需要一些包的某些功能](#14-noparse%e6%9f%90%e4%ba%9b%e5%8c%85%e6%98%af%e7%8b%ac%e7%ab%8b%e7%9a%84%e4%b8%aa%e4%bd%93%e6%b2%a1%e6%9c%89%e4%be%9d%e8%b5%96-include-exclude%e5%8f%aa%e9%9c%80%e8%a6%81%e4%b8%80%e4%ba%9b%e5%8c%85%e7%9a%84%e6%9f%90%e4%ba%9b%e5%8a%9f%e8%83%bd)
- [15. webpack.DllReferencePlugin](#15-webpackdllreferenceplugin)
- [16. 缩短打包时间多线程打包HappyPack](#16-%e7%bc%a9%e7%9f%ad%e6%89%93%e5%8c%85%e6%97%b6%e9%97%b4%e5%a4%9a%e7%ba%bf%e7%a8%8b%e6%89%93%e5%8c%85happypack)
- [17. webpack自带的优化](#17-webpack%e8%87%aa%e5%b8%a6%e7%9a%84%e4%bc%98%e5%8c%96)
- [18. 模块解析](#18-%e6%a8%a1%e5%9d%97%e8%a7%a3%e6%9e%90)
  - [18.1. resolve](#181-resolve)
  - [18.2. resolveLoader](#182-resolveloader)
  - [18.3. devtool的sourceMap（webpack内置）](#183-devtool%e7%9a%84sourcemapwebpack%e5%86%85%e7%bd%ae)
  - [18.4. watch 启动监控自动编译](#184-watch-%e5%90%af%e5%8a%a8%e7%9b%91%e6%8e%a7%e8%87%aa%e5%8a%a8%e7%bc%96%e8%af%91)
- [19. 前后端接口调试](#19-%e5%89%8d%e5%90%8e%e7%ab%af%e6%8e%a5%e5%8f%a3%e8%b0%83%e8%af%95)

- 感谢姜文老师
- 视频地址： https://www.bilibili.com/video/av51693431?p=42
# 1. 概念
webpack运行过程：
1. 配置解析
2. 内置插件&配置插件注册
3. 确认入口获取所有资源
4. 使用Loader翻译资源
5. 识别资源加载语句并递归遍历所有资源
6. 封装依赖资源输出结果
- entry: 默认src/index.j
- output: 默认dist/main.js
- loader: 本身是函数，对模块的源代码进行转换，在配置文件的 module.rules 中配置 loader
- plugins: 本身是一个具有 apply() 方法的类，目的在于解决 loader 无法实现的其它问题。plugins配置项接收一个数组，数组里的每一项都是一个要使用的plugin的实例，plugin需要的参数通过构造函数传入
- mode： 
  + (不压缩格式)"development"
  + (压缩格式) 默认 "production" 会启用 uglifyjs 对 js 代码压缩

# 2. Loader加载器
参考文章： https://www.cnblogs.com/hanshuai/p/11287231.html
- loader在webpack中有4种:normal，inline，pre，post。
- 执行顺序：默认从右到左，从下到上
- 支持链式传递，支持同异步，命名约定为 xxx-loader
- 对单文件打包的方式的loader被称为行内（inline）loader；对于rules中的loader，webpack还定义了一个属性 enforce，可取值有 优先执行pre（为pre loader）、后置执行post（为post loader），如果没有值则为（normal loader）。
    + 前置loader: enforce: 'pre'
    + 后置loader: enforce: 'post'
    + 普通loader
    + 内联loader: expose?$!jquery
    + 行内loader: inline-loader!./a.js
## 2.1. loader的特点
1. 第一个loader要返回js脚本
2. 每个loader只做一件内容， 为了使loader在更多场景调用
3. 每一个loader都是模块
4. 每个loader都是无状态的，确保loader在不同模块转换之间不保存状态
## 2.2. loader的执行顺序
1. 两个阶段：pitching和normal阶段，类似于js中的事件冒泡、捕获阶段
    + Pitching阶段： post，inline，normal，pre
    + Normal阶段：pre，normal，inline，post
```js
// 假设有三个loader,[1,2,3]
// 顺序： pitch阶段： 1 --》 --》2 --》3 --》资源--》normal: 3-->2-->1
```
2. pitch两种情况
  + 无返回值，继续后续执行
  + 有返回值，阻断后续执行，例如 pitch 2 有返回值，将会执行 normal 3
```
loader2.pitch = fn () {
  //... 无返回值，执行 loader3 -> loader2 -> loader1
  //... 有返回值，loader2 不会执行，执行 loader1
}
```
## 2.3. 如果我们采用了两种解析loader的方式，他们的执行是什么样的呢？
inline loader优先级高于config配置文件中的loader
- 四种类型loader举例：
  + pre loader 配置：图片压缩
  + 普通loader 配置：coffee-script转换
  + inline loader 配置：bundle loader
  + post loader 配置： 代码覆盖率工具
## 2.4. loader的禁用
- 关于loader的禁用，webpack官方的建议是：除非从另一个loader处理生成的，一般不建议主动使用
- 加入 !   前缀禁用配置文件中的普通loader，比如：require("!raw!./script.coffee")
- 加入 !!  前缀禁用配置文件中所有的loader，比如：require("!!raw!./script.coffee")
- 加入 -!  前缀禁用配置文件中的pre loader和普通loader，但是不包括post loader，比如：require("!!raw!./script.coffee")
```js
module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringfy('production')
    })
  ]
}
```
# 3. Plugin
| 常用Plugin | 功能 |
| ---- | ----|
| html-webpack-plugin | 打包成html文件 |
| mini-css-extract-plugin | 将css文件抽离单独文件以link方式插入html |
| optimize-css-assets-plugin | 将css文件压缩，使用该插件后需自行处理js压缩 | 
| uglify-js-plugin | js压缩 |
| clean-webpack-plugin | 处理每次打包清除指定文件夹，默认是dist | 
| copy-webpack-plugin | 处理文件拷贝 | 
| happypack | 多线程打包 |  
webpack本身集成的plugin
| BannerPlugin | js插入注释内容 | 
| IgnorePlugin | 忽略指定引用文件 |
| DefinePlugin | 定义环境变量 |
| ProvidePlugin | 暴露模块，不需要通过import/require引用 | 

# 4. mode配置
- webpack.config.js 无法直接配置 process.env.NODE_ENV 的值，但可以使用 webpack.DefinePlugin 为所有依赖指定该环境值。
- webpack-merge区分打包环境
```js
// webpack.common.js
modules.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', // bundle.[hash:8].js // hash:只显示8位
    path: path.resolve(__dirname, 'dist'),
    publicPath: '' // 给所有打包文件引入时加前缀，包括css，js，img，如果只想处理图片可以单独在url-loader配置中加publicPath
  }
}
// webpack.dev.js
const webpackMerge = require('webpack-merge')
modules.exports = webpackMerge(common, {
  mode: 'development',
  devServer: {
    port： '8080',
    contentBase: 'dist'
  }
})
// webpack.prod.js
const webpackMerge = require('webpack-merge')
modules.exports = webpackMerge(common, {
  mode: 'production',
  optimization: {
    minimize: true
  }
})
// development构建
// webpack --config webpack.dev.js
// production构建
// webpack --config webpack.prod.js
```
# 5. 基本配置
webpack4打包命令为：webpack
# 6. webpack.config.js配置
```js
const path = require('path')
modules.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'main.js'
  }
}
```
1. webpack.commom.js
  - entry
  - loader
    + url-loader,file-loader
  - plugins
    + html-webpack-plugin
    + clean-webpack-plugin
2. webpack.prod.js
  - output filename: 'main.[hash].js'
  - loader
    + `MiniCssExtractPlugin.loader`, `css-loader`, `postcess-loader`(`autoprefixer`) `sass-loader`
  - plugins
    + `MiniCssExtractPlugin`
    + `autoprefixer`
  - optimization
    + `OptimizeCSSAssetsPlugin`
    + `UglifyJsPlugin`
3. webpack.dev.js
  - output: filename: 'main.js'
  - loader: `style.loader`, `css-loader`, `postcess-loader`, `sass-loader`
  - devtool:  `source-map`
  - watch: 
# 7. 本地服务webpack-dev-server配置
npm i webpack-dev-server -D
```js
const path = require('path')
modules.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  // 配置dev-server
  devServer: {
    // 本地服务器打包后文件保存路径
    contentBase: './dist',
    // 实时刷新开启
    inline: 'true',
    port: 3000,
    // 打包进度条开启
    progress: true,
    // 启动压缩
    compress: true,
    // 自动打开浏览器
    open: true
  }
}
```
# 8. html-webpack-plugin打包html文件
- https://github.com/jantimon/html-webpack-plugin#options
- 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
- 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
```js
let HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
  new HtmlWebpackPlugin({ // 用于使用模板打包时生成index.html文件，并且在run dev时会将模板文件也打包到内存中
    template: './index.html', // html模板所在的文件路径
    filename: 'index.html', // 打包后输出的html的文件名称
    hash: true, // 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值，解决缓存问题
    minify: { // 对打包的html模板进行压缩
      removeAttributeQuotes: true, // 删除不需要引号的值。
      collapseWhitespace: true // 折叠空行变成一行
    }
  })
]
```
## 8.1. 路径
1. filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
2. 指定生成的html文件内容中的link和script路径是相对于生成目录下的，写路径的时候请写生成目录下的相对路径。
## 8.2. 多入口文件
- 主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
- chunks:允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk
```js
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist2')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['home'] // home.html只有home.js
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'other.html',
      chunks: ['other', 'home']   // other.html 里面有 other.js & home.js
    }),
  ]
}
// 编译后
// <script type=text/javascript src="index.js"></script>
// <script type=text/javascript src="main.js"></script>
```
# 9. 处理css
- `css-loader`  用来解析@import这种语法
- `style-loader` 把 css 插入到head标签中
- `postcss-loader` 当postss加载器单独使用时（没有css加载器），不要使用@import
  + 给css加上兼容浏览器的前缀
  + 样式校验（stylelint）
  +  实现css模块化，防止css样式冲突
- `autoprefixer` 处理浏览器兼容
- `less-loader` 把less转换为css
-  `MiniCssExtractPlugin.loader` 可以替换style-loader（推荐），但这个还要在Plugin中实例化new  MiniCssExtractPlugin,这可以每个js抽单个css，然后通过link引入
  + 异步加载
  + 无重复编译，性能有所提升
  + 支持HMR
- webpack 4.0以前，我们通过`extract-text-webpack-plugin`插件，把css样式从js文件中提取到单独的css文件中。
  + 但这需要额外的http请求
  + 更长的编译时间
  + 没有热替换
  + CSS请求并行
- `optimize-css-assets-webpack-plugin`进行压缩css,使用此方法压缩了css需要`uglifyjs-webpack-plugin`压缩js
```js
// 简单版本style-loader,css-loader
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            insertAt: 'top' // 将css标签插入最顶头  这样可以自定义style不被覆盖
          }
        },
        'css-loader',
        'postcss-loader'
      ]
    }
  ]
}
// 高级版本： MiniCssExtractPlugin css-loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production' // MiniCssExtractPlugin只在production模式下
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader' // 给css加上兼容浏览器的前缀
      ]
    }
  ]
},
plugins: [
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
  })
]
```
用了`mini-css-extract-plugin`抽离css为link需使用`optimize-css-assets-webpack-plugin`进行压缩css,使用此方法压缩了css需要`uglifyjs-webpack-plugin`压缩js
```js
// 更高级版本：  optimize-css-assets-webpack-plugin MiniCssExtractPlugin UglifyJsPlugin css-loader
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: { // 优化项
     minimizer: [ 
      new UglifyJsPlugin({
        cache: true, // 是否缓存
        parallel: true, // 是否合并打包
        sourcMap: true // 源码映射,可以看源码
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {loader: 'css-loader',options:{importLoaders: 1}}, // 当postss加载器单独使用时（没有css加载器），不要使用@import
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) =>{
                require('autoprefixer')({ browsers: ['>0.15% in CN']}) //在中国浏览器类型份额大于0.15%     
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css', // css文件单独命名，给定哈希值的目的是给定版本，防止浏览器端有相同命名的缓存
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    require('autoprefixer') // 浏览器兼容
  ]
}
```
# 10. 处理js 
- npm i babel-loader @babel/core @babel/preset-env -D
- 转class npm i @babel/plugin-proposal-class-properties -D
- 转装饰器 npm i @babel/plugin-proposal-decorators -D
- @babel/polyfill
## 10.1. es6转es5 转es7的语法 其他不兼容的高级语法
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ //预设
              '@babel/preset-env' 
            ],
            plugins:[
              // 转es7的语法
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }]
            ]
          }
        },
        exclude: /node_modules/ // node_modules文件夹除外
      }
    ]
  }
}
```
### 10.1.1. 语法检查eslint
- 根目录添加.eslintrc.json配置文件
- 在webpack.config.js添加
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre' // 这个loader优先执行，loader还有post normal、内联、行内执行
          }
        }
      },{
        test: /\.js$/,
        use: {
          loader: 'bable-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  }
}
```



# 11. 图片/字体加载file-loader和图片优化url-loader
情况：1. 在js中创建 2.css中引入 3.<img src="">
- 图片处理file-loader,适合情况1，2，默认会内部生成一张图片到build,生成图片的路径返回回来
- 图片处理html-withimg-loader,适合情况3
- 图片压缩用url-loader，当图片小于多少，用base64,否则用file-loader产生真实的图片
- 图片优化压缩image-webpack-loader,但是image-webpack-loader 依赖了 pngquant，而新版本的 pngquant 已经<strong>不再支持 Windows 了</strong>
## 11.1. 图片处理
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  }
}
```
情况1： 在js中创建
```js
import logo from './logo.png'
let image = new Image()
image.src = logo
document.body.appendChild(image)
```
情况2： 在css中引入,css-loader会将css里面的图片转为require的格式
```js
div {
  background: url("./logo.png");
}
```
情况3：解析html中的image
```js
{
  test: /\.html$/,
  use: 'html-withimg-loader'
}
```
## 11.2. 图片压缩
```js
{
  test: /\.(jpg|jpeg|png|svg|gif)$/,
  use: {
    loader: 'url-loader'
    options: {
      limit: 200 * 1024,          // 小于200k变成base64
      // outputPath: '/img/',     // 打包后输出地址，就是dist/img
      // publicPath: ''           // 给资源加上域名路径 
    }
  }
}
```
# 12. 清除目录、拷贝文件夹、版权声明
- 清除目录 npm install clean-webpack-plugin --save-dev
- 拷贝文件夹 npm install copy-webpack-plugin --save-dev
- 版权声明 production中使用： webpack内置 bannerPlugin
```js
const webpack = require('webpack')
const CleanWebpackPlugin = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
plugins:[
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin([{from: 'doc', to: './'}]) ,//doc和输出文件目录dist同级， 将doc文件夹里的内容拷贝到dist文件夹
  new webpack.BannerPlugin('make 2019 by Olivia') // 输出的每个js文件开头都有'make 2019 by Olivia'字符串
]
```
# 13. 定义环境变量
webpack内置的DefinePlugin，可以在src目录下开发使用
```js
plugins: [
  new webpack.DefinePlugin({
    RULE: JSON.stringfy('rule'), //字符串需要使用json,或者添加双引号"'rule'" 
    FLAG: 'true' 
  })
]
// src/index.js
console.log(RULE) // rule
console.log(typeof FLAG) // boolean
```
# 14. noParse某些包是独立的个体没有依赖, include, exclude，只需要一些包的某些功能
- noParse: 一些大型库本身没有依赖，就不需要解析，如jQuery，这样做可以减少时间。noParse: 'jquery'
- include：只包含一些目录
- exclude: 不包含某些目录
- 只需要一些包的某些功能： webpack内置插件IgnorePlugin
```js
// 某些包是独立的个体没有依赖,忽略掉moment的其他语言包
let webpack = require('webpack')
module:{
  noParse: /jquery/,
  {
    test: /\.js$/,
    exclude: '/node_modules/',   // 排除
    include: path.resolve('src'),  // 在这个范围内
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ]
      }
    }
  }
},
plugins: [
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
]
// src/index.js
import moment from 'moment'

let r = moment().endOf('day').fromNow()  // 距离现在多少天
console.log(r);
// 可以将webpck压缩文件从从 1.2MB 到 800kb
```
 
# 15. webpack.DllReferencePlugin
- 事先把常用但又构建时间长的代码提前打包好（例如 react、react-dom），取个名字叫 dll。后面再打包的时候就跳过原来的未打包代码，直接用 dll。这样一来，构建时间就会缩短，提高 webpack 打包速度。
- <em>Vue 和 React 官方 2018 都不再使用 dll </em>
- dll代替品--》`HardSourceWebpackPlugin`
```js
plugins: [
    new HardSourceWebpackPlugin() // <- 直接加入这行代码就行
  ]
```
# 16. 缩短打包时间多线程打包HappyPack
```js
// 对js和css进行多线程打包所短打包时间
let Happypack = require('happypack')
rules: [
  {
    test: /\.js$/,
    exclude: '/node_modules/',
    include: path.resolve('src'),
    use: 'happypack/loader?id=js'
  },
  {
    test: /\.css$/,
    use: 'happypack/loader?id=css'
  }
]

plugins: [
  new Happypack({
    id: 'js',
    use: [{
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ]
      }
    }]
  }),
  new Happypack({
    id: 'css',
    use: ['style-loader', 'css-loader']
  })
]
```

# 17. webpack自带的优化
在production才会生效:tree-shaking scope-hosting 
- tree-shaking: 自动删除没用的代码，只对import有效，require无效
- scope-hosting: 作用域提升 
```js
import calc from './test'
console.log(calc.sum(1,2))
// 若是require，是一个default的对象
let calc = require('./test')
console.log(calc.default.sum(1,2)) // 会将结果放在default下， console.log(r.default.sum(1,2))
// scope-hosting
let a =1
let b = 1
let c = 1
let d = a+b+c
console.log(d, '---------')
// webpack会自动打包，省掉一些代码，简化为console.log(3,"---------")
```
# 18. 模块解析
## 18.1. resolve
- 功能：
  + 处理模块查找位置；
  + 处理 import 后缀简写；
  + 处理模块默认引用文件，默认为 main.js
- 配置方式：
  + modules 指定模块目录
  + mainFields 指定目录顺序
  + mainFiles 指定入口文件
  + alias 指定别名对应的入口文件
  + estensions
```js
modules.export = {
  resolve: {
    // 指定模块目录，当前node_modules目录下寻找，若不指定则会一直往上寻找
    modules: [path.resolve('node_modules')],
    // 指定目录顺序，现在style目录下寻找，找不到再到main目录
    mainFields: ['style', 'main'],
    // 指定入口文件
    mainFiles: ['index.js'],
    // 指定别名对应的引入文件
    alias: {
      components: 'src/components/'
    }
    // 省略文件扩展名，默认按序号顺序查找
    extensions: ['.vue', '.js', '.css']
  }
}
```
## 18.2. resolveLoader
- 功能：处理 loader 查找位置
- 配置方式：
  + modules
  + alias
```js
modules.exports = {
  //...
  resolveLoader: {
    // 指定loader查找目录,node_modules 找不到，再去 loaders 目录查找
    modules: [path.resolve("node_modules"), path.resolve(__dirname, 'loaders')],
    // 通过别名的方式指定 loader 文件路径
    alias: {
      myLoader: path.resolve(__dirname, 'loaders', 'myLoader.js')
    }
  }
}
```
## 18.3. devtool的sourceMap（webpack内置）
| 类型 | 功能 |
| source-map | 增加映射文件，会标识错误的代码 打包后生成独立的文件， 大而全 |
| eval-source-map | 无单独文件，可显示行列 | 
| cheap-module-source-map | 单独映射文件，产生后可以保存起来调试，有行无列 |
| cheap-module-eval-source-map | 不会产生文件 集成在打包后的文件中，有行无列 |
```js
module.exports = {
  devtool: 'source-map' // 增加映射文件调试源代码
}
```
## 18.4. watch 启动监控自动编译



在package.json脚本里添加--watch
- aggregateTimeout <em>防抖</em>当第一个文件更改，会在重新构建前增加延迟
```js
//package.json "script": {"build"： "npx webpack --watch --config webpack.dev.js"}
module.exports = {
  watch: true,
  watchOptions: {
    poll: 1000,              // 每秒监听1000次
    aggregateTimeout: 300,   // 防抖，一直输入代码，当第一个文件更改，会在重新构建前增加延迟
    ignored: /node_modules/  // 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，
  },
}
```
# 19. 前后端接口调试
1. proxy
webpack-dev-server有处理跨越的proxy，把请求代理到express服务器
```js
// node.js
let xhr = new XMLHttpRequest()
xhr.open('GET', '/api/user', true)
xhr.onload = function() {
  console.log(xhr.response)
}
xhr.send()
// webpack.config.js
devServer: {
  proxy: { //配置代理 
    target: 'http://localhost:3000', // 目标url,webpack-dev-server默认端口8080，
    pathRewrite: {'^/api': ''} 
  }
}
```
2. mock数据（没有跨域了）
前端自己mock数据，webpack本身就含有express，和webpack-dev-server在同一个端口下
```js
devServer: {
  before(app) {
    app.get('/user',(req, res) => {
      res.json({name: 'Olivia'})
    })
  }
}
```
3. 中间件共享端口 webpack-dev-middleware
有服务端，不想用代理处理，在服务器端启动webpack,即webpack端口用服务器端口
```js
// node.js
let express = require('express')
let app = express()
let webpack = require('webpack')
let middle = require('webpack-dev-middleware')
let config = require('./webpack.config.js')
let compiler = webpack(config)
app.use(middle(compiler))
app.get('/user', (req, res) => {
  res.json({name: 'Olivia'})
})
app.listen(3000)
```