/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
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
      shortcutList: []
    }

    this.touch = {}
    this.listenScroll = true

    this.onShortcutStart = this.onShortcutStart.bind(this)
    this.onShortcutMove = this.onShortcutMove.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length) {
      this.setState({
        shortcutList: nextProps.data.map(v => v.title.slice(0, 1))
      })
    }
  }
  onShortcutStart(e) {
    let anchorIndex = getData(e.target, 'index')

    let firstTouch = e.touches[0]
    this.touch.y1 = firstTouch.pageY
    this.touch.anchorIndex = anchorIndex

    this._scrollTo(anchorIndex)

    // 图片懒加载 强制加载图片
    forceCheck()
  }
  onShortcutMove(e) {
    // 防止 滑动列表的时候 向上冒泡 歌手列表跟随滑动
    e.stopPropagation()
    let firstTouch = e.touches[0]
    this.touch.y2 = firstTouch.pageY
    let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
    let anchorIndex = parseInt(this.touch.anchorIndex, 10) + delta

    this._scrollTo(anchorIndex)

    // 图片懒加载 强制加载图片
    forceCheck()
  }
  _scrollTo(index) {
    this.refs.listview.scrollToElement(Array.from(this.refs.listGroup.children)[index], 0)
  }
  render() {
    return (
      <Scroll className="o-listview"
      ref="listview"
      data={this.props.data}
      probeType={3}
      listenScroll={this.listenScroll}
      scroll={() => {forceCheck()}}>
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
            <li className="shortcutList__item" data-index={i} key={v}>{v}</li>
          )) : null}</ul>
        </div>
      </Scroll>
    )
  }
}

export default ListView
