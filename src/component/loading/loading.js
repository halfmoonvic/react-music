/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

class Loading extends Component {
  static defaultProps = {
    title: '正在载入...'
  }
  render() {
    return (
        <div className="o-loading">
          <img width="24" height="24" src={require('./loading.gif')} alt="loading" />
          <p className="loading__desc">{this.props.title}</p>
        </div>
    )
  }
}

export default Loading
