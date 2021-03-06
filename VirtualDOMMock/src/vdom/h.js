/**
 * @param type string 类型
 * @param props {} 属性
 * @param children [] 所有孩子
 */
import {vnode} from './vnode'
export default function createElement(type, props={}, ...children) {
  let key
  if(props.key) {
    key = props.key
    delete props.key
  }
  // 把不是虚拟节点的子节点，变成虚拟节点
  children = children.map(child => {
    if(typeof child === 'string') {
      return vnode(undefined, undefined, undefined, undefined, child)
    } else {
      return child
    }
  })
  
  return vnode(type, key, props, children)
} 

