/** 第二版: 
 * 完成了new MVVM() compile对象解析大括号表达式，解析指令，初始化视图，同时订阅数据变化的时候，创建watcher实例，绑定了更新函数;
 * 完成了new MVVM()时定义Observer监听所有数据，进行数据劫持，同时Observer创建Dep对象并（Observer的get属性）存储watcher对象，数据发生变化时，Observer的set属性通知Dep实例，Dep实例让watcher去更新数据
 * 缺陷：
 * 编译了指令：v-text,v-html,v-model,v-on,@开头监听的事件;没有编译指令：1. bind,2. :
 * Observer只是观察了data为{}的
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
    }
  }
}

// 根据指令进行具体编译：接收参数：node接收节点，value对应的值（去data里面查找），vm：当前实例， eventName事件
const compileUtil = {
  // 获取最终的值
  getVal(expr, vm) { // expr:"msg",or expr: "person.fav"     
    return expr.split('.').reduce((data, currentVal) => {
      // console.log(data[currentVal],index ) 第一次：{name: 'olivia', age:23, fav: "travel"}  第二次：tarvel 
      return data[currentVal]
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
      //  绑定观察者，将来数据发生变化，触发这里的回调，进行更新
        new Watcher(vm, args[1], () => { // v-text对应的watcher，这里的expr实际上是{{}}里的内容
          this.updater.textUpdater(node, this.getTextVal(expr, vm)) // 修改后的值可能还带{{}}
        })
        return this.getVal(args[1], vm);
      })
    } else {
      value = this.getVal(expr, vm)
    }
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

class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 1. 获取文档碎片对象， 放入内存会减少页面的回流和重绘
    const fragments = this.node2Fragment(this.el)
    // console.log(fragment)
    // 2. 编译模板
    this.compile(fragments)
    // 3. 将子元素追加到根元素
    this.el.appendChild(fragments)
  }
  // 设置元素节点标志
  isElementNode(node) {
    return node.nodeType === 1
  }
  // 创建文档对象
  node2Fragment(el) {
    const fragment = document.createDocumentFragment()
    let firstChild
    // 遍历子节点，将所有节点加到文档碎片
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
  // 编译模板
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

  // 编译元素节点
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

  // 编译文本节点
  compileText(node) { // {{}} 空格 1 2 3 需要找出带{{}}的文本进行处理
    // 找到节点上的所有文本 
    const content = node.textContent
    // 正则匹配{{}}
    if(/\{\{(.+?)\}\}/.test(content)) {
      compileUtil.text(node, content, this.vm)
    }

  }
  // 判断是否为Vue特性的标签
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 判断是否以@开头的标签
  isEventName(attrName) {
    return attrName.startsWith('@')
  }
}
