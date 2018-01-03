/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
import Scroll from 'component/scroll/scroll'
import SongList from 'component/song-list/song-list'
/**** 当前组件的 子组件等 ***/

@withRouter
class MusicList extends Component {
  static defaultProps = {
    bgImage: '',
    songs: [],
    title: ''
  }
  static propTypes = {
    bgImage: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    songs: propTypes.array.isRequired
  }
  constructor(props) {
    super(props)
    this.handleBack = this.handleBack.bind(this)

    this.state = {
      toBgImage: 0
    }
  }
  componentDidMount() {
    this.setState({
      toBgImage: this.refs.bgImage.clientHeight
    })
    console.log(this.refs.bgImage.clientHeight)
  }
  handleBack() {
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="c-music-list">
        <div className="music-list__back js-back" onClick={this.handleBack}>
          <i className="icon-back back__icon"></i>
        </div>
        <div className="music-list__title">{this.props.title}</div>
        <div className="music-list__bg-image" style={{'backgroundImage': `url(${this.props.bgImage})`}} ref="bgImage">
          <div className="filter"></div>
        </div>
        <Scroll data={this.props.songs} className="o-list" ref="list" top={this.state.toBgImage}>
          <SongList songs={this.props.songs} className="song-list-wrapper"></SongList>
        </Scroll>
      </div>
    )
  }
}

export default MusicList
