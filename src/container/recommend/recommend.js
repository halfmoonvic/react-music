/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
import { ERR_OK } from 'api/config'
import { getRecommend } from 'api/recommend'
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

class Recommend extends Component {
  componentDidMount() {
    this._getRecommend()
  }
  _getRecommend() {
    getRecommend().then(res => {
      if (res.code === ERR_OK) {
        console.log(res.data)
      }
    })
  }
  render() {
    return (
      <div>Recommend-页面</div>
    )
  }
}

export default Recommend
