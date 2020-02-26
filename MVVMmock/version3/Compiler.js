/**
 * Compiler类：编译模板，解析指令。
 * 解析了v-on,v-text,v-html,v-model
 */
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
