/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
import { prefixStyle } from 'common/js/dom'
/******* 本地 公用组件 *****/
import Scroll from 'component/scroll/scroll'
import SongList from 'component/song-list/song-list'
/**** 当前组件的 子组件等 ***/

const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')

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
      toBgImage: 0,
      scrollY: 0
    }

    // 其它一些本地不要监听的变量
    this.probeType = 3
    this.listenScroll = true

    this.scroll = this.scroll.bind(this)
  }
  componentDidMount() {
    this.setToBgImage()
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.scrollY !== nextState.scrollY) {
      this._w_scrollY(nextProps, nextState)
    }

    return true
  }
  scroll(pos) {
    this.setState({
      scrollY: pos.y
    })
  }
  handleBack() {
    this.props.history.goBack()
  }
  setToBgImage() {
    this.imageHeight = this.refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    this.setState({
      toBgImage: this.imageHeight
    })
  }
  _w_scrollY(nextProps, nextState) {
    const newY = nextState.scrollY

    let zIndex = 0
    let scale = 1
    let blur = 0
    let translateY = Math.max(newY, this.minTranslateY)

    this.refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`

    const percent = Math.abs(newY / this.imageHeight)
    if (newY > 0) {
      scale = 1 + percent
      zIndex = 10
    } else {
      blur = Math.min(20 * percent, 20)
    }

    // 顶到顶部去了
    if (newY < this.minTranslateY) {
      zIndex = 10
      this.refs.bgImage.style.paddingTop = 0
      this.refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
      this.refs.playBtn.style.display = 'none'
    } else {
      this.refs.bgImage.style.paddingTop = '70%'
      this.refs.bgImage.style.height = 0
      this.refs.playBtn.style.display = ''
    }
    this.refs.bgImage.style.zIndex = zIndex
    this.refs.bgImage.style[transform] = `scale(${scale})`
    this.refs.filter.style['backdrop-filter'] = `blur(${blur}px)`
  }
  render() {
    return (
      <div className="c-music-list">
        <div className="music-list__back js-back" onClick={this.handleBack}>
          <i className="icon-back back__icon"></i>
        </div>
        <div className="music-list__title">{this.props.title}</div>
        <div className="music-list__bg-image" style={{'backgroundImage': `url(${this.props.bgImage})`}} ref="bgImage">
          {this.props.songs.length ? <div className="o-play-wrapper" ref="playBtn">
            <div className="play">
              <div className="icon-play"></div>
              <span className="text">随机播放全部</span>
            </div>
          </div> : null}
          <div className="filter" ref="filter"></div>
        </div>
        <div className="bg-layer" ref="layer"></div>
        <Scroll
          data={this.props.songs}
          className="o-list"
          ref="list"
          top={this.state.toBgImage}
          probeType={this.probeType}
          listenScroll={this.listenScroll}
          scroll={this.scroll}>
          <SongList songs={this.props.songs} className="song-list-wrapper"></SongList>
        </Scroll>
      </div>
    )
  }
}

export default MusicList
