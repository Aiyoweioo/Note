// 根据指令进行具体编译：接收参数：node接收节点，value对应的值（去data里面查找），vm：当前实例， eventName事件
const compileUtil = {
  // 获取最终的值
  getVal(expr, vm) { // expr:"msg",or expr: "person.fav"     
    return expr.split('.').reduce((data, currentVal) => {
      // console.log(data[currentVal],index ) 第一次：{name: 'olivia', age:23, fav: "travel"}  第二次：tarvel 
      return data[currentVal]
    }, vm.$data)
  },
  setVal(expr, vm ,inputVal){ // v-model双向数据绑定，当用户修改视图数据修改时更新数据
    return expr.split('.').reduce((data, currentVal)=>{
      data[currentVal] = inputVal 
    }, vm.$data)
  },
  getTextVal(expr, vm){
    // {{person.name}}--{{person.age}}，防止修改person.name使得所有值全部被替换
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(args[1], vm);
    })
  },
  // 文本的方法:
  text(node, expr, vm) { // node:text, expr:"msg",or expr: "person.fav" 实际的值要从实例上的data去取 
    // 获取属性里真正的值
    let value
    // eg1: {{person.name}} -- {{person.age}} eg2: {{msg}}
    if(expr.indexOf('{{') !== -1){
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        // console.log(args) // eg1:["{{person.name}}", "person.name", 0, "{{person.name}} -- {{person.age}}"] eg2:["{{msg}}", "msg", 0, "{{msg}}"]
        // 绑定更新的数据 数据=>视图 
        new Watcher(vm, args[1], () => { // v-text对应的watcher，这里的expr实际上是{{}}里的内容
          this.updater.textUpdater(node, this.getTextVal(expr, vm)) // 修改后的值可能还带{{}}
        })
        return this.getVal(args[1], vm);
      })
    } else {
      value = this.getVal(expr, vm)
    }
    // 视图=>数据=>视图
    this.updater.textUpdater(node, value)
  },
  // 节点的方法
  html(node, expr, vm) {
    const value = this.getVal(expr, vm) 
    new Watcher(vm, expr, (newVal)=>{ // v-html对应的watcher
      this.updater.htmlUpdater(node, newVal)
    })
    this.updater.htmlUpdater(node, value)
  },
  // 双向数据绑定的方法
  model(node, expr, vm) {
    const value = this.getVal(expr, vm)
    new Watcher(vm, expr, (newVal)=>{ // v-model对应的watcher
      this.updater.modelUpdater(node, newVal)
    })
    // 视图=>数据=>视图
    node.addEventListener('input', e =>{ // 这里只是监听了input事件
      // 设置值
      this.setVal(expr, vm, e.target.value)
    })
    this.updater.modelUpdater(node, value)
  },
  // 事件绑定的方法
  on(node, expr, vm, eventName) { 
    let fn = vm.$options.methods && vm.$options.methods[expr]
    node.addEventListener(eventName, fn.bind(vm), false)
  },
  // 更新的对象
  updater: {
    textUpdater(node, value) {
      node.textContent = value
    },
    htmlUpdater(node, value) {
      node.innerHTML = value
    },
    modelUpdater(node, value) {
      node.value = value
    }
  }
  
}

