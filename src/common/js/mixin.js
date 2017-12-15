/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

/**
 * echarts 自适应与销毁实例勾子
 * @param  noresize nodestroy 可传入参数，不进行自适应或销毁
 * @return {Object}          被装饰的组件本身
 */
export const echartsMixin = (...args) => (Comp) => {
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
      if (args.indexOf('noresize') > -1 || !this.state.echartInstances.length) { return }
      this.state.echartInstances.forEach(v => { v.resize() })
    }
    _destroyHandler() {
      if (args.indexOf('nodestroy') > -1 || !this.state.echartInstances.length) { return }
      this.state.echartInstances.forEach(v => v.dispose())
    }
    render() {
      return (
        <Comp {...this.props} pourIns={this.pourIns}></Comp>
      )
    }
  }
}
