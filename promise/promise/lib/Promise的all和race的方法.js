/**
 * 自定义Promise函数模块
 */

/* 如果用commonJS的语法或者es6模块的语法，需要编译之后才能运行，
用ES5的匿名函数调用/函数表达式调用,IIFE(Immediately Invoked Function Expression)
声明函数的同时立即调用这个函数,ES5时JS只有全局作用域（global scope）、函数作用域（function scope）
为了隔离作用域了,既然只使用一次，那么立即执行（IIFE）
*/
(function (window) {
  /*
  Promise构造函数
  executor： 执行器函数(同步执行)
  */
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  function Promise(executor) {
    const that = this // 将当前promise对象保存起来
    that.status = PENDING // 给promise对象指定一个初始状态,pending
    that.data = undefined // 给promise对象指定一个用于存储结果数据的属性
    that.callbacks = [] // 每个元素的结构 {onResolved() {}, onRejected() {}}
    
    function resolve (value) {
      // 如果当前状态不是pending，直接结束
      if (that.status !== PENDING) {
        return
      }
      // 将状态改为resolved
      that.status = RESOLVED
      // 保存value函数
      that.data = value
      // 如果有待执行的callback函数，立即执行异步回调函数
      if(that.callbacks.length > 0) {
        setTimeout(() =>{
          that.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          })
        })
      }
    }

    function reject (reason) {
      if (that.status !== PENDING) {
        return
      }
      that.status = REJECTED
      that.data = reason
      if (that.callbacks.length > 0) {
        setTimeout(() =>{
          that.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          })
        })
      }
    }
    // 立即同步执行executor
    try {
      executor(resolve, reject)
    } catch (error) { // 如果抛出异常，promise对象变为rejected状态
      reject(error)
    }

  }

  /*
    Promise原型对象的then()
    指定成功和失败的回调函数
    返回一个新的Promise对象
    返回promise的结果由onResolved/onRejected执行结果而定
  */
  Promise.prototype.then = function (onResolved, onRejected) {
    const that = this
    // 指定回调函数的默认值(函数)
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    // 实现错误/异常传透的关键点
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    return new Promise((resolve, reject) => {

      function handle(callbacks) {
        /**
           * 返回promise的结果由onResolved/onRejected执行结果而定
           * 1. 抛出异常，返回promise的结果为失败
           * 2. onResolved()返回的是promise对象，返回promise的结果就是这个结果
           * 3. onResolved()返回的不是promise对象，返回的结果是成功
           */
          
          try {
            const result = callbacks(that.data)
            if (result instanceof Promise) { //  2. onResolved()返回的是promise对象，返回promise的结果就是这个结果
              result.then(resolve, reject)
            } else {// 3. onResolved()返回的不是promise对象，返回的结果是成功
              resolve(result)
            }
          } catch(error) { // 1. 抛出异常，返回promise的结果为失败
            reject(error)
          }
      }

      if (that.status === RESOLVED) {
        // 立即异步执行成功的回调
        setTimeout(() => {
          handle(onResolved)
        })
      } else if (that.status === REJECTED) {
        setTimeout(() => {
          handle(onRejected)
        })
      } else { // 当前状态是pending,将成功和失败的回调函数保存callbacks容器中缓存起来
        that.callbacks.push({
          onResolved () {
            handle(onResolved)
          },
          onRejected () {
            handle(onRejected)
          }
        })

      }
    })
  }
  /*
    Promise原型对象的catch()
    指定失败的回调函数
    返回一个新的Promise对象
  */
  Promise.prototype.catch = function (onRejected)  {
    return this.then(undefined, onRejected)
  }

  /*
  Promise函数对象的resolve()
  返回一个指定结果的成功的promise
  */
  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {//把value的结果作为promise的结果
        value.then(resolve, reject)
      } else { // value不是promise,promise变为成功，数据是value
        resolve(value)
      }
    })
    
  }

  /*
  Promise函数对象的reject()
  返回一个指定reason的失败的promise
  */
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) =>{
      reject(reason)
    })
  }

  /*
  Promise函数对象的all()
  返回一个promise,只有所有promise成功才成功
  */
  Promise.all = function (promisesArray) {
    
  }

  /*
  Promise函数对象的race()
  返回一个promise,结果由第一个完成的promise决定，如果第一个完成的promise成功就成功，第一个完成的promise失败就失败
  */
  Promise.race = function (promisesArray) {

  }
// 向外暴露Promise
 window.Promise = Promise
})(window)

/**
 * function fn(event) {
 * }
 * div.onclick = function (event) {
 *  fn(event)
 * }
 * 上面等价于
 * div.onclick = fn
 * 下面同理
 *  result.then(
      value => resolve(value), // 当result成功时，return的promise也成功
      reason => reject(reason) // 当result失败时，return的promise也失败
    )
    上面等价于
    result.then(resolve, reject) // 等价于上面
 */
