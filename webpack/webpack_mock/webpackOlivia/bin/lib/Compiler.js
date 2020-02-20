let path = require('path')
let fs = require('fs')
// babylon  主要把源码转成ast ，Babylon 是 Babel 中使用的 JavaScript 解析器。
// @babel/traverse 对ast解析遍历语法树 ，负责替换，删除和添加节点
// @babel/types 用于AST节点的Lodash-esque实用程序库
// @babel/generator 结果生成
let babylon = require('babylon')
let traverse = require('@babel/traverse').default // 是一个es6模块，需要.default,不然导出的是一个对象
let type = require('@babel/types')
let generator = require('@babel/generator').default
let ejs = require('ejs')
let {SyncHook} = require('tapable')
class Compiler {
  constructor (config) {
    this.config = config
    // 1.保存入口文件的路径
    this.entryId = '' // './src/index.js'
    // 2. 需要保存所有的模块依赖
    this.modules = {}
    // 入口路径，是个相对路径
    this.entry = config.entry
    // 工作路径，是个绝对路径
    this.root = process.cwd() // 当前运行npx的路径
    // 钩子
    this.hooks = {
      entryOption: new SyncHook(), // 入口选项
      compile: new SyncHook(), // 编译
      afterCompile: new SyncHook(), // 编译完成
      afterPlugins: new SyncHook(), // 编译完插件
      run: new SyncHook(), // 运行
      emit: new SyncHook(), // 发射
      done: new SyncHook() // 完成 
    }
    // 如果传递了plugins参数
    if(this.config.plugins) {
      let plugins = this.config.plugins
      if (Array.isArray(plugins)) {
        plugins.forEach(plugin => {
          plugin.apply(this) // 使用插件
        })
      }
      this.hooks.afterPlugins.call()
    }
  }

  // 拿到文件内容
  getSource (modulePath) {
    let content = fs.readFileSync(modulePath, 'utf-8')
    let rules = this.config.module.rules // webpack.config.jsmodule里面的rules数组
    for(let i=0;i < rules.length ;i++) { // 遍历rules
      let rule = rules[i]
      let {test, use} = rule
      let len = use.length-1
      if (test.test(modulePath)) { // 匹配这个规则,这个模块需要loader转化
        function normalLoader () { // 默认是从右到左
          let loader = require(use[len--]) // 导入模块
          content = loader(content) // 导入源码
          if (len >= 0) {
            normalLoader() // 递归调用
          }
        }
        normalLoader() 
      }
    }
    return content
  }

  // 解析源码
  parse(source, parentPath) { // 需要AST解析语法树
    let ast = babylon.parse(source)
    let dependencies = [] // 存放依赖的数组
    // ATS解析语法树网址 http://astexplorer.net/
    traverse(ast, { // 调用表达式
      CallExpression (p) {
        let node = p.node // 获取对应的节点
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__'
          let moduleName = node.arguments[0].value // 获取到模块对应的名字 "./a"
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js') // './a.js' path.extname()是指有没有扩展名
          moduleName = './' + path.join(parentPath, moduleName) // './src/a.js'
          dependencies.push(moduleName) // 将依赖存放到数组
          node.arguments = [type.stringLiteral(moduleName)] // 改掉源码
        }
      }
    })
    let sourceCode = generator(ast).code // 源码
    return {sourceCode, dependencies}
  }

  // 构建模块
  buildModule (modulePath, isEntry) {
    // 拿到模块内容
    let source = this.getSource(modulePath) // 得到入口文件的内容
    // 模块id modulePath(相对路径) = modulePath(模块路径) - this.root(项目工作路径) src/index.js
    let moduleName = './' + path.relative(this.root, modulePath)
    //console.log(source, moduleName) // 拿到代码和相对路径 代码： let str=require('./a.js') console.log(str) 相对路径：./src/index.js
    if (isEntry) {
      this.entryId = moduleName // 保存入口的名字
    }
    // 解析，需要把source源码进行改造，返回一个依赖列表
    let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName)) // 取当前模块的父路径： ./src
    // console.log(sourceCode, dependencies) // sourceCode:let str = __webpack_require__("./src\\a.js");console.log(str); dependencies: [ './src\\a.js' ]
    // ./src 把相对路径和模块中的内容对应起来
    this.modules[moduleName] = sourceCode
    // 将所有的依赖项进行递归
    dependencies.forEach(dep => { // 附模块的加载 递归加载
      this.buildModule(path.join(this.root, dep), false)
    })
  }
  // 发射文件
  emitFile () {
    // 拿数据渲染自己的webpack
    // 拿到输出到目录下，这是输出路径
    let main = path.join(this.config.output.path, this.config.output.filename)
    // 当前模板main.ejs的路径
    let templateStr = this.getSource(path.join(__dirname, 'main.ejs'))
    // 模板的内容,ejs渲染
    let code = ejs.render(templateStr, {entryId: this.entryId, modules: this.modules})
    this.assets = {}
    // 路径对应的代码
    this.assets[main] = code
    fs.writeFileSync(main, this.assets[main])
  }
  run(){
    this.hooks.run.call()
    this.hooks.compile.call()
    // 执行，并且创建模块的依赖关系, true表示为主模块
    this.buildModule(path.resolve(this.root, this.entry), true)
    // console.log("modules: ",this.modules, "entryId: ", this.entryId)
    /**打印结果：
     *modules： {
        './src\\index.js': 'let str = __webpack_require__("./src\\\\a.js");\n\nconsole.log(str);',
        './src\\a.js': 'let b = __webpack_require__("./src\\\\base\\\\b.js");\n' +
          '\n' +
          "module.exports = 'a' + b;",
        './src\\base\\b.js': "module.exports = 'b';"
      } 
      entryId： ./src\index.js
     */
    // 发射打包后的文件
    this.hooks.afterCompile.call()
    this.emitFile()
    this.hooks.emit.call()
    this.hooks.done.call()
  }
}

module.exports = Compiler