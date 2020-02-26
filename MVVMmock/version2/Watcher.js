// 传入参数：更新的对象，表达式，回调函数：对数据的更新，更新了新值通过cb回调回去
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    // 初始化就将旧值绑定起来
    this.oldVal = this.getOldVal()
  }
  getOldVal(){ // 把旧值保存起来，与新值比较是否发现更新
    // Dep和watcher关联起来,Dep.target定义当前数据的watcher,拿到值之后销毁-->在利用getValue获取数据调用getter()方法时先把当前观察者挂载
    Dep.target = this
    const oldVal = compileUtil.getVal(this.expr, this.vm)
    // 挂载完毕需要注销，防止重复挂载 (数据一更新就会挂载)
    Dep.target = null
    return oldVal
  }
  update(){ // 通过回调函数更新数据
    const newVal = compileUtil.getVal(this.expr, this.vm)
    if (newVal !== this.oldVal){
      this.cb(newVal)
    }
  }
}