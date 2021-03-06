/**
 * 实现Observer数据劫持并监听所有属性
 */



/**
 * 当外界改变数据的时候，会走到Object.defineProperty()方法中，首先会去observe监听，判断是不是新的值，
 * 然后通知Dep发生了变化notify，Dep就会让对应的watcher去更新，watcher首先拿到新值，然后判断是不是新的值，再回调新值回去。
 * 那什么时候new Watcher呢，就在每次数据更新的时候我们就绑定数据更新的函数
 * 1. 订阅数据变化，绑定更新函数在什么时候绑定?
 * 在更新对应的html，text等方法中就绑定watcher
 */
class Observer {
  constructor(data) {
    this.observe(data)
  }
  observe(data) { // 
    /*
      person: {
        name: "olivia",
        age: 23,
        fav:{
          a: "travel",
          b: "reading"
        }
      }
     */
    if (data && typeof data === 'object') { // data是对象,可能嵌套其它对象，需要采用递归遍历的方式进行数据劫持
      Object.keys(data).forEach(key => { 
        this.defineReactive(data, key, data[key])
      })
    }
  }
  // 数据劫持
  defineReactive(obj, key, value){
    // 递归观察
    this.observe(value)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get(){
        // 将Dep和Observer关联起来，订阅数据变化时，往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: (newVal) =>{
        // 监听新的值
        this.observe(newVal) // this指向，不用箭头函数this会指向Object，但this需要指向当前实例
        if(newVal !== value){
          value = newVal
        }
        // 告诉Dep通知变化
        dep.notify()
      }
    })
  }
}
