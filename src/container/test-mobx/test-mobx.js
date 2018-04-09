/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
import { observer, inject } from 'mobx-react'
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

// 最简单的 mobx 就是一个观察者模式

// 观察者
@inject('store')
@observer
class TestMobx extends Component {
  render() {
    const { store } = this.props
    console.log(store)
    return (
      <div>
        <h1>{store.addNum}</h1>
        <button onClick={() => {
          store.changeState(12)
        }}>更改 state</button>
        <br/><hr/><br/>
        <ul>
          {store.todos.map(item => <li key={item.title}>{item.title}---{item.done ? '完成' : '未完成'}</li>)}
        </ul>
        <button onClick={() => {
          store.changeTodos(1)
        }}>完成事件</button>
      </div>
    )
  }
}

export default TestMobx
