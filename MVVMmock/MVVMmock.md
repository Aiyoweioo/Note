- [1. MVVM mock](#1-mvvm-mock)
- [2. MVVM入口](#2-mvvm%e5%85%a5%e5%8f%a3)
- [3. 指令解析器Compiler](#3-%e6%8c%87%e4%bb%a4%e8%a7%a3%e6%9e%90%e5%99%a8compiler)
  - [3.1. 创建文档对象](#31-%e5%88%9b%e5%bb%ba%e6%96%87%e6%a1%a3%e5%af%b9%e8%b1%a1)
  - [3.2. 编译模板](#32-%e7%bc%96%e8%af%91%e6%a8%a1%e6%9d%bf)
  - [3.3. 编译元素节点](#33-%e7%bc%96%e8%af%91%e5%85%83%e7%b4%a0%e8%8a%82%e7%82%b9)
  - [3.4. 编译文本节点](#34-%e7%bc%96%e8%af%91%e6%96%87%e6%9c%ac%e8%8a%82%e7%82%b9)
- [4. 实现一个数据监听器Observer](#4-%e5%ae%9e%e7%8e%b0%e4%b8%80%e4%b8%aa%e6%95%b0%e6%8d%ae%e7%9b%91%e5%90%ac%e5%99%a8observer)
  - [4.1. 监听数据](#41-%e7%9b%91%e5%90%ac%e6%95%b0%e6%8d%ae)
  - [4.2. 数据劫持并通知依赖收集器Dep通知Watcher去更新](#42-%e6%95%b0%e6%8d%ae%e5%8a%ab%e6%8c%81%e5%b9%b6%e9%80%9a%e7%9f%a5%e4%be%9d%e8%b5%96%e6%94%b6%e9%9b%86%e5%99%a8dep%e9%80%9a%e7%9f%a5watcher%e5%8e%bb%e6%9b%b4%e6%96%b0)
- [5. 属性订阅器Dep](#5-%e5%b1%9e%e6%80%a7%e8%ae%a2%e9%98%85%e5%99%a8dep)
- [6. 观察者Watcher](#6-%e8%a7%82%e5%af%9f%e8%80%85watcher)
- [7. 数据代理](#7-%e6%95%b0%e6%8d%ae%e4%bb%a3%e7%90%86)

# 1. MVVM mock
- 实现的功能：
1. 能够解析指令，根据修改的数据更新视图
   - {{person.name}} -- {{person.age}} 
   - v-text 
   - v-html
   - v-model：双向数据绑定
   - v-on
   - @事件
2. 实现数据代理
在编写js代码时，写成this.person.name="Olivia"效果等同于this.$data.person.name="Olivia"
- 缺陷：
  1. 指令解析：还有很多指令没有解析，如v-bind : v-show
  2. 没有考虑data里的数据为Array的情况
  3. 样式没有考虑等等
# 2. MVVM入口
- 实现一个指令解析器Compiler
- 实现一个数据监听器Observer
- 实现一个Watcher去更新视图
- 实现一个Proxy
```js
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
```
# 3. 指令解析器Compiler
1. 获取文档碎片对象， 放入内存会减少页面的回流和重绘
2. 编译模板
   - 2.1 获取子节点
   - 2.2 遍历子节点，针对元素节点和文本节点进行分别编译
   - 2.3 若子节点下还有子节点，递归编译
3. 将子元素追加到根元素
## 3.1. 创建文档对象
```js
  node2Fragment(el) {
    const fragment = document.createDocumentFragment()
    let firstChild
    // 遍历子节点，将所有节点加到文档碎片
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
```
## 3.2. 编译模板
```js
  compile(fragments) {
    // 2.1 获取子节点
    const childNodes = fragments.childNodes;
    // 2.2 遍历子节点，针对元素节点和文本节点进行分别编译
    [...childNodes].forEach(child => {
     // console.log(child)
      if (this.isElementNode(child)) { // 是元素节点
        // 编译元素节点
        // console.log('元素节点', child)
        this.compileElement(child)
      } else { // 是文本节点
        // 编译文本节点
        // console.log('文本节点', child)
        this.compileText(child)
      }
      // 2.3 子节点下还有子节点，递归编译
      if(child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    })
  }
```
## 3.3. 编译元素节点
```js
  compileElement(node) {
    // <div v-text="msg"></div> // <input type="text" v-model="msg"/>
    // 遍历元素属性（有两种类型，一种是带v，一种是普通的属性），添加到元素当中
    const attributes = node.attributes;
    [...attributes].forEach(attr => {
      // console.log(attr)
      // 获取属性名和属性值 name: v-text ,value: msg
      const {name, value} = attr
      if (this.isDirective(name)) { // 带v的属性 是一个指令 v-text v-model v-on:click v-bind:src
          // 字符串分割
          const [, directive] = name.split('-') // text model on:click
          const [dirName, eventName] = directive.split(':') // text model on 
          // console.log(name)
          // 数据驱动视图：根据指令处理节点， 节点值
          compileUtil[dirName](node, value, this.vm, eventName)
          // 删除有指令的标签上的属性 v-text 使得在html看的时候没有显示
          node.removeAttribute('v-' + directive)
      } else if (this.isEventName(name)) { // 带@的属性 @click="handleClick"
        let [, eventName] = name.split('@')
        compileUtil['on'](node, value, this.vm, eventName)
      }
    })
  }
```
## 3.4. 编译文本节点
```js
// 编译文本节点
  compileText(node) { // {{}} 空格 1 2 3 需要找出带{{}}的文本进行处理
    // 找到节点上的所有文本 
    const content = node.textContent
    // 正则匹配{{}}
    if(/\{\{(.+?)\}\}/.test(content)) {
      compileUtil.text(node, content, this.vm)
    }
  }
```
# 4. 实现一个数据监听器Observer
## 4.1. 监听数据
```js
observe(data) { 
    /*person: {
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
```
## 4.2. 数据劫持并通知依赖收集器Dep通知Watcher去更新
```js
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
```
# 5. 属性订阅器Dep
Dep类存储watcher对象，并在数据变化时通知watcher
```js
class Dep {
  constructor () {
    this.subs = []
  }
  // 收集观察者
  addSub(watcher){
    this.subs.push(watcher)
  }
  // 通知观察者去更新
  notify(){
    // console.log('通知了观察者', this.subs)
    this.subs.forEach(watcher => watcher.update())
  }
}
```
# 6. 观察者Watcher
1. 在自身实例化时往属性订阅器(dep)里面添加自己
2. 自身必须有一个update()方法
3. 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调。
```js
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
```
# 7. 数据代理
this.$data --> this
```js
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
```