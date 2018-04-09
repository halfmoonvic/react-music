/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
import { observable, action, computed, autorun } from 'mobx'
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
// import TestStyleComponents from 'container/test-style-components/test-style-components'
import TestMobx from 'container/test-mobx/test-mobx'
// import PureMobx from 'container/test-mobx/pure-mobx'
/**** 当前组件的 子组件等 ***/

class Store {
  // @observable todos = [{
  //   title: "todo标题",
  //   done: false,
  // },{
  //   title: "已经完成 todo 的标题",
  //   done: true,
  // }]


  // @action changeTodoTitle({index,title}){
  //   this.todos[index].title = title
  // }

  // @computed get unfinishedTodos () {
  //   return  this.todos.filter((todo) => todo.done)
  // }

  // 1） 监控数值 num
  @observable num = 1
  // 1) 基于 num 的衍生值 addNum
  @computed get addNum() {
    return this.num + 1
  }
  // 1) 用 action 来更改 num
  @action changeState (num) {
    this.num = num
  }

  // 2) 数组
  @observable todos = [{
    title: '事项1',
    done: false
  }, {
    title: '事件2',
    done: false
  }]
  // 2) 数组
  @action changeTodos(index) {
    this.todos[index].done = !this.todos[index].done
  }

}

const store = new Store()

class Test extends Component {
  render() {
    return (
      <div className="c-test">
        <TestMobx store={store} />
      </div>
    )
  }
}

export default Test
