/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setFullScreen } from 'store/actions'
import { CSSTransition } from 'react-transition-group'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

@connect(state => ({ player: state.player }), { setFullScreen })
class Player extends Component {
  constructor(props) {
    super(props)
    this.back = this.back.bind(this)
    this.open = this.open.bind(this)
  }
  back() {
    this.props.setFullScreen(false)
  }
  open() {
    this.props.setFullScreen(true)
  }
  render() {
    const { player } = this.props
    const { currentSong } = player
    return (
      <div className="o-player">
        <CSSTransition
          in={player.fullScreen}
          timeout={200}
          classNames="player-transition"
          onEnter={el => {
            el.style.display = 'block'
          }}
          onExited={el => {
            el.style.display = 'none'
          }}>
          <div className="normal-player">
            <div className="background">
              <img src={currentSong.image} width="100%" height="100%" alt="" />
            </div>
            <div className="top">
              <div className="back" onClick={this.back}>
                <i className="icon-back" />
              </div>
              <h1 className="title">{currentSong.name}</h1>
              <h2 className="subtitle">{currentSong.singer}</h2>
            </div>
            <div className="middle">
              <div className="middle-l">
                <div className="cd-wrapper">
                  <div className="cd">
                    <img src={currentSong.image} alt="" className="image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="operators">
                <div className="icon i-left">
                  <i className="icon-sequence" />
                </div>
                <div className="icon i-left">
                  <i className="icon-prev" />
                </div>
                <div className="icon i-center">
                  <i className="icon-play" />
                </div>
                <div className="icon i-right">
                  <i className="icon-next" />
                </div>
                <div className="icon i-right">
                  <i className="icon icon-not-favorite" />
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
        {!player.fullScreen && Object.keys(player.currentSong).length ? (
          <div className="mini-player" onClick={this.open}>
            <div className="icon">
              <img src={currentSong.image} alt="" width="40" height="40" />
            </div>
            <div className="text">
              <h2 className="name">{currentSong.name}</h2>
              <p className="desc">{currentSong.singer}</p>
            </div>
            <div className="control" />
            <div className="control">
              <i className="icon-playlist" />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default Player
