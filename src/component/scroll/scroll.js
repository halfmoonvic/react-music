/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
import BScroll from 'better-scroll'
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

class Scroll extends Component {
  static defaultProps = {
    probeType: 1,
    click: true,
    data: [],
    listenScroll: false
  }
  componentDidMount() {
    let me = this
    setTimeout(() => {
      me._initScroll()
    }, 20)
    setTimeout(() => {
      me.refresh()
    }, 3000)
  }
  shouldComponentUpdate(nextProps, nextState) {
    let me = this
    // 刷新
    if (nextProps.data !== this.props.data) {
      setTimeout(() => {
        me.refresh()
      }, 20)
    }

    //
    return true
  }
  _initScroll() {
    let me = this
    if (!me.refs.oScroll) {
      return
    }
    me.scroll = new BScroll(me.refs.oScroll, {
      probeType: me.props.probeType,
      click: me.props.click
    })

    if (this.props.listenScroll) {
      me.scroll.on("scroll", (pos) => {
        me.props.scroll(pos)
      })
    }

  }
  enable() {
    let me = this
    me.scroll && me.scroll.enable()
  }
  disable() {
    let me = this
    me.scroll && me.scroll.disable()
  }
  refresh() {
    let me = this
    me.scroll && me.scroll.refresh()
  }
  scrollTo() {
    let me = this
    me.scroll && me.scroll.scrollTo.apply(me.scroll, arguments)
  }
  scrollToElement() {
    let me = this
    me.scroll && me.scroll.scrollToElement.apply(me.scroll, arguments)
  }
  render() {
    return (
      <div ref="oScroll" className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}

export default Scroll
