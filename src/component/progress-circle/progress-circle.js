/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

class ProgressCircle extends Component {
  static defaultProps = {
    radius: 60,
    percent: 0
  }
  constructor(props) {
    super(props)
    this.state = {
      dashArray: Math.PI * 100
    }
  }
  render() {
    return (
      <div className="c-progress-circle">
        <svg
          width={this.props.radius}
          height={this.props.radius}
          viewBox="0 0 100 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent" />
          <circle
            className="progress-bar"
            r="50"
            cx="50"
            cy="50"
            fill="transparent"
            strokeDasharray={this.state.dashArray}
            strokeDashoffset={(1 - this.props.percent) * this.state.dashArray}
          />
        </svg>
        {this.props.children}
      </div>
    )
  }
}

export default ProgressCircle
