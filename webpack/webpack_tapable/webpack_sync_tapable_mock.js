/**
 * 模拟webpack的SyncHook
 */
// class SyncHook { // 钩子是同步的
//   constructor(args) {
//     this.tasks = [] // 保存任务的数组
//   }
//   tap(name, task) {
//     this.tasks.push(task) // 将任务保存到数组
//   }
//   call(...args) {
//     this.tasks.forEach((task) => task(...args)) // 执行每一个任务
//   }
// }

// let hook = new SyncHook(['name'])

// hook.tap('name', function (name) {
//   console.log('name', name)
// })
// hook.tap('react', function (name) {
//   console.log('react', name)
// })
// hook.call('Olivia')

/**
 * 模拟webpack的SyncBailHook
 */
// class SyncBailHook { // 钩子是同步的
//   constructor(args) {
//     this.tasks = [] // 保存任务的数组
//   }
//   tap(name, task) {
//     this.tasks.push(task) // 将任务保存到数组
//   }
//   call(...args) {
//     let ret; // 当前函数的返回值
//     let index = 0 // 至少要执行一个
//     do {
//       ret = this.tasks[index++](...args)
//     }while(ret === undefined && index < this.args.length) // 遇到返回结果不为undefined且任务没执行完

//   }
// }

// let hook = new SyncBailHook(['name'])

// hook.tap('name', function (name) {
//   console.log('name', name)
//   return "我累了停止向下执行"
// })
// hook.tap('react', function (name) {
//   console.log('react', name)
// })
// hook.call('Olivia')

/**
 * 模拟webpack的SyncWaterfallHook
 */
// class SyncWaterfallHook { // 钩子是同步的
//   constructor(args) {
//     this.tasks = [] // 保存任务的数组
//   }
//   tap(name, task) {
//     this.tasks.push(task) // 将任务保存到数组
//   }
//   call(...args) {
//     let [first, ...others] = this.tasks
//     let ret = first(...args)
//     // 将结果传递下去
//     others.reduce((a, b) => {
//       return b(a)
//     }, ret)
//   }
// }

// let hook = new SyncWaterfallHook(['name'])

// hook.tap('node', function (name) {
//   console.log('node', name)
//   return "nodeok"
// })
// hook.tap('react', function (data) {
//   console.log('react', data)
//   return "reactok"
// })
// hook.tap('vue', function (data) {
//   console.log('vue', data)
// })
// hook.call('Olivia')


/**
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
