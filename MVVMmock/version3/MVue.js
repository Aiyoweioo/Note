/** 第三版: 
 * 完成了new MVVM() compile对象解析大括号表达式，解析指令，初始化视图，同时订阅数据变化的时候，创建watcher实例，绑定了更新函数;
 * 完成了new MVVM()时定义Observer监听所有数据，进行数据劫持，同时Observer创建Dep对象并（Observer的get属性）存储watcher对象，数据发生变化时，Observer的set属性通知Dep实例，Dep实例让watcher去更新数据
 * 实现了双向数据绑定，视图=>数据=>视图；实现了代理 this.$data --> this
 * 缺陷：
 *  编译了指令：v-text,v-html,v-model,v-on,@开头监听的事件; 没有编译指令 bind : 等
 *  Observer只是观察了data为{}的类型
 *  双向数据绑定只是监听了input输入框的事件
 */
class MVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.$options = options
    if (this.$el) {
      // 1. 实现一个数据观察者
      new Observer(this.$data)
      // 2. 实现一个指令解析器
      new Compiler(this.$el, this)
      // 3. 代理this.$data,在编写时可替换成this  this.$data.person.name -->this.person.name
      this.proxyData(this.$data)
    }
  }
  proxyData(data){
    for(const key in data) {
      Object.defineProperty(this, key, {
        get(){
          return data[key]
        },
        set(newVal){
          data[key] = newVal
        }
      })
    }
  }
}


