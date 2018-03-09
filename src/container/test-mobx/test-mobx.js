/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

class TestMobx extends Component {
  constructor(props) {
    super(props)

    this.state = {
      num: 0,
      autoNum: 0
    }

    this.plusNum = this.plusNum.bind(this)
    this.autoPlusNum = this.autoPlusNum.bind(this)
  }
  plusNum() {
    this.setState({
      num: this.state.num + 1
    })
  }
  autoPlusNum() {
    let me = this
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    } else {
      this.timer = setInterval(function () {
        me.setState({
          autoNum: me.state.autoNum + 1
        })
      }, 100)
    }
  }
  render() {
    return (
      <div className="c-test-mobx">
        <button onClick={this.plusNum}>每次加一</button>
        <button onClick={this.autoPlusNum}>自增加</button>
        <hr/>
        <span>{this.state.num}</span>
        <br/>
        <span>{this.state.autoNum}</span>
      </div>
    )
  }
}

export default TestMobx
