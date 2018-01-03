/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
import classNames from "classnames"
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

class SongList extends Component {
  constructor(props) {
    super(props)
    this.getDesc = this.getDesc.bind(this)
  }
  static defaultProps = {
    songs: []
  }
  getDesc(song) {
    return `${song.singer}。${song.album}`
  }
  render() {
    return (
      <div className={classNames('c-song-list', this.props.className)}>
        <ul>{this.props.songs.map(v => (
          <li className="song-list__item" key={v.id}>
            <div className="item__content" key={v.id}>
              <h2 className="content__name">{v.name}</h2>
              <p className="content__desc">{this.getDesc(v)}</p>
            </div>
          </li>
        ))}</ul>
      </div>
    )
  }
}

export default SongList
