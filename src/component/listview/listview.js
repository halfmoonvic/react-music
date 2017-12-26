/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
import classNames from 'classnames'
import LazyLoad, { forceCheck } from 'react-lazyload'
/**** 本地公用变量 公用函数 **/
import { getData } from 'common/js/dom'
/******* 本地 公用组件 *****/
import Scroll from 'component/scroll/scroll'
/**** 当前组件的 子组件等 ***/

const ANCHOR_HEIGHT = 20

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
      fixedTitle: '热门'
    }

    this.touch = {}
    this.listenScroll = true
    this.listHeight = []

    this.onShortcutStart = this.onShortcutStart.bind(this)
    this.onShortcutMove = this.onShortcutMove.bind(this)
    this.scroll = this.scroll.bind(this)
    this._calculateHeight = this._calculateHeight.bind(this)
    this._fixTitle = this._fixTitle.bind(this)
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
      const newY = nextState.scrollY
      this._hightLightCurrent(newY)
    }

    if (this.state.currentIndex !== nextState.currentIndex) {
      this._fixTitle(nextProps, nextState)
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
  }
  _fixTitle(nextProps, nextState) {
    this.setState({
      fixedTitle: nextProps.data[nextState.currentIndex] ? nextProps.data[nextState.currentIndex].title : '热门'
    })
  }
  _hightLightCurrent(pos) {
    const listHeight = this.listHeight
    // 当滚动到顶部， pos > 0
    if (pos > 0) {
      this.setState({ currentIndex: 0 })
      return
    }
    // 在中间部分滚动
    for (let i = 0; i < listHeight.length - 1; i++) {
      let height1 = listHeight[i]
      let height2 = listHeight[i + 1]
      if (!height2 || (-pos >= height1 && -pos < height2)) {
        this.setState({ currentIndex: i })
        return
      }
    }

    // 在底部，且 -pos 大于最后一个元素的上限 第一个减1 是因为 listHeight 多一个 item 的，第二个减一 是因为， currentIndex 是从0 开始的
    this.setState({ currentIndex: listHeight.length - 1 - 1 })
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
                  <li key={item.id} className="group__item">
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
        <div className="list-fixed">
          {this.state.fixedTitle !== '热门' ? <h1 className="fixed-title">{this.state.fixedTitle}</h1> : null}
        </div>
      </Scroll>
    )
  }
}

export default ListView
