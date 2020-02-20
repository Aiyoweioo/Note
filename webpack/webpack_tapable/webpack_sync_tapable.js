/*
  1. SyncHook
*/
// let {SyncHook} = require('tapable')
// class Lesson {
//   constructor(){
//     this.hooks = {
//       arch: new SyncHook(['name'])
//     }
//   }

//   tap(){ // 注册监听函数
//     this.hooks.arch.tap('node', function(name) {
//       console.log('node', name)
//     })
//     this.hooks.arch.tap('react', function(name) {
//       console.log('react', name)
//     })
//   }

//   start(){ // 启动钩子
//     this.hooks.arch.call('Olivia')
//   }
// }
// let l = new Lesson()
// l.tap() // 注册node react事件
// l.start() // 启动钩子
/*
 * result:
 *  node Olivia 
 *  react Olivia
 * */ 

/*
  2. SyncBailHook： Bail保险，如果有一个tap()返回了一个非undefined的结果就停止
*/
// let {SyncBailHook} = require('tapable')
// class Lesson {
//   constructor(){
//     this.hooks = {
//       arch: new SyncBailHook(['name'])
//     }
//   }

//   tap(){ // 注册监听函数
//     this.hooks.arch.tap('node', function(name) {
//       console.log('node', name)
//       return '想玩'
//     })
//     this.hooks.arch.tap('react', function(name) {
//       console.log('react', name)
//     })
//   }

//   start(){ // 启动钩子
//     this.hooks.arch.call('Olivia')
//   }
// }
// let l = new Lesson()
// l.tap() // 注册node react事件
// l.start() // 启动钩子

/* result:
 *  node Olivia 
*/ 

/*
  3. SyncWaterfallHook： Waterfall瀑布，类似于 reduce，如果前一个 Hook 函数的结果 result !== undefined，则 result 会作为后一个 Hook 函数的第一个参数。
*/
// let {SyncWaterfallHook} = require('tapable')
// class Lesson {
//   constructor(){
//     this.hooks = {
//       arch: new SyncWaterfallHook(['name'])
//     }
//   }

//   tap(){ // 注册监听函数
//     this.hooks.arch.tap('node', function(name) {
//       console.log('node', name)
//       return 'nodeok'
//     })
//     this.hooks.arch.tap('react', function(data) {
//       console.log('react', data)
//       return 'reactok'
//     })
//     this.hooks.arch.tap('vue', function(data) {
//       console.log('vue', data)
//     })
//   }

//   start(){ // 启动钩子
//     this.hooks.arch.call('Olivia')
//   }
// }
// let l = new Lesson()
// l.tap() // 注册node react事件
// l.start() // 启动钩子
/* result: 
 *  node Olivia
    react nodeok
    vue reactok
 */ 

/*
  3. SyncLoopHook： 不停的循环执行 Hook，直到所有函数结果 result === undefined。
*/
const { SyncLoopHook } = require('tapable');

class Hook{
    constructor(){
        /** 定义一个index */
        this.index = 0;
        this.hooks = new SyncLoopHook(['name']);
    }
    tap(){
        /** 箭头函数 绑定this */
        this.hooks.tap('node',(name) => {
            console.log('node',name);
            /** 当不满足条件时 会循环执行该函数 
             * 返回值为udefined时 终止该循环执行
            */
            return ++this.index === 5?undefined:'学完5遍node后再学react';
        });
        this.hooks.tap('react',(name) => {
            console.log('react',name);
        });
    }
    start(){
        this.hooks.call('callend.');
    }
}

let h = new Hook();

h.tap();
h.start();
/* result: 
 *  node callend.
    node callend.
    node callend.
    node callend.
    node callend.
    react callend.
 */ 