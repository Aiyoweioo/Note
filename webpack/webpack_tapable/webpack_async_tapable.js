/**
异步的勾子分两种串行和并行
并行等待所有并发的异步事件执行后执行回调
- tapable注册的三种方法:
1. 异步的注册方法tap
2. 异步的注册方法tapAsync， 还有个回调参数
3. topPromise,注册promise
- tapable调用的三种
1. call (同步)
2. callAsync （异步）
3. promise （异步）
 * webpack异步钩子：AsyncParallelHook,先执行完异步再执行同步
 */

// let {AsyncParallelHook} = require('tapable')
// // 用tap实现
// class Lesson {
//   constructor () {
//     this.hooks = {
//       arch: new AsyncParallelHook(['name'])
//     }
//   }
//   tap () {
//     this.hooks.arch.tapAsync('node', (name, cb) => {
//       setTimeout(() =>{
//         console.log("node", name)
//         cb()
//       }, 1000)
//     })
//     this.hooks.arch.tapAsync('vue', (name, cb) => {
//       setTimeout(() => {
//         console.log("vue", name)
//         cb()
//       }, 1000)
//     })
//   }
//   start () {
//     this.hooks.arch.callAsync('Olivia', () => {
//       console.log("end")
//     })
//   }
// }
// let l = new Lesson()
// l.tap()
// l.start()
/**
 * node Olivia
 * vue Olivia
 * end
 */
/*
* webpack异步钩子：AsyncParallelHook,用Promise实现
*/
// let {AsyncParallelHook} = require('tapable')
// 用Promise实现
// class Lesson {
//   constructor () {
//     this.hooks = {
//       arch: new AsyncParallelHook(['name'])
//     }
//   }
//   tap () {
//     this.hooks.arch.tapPromise('node', name => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() =>{
//           console.log("node", name)
//           resolve()
//         }, 1000)
//       })
//     })
//     this.hooks.arch.tapPromise('vue', name => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() =>{
//           console.log("vue", name)
//           resolve()
//         }, 1000)
//       })
//     })
//   }
//   start () {
//     this.hooks.arch.promise('Olivia').then(() => {
//       console.log("end")
//     })
//   }
// }
// let l = new Lesson()
// l.tap()
// l.start()
/**
 * node Olivia
 * vue Olivia
 * end
 */

/*
* webpack异步钩子：AsyncSeriesHook
*/
// const {AsyncSeriesHook} = require("tapable")

// class Lesson {
//   constructor() {
//     this.hooks = {
//       arch: new AsyncSeriesHook(['name'])
//     }
//   }
//   tap(){
//     this.hooks.arch.tapAsync('node', (name, callback) => { 
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("node", name)
//           callback() // 需要callback，若是resolve()只是会执行第一个
//         }, 1000)
//       })
//     })
//     this.hooks.arch.tapAsync('vue', (name, callback) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("vue", name)
//           callback()
//         }, 1000)
//       })
//     })
//   }
//   start(){
//     this.hooks.arch.callAsync('Olivia', () => {
//       console.log("end")
//     })
//   }
// }
// let l = new Lesson()
// l.tap()
// l.start()
/**
 * node Olivia
 * vue Olivia
 * end
 */

/*
* webpack异步钩子：AsyncSeriesHook用tapPromise实现
*/
// const {AsyncSeriesHook} = require("tapable")

// class Lesson {
//   constructor() {
//     this.hooks = {
//       arch: new AsyncSeriesHook(['name'])
//     }
//   }
//   tap(){
//     this.hooks.arch.tapPromise('node', (name) => { 
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("node", name)
//           resolve() // 需要callback，若是resolve()只是会执行第一个
//         }, 1000)
//       })
//     })
//     this.hooks.arch.tapPromise('vue', (name) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("vue", name)
//           resolve()
//         }, 1000)
//       })
//     })
//   }
//   start(){
//     this.hooks.arch.promise('Olivia').then(() => {
//       console.log("end")
//     }) 
//   }
// }
// let l = new Lesson()
// l.tap()
// l.start()
/**
 * node Olivia
 * vue Olivia
 * end
 */

/*
* webpack异步钩子：AsyncSeriesBailHook,callback返回
    非null（错误的原因）就会停止向下执行，可以在callAsync()里接收错误
*/
// const {AsyncSeriesBailHook} = require("tapable")

