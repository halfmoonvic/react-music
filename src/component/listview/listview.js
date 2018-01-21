/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
import classNames from 'classnames'
import LazyLoad, { forceCheck } from 'react-lazyload'
/**** 本地公用变量 公用函数 **/
import { getData } from 'common/js/dom'
/******* 本地 公用组件 *****/
import Loading from 'component/loading/loading'
import Scroll from 'component/scroll/scroll'
/**** 当前组件的 子组件等 ***/

const ANCHOR_HEIGHT = 20
const TITLE_HEIGHT = 30

class ListView extends Component {
  static defaultProps = {
    data: [],
  }
  constructor(props) {
    super(props)
    this.state = {
      shortcutList: [],
      scrollY: -1,
      currentIndex: 0,
      fixedTitle: '热门',
      diff: -1
    }

    this.touch = {}
    this.listenScroll = true
    this.listHeight = []

    this.onShortcutStart = this.onShortcutStart.bind(this)
    this.onShortcutMove = this.onShortcutMove.bind(this)
    this.scroll = this.scroll.bind(this)
    this._calculateHeight = this._calculateHeight.bind(this)
    this._fixTitle = this._fixTitle.bind(this)
    this._diffTitle = this._diffTitle.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length) {
      this.setState({
        shortcutList: nextProps.data.map(v => v.title.slice(0, 1))
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data !== nextProps.data) {
      // 加延时 数据的变化到 dom 的更新
      setTimeout(() => { this._calculateHeight() }, 20)
    }
    if (this.state.scrollY !== nextState.scrollY) {
      // const newY = nextState.scrollY
      this._hightLightCurrent(nextProps, nextState)
    }

    if (this.state.currentIndex !== nextState.currentIndex) {
      this._fixTitle(nextProps, nextState)
    }

    if (this.state.diff !== nextState.diff) {
      this._diffTitle(nextProps, nextState)
    }

    return true
  }
  onShortcutStart(e) {
    let anchorIndex = getData(e.target, 'index')

    let firstTouch = e.touches[0]
    this.touch.y1 = firstTouch.pageY
    this.touch.anchorIndex = anchorIndex

    this._scrollTo(anchorIndex)
  }
  onShortcutMove(e) {
    // 防止 滑动列表的时候 向上冒泡 歌手列表跟随滑动
    e.stopPropagation()

    let firstTouch = e.touches[0]
    this.touch.y2 = firstTouch.pageY
    let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
    let anchorIndex = parseInt(this.touch.anchorIndex, 10) + delta

    this._scrollTo(anchorIndex)
  }
  scroll(pos) {
    this.setState({
      scrollY: pos.y
    })

    forceCheck()
    // 滚动时调用此方法，让页面变的很卡
  }
  _scrollTo(index) {
    if (!index && index !== 0) {
      return
    }
    if (index < 0) {
      index = 0
    } else if (index > this.listHeight.length - 2) {
      index = this.listHeight.length - 2
    }
    this.setState({
      scrollY: -this.listHeight[index]
    })
    this.refs.listview.scrollToElement(Array.from(this.refs.listGroup.children)[index], 0)
    // 图片懒加载 强制加载图片
    forceCheck()
    // 滚动时调用此方法，感觉让页面变的很卡， 但不确定是不是自己的错觉哦
  }
  _calculateHeight() {
    this.listHeight = []
    const list = Array.from(this.refs.listGroup.children)
    let height = 0
    this.listHeight.push(height)
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      height += item.clientHeight
      this.listHeight.push(height)
    }
  }
  _fixTitle(nextProps, nextState) {
    this.setState({
      fixedTitle: nextProps.data[nextState.currentIndex] ? nextProps.data[nextState.currentIndex].title : '热门'
    })
  }
  _hightLightCurrent(nextProps, nextState) {
    const newY = nextState.scrollY
    const listHeight = this.listHeight
    // 当滚动到顶部， newY > 0
    if (newY > 0) {
      this.setState({ currentIndex: 0 })
      return
    }
    // 在中间部分滚动
    for (let i = 0; i < listHeight.length - 1; i++) {
      let height1 = listHeight[i]
      let height2 = listHeight[i + 1]
      if (!height2 || (-newY >= height1 && -newY < height2)) {
        this.setState({ diff: height2 + newY })
        this.setState({ currentIndex: i })
        return
      }
    }

    // 在底部，且 -newY 大于最后一个元素的上限 第一个减1 是因为 listHeight 多一个 item 的，第二个减一 是因为， currentIndex 是从0 开始的
    this.setState({ currentIndex: listHeight.length - 1 - 1 })
  }
  _diffTitle(nextProps, nextState) {
    const { diff } = nextState
    let fixedTop = (diff > 0 && diff < TITLE_HEIGHT) ? diff - TITLE_HEIGHT : 0
    if (this.fixedTop === fixedTop) {
      return
    }
    this.fixedTop = fixedTop
    this.refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
  }
  render() {
    return (
      <Scroll className="o-listview"
      ref="listview"
      data={this.props.data}
      probeType={3}
      listenScroll={this.listenScroll}
      scroll={this.scroll}>
        <ul className="listview__content" ref="listGroup">{ this.props.data.length ?
          this.props.data.map((group, index) => (
            <li key={group.title} className="listview__group">
              <h2 className="group__title">{group.title}</h2>
              <ul>{
                group.items.map(item => (
                  <li key={item.id} className="group__item" onClick={() => this.props.select(item)}>
                    <LazyLoad height={50}>
                      <img className="item__avatar" src={item.avatar} alt=""/>
                    </LazyLoad>
                    <div className="item__name">{item.name}</div>
                  </li>
                ))
              }</ul>
            </li>
          ))
        : null}</ul>
        <div
        className="list-shortcut"
        onTouchStart={this.onShortcutStart}
        onTouchMove={this.onShortcutMove}>
          <ul>{this.state.shortcutList.length ? this.state.shortcutList.map((v, i) => (
            <li className={classNames('shortcutList__item', {'shortcutList__item--current': i === this.state.currentIndex})} data-index={i} key={v}>{v}</li>
          )) : null}</ul>
        </div>
        <div className="list-fixed" ref="fixed">
          {this.state.scrollY < 0 ? <h1 className="fixed-title">{this.state.fixedTitle}</h1> : null}
        </div>
        {!this.props.data.length ? <div className="loading-container">
          <Loading></Loading>
        </div> : null}
      </Scroll>
    )
  }
}

export default ListView
