/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
/******* 第三方 组件库 *****/
import classNames from "classnames";
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

class Tab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navIndex: 0,
      navList: [{
        url: '/recommend',
        text: '推荐',
        selected: false
      }, {
        url: '/songer',
        text: '歌手',
        selected: false
      }, {
        url: '/rank',
        text: '排行',
        selected: false
      }, {
        url: '/search',
        text: '搜索',
        selected: false
      }]
    }
  }
  handleActive(i) {
    this.setState({
      navIndex: i
    })
  }
  render() {

    return (
      <ul className="c-site-nav">
        {this.state.navList.map((v, i) => (
          <li className={classNames('site-nav__item', {'selected': i === this.state.navIndex})} onClick={() => {this.handleActive(i)}} key={v.url}><Link className="site-nav__text" to={v.url}>{v.text}</Link></li>
        ))}
      </ul>
    )
  }
}

export default Tab
