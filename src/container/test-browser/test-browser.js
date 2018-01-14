/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
import Browser from 'bowser'
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

class TestBrowser extends Component {
  constructor(props) {
    super(props)
    this.isWeixinBrowser = this.isWeixinBrowser.bind(this)
  }
  isWeixinBrowser(){
    var ua = navigator.userAgent.toLowerCase();
    return ua
    // return (/micromessenger/.test(ua)) ? true : false ;
  }
  render() {
    alert(JSON.stringify(Browser))
    // console.log(Browser)
    // const ver = this.isWeixinBrowser()
    // alert(ver)
    return (
      <div className="c-test-browser">TestBrowser-页面</div>
    )
  }
}

export default TestBrowser
