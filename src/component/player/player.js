/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
import { connect } from 'react-redux'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

@connect(state => ({ player: state.player }))
class Player extends Component {
  render() {
    const { player } = this.props
    return (
      <div className="o-player">
        {player.fullScreen ? <div className="normal-player">播放器</div> : null}
        {!player.fullScreen ? <div className="mini-player">mini播放器</div> : null}
      </div>
    )
  }
}

export default Player
