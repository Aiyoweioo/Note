import {h, render} from './vdom/index'

/**
 * {
  type: 'div',
  props: {id: "wrapper", a:1},
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
 */
/*h()返回一个真实节点*/
let vnode = h('div', {key:'xx', id: "wrapper", a:1,style:{background: "pink",width:"200px",height:"200px"}}, 
  h('span', {style: {color: 'red'}}, 'son'),
   'father')
/**将节点挂在真实的DOM下 */
render(vnode, app)


