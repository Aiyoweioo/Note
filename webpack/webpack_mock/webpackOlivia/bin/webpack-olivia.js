#! /usr/bin/env node

// 1. 找到当前执行文件的路径，拿到webpack.congig.js

let path = require('path')
// config配置文件
let config = require(path.resolve('webpack.config.js'))

let Compiler = require('./lib/Compiler.js')
let compiler = new Compiler(config)
// 增加插件Plugins Hook
compiler.hooks.afterPlugins.call()
// 标识运行编译
compiler.run()