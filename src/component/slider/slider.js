/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
import BScroll from 'better-scroll'
import classNames from "classnames"
/**** 本地公用变量 公用函数 **/
import { addClass } from 'common/js/dom'
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

class Slider extends Component {
  static defaultProps = {
    loop: true,
    autoPlay: true,
    interval: 4000
  }
  constructor(props) {
    super(props)
    this.state = {
      dots: [],
      currentPageIndex: 0
    }

    // 绑定this
    this._setSliderWidth = this._setSliderWidth.bind(this)
    this._initSlider = this._initSlider.bind(this)
    this._onScrollEnd = this._onScrollEnd.bind(this)
    this._play = this._play.bind(this)
    this._initDots = this._initDots.bind(this)
  }
  componentDidMount() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.props.autoPlay) {
        this._play()
      }
    }, 20)
    let me = this
    window.addEventListener('resize', () => {
      if (!me.slider) {
        return
      }
      me.slider.refresh()
    })
  }
  componentWillUnmount() {
    this.slider.disable()
    clearTimeout(this.timer)
  }
  _setSliderWidth() {
    this.children = this.refs.sliderGroup.children
    let width = 0
    let sliderWidth = this.refs.slider.clientWidth
    for(let i = 0; i < this.children.length; i++) {
      let child = this.children[i]
      addClass(child, 'slider-item')
      child.style.width = sliderWidth + 'px'
      width += sliderWidth
    }

    if (this.props.loop) {
      width += 2 * sliderWidth
    }
    this.refs.sliderGroup.style.width = width + 'px'
  }
  _initSlider() {
    this.slider = new BScroll(this.refs.slider, {
      scrollX: true,
      momentum: false,
      snap: {
        loop: this.props.loop,
        threshold: 0.3,
        speed: 400
      },
      click: this.click
    })
    this.slider.on('scrollEnd', this._onScrollEnd)
    this.slider.on('touchend', () => {
      if (this.autoPlay) {
        this._play()
      }
    })
    this.slider.on('beforeScrollStart', () => {
      if (this.autoPlay) {
        clearTimeout(this.timer)
      }
    })
  }
  _onScrollEnd() {
    let pageIndex = this.slider.getCurrentPage().pageX
    this.setState({
      currentPageIndex: pageIndex
    })
    if (this.autoPlay) {
      this._play()
    }
  }
  _play() {
    clearTimeout(this.timer)
    let me = this
    this.timer = setInterval(() => {
      me.slider.next()
      // me.slider.goToPage(pageIndex, 0, 400)
    }, this.props.interval)
  }
  _initDots() {
    this.setState({
      dots: Array.from(this.children).fill('', 0, this.children.length)
    })
  }
  render() {
    return (
      <div className="o-slider" ref="slider">
        <div className="slider-group" ref="sliderGroup">
          {this.props.children}
        </div>
        <div className="dots">{this.state.dots.map((v, i) => (<span className={classNames('dot', {active: i === this.state.currentPageIndex})} key={i}></span>))}</div>
      </div>
    )
  }
}

export default Slider
