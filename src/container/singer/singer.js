/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

class Singer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      singers: []
    }
    this._getSingerList()
  }
  _getSingerList() {
    getSingerList().then(res => {
      if (res.code === ERR_OK) {
        this.setState({
          singers: res.data.list
        })
      }
    })
  }
  render() {
    return (
      <div className="o-singer">Singer-页面</div>
    )
  }
}

export default Singer
