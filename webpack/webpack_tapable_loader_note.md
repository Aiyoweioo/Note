- [1. Tapable](#1-tapable)
  - [1.1. 同步SyncHook](#11-%e5%90%8c%e6%ad%a5synchook)
    - [1.1.1. SyncHook模拟实现](#111-synchook%e6%a8%a1%e6%8b%9f%e5%ae%9e%e7%8e%b0)
  - [1.2. 同步SyncBailHook](#12-%e5%90%8c%e6%ad%a5syncbailhook)
    - [1.2.1. SyncBailHook模拟实现](#121-syncbailhook%e6%a8%a1%e6%8b%9f%e5%ae%9e%e7%8e%b0)
  - [1.3. 同步SyncWaterfallHook](#13-%e5%90%8c%e6%ad%a5syncwaterfallhook)
    - [1.3.1. SyncWaterFallHook模拟实现](#131-syncwaterfallhook%e6%a8%a1%e6%8b%9f%e5%ae%9e%e7%8e%b0)
  - [1.4. 同步SyncLoopHook](#14-%e5%90%8c%e6%ad%a5syncloophook)
    - [1.4.1. SyncLoopHook的模拟实现](#141-syncloophook%e7%9a%84%e6%a8%a1%e6%8b%9f%e5%ae%9e%e7%8e%b0)
  - [1.5. 异步并行AsyncParallelHook](#15-%e5%bc%82%e6%ad%a5%e5%b9%b6%e8%a1%8casyncparallelhook)
    - [1.5.1. 异步AsyncParallelHook模拟](#151-%e5%bc%82%e6%ad%a5asyncparallelhook%e6%a8%a1%e6%8b%9f)
    - [1.5.2. AsyncParallelHook模拟用Promise实现](#152-asyncparallelhook%e6%a8%a1%e6%8b%9f%e7%94%a8promise%e5%ae%9e%e7%8e%b0)
  - [1.6. 异步串行AsyncSeriesHook](#16-%e5%bc%82%e6%ad%a5%e4%b8%b2%e8%a1%8casyncserieshook)
    - [1.6.1. AsyncSeriesHook模拟实现](#161-asyncserieshook%e6%a8%a1%e6%8b%9f%e5%ae%9e%e7%8e%b0)
  - [1.7. AsyncSeriesHook用tapPromise实现](#17-asyncserieshook%e7%94%a8tappromise%e5%ae%9e%e7%8e%b0)
    - [1.7.1. AsyncSeriesHook用Promise模拟实现](#171-asyncserieshook%e7%94%a8promise%e6%a8%a1%e6%8b%9f%e5%ae%9e%e7%8e%b0)
  - [1.8. 异步串行AsyncSeriesBailHook](#18-%e5%bc%82%e6%ad%a5%e4%b8%b2%e8%a1%8casyncseriesbailhook)
    - [1.8.1. AsyncSeriesBailHook用tapPromise实现](#181-asyncseriesbailhook%e7%94%a8tappromise%e5%ae%9e%e7%8e%b0)
    - [1.8.2. AsyncSeriesBailHook用Promise模拟实现](#182-asyncseriesbailhook%e7%94%a8promise%e6%a8%a1%e6%8b%9f%e5%ae%9e%e7%8e%b0)
  - [1.9. 异步串行AsyncSeriesWaterfallHook](#19-%e5%bc%82%e6%ad%a5%e4%b8%b2%e8%a1%8casyncserieswaterfallhook)
    - [1.9.1. 异步串行AsyncSeriesWaterfallHook模拟](#191-%e5%bc%82%e6%ad%a5%e4%b8%b2%e8%a1%8casyncserieswaterfallhook%e6%a8%a1%e6%8b%9f)
  - [1.10. 异步串行AsyncSeriesWaterfallHook用tapPromise实现](#110-%e5%bc%82%e6%ad%a5%e4%b8%b2%e8%a1%8casyncserieswaterfallhook%e7%94%a8tappromise%e5%ae%9e%e7%8e%b0)
    - [1.10.1. AsyncSeriesWaterfallHook用Promise实现](#1101-asyncserieswaterfallhook%e7%94%a8promise%e5%ae%9e%e7%8e%b0)
- [2. 导入自定义loader](#2-%e5%af%bc%e5%85%a5%e8%87%aa%e5%ae%9a%e4%b9%89loader)
- [3. 导入多个loader](#3-%e5%af%bc%e5%85%a5%e5%a4%9a%e4%b8%aaloader)
- [4. 自定义实现babel-loader](#4-%e8%87%aa%e5%ae%9a%e4%b9%89%e5%ae%9e%e7%8e%b0babel-loader)
- [5. 自定义实现banner-loader](#5-%e8%87%aa%e5%ae%9a%e4%b9%89%e5%ae%9e%e7%8e%b0banner-loader)
- [6. 实现file-loader和url-loader](#6-%e5%ae%9e%e7%8e%b0file-loader%e5%92%8curl-loader)
- [7. 实现less-loader,css-loader,style-loader](#7-%e5%ae%9e%e7%8e%b0less-loadercss-loaderstyle-loader)
- [8. Plugins顺序](#8-plugins%e9%a1%ba%e5%ba%8f)
- [9. 文件列表插件:生成一个文件描述打包文件的插件](#9-%e6%96%87%e4%bb%b6%e5%88%97%e8%a1%a8%e6%8f%92%e4%bb%b6%e7%94%9f%e6%88%90%e4%b8%80%e4%b8%aa%e6%96%87%e4%bb%b6%e6%8f%8f%e8%bf%b0%e6%89%93%e5%8c%85%e6%96%87%e4%bb%b6%e7%9a%84%e6%8f%92%e4%bb%b6)
- [10. 内联的webpack插件](#10-%e5%86%85%e8%81%94%e7%9a%84webpack%e6%8f%92%e4%bb%b6)

# 1. Tapable
webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实例。
- 参考文章：https://segmentfault.com/a/1190000018385007
## 1.1. 同步SyncHook
```js
/*
  1. SyncHook
*/
let {SyncHook} = require('tapable')
class Lesson {
  constructor(){
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }

  tap(){ // 注册监听函数
    this.hooks.arch.tap('node', function(name) {
      console.log('node', name)
    })
    this.hooks.arch.tap('react', function(name) {
      console.log('react', name)
    })
  }

  start(){ // 启动钩子
    this.hooks.arch.call('Olivia')
  }
}
let l = new Lesson()
l.tap() // 注册node react事件
l.start() // 启动钩子
/*
 * result:
 *  node Olivia 
 *  react Olivia
 * */ 
```
### 1.1.1. SyncHook模拟实现
```js
/**
 * 模拟webpack的SyncHook
 */
class SyncHook { // 钩子是同步的
  constructor(args) {
    this.tasks = [] // 保存任务的数组
  }
  tap(name, task) {
    this.tasks.push(task) // 将任务保存到数组
  }
  call(...args) {
    this.tasks.forEach((task) => task(...args)) // 执行每一个任务
  }
}

let hook = new SyncHook(['name'])

hook.tap('name', function (name) {
  console.log('name', name)
})
hook.tap('react', function (name) {
  console.log('react', name)
})
hook.call('Olivia')
```
## 1.2. 同步SyncBailHook
- SyncBailHook： Bail保险，如果有一个tap()返回了一个非undefined的结果就停止
```js
/*
  2. SyncBailHook
*/
let {SyncBailHook} = require('tapable')
class Lesson {
  constructor(){
    this.hooks = {
      arch: new SyncBailHook(['name'])
    }
  }

  tap(){ // 注册监听函数
    this.hooks.arch.tap('node', function(name) {
      console.log('node', name)
      return '想玩'
    })
    this.hooks.arch.tap('react', function(name) {
      console.log('react', name)
    })
  }

  start(){ // 启动钩子
    this.hooks.arch.call('Olivia')
  }
}
let l = new Lesson()
l.tap() // 注册node react事件
l.start() // 启动钩子

/* result:
 *  node Olivia 
*/ 
```
### 1.2.1. SyncBailHook模拟实现
```js
/**
 * 模拟webpack的SyncBailHook
 */
class SyncBailHook { // 钩子是同步的
  constructor(args) {
    this.tasks = [] // 保存任务的数组
  }
  tap(name, task) {
    this.tasks.push(task) // 将任务保存到数组
  }
  call(...args) {
    let ret; // 当前函数的返回值
    let index = 0 // 至少要执行一个
    do {
      ret = this.tasks[index++](...args)
    }while(ret === undefined && index < this.args.length) // 遇到返回结果不为undefined且任务没执行完前，就停止

  }
}

let hook = new SyncBailHook(['name'])

hook.tap('name', function (name) {
  console.log('name', name)
  return "我累了停止向下执行"
})
hook.tap('react', function (name) {
  console.log('react', name)
})
hook.call('Olivia')
```
## 1.3. 同步SyncWaterfallHook
类似于 reduce，如果前一个 Hook 函数的结果 result !== undefined，则 result 会作为后一个 Hook 函数的第一个参数。
```js
/*
  3. SyncWaterfallHook： 类似于 reduce，如果前一个 Hook 函数的结果 result !== undefined，则 result 会作为后一个 Hook 函数的第一个参数。
*/
let {SyncWaterfallHook} = require('tapable')
class Lesson {
  constructor(){
    this.hooks = {
      arch: new SyncWaterfallHook(['name'])
    }
  }

  tap(){ // 注册监听函数
    this.hooks.arch.tap('node', function(name) {
      console.log('node', name)
      return 'nodeok' // 有返回值，因此作为下一个hook的参数
    })
    this.hooks.arch.tap('react', function(data) {
      console.log('react', data)
      return 'reactok'
    })
    this.hooks.arch.tap('vue', function(data) {
      console.log('vue', data)
    })
  }

  start(){ // 启动钩子
    this.hooks.arch.call('Olivia')
  }
}
let l = new Lesson()
l.tap() // 注册node react事件
l.start() // 启动钩子
/* result: 
 *  node Olivia
    react nodeok
    vue reactok
 */ 
```
### 1.3.1. SyncWaterFallHook模拟实现
```js
class SyncWaterfallHook { // 钩子是同步的
  constructor(args) {
    this.tasks = [] // 保存任务的数组
  }
  tap(name, task) {
    this.tasks.push(task) // 将任务保存到数组
  }
  call(...args) {
    let [first, ...others] = this.tasks
    let ret = first(...args)
    // 将结果传递下去
    others.reduce((a, b) => {
      return b(a)
    }, ret)
  }
}

let hook = new SyncWaterfallHook(['name'])

hook.tap('node', function (name) {
  console.log('node', name)
  return "nodeok"
})
hook.tap('react', function (data) {
  console.log('react', data)
  return "reactok"
})
hook.tap('vue', function (data) {
  console.log('vue', data)
})
hook.call('Olivia')
```
## 1.4. 同步SyncLoopHook
```js
/*
  3. SyncLoopHook： 不停的循环执行 Hook，直到所有函数结果 result === undefined。
*/
const { SyncLoopHook } = require('tapable');

class Hook{
    constructor(){
        /** 定义一个index */
        this.index = 0;
        this.hooks = new SyncLoopHook(['name']);
    }
    tap(){
        /** 箭头函数 绑定this */
        this.hooks.tap('node',(name) => {
            console.log('node',name);
            /** 当不满足条件时 会循环执行该函数 
             * 返回值为udefined时 终止该循环执行
            */
            return ++this.index === 5?undefined:'学完5遍node后再学react';
        });
        this.hooks.tap('react',(name) => {
            console.log('react',name);
        });
    }
    start(){
        this.hooks.call('callend.');
    }
}

let h = new Hook();

h.tap();
h.start();
/* result: 
 *  node callend.
    node callend.
    node callend.
    node callend.
    node callend.
    react callend.
 */ 
```

### 1.4.1. SyncLoopHook的模拟实现
```js
/*
 * 模拟webpack的SyncLoopHook
 */
class SyncLoopHook { // 钩子是同步的
  constructor(args) {
    this.tasks = [] // 保存任务的数组
  }
  tap(name, task) {
    this.tasks.push(task) // 将任务保存到数组
  }
  call(...args) {
   this.tasks.forEach( task => { // 遍历每一个tap,遇到返回的不是undefined就循环执行
     let ret
     do {
      ret = task(...args)
     } while( ret !== undefined)
   })
  }
}

let hook = new SyncLoopHook(['name'])
let total = 0
hook.tap('node', name => {
  console.log('node', name)
  return ++total === 5 ? undefined : '继续学'
})
hook.tap('react', name => {
  console.log('react', name)
})

hook.call('Olivia')
```
## 1.5. 异步并行AsyncParallelHook
- 异步的勾子分两种串行和并行
- 并行等待所有并发的异步事件执行后执行回调
- webpack异步钩子：AsyncParallelHook,先执行完异步再执行同步
- tapable注册的三种方法:
1. 异步的注册方法tap
2. 异步的注册方法tapAsync， 还有个回调参数
3. topPromise,注册promise
- tapable调用的三种
1. call (同步)
2. callAsync （异步）
3. promise （异步）
```js
let {AsyncParallelHook} = require('tapable')
// 用tap实现
class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap () {
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() =>{
        console.log("node", name)
        cb()
      }, 1000)
    })
    this.hooks.arch.tapAsync('vue', (name, cb) => {
      setTimeout(() => {
        console.log("vue", name)
        cb()
      }, 1000)
    })
  }
  start () {
    this.hooks.arch.callAsync('Olivia', () => {
      console.log("end")
    })
  }
}
let l = new Lesson()
l.tap()
l.start()
/**
 * node Olivia
 * vue Olivia
 * end
 */
```
### 1.5.1. 异步AsyncParallelHook模拟
```js
/**
 * webpack异步钩子模拟：AsyncParallelHook
 */
class AsyncParallelHook {
  constructor (args) {
    this.tasks = []
  }
  tapAsync (name, task) {
    this.tasks.push(task)
  }
  callAsync (...args) {
    let finalCallBack = args.pop() // 拿出最终的函数
    let index = 0 // 计数
    let done = () => { // 类似Promise.all()方法
      // 已经做到到最后一个任务了，就执行
      index++
      if (index === this.tasks.length) {
        finalCallBack()
      }
    }
    this.tasks.forEach(task => {
      task(...args,done)
    })
    
  }
}

let hook = new AsyncParallelHook()
hook.tapAsync('node', (name, callback) => {
  setTimeout(() => {
    console.log("node", name)
    callback()
  }, 1000)
})
hook.tapAsync('vue', (name, callback) => {
  setTimeout(() => {
    console.log("vue", name)
    callback()
  }, 1000)
})
hook.callAsync("Olivia", () => {
  console.log("end")
})
```

### 1.5.2. AsyncParallelHook模拟用Promise实现

```js
class AsyncParallelHook {
  constructor (args) {
    this.tasks = []
  }
  tapPromise (name, task) {
    this.tasks.push(task)
  }
  callPromise (...args) {
   let taskArray = this.tasks.map(task => task(...args)) //将每个异步任务保存起来
    return  Promise.all(taskArray)
  }
}

let hook = new AsyncParallelHook()
hook.tapPromise('node', name => {
 return new Promise((resolve, reject) => {
   setTimeout(() => {
     console.log("node", name)
     resolve()
   }, 1000)
 })
})
hook.tapPromise('vue', name => {
  return new Promise((resolve, reject) => {
    console.log("vue", name)
    resolve()
  }, 1000)
})
hook.callPromise("Olivia").then(() => {
  console.log("end")
}) 
```


## 1.6. 异步串行AsyncSeriesHook
```js
/*
* webpack异步钩子：AsyncSeriesHook
*/
const {AsyncSeriesHook} = require("tapable")

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tap(){
    this.hooks.arch.tapAsync('node', (name, callback) => { 
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("node", name)
          callback() // 需要callback，若是resolve()只是会执行第一个
        }, 1000)
      })
    })
    this.hooks.arch.tapAsync('vue', (name, callback) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("vue", name)
          callback()
        }, 1000)
      })
    })
  }
  start(){
    this.hooks.arch.callAsync('Olivia', () => {
      console.log("end")
    })
  }
}
let l = new Lesson()
l.tap()
l.start()
/**
 * node Olivia
 * vue Olivia
 * end
 */
```
### 1.6.1. AsyncSeriesHook模拟实现
```js
/**
 * webpack异步钩子模拟：AsyncSeriesHook
 */
class AsyncSeriesHook {
  constructor() {
    this.tasks = []
  }
  tapAsync(name, task) {
    this.tasks.push(task)
  }
  callAsync(...args) {
    const lastCallback = args.pop() // 先将最后一个任务存起来
    let index = 0
    let next = () => { // 上一个任务执行callback()就执行下一个任务
      if(this.tasks.length === index) return  lastCallback()
      let task = this.tasks[index++]
      task(...args, next) // callback()传递下去
    }
    next() // 至少先执行一次
  }
}
let hook = new AsyncSeriesHook()
hook.tapAsync('node', (name, callback) => {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      console.log("node", name)
      callback()
    }, 1000)
  })
})
hook.tapAsync('vue', (name, callback) => {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      console.log("vue", name)
      callback()
    }, 1000)
  })
})
hook.callAsync('Olivia',() => {
  console.log("end")
})
```

## 1.7. AsyncSeriesHook用tapPromise实现

```js
/*
* webpack异步钩子：AsyncSeriesHook用tapPromise实现
*/
const {AsyncSeriesHook} = require("tapable")

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tap(){
    this.hooks.arch.tapPromise('node', (name) => { 
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("node", name)
          resolve() // 需要callback，若是resolve()只是会执行第一个
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('vue', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("vue", name)
          resolve()
        }, 1000)
      })
    })
  }
  start(){
    this.hooks.arch.promise('Olivia').then(() => {
      console.log("end")
    }) 
  }
}
let l = new Lesson()
l.tap()
l.start()
/**
 * node Olivia
 * vue Olivia
 * end
 */
```

### 1.7.1. AsyncSeriesHook用Promise模拟实现
```js
class AsyncSeriesHook {
  constructor() {
    this.tasks = []
  }
  tapPromise(name, task) {
    this.tasks.push(task)
  }
  callPromise(...args) { // 异步串行Promise
    let [first, ...others] = this.tasks
    return others.reduce((other, next)=>{
      return other.then(() => next(...args)) // 上一个task成功resolve后才执行下一个
    }, first(...args))
  }
}
let hook = new AsyncSeriesHook()
hook.tapPromise('node', (name) => {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      console.log("node", name)
      resovle()
    }, 1000)
  })
})
hook.tapPromise('vue', (name) => {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      console.log("vue", name)
      resovle()
    }, 1000)
  })
})
hook.callPromise('Olivia').then(() => {
  console.log("end")
})
```

## 1.8. 异步串行AsyncSeriesBailHook
- 非null（错误的原因）就会停止向下执行，可以在callAsync()里接收错误
```js
/*
* webpack异步钩子：AsyncSeriesBailHook,callback返回
    非null（错误的原因）就会停止向下执行，可以在callAsync()里接收错误
*/
const {AsyncSeriesBailHook} = require("tapable")

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesBailHook(['name'])
    }
  }
  tap(){
    this.hooks.arch.tapAsync('node', (name, callback) => { 
      setTimeout(() => {
        console.log("node", name)
        callback()
      }, 1000)
    })
    this.hooks.arch.tapAsync('vue', (name, callback) => {
      setTimeout(() => {
        console.log("vue", name)
        callback('错误，停止学')
      }, 1000)
    })
    this.hooks.arch.tapAsync('react', (name, callback) => {
      setTimeout(() => {
        console.log("react", name)
        callback()
      }, 1000)
    })
  }
  start(){
    this.hooks.arch.callAsync('Olivia', (err)=> {
      console.log("end", err)
    })
  }
}
let l = new Lesson()
l.tap()
l.start()
/**
 * node Olivia
 * vue Olivia
 * err 错误，停止学
 * // 并没有继续向下执行
 */
```
### 1.8.1. AsyncSeriesBailHook用tapPromise实现
```js
/*
* webpack异步钩子：AsyncSeriesBailHook用tapPromise
*/
const {AsyncSeriesBailHook} = require("tapable")

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesBailHook(['name'])
    }
  }
  tap(){
    this.hooks.arch.tapPromise('node', (name) => { 
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("node", name)
          resolve()
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('vue', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("vue", name)
          reject('错误，停止学')
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('react', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("react", name)
          resolve()
        }, 1000)
      })
    })
  }
  start(){
    this.hooks.arch.promise('Olivia')
    .then(() => {
      console.log("end")
    }).catch((err) => {
      console.log("err", err)
    })
  }
}
let l = new Lesson()
l.tap()
l.start()
/**
 * node Olivia
 * vue Olivia
 * err 错误，停止学
 * // 并没有继续向下执行
 */
```

### 1.8.2. AsyncSeriesBailHook用Promise模拟实现
```js
/**
 * webpack异步钩子模拟：AsyncSeriesBailHook用Promise实现
 */
class AsyncSeriesBailHook {
  constructor() {
    this.tasks = []
  }
  tapPromise(name, task) {
    this.tasks.push(task)
  }
  callPromise(...args) { // 异步串行Promise
    let [first, ...others] = this.tasks
    return others.reduce((other, next)=>{
      return other.then( // 上一个task成功resolve后才执行下一个
        () => next(...args))
        .catch(err => // 遇到错误停止继续执行
          {
            console.log(err,"结束")
            return new Promise(() => {})}) 
    }, first(...args))
  }
}
let hook = new AsyncSeriesBailHook()
hook.tapPromise('node', (name) => {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      console.log("node", name)
      resovle()
    }, 1000)
  })
})
hook.tapPromise('vue', (name) => {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      console.log("vue", name)
      reject("error停止")
    }, 1000)
  })
})
hook.tapPromise('react', (name) => {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      console.log("react", name)
      resovle()
    }, 1000)
  })
})
hook.callPromise('Olivia').then(() => {
  console.log("end")
})
```

## 1.9. 异步串行AsyncSeriesWaterfallHook
```js
// /*
// * webpack异步钩子：AsyncSeriesWaterfallHook
// */
const {AsyncSeriesWaterfallHook} = require("tapable")

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['name'])
    }
  }
  tap(){
    this.hooks.arch.tapAsync('node', (name, callback) => { 
        setTimeout(() => {
          console.log("node", name)
          callback(null, "node传递下去") 
        }, 1000)
    })
    this.hooks.arch.tapAsync('vue', (data, callback) => {
      setTimeout(() => {
        console.log("vue", data)
        // callback(null, "vue传递下去") // 1
        callback('errorok', "vue传递下去") // 2
      }, 1000)
    })
    this.hooks.arch.tapAsync('jquery', (data, callback) => {
      setTimeout(() => {
        console.log("jquery", data)
        callback()
      }, 1000)
    })
  }
  start(){
    this.hooks.arch.callAsync('Olivia', () => {
      console.log("end")
    }) 
  }
}
let l = new Lesson()
l.tap()
l.start()
/**情况1
 * node Olivia
 * vue node传递下去
 * jquery vue传递下去
 * end
 * 情况2
 * node Olivia
 * vue node传递下去
 * end
 * 并没有执行jquery
 */
```
### 1.9.1. 异步串行AsyncSeriesWaterfallHook模拟
```js
/**
 * webpack异步钩子模拟：AsyncSeriesWaterfallHook
 */
class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = []
  }
  tapAsync(name, task){
    this.tasks.push(task)
  }
  callAsync(...args){
    let finalCallBack =args.pop()
    let index = 0 
    let next = (err, data) => {
      let task = this.tasks[index]
      if(!task) return finalCallBack() // 执行完所有任务了
      if (index === 0) { // 区分传递的是data还是name
        task(...args, next) // 第一个任务是没有data
      }else {
        task(data, next)
      }
      index++
    }
    next()
  }
}
let  hook = new AsyncSeriesWaterfallHook()
hook.tapAsync("node", (name, callback) =>{
    setTimeout(() => {
      console.log("node", name)
      callback(null, "传递下去")
    }, 1000)
})
hook.tapAsync("vue", (data, callback) =>{
    setTimeout(() => {
      console.log("vue", data)
      callback(null)
    }, 1000)
})
hook.callAsync("Olivia", ()=> {
  console.log("end")
})
```

## 1.10. 异步串行AsyncSeriesWaterfallHook用tapPromise实现
```js
/*
* webpack异步钩子：AsyncSeriesWaterfallHook的Promise实现
*/
const {AsyncSeriesWaterfallHook} = require("tapable")

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['name'])
    }
  }
  tap(){
    this.hooks.arch.tapPromise('node', (name) => { 
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("node", name)
          resolve("node传递下去") 
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('vue', (data) => { 
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("vue", data)
          resolve("vue传递下去") 
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('react', (data) => { 
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("react", data)
          resolve()
        }, 1000)
      })
    })
    
  }
  start(){
    this.hooks.arch.promise('Olivia').then(() => {
      console.log("end")
    }) 
  }
}
let l = new Lesson()
l.tap()
l.start()
/**
 * node Olivia
 * vue node传递下去
 * react vue传递下去
 * end
 */
```

### 1.10.1. AsyncSeriesWaterfallHook用Promise实现
```js
/**
 * webpack异步钩子模拟：AsyncSeriesWaterfallHook用Promise实现
 */
class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = []
  }
  tapPromise(name, task){
    this.tasks.push(task)
  }
  callPromise(...args){
    let [first, ...others] = this.tasks
    return others.reduce((other, next)=> {
      return other.then((data) => {
        return data ? next(data) :  next(...args)
      })
    }, first(...args))
  }
}
let  hook = new AsyncSeriesWaterfallHook()
hook.tapPromise("node", (name) =>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("node", name)
      resolve("传递下去")
    }, 1000)
  })
})
hook.tapPromise("vue", (data) =>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("vue", data)
      resolve()
    }, 1000)
  })
})
hook.callPromise("Olivia").then(()=> {
  console.log("end")
})
```

# 2. 导入自定义loader
方式一
```js
{
  test: /\.js$/,
  use: path.resolve(__dirname, 'loader', 'loader1.js') // loader为webpack同目录下的loader文件夹，loader1为自定义的loader
}
```
方式二: resolveLoader里配置别名，resolveLoader是专门解析loader的，和module,entry同级
```js
 resolveLoader: {
    // 别名
    alias: {
      loader1: path.resolve(__dirname, 'loader', 'loader1.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'loader1'
      }
    ]
  }
```
方式三： 在resolveLoader里配置modules
```js
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loader')] // 只需要配置文件夹名
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'loader1'
      }
    ]
  }
```
# 3. 导入多个loader
顺序： 默认从下到上，从右到左
```js
resolveLoader: {
    // 别名
    alias: {
      loader1: path.resolve(__dirname, 'loader', 'loader1.js'),
      loader2: path.resolve(__dirname, 'loader', 'loader2.js')
      loader3: path.resolve(__dirname, 'loader', 'loader3.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['loader1', 'loader2','loader3']
      }
    ]
  }
/*
loader3
loader2
loader1
*/
rules: [
      {
          test: /\.js$/,
          use: ['loader3']
      },
      {
          test: /\.js$/,
          use: ['loader2']
      },
      {
          test: /\.js$/,
          use: ['loader1']
      }
  ]
/*
loader1
loader2
loader3
*/
```
- 添加enforce参数修改顺序, enforce: pre 前面的， post在后面的。
- loader两个阶段：pitching和normal阶段，类似于js中的事件冒泡、捕获阶段
    + Pitching阶段： post，inline，normal，pre
    + Normal阶段：pre，normal，inline，post
- 添加 -！ 不让文件再通过pre + normal处理
- 添加！ 不让normal处理
- 添加！！ 只让inline处理
```js
    rules: [
      {
          test: /\.js$/,
          use: ['loader3'],
          enforce: 'pre'
      },
      {
          test: /\.js$/,
          use: ['loader2']
      },
      {
          test: /\.js$/,
          use: ['loader1'],
          enforce: 'post'
      }
  ]
/*
loader3
loader2
loader1
*/
{
    test: /\.js$/,
    use: ['loader3'],
    enforce: 'pre'
},
{
    test: /\.js$/,
    use: ['loader2']
},
{
    test: /\.js$/,
    use: ['loader1'],
    enforce: 'post'
}
// 在src/index.js文件行内配置了 let str = require('inline-loader!./inlineA.js')之后
// 第一次的loader3、loader2、loader1是处理正常文档的，下面的loader是处理require文档的
/*
loader3
loader2
loader1
loader3
loader2
inline-loader
loader1
*/
// 在src/index.js文件行内配置了 let str = require('-!inline-loader!./inlineA.js')之后
/*不再经过pre+normal处理，就是3和2已经没有了
loader3
loader2
loader1
inline-loader
loader1
*/
// 在src/index.js文件行内配置了 let str = require('!inline-loader!./inlineA.js')之后
/*不再经过normal处理，就是2没有
/*
loader3
loader2
loader1
loader3
inline-loader
loader1
*/
// 在src/index.js文件行内配置了 let str = require('!!inline-loader!./inlineA.js')之后
/*只有inline处理
/*
loader3
loader2
loader1
inline-loader
*/
```
loader.pitch有返回值时： 会阻断执行
```js
// webpack.config.js顺序： use: ['loader3', 'loader2', 'loader1']
/*结果： loader1 loader2 loader3*/
// 在loader2.js添加
loader2.pitch = function () {
  return 'loader2有返回值停止'
/*结果变成： loader3*/
```

# 4. 自定义实现babel-loader
- npm install @babel/core @babel/preset-env loader-utils
loader-utils是loader的工具类
```js
let babelCore = require('@babel/core')
let loaderUtils = require('loader-utils')
function babel (source) {
  // console.log(this.resourcePath) // 结果 D:\note\webpack_loader\src\index.js
  let options = loaderUtils.getOptions(this)  // 获取配置选项
  let callback = this.async() // 函数是异步
  babelCore.transform(source, {
    ...options,
    sourceMap: true,  // 设置源码映射
    filename: this.resourcePath.split('/').pop() // 命名生成的文件名
  }, function (error, result) {
    callback(error, result.code, result.map)  // 返回：错误，源码，源码映射
  })
}
module.exports = babel
```
# 5. 自定义实现banner-loader
该loader的作用是是给匹配的js添加一个注释
- npm install schema-utils
wepack.config.js
```js
{    // 给所有匹配的`js`加一个注释
    test: /\.js$/,
    use: {
        loader: 'banner-loader',
        options: {
           text: 'may',
           filename: path.resolve(__dirname, 'banner.js')
        }
    }
}
```
```js
// 拿到loader的配置
let loaderUtils = require('loader-utils')
// 校验Loader的模块
let validateOptions = require('schema-utils')
// 读取文件
let fs = require('fs')

function loader(source) {
  let options = loaderUtils.getOptions(this)
  let callback = this.async()
  let schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string'
      },
      filename: {
        type: 'string'
      }
    }
  }
  validateOptions(schema, options, 'banner-loader')  // 自己的校验格式， 自己的写的配置， 对应的loader名字说明哪个loader报错
  if (options.filename) {
    this.cacheable(false) // webpack自动会启动缓存，这里设置不要缓存 ，如果计算量很大时，一般需要缓存
    // this.cacheable && this.cacheable() // 第一次就缓存，之后就再缓存
    this.addDependency(options.filename) // 添加到webpack依赖里面去，启动了watch,如果发生了变化，就重新打包
    fs.readFile(options.filename, 'utf-8', function(err, data) {
      callback(err, `/**${data}**/${source}`)
    })
  } else {
    callback(nul, `/**${options.text}**/${source}`)
  }
  return source
}

module.exports = loader
// 建一个文档'banner.js' 写上Olivia123
// 打包后在生成的文件里就包含/**Olivia123**/
```
# 6. 实现file-loader和url-loader
- file-loader: 目的是根据图片生成md5 发射到dist目录下，file-loader 返回当前图片路径
```js
let loaderUtils = require('loader-utils')
function loader(source) {
  // file-loader: 目的是根据图片生成md5 发射到dist目录下，file-loader 返回当前图片路径
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]',
   {content: source})
  this.emitFile(filename, source) // 发射文件
  return `module.exports="${filename}"`
}
loader.raw = true // 转成二进制
module.exports = loader
```
- url-loader: 如果文件比limit小，将图片文件转换为base64编码并载入浏览器能够减少http请求数；如果文件比limit（以bytes为单位）大，那么webpack就会使用file-loader去处理文件，并且所有的查询参数都会传递给file-loader。
```js
let loaderUtils = require('loader-utils')
let mime = require('mime') // 获取文件后缀
function loader(source) {
  let {limit} = loaderUtils.getOptions(this)
  if (limit && limit > source.length) { // 如果文件小于限制，用base64编码，base64格式：data:image/png;base64,编码部分
    // ${mime.getType(this.resourcePath)}代表文件后缀
    return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
  } else { // 大于限制，直接使用file-loader
    return require('./file-loader').call(this, source)
  }
}

loader.raw = true
module.exports = loader
```

# 7. 实现less-loader,css-loader,style-loader
- less-loader:需要npm install less，用于加载.less文件，将less转化为css
```js
let less = require('less')

function loader (source) {
  let css
  // console.log(source, 2222)
  less.render(source, (err, output) => { //less.render()第一个参数是源码，第二个参数是失败和成功的结果
    // console.log(output)
    css = output.css // output.css就是less转为css的结果
  })
  // css = css.replace(/\n/g, '\\n')
  return css
}

module.exports = loader
```

- css-loader：用于加载.css文件，将css转化为commonjs， 用来解析@import这种语法，包括css中的引入图片
```js
/* less代码：
@base: #666;
body {
  background: @base;
  background-image: url('../src/2.png');
}
将less代码分成三部分
第一部分：
@base: #666;
body {
  background: @base;
  background-image:
第二部分：使用require将其打包
url('./2.png');
第三部分：
}
*/
function loader (source) {
  let reg = /url\((.+?)\)/g // 匹配url(),(.+?)为惰性匹配，参考链接： https://www.cnblogs.com/ysk123/p/9896850.html
  let pos = 0 // 代码的位置
  let current
  let arr = ['let list = []'] // 最后要拼出一个字符串的结果

  while (current = reg.exec(source)) {
    let [matchUrl, group] = current //[匹配的路径，匹配到的正则()分组] 
    // console.log("matchUrl: ",matchUrl, "group: ",group) // matchUrl:  url('./2.png') group:  './2.png'
    let last = reg.lastIndex - matchUrl.length // 代码的长度-匹配url()的长度
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`) // 拼入第一部分的代码
    pos = reg.lastIndex
    arr.push(`list.push('url('+ require(${group}) +')')`)  // 把url里的内容（正则（）里的内容）弄成require的写法，拼入第二部分的代码--》url(require('../src/2.png'))
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`) // 拼入地址之后到结尾的代码--》一个回车}
  arr.push(`module.exports = list.join('')`) // 数组通过module.exports导出
  // console.log("arr.join('\r\n'): ", arr.join('\r\n'))
  /**打印结果：
    let list = []
    list.push($(JSON.stringfy(source.slice(position, last)))
    last.push('url('+require($(group)+')')
    list.push($JSON.stringfy(source.slice(position)))
    module.exports=list.join('')
   */
  return arr.join('\r\n')

}

module.exports = loader
```
- style-loader: 将样式通过`style`标签插入到head中
```js
let loaderUtils = require('loader-utils')

function loader (source) {
  let str = `
  let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)`
  // JSON.stringify(source) 不仅将源码都转成字符串，还将回车转成\r\n ==>style.innerHTML = 'body{\r\n background: red}'
  return str
}
// 在style-loader上写了pitch，让style-loader 处理 less-loader 和css-loader拼接的结果
// webpack.config.js顺序：use: ['style-loader', 'css-loader', 'less-loader']
loader.pitch = function (remainingRequest) { // 剩余的请求  less-loader!css-loader!/./background.less
  // console.log("remainingRequest:", remainingRequest)
  // 打印结果： D:\note\webpack_loader\loader\css-loader.js!D:\note\webpack_loader\loader\less-loader.js!D:\note\webpack_loader\src\background.less
  
  // console.log("loaderUtils.stringifyRequest: ", loaderUtils.stringifyRequest(this, '!!' + remainingRequest))
  // 打印结果： !!../loader/css-loader.js!../loader/less-loader.js!./background.less
  let str = `
  let style = document.createElement('style')
  style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})
  document.head.appendChild(style)`
  // // 添加！表示该loader为行内，loaderUtils.stringifyRequest将其路径变为相对路径
  return str
}

module.exports = loader
```
- webpack.config.js
```js
{
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
}
```
# 8. Plugins顺序
看node_modules/webpack/Compiler.js里面的class Compiler extends Tapable{}，里面包含hooks监听的各种事件
先按照webpack.config.js的编写顺序完成同步，再按照hooks的顺序再完成异步。
- webpack.config.js
```js
  plugins: [
    new DonePlugin(), // 同步
    new AsyncPlugins() ,// 异步
  ]
```
- DonePlugin:同步编译完成
```js
class DonePlugins {
  apply (compiler) {
    console.log("DonePlugins")
    compiler.hooks.done.tap('DonePlugin', (status) => {
      console.log("编译完成")
    })
  }
}

module.exports = DonePlugins
```
- AsyncPlugins：异步发射
```js
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
/*
DonePlugins
AsyncPlugins
使用tapAsync文件发射,等一秒
使用tapPromise文件发射,等两秒
编译完成
*/
```
# 9. 文件列表插件:生成一个文件描述打包文件的插件
- webpack.config.js
```js
    new FileListPLugin({
      filename: 'list.md'
    }),
```
- FileListPlugin
```js
class FileListPlugin {
  constructor ({filename}) {
    this.filename = filename
  }
  apply (compiler) {
    // 文件已经准备好，要进行发射
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      let assets = compilation.assets // assets里包含保存的资源
      console.log("assets", assets)
      let content = `## 文件名 资源大小\r\n` // 文件里默认的字符串
      //  Object.entries()将文件转成数组 [[bundle.js, {}], [index.html, {}]]
      // 如资源：'index.html': { source: [Function: source], size: [Function: size] }
      Object.entries(assets).forEach(([filename, statObj]) => {
        content += `-${filename}  ${statObj.size()}\r\n`
      })
      // 把生成的文件也添加到资源对象里
      assets[this.filename] = {
        source() {
          return content
        },
        size() {
          return content.length
        }
      }
    })
  }
}

module.exports = FileListPlugin
/* list.md
## 文件名 资源大小
-index.html  5629
*/
```

# 10. 内联的webpack插件
- 需要npm install html-webpack-plugin@next mini-css-extract-plugin
- HtmlWebpackPlugin的钩子监听的函数： https://github.com/jantimon/html-webpack-plugin
- webpack.config.js
```js
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new InlineSourcePlugins({
      match: /\.(js|css)$/
    })
  ]
```
- InlineSourcePlugin: 把js，css外链标签打包后内联在index.html文件中
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
class InlineSourcePlugins {
  constructor ({match}) {
    this.reg = match
  }

  // 处理某一个标签的方法
  processTag(tag, compilation) {
    // tag: { tagName: 'link', voidTag: true, attributes: [Object] } 
    // console.log(tag.attributes) // { href: 'main.css', rel: 'stylesheet' } { src: 'bundle.js' }
    let newTag = {}
    let url = '' // 保存文件地址
    // 配置文件的标签和文件地址
    if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style',
        attributes: {type: 'text/css'}
      }
      url = tag.attributes.href // 文件路径
    }
    if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
        attributes: {type: 'application/javascript'}
      }
      url = tag.attributes.src
    }
    // 配置文件的代码
    if (url) {
      newTag.innerHTML = compilation.assets[url].source() // 文件内容放到innerHTML属性中
      delete compilation.assets[url] // 删除原有的资源
      // console.log(compilation.assets[url].source())
      return newTag
    }
    return tag
  }

  // // 处理引入标签的数据
  processTags(data, compilation) {
    //  目前data：headTags: [ { tagName: 'link', voidTag: true, attributes: [Object] } ],
    // bodyTags: [ { tagName: 'script', voidTag: false, attributes: [Object] } ],
    let headTags = []
    let bodyTags = []
    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation))
    }) 
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation))
    })
    //console.log(...data, headTags, bodyTags)
    return {...data, headTags, bodyTags}
  }

  apply(compiler) {
    // 通过webpackPlugin来实现 百度搜索html-webpack-plugin看它的钩子
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      console.log('The compiler is starting a new compilation...')
      // alterAssetTagGroups：修改资源标签组之前
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'alterPlugin',
        (data, callback) => {
          //console.log(data)
          /* {
              headTags: [ { tagName: 'link', voidTag: true, attributes: [Object] } ],
              bodyTags: [ { tagName: 'script', voidTag: false, attributes: [Object] } ],
              outputName: 'index.html',
              plugin: HtmlWebpackPlugin {...
                ...
           */
          data = this.processTags(data, compilation) // 资源都在compilation里面
          callback(null, data) // 成功就把数据返回去
        }
      )
    })
  }
}

module.exports = InlineSourcePlugins

/**按照姜文老师install html-webpack-plugin的过程中，使用getHooks()报错this.htmlWebpackPlugin.getHooks is not a function，
 * install html-webpack-plugin之后就可以正常使用
 */
```