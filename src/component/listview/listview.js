/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
import LazyLoad, { forceCheck } from 'react-lazyload'
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
import Scroll from 'component/scroll/scroll'
/**** 当前组件的 子组件等 ***/

class ListView extends Component {
  static defaultProps = {
    data: []
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.data !== nextProps.data) {
  //     return true
  //   }
  //   return false
  // }
  render() {
    return (
      <Scroll className="o-listview" data={this.props.data} probeType={3} onScroll={(pos) => {forceCheck()}}>
        <ul className="listview__content">{ this.props.data.length ?
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
      </Scroll>
    )
  }
}

export default ListView
