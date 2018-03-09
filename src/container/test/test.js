/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
// import TestStyleComponents from 'container/test-style-components/test-style-components'
import TestMobx from 'container/test-mobx/test-mobx'
/**** 当前组件的 子组件等 ***/

class Test extends Component {
  render() {
    return (
      <div className="c-test">
        <TestMobx />
      </div>
    )
  }
}

export default Test
