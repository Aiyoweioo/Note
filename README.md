# axios
1. http
1.1. http请求报文
1.2. http响应报文
1.3. 常见响应状态码
1.4. 不同类型的请求及作用
1.5. API的分类
2. 使用 json-server 搭建 REST API
2.1. JSON-SERVER
3. XHR的理解和使用
3.1. 理解
3.2. 区别一般 http 请求与 ajax 请求
3.3. API
4. XHR 的 ajax 封装(简单版 axios)
5. axios的理解和使用
5.1. axios是什么
5.2. axios特点
5.3. axios 常用语法
6. aixos难点
6.1. axios.create([config])
6.2. 拦截器函数/ajax 请求/请求的回调函数的调用顺序
6.3. 取消请求
response的整体结构
erroe的整体结构
如何取消未完成的请求?

# Promise
1. 两种回调函数
2. Error
2.1. 常见内置错误
2.2. 错误处理
3. 什么是Promise
4. Promise基本使用
5. 为什么要用Promise
6. Promise的API
7. promise的几个关键问题
7.1. error属于promise哪个状态
7.2. 一个promise指定多个成功/失败回调函数
7.3. 状态改变与指定回调函数的先后次序
7.4. promise.then()返回的新promise的结果状态由什么决定(重点)
7.5. 如何串联多个操作任务
7.6. 异常传透
7.7. 中断Promise链
8. async function和await expression
9. 宏队列和微队列

# webpack
1. 概念
2. Loader加载器
2.1. loader的特点
2.2. loader的执行顺序
2.3. 如果我们采用了两种解析loader的方式，他们的执行是什么样的呢？
2.4. loader的禁用
3. Plugin
4. mode配置
5. 基本配置
6. webpack.config.js配置
7. 本地服务webpack-dev-server配置
8. html-webpack-plugin打包html文件
8.1. 路径
8.2. 多入口文件
9. 处理css
10. 处理js
10.1. es6转es5 转es7的语法 其他不兼容的高级语法
10.1.1. 语法检查eslint
11. 图片/字体加载file-loader和图片优化url-loader
11.1. 图片处理
11.2. 图片压缩
12. 清除目录、拷贝文件夹、版权声明
13. 定义环境变量
14. noParse某些包是独立的个体没有依赖, include, exclude，只需要一些包的某些功能
15. webpack.DllReferencePlugin
16. 缩短打包时间多线程打包HappyPack
17. webpack自带的优化
18. 模块解析
18.1. resolve
18.2. resolveLoader
18.3. devtool的sourceMap（webpack内置）
18.4. watch 启动监控自动编译
19. 前后端接口调试

## webpack Tapable
1. Tapable
1.1. 同步SyncHook
1.1.1. SyncHook模拟实现
1.2. 同步SyncBailHook
1.2.1. SyncBailHook模拟实现
1.3. 同步SyncWaterfallHook
1.3.1. SyncWaterFallHook模拟实现
1.4. 同步SyncLoopHook
1.4.1. SyncLoopHook的模拟实现
1.5. 异步并行AsyncParallelHook
1.5.1. 异步AsyncParallelHook模拟
1.5.2. AsyncParallelHook模拟用Promise实现
1.6. 异步串行AsyncSeriesHook
1.6.1. AsyncSeriesHook模拟实现
1.7. AsyncSeriesHook用tapPromise实现
1.7.1. AsyncSeriesHook用Promise模拟实现
1.8. 异步串行AsyncSeriesBailHook
1.8.1. AsyncSeriesBailHook用tapPromise实现
1.8.2. AsyncSeriesBailHook用Promise模拟实现
1.9. 异步串行AsyncSeriesWaterfallHook
1.9.1. 异步串行AsyncSeriesWaterfallHook模拟
1.10. 异步串行AsyncSeriesWaterfallHook用tapPromise实现
1.10.1. AsyncSeriesWaterfallHook用Promise实现
2. 导入自定义loader
3. 导入多个loader
4. 自定义实现babel-loader
5. 自定义实现banner-loader
6. 实现file-loader和url-loader
7. 实现less-loader,css-loader,style-loader
8. Plugins顺序
9. 文件列表插件:生成一个文件描述打包文件的插件
10. 内联的webpack插件

# MVVM Mock
1. MVVM mock
2. MVVM入口
3. 指令解析器Compiler
3.1. 创建文档对象
3.2. 编译模板
3.3. 编译元素节点
3.4. 编译文本节点
4. 实现一个数据监听器Observer
4.1. 监听数据
4.2. 数据劫持并通知依赖收集器Dep通知Watcher去更新
5. 属性订阅器Dep
6. 观察者Watcher
7. 数据代理

# Virtual DOM Mock
1. Virtua DOM模拟实现
2. 第一步：实现虚拟节点
3. 第二步： 将节点挂在真实的DOM下
3.1. 通过虚拟节点创建一个真实的dom元素
3.2. 是否需要更新节点的属性
