# 1. Virtua DOM模拟实现
假设Virtual DOM的样式如下:
```js
 {
  type: 'div',
  props: {key:'xx',id: "wrapper", a:1},
  children: [
    {
      type: 'span', 
      props: {style:{color: 'red'}, 'son'}, 
      children: [{}]
    },
    {
      type: '', 
      props: '' ,
      children: [],
      text: 'father'
    }
  ]
}
```
对应的真实DOM为：
```html
<div key="xx" id="wrapper" a=1>
  <span style="color:red">son</span>
  father
</div>
```
# 2. 第一步： 实现虚拟节点
虚拟节点的参数：
1. 节点类型 type: 如div span string类型
2. 节点属性 props: 如id key {}类型
3. 节点的子节点 children []类型
4. 节点属性key
5. 文本节点text
```js
/*处理成虚拟节点*/
import {vnode} from './vnode'
export default function createElement(type, props={}, ...children) {
  let key
  if(props.key) { // 如果存在key属性，将key属性单独保存起来，并且在props上删除key属性
    key = props.key
    delete props.key
  }
  // 把不是虚拟节点的子节点，变成虚拟节点
  children = children.map(child => {
    if(typeof child === 'string') { // 如果是文本节点
      return vnode(undefined, undefined, undefined, undefined, child)
    } else {
      return child
    }
  })
  
  return vnode(type, key, props, children)
} 
/******************/
export function vnode(type, key, props, children,text){
  return {
    type,
    key,
    props,
    children,
    text
  }
}
```
# 3. 第二步： 将节点挂在真实的DOM下
参数： vnode 虚拟节点 container 要渲染到哪个容器
```js
export  function render(vnode, container) {
  let ele = createElementFromVnode(vnode)
  container.appendChild(ele)
}
```
## 3.1. 通过虚拟节点创建一个真实的dom元素
- type(元素标签)有值：元素节点
    + document.createElement(type)直接创建真实DOM并且保存该值（建立虚拟节点和真实元素的关系），方便以后更新真实的DOM
    + 比对 老属性 和 新属性 重新更新节点
    + children放的也是一个虚拟节点，递归渲染子节点
- 否则：文本节点 document.createTextNode(text)直接创建真实DOM
```js
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
```
## 3.2. 是否需要更新节点的属性
- 删除属性 
1. 遍历旧的属性列表，查看每个属性是否还存在于新的属性列表中 --> 旧props:{style：{color:red},id=1} 新prop:{id=1} 删除props的style属性
2. 遍历新的属性列表，判断两个列表中都存在的属性的值是否有变化（递归） --> 旧props:{style：{color:"red"},id=1} 新prop:{style：{background-color:"pink"},id=1} 删除props的style的color属性
- 添加属性
  - 普通属性：直接给真实DOM元素设置
  - 特殊属性：如style 需要遍历里面的属性
```js
function updateProperties(newVnode, oldProps={}) {
  let domElement = newVnode.domElement // 真实的dom元素
  let newProps = newVnode.props // 当前虚拟节点中的属性

  // 老的里面有，新的里面没有，说明该属性需要被移除
  for(let oldPropName in oldProps) {
    if (!newProps[oldPropName]) {
      delete domElement[oldPropName]
    }
  }
  // 如果新的里面有style，老的里面也有style， style可能不一样，老的里面有background,新的没有，也要去对比
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
```



