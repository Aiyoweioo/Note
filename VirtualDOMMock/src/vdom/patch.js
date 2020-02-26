/**将虚拟DOM渲染成真实的DOM 
 * 在属性方面只是处理了style
 * 还有@click等 没有处理
*/
/**
 * @param  vnode 用户要写的虚拟节点
 * @param  container 要渲染到哪个容器
 */

export  function render(vnode, container) {
  let ele = createElementFromVnode(vnode)
  container.appendChild(ele)
}
// 通过虚拟的对象 创建一个真实的dom元素
function createElementFromVnode(vnode){
  let {type, key, props, children, text} = vnode
  if(type){ // 传送了类型，说明是一个标签
    vnode.domElement = document.createElement(type) // 创建虚拟节点和真实元素的关系，方便以后更新真实的DOM
    // 根据当前的虚拟节点的属性更新当前的真实的dom元素
    updateProperties(vnode)
    // children放的也是一个虚拟节点，递归渲染子节点
    children.forEach(childVnode => render(childVnode, vnode.domElement))
  } else { // 文本节点
    vnode.domElement = document.createTextNode(text)
  }
  return vnode.domElement
}
// 后续比对，根据 老属性 和 新属性 重新更新节点
function updateProperties(newVnode, oldProps={}) {
  let domElement = newVnode.domElement // 真实的dom元素
  let newProps = newVnode.props // 当前虚拟节点中的属性

  /**
   * 1. 老的里面有，新的里面没有，说明该属性被移除
   * 2. 老的里面没有，新的里面有，将新节点的属性覆盖老节点的属性
   */
  for(let oldPropName in oldProps) {
    if (!newProps[oldPropName]) {
      delete domElement[oldPropName]
    }
  }

  // 如果里面有新的style，老的里面也有style， style可能不一样，老的里面有background,新的没有，也要去对比
  let newStyObj = newProps.style || {}
  let oldStyObj = oldProps.style || {}  
  for(let propName in oldStyObj) {
    if(!newStyObj[propName]){
      domElement.style[propName] = '' // 老dom元素更新之后没有，没有某个样式需要删除
    }
  }
  for(let newPropsName in newProps) {
    // 添加style属性，style是一个对象需要特殊处理，还有@click等也需要特殊处理，addEventListener
    if(newPropsName === 'style') {
      let styObj = newProps.style
      for(let s in styObj) {
        domElement.style[s] = styObj[s]
      }
    }else{
      domElement[newPropsName] = newProps[newPropsName]
    }

  }
}
