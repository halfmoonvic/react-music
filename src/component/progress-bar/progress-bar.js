/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
import { prefixStyle } from 'common/js/dom'
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

const transform = prefixStyle('transform')
const progressBtnWidth = 16

class ProgressBar extends Component {
  static defaultProps = {
    percent: 0
  }
  constructor(props) {
    super(props)

    this.touch = {}

    this.progressTouchStart = this.progressTouchStart.bind(this)
    this.progressTouchMove = this.progressTouchMove.bind(this)
    this.progressTouchEnd = this.progressTouchEnd.bind(this)
    this.progressClick = this.progressClick.bind(this)

    this._w_percent = this._w_percent.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.percent !== nextProps.percent) {
      this._w_percent(nextProps)
    }
  }
  progressTouchStart(e) {
    e.stopPropagation()
    this.touch.initiated = true
    this.touch.startX = e.touches[0].pageX
    this.touch.left = this.refs.progress.clientWidth
  }
  progressTouchMove(e) {
    e.stopPropagation()
    if (!this.touch.initiated) return
    const deltaX = e.touches[0].pageX - this.touch.startX
    const offsetWidth = Math.min(Math.max(0, this.touch.left + deltaX), this.refs.progressBar.clientWidth - progressBtnWidth)
    this._offset(offsetWidth)
  }
  progressTouchEnd() {
    this.touch.initiated = false

    this._triggerPercent()
  }
  progressClick(e) {
    const rect = this.refs.progressBar.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left
    this._offset(offsetWidth)
    this._triggerPercent()
  }
  _w_percent(nextProps) {
    const newPercent = nextProps.percent
    if (newPercent >= 0) {
      const barWidth = this.refs.progressBar.clientWidth - progressBtnWidth
      const offsetWidth = newPercent * barWidth
      this._offset(offsetWidth)
    }
  }
  _offset(offsetWidth) {
    this.refs.progress.style.width = `${offsetWidth}px`
    this.refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
  }
  _triggerPercent() {
    const barWidth = this.refs.progressBar.clientWidth - progressBtnWidth
    const percent = this.refs.progress.clientWidth / barWidth
    this.props.percentChange(percent)
  }
  render() {
    return (
      <div className="c-progress-bar" ref="progressBar" onClick={this.progressClick}>
        <div className="bar-inner">
          <div className="progress" ref="progress" />
          <div
            className="progress-btn-wrapper"
            ref="progressBtn"
            onTouchStart={this.progressTouchStart}
            onTouchMove={this.progressTouchMove}
            onTouchEnd={this.progressTouchEnd}>
            <div className="progress-btn" />
          </div>
        </div>
      </div>
    )
  }
}

export default ProgressBar
