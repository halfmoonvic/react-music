/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
import { connect } from 'react-redux'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

/**
 * echarts 自适应与销毁实例勾子
 * @param  noresize nodestroy 可传入参数，不进行自适应或销毁
 * @return {Object}          被装饰的组件本身
 */
export const echartsMixin = (...args) => Comp => {
  return class wrapperComp extends Component {
    constructor(props) {
      super(props)
      this.state = {
        echartInstances: []
      }

      this._resizeHanlder = this._resizeHanlder.bind(this)
      this._destroyHandler = this._destroyHandler.bind(this)
      this.pourIns = this.pourIns.bind(this)
    }
    componentDidMount() {
      setTimeout(() => {
        window.addEventListener('resize', this._resizeHanlder)
      }, 21)
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this._resizeHanlder)
      this._destroyHandler()
    }
    pourIns(...args) {
      args.forEach(v => {
        if (!Object.keys(v).length) {
          throw new Error('you must pass an echartInstance')
        }
      })

      this.setState({
        echartInstances: [...this.state.echartInstances, ...args]
      })
    }
    _resizeHanlder() {
      if (args.indexOf('noresize') > -1 || !this.state.echartInstances.length) {
        return
      }
      this.state.echartInstances.forEach(v => {
        v.resize()
      })
    }
    _destroyHandler() {
      if (args.indexOf('nodestroy') > -1 || !this.state.echartInstances.length) {
        return
      }
      this.state.echartInstances.forEach(v => v.dispose())
    }
    render() {
      return <Comp {...this.props} pourIns={this.pourIns} />
    }
  }
}

@connect(state => ({ data: state.player.playList }))
export const playlistMixin = Comp => {
  return class PlayListMinxin extends Component {
    constructor(props) {
      super(props)

      this._handlePlaylist = this._handlePlaylist.bind(this)
    }
    componentWillMount() {
      this._handlePlaylist(this.props.data)
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.data !== nextProps.data) {
        this._handlePlaylist(nextProps.data)
      }
    }
    _handlePlaylist(scrollIns) {
      if (scrollIns && !Array.isArray(scrollIns) && Object.keys(scrollIns).length) {
        const bottom = this.props.data.length > 0 ? '60px' : 0
        scrollIns.refs.oScroll.style.bottom = bottom
        scrollIns.refresh()
      }
    }
    render() {
      return <Comp {...this.props} handlePlaylist={this._handlePlaylist} />
    }
  }
}
