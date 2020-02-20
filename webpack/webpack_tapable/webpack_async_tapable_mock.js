/**
 * webpack异步钩子模拟：AsyncParallelHook
 */
// class AsyncParallelHook {
//   constructor (args) {
//     this.tasks = []
//   }
//   tapAsync (name, task) {
//     this.tasks.push(task)
//   }
//   callAsync (...args) {
//     let finalCallBack = args.pop() // 拿出最终的函数
//     let index = 0 // 计数
//     let done = () => { // 类似Promise.all()方法
//       // 已经做到到最后一个任务了，就执行
//       index++
//       if (index === this.tasks.length) {
//         finalCallBack()
//       }
//     }
//     this.tasks.forEach(task => {
//       task(...args,done)
//     })
    
//   }
// }

// let hook = new AsyncParallelHook()
// hook.tapAsync('node', (name, callback) => {
//   setTimeout(() => {
//     console.log("node", name)
//     callback()
//   }, 1000)
// })
// hook.tapAsync('vue', (name, callback) => {
//   setTimeout(() => {
//     console.log("vue", name)
//     callback()
//   }, 1000)
// })
// hook.callAsync("Olivia", () => {
//   console.log("end")
// })

/**
 * webpack异步钩子模拟：AsyncParallelHook用Promise实现
 */
// class AsyncParallelHook {
//   constructor (args) {
//     this.tasks = []
//   }
//   tapPromise (name, task) {
//     this.tasks.push(task)
//   }
//   callPromise (...args) {
//    let taskArray = this.tasks.map(task => task(...args)) //将每个异步任务保存起来
//     return  Promise.all(taskArray)
//   }
// }

// let hook = new AsyncParallelHook()
// hook.tapPromise('node', name => {
//  return new Promise((resolve, reject) => {
//    setTimeout(() => {
//      console.log("node", name)
//      resolve()
//    }, 1000)
//  })
// })
// hook.tapPromise('vue', name => {
//   return new Promise((resolve, reject) => {
//     console.log("vue", name)
//     resolve()
//   }, 1000)
// })
// hook.callPromise("Olivia").then(() => {
//   console.log("end")
// }) 
  
/**
 * webpack异步钩子模拟：AsyncSeriesHook
 */
// class AsyncSeriesHook {
//   constructor() {
//     this.tasks = []
//   }
//   tapAsync(name, task) {
//     this.tasks.push(task)
//   }
//   callAsync(...args) {
//     const lastCallback = args.pop() // 先将最后一个任务存起来
//     let index = 0
//     let next = () => { // 上一个任务执行callback()就执行下一个任务
//       if(this.tasks.length === index) return  lastCallback()
//       let task = this.tasks[index++]
//       task(...args, next) // callback()传递下去
//     }
//     next() // 至少先执行一次
//   }
// }
// let hook = new AsyncSeriesHook()
// hook.tapAsync('node', (name, callback) => {
//   return new Promise((resovle, reject) => {
//     setTimeout(() => {
//       console.log("node", name)
//       callback()
//     }, 1000)
//   })
// })
// hook.tapAsync('vue', (name, callback) => {
//   return new Promise((resovle, reject) => {
//     setTimeout(() => {
//       console.log("vue", name)
//       callback()
//     }, 1000)
//   })
// })
// hook.callAsync('Olivia',() => {
//   console.log("end")
// })

/**
 * webpack异步钩子模拟：AsyncSeriesHook用Promise实现
 */
// class AsyncSeriesHook {
//   constructor() {
//     this.tasks = []
//   }
//   tapPromise(name, task) {
//     this.tasks.push(task)
//   }
//   callPromise(...args) { // 异步串行Promise
//     let [first, ...others] = this.tasks
//     return others.reduce((other, next)=>{
//       return other.then(() => next(...args)) // 上一个task成功resolve后才执行下一个
//     }, first(...args))
//   }
// }
// let hook = new AsyncSeriesHook()
// hook.tapPromise('node', (name) => {
//   return new Promise((resovle, reject) => {
//     setTimeout(() => {
//       console.log("node", name)
//       resovle()
//     }, 1000)
//   })
// })
// hook.tapPromise('vue', (name) => {
//   return new Promise((resovle, reject) => {
//     setTimeout(() => {
//       console.log("vue", name)
//       resovle()
//     }, 1000)
//   })
// })
// hook.callPromise('Olivia').then(() => {
//   console.log("end")
// })

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

// /**
//  * webpack异步钩子模拟：AsyncSeriesWaterfallHook
//  */
// class AsyncSeriesWaterfallHook {
//   constructor() {
//     this.tasks = []
//   }
//   tapAsync(name, task){
//     this.tasks.push(task)
//   }
//   callAsync(...args){
//     let finalCallBack =args.pop()
//     let index = 0 
//     let next = (err, data) => {
//       let task = this.tasks[index]
//       if(!task) return finalCallBack() // 执行完所有任务了
//       if (index === 0) { // 区分传递的是data还是name
//         task(...args, next) // 第一个任务是没有data
//       }else {
//         task(data, next)
//       }
//       index++
//     }
//     next()
//   }
// }
// let  hook = new AsyncSeriesWaterfallHook()
// hook.tapAsync("node", (name, callback) =>{
//     setTimeout(() => {
//       console.log("node", name)
//       callback(null, "传递下去")
//     }, 1000)
// })
// hook.tapAsync("vue", (data, callback) =>{
//     setTimeout(() => {
//       console.log("vue", data)
//       callback(null)
//     }, 1000)
// })
// hook.callAsync("Olivia", ()=> {
//   console.log("end")
// })

/**
 * webpack异步钩子模拟：AsyncSeriesWaterfallHook用Promise实现
 */
// class AsyncSeriesWaterfallHook {
//   constructor() {
//     this.tasks = []
//   }
//   tapPromise(name, task){
//     this.tasks.push(task)
//   }
//   callPromise(...args){
//     let [first, ...others] = this.tasks
//     return others.reduce((other, next)=> {
//       return other.then((data) => {
//         return data ? next(data) :  next(...args)
//       })
//     }, first(...args))
//   }
// }
// let  hook = new AsyncSeriesWaterfallHook()
// hook.tapPromise("node", (name) =>{
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("node", name)
//       resolve("传递下去")
//     }, 1000)
//   })
// })
// hook.tapPromise("vue", (data) =>{
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("vue", data)
//       resolve()
//     }, 1000)
//   })
// })
// hook.callPromise("Olivia").then(()=> {
//   console.log("end")
// })