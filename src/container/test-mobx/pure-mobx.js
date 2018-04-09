/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

import { observable, autorun, computed, action } from 'mobx'

// 监控一个对象
var param = observable({
  local: 0,
  get computedParam() {
    return this.local + 1
  }
})

// 初始化时即自动运行
autorun(function(arg) {
  console.log(param.local, param.computedParam)
})

// 重新赋值即会执行 autorun 函数
param.local = 4

// 监控一个类
class OrderLine {
  @observable price = 0
  @observable amount = 1

  @computed
  get total() {
    return this.price * this.amount
  }
}

let a = new OrderLine()
a.price = 10
a.amount = 3
console.log(a)


// 观察一个数组
var todos = observable([{ title: 'Spoil tea', completed: true }, { title: 'Make coffee', completed: false }])

autorun(() => {
  console.log(
    'Remaining:',
    todos
      .filter(todo => !todo.completed)
      .map(todo => todo.title)
      .join(', ')
  )
})
// 输出: 'Remaining: Make coffee'

todos[0].completed = false
// 输出: 'Remaining: Spoil tea, Make coffee'

todos[2] = { title: 'Take a nap', completed: false }
// 输出: 'Remaining: Spoil tea, Make coffee, Take a nap'

todos.shift()
// 输出: 'Remaining: Make coffee, Take a nap'

class PureMobx extends Component {
  render() {
    return <div className="c-test-mobx">没有任何意义，只是纯粹为了执行这个文件中的代码而引用的</div>
  }
}

export default PureMobx