// class Lesson {
//   constructor() {
//     this.hooks = {
//       arch: new AsyncSeriesBailHook(['name'])
//     }
//   }
//   tap(){
//     this.hooks.arch.tapAsync('node', (name, callback) => { 
//       setTimeout(() => {
//         console.log("node", name)
//         callback()
//       }, 1000)
//     })
//     this.hooks.arch.tapAsync('vue', (name, callback) => {
//       setTimeout(() => {
//         console.log("vue", name)
//         callback('错误，停止学')
//       }, 1000)
//     })
//     this.hooks.arch.tapAsync('react', (name, callback) => {
//       setTimeout(() => {
//         console.log("react", name)
//         callback()
//       }, 1000)
//     })
//   }
//   start(){
//     this.hooks.arch.callAsync('Olivia', (err)=> {
//       console.log("end", err)
//     })
//   }
// }
// let l = new Lesson()
// l.tap()
// l.start()
/**
 * node Olivia
 * vue Olivia
 * err 错误，停止学
 * // 并没有继续向下执行
 */

/*
* webpack异步钩子：AsyncSeriesBailHook用tapPromise
*/
// const {AsyncSeriesBailHook} = require("tapable")

// class Lesson {
//   constructor() {
//     this.hooks = {
//       arch: new AsyncSeriesBailHook(['name'])
//     }
//   }
//   tap(){
//     this.hooks.arch.tapPromise('node', (name) => { 
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("node", name)
//           resolve()
//         }, 1000)
//       })
//     })
//     this.hooks.arch.tapPromise('vue', (name) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("vue", name)
//           reject('错误，停止学')
//         }, 1000)
//       })
//     })
//     this.hooks.arch.tapPromise('react', (name) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("react", name)
//           resolve()
//         }, 1000)
//       })
//     })
//   }
//   start(){
//     this.hooks.arch.promise('Olivia')
//     .then(() => {
//       console.log("end")
//     }).catch((err) => {
//       console.log("err", err)
//     })
//   }
// }
// let l = new Lesson()
// l.tap()
// l.start()
/**
 * node Olivia
 * vue Olivia
 * err 错误，停止学
 * // 并没有继续向下执行
 */


// /*
// * webpack异步钩子：AsyncSeriesWaterfallHook
// */
// const {AsyncSeriesWaterfallHook} = require("tapable")

// class Lesson {
//   constructor() {
//     this.hooks = {
//       arch: new AsyncSeriesWaterfallHook(['name'])
//     }
//   }
//   tap(){
//     this.hooks.arch.tapAsync('node', (name, callback) => { 
//         setTimeout(() => {
//           console.log("node", name)
//           callback(null, "node传递下去") 
//         }, 1000)
//     })
//     this.hooks.arch.tapAsync('vue', (data, callback) => {
//       setTimeout(() => {
//         console.log("vue", data)
//         // callback(null, "vue传递下去") // 1
//         callback('errorok', "vue传递下去") // 2
//       }, 1000)
//     })
//     this.hooks.arch.tapAsync('jquery', (data, callback) => {
//       setTimeout(() => {
//         console.log("jquery", data)
//         callback()
//       }, 1000)
//     })
//   }
//   start(){
//     this.hooks.arch.callAsync('Olivia', () => {
//       console.log("end")
//     }) 
//   }
// }
// let l = new Lesson()
// l.tap()
// l.start()
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

/*
* webpack异步钩子：AsyncSeriesWaterfallHook的Promise实现
*/
// const {AsyncSeriesWaterfallHook} = require("tapable")

// class Lesson {
//   constructor() {
//     this.hooks = {
//       arch: new AsyncSeriesWaterfallHook(['name'])
//     }
//   }
//   tap(){
//     this.hooks.arch.tapPromise('node', (name) => { 
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("node", name)
//           resolve("node传递下去") 
//         }, 1000)
//       })
//     })
//     this.hooks.arch.tapPromise('vue', (data) => { 
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("vue", data)
//           resolve("vue传递下去") 
//         }, 1000)
//       })
//     })
//     this.hooks.arch.tapPromise('react', (data) => { 
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log("react", data)
//           resolve()
//         }, 1000)
//       })
//     })
    
//   }
//   start(){
//     this.hooks.arch.promise('Olivia').then(() => {
//       console.log("end")
//     }) 
//   }
// }
// let l = new Lesson()
// l.tap()
// l.start()
/**
 * node Olivia
 * vue node传递下去
 * react vue传递下去
 * end
 */
