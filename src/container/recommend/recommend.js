/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
import { ERR_OK } from 'api/config'
import { getRecommend, getDiscList } from 'api/recommend'
/******* 本地 公用组件 *****/
import Slider from 'component/slider/slider'
import Scroll from 'component/scroll/scroll'
import Loading from 'component/loading/loading'
/**** 当前组件的 子组件等 ***/

class Recommend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recommend: [],
      discList: []
    }
  }
  componentDidMount() {
    this._getRecommend()
    this._getDiscList()
  }
  _getRecommend() {
    getRecommend().then(res => {
      if (res.code === ERR_OK) {
        this.setState({
          recommend: res.data.slider
        })
      }
    })
  }
  _getDiscList() {
    getDiscList().then(res => {
      if (res.status === 200) {
        this.setState({
          discList: res.data.data.list
        })
      }
    })
  }
  render() {
    if (!this.state.recommend.length) {
      return null
    }
    return (
      <div className="c-recommend">
        <Scroll className="recommend__content" data={this.state.discList}>
          <div>
            <div className="recommend__slider">
              <Slider>{this.state.recommend.map((v, i) => (
                  <a key={v.id} href={v.linkUrl}>
                    <img src={v.picUrl} alt="" />
                  </a>
                ))}</Slider>
            </div>
            <div className="recommend__list">
              <div className="list__title">热门歌单推荐</div>
              <ul>{this.state.discList.length ? this.state.discList.map(v => (
                <li className="list__item" key={v.dissid}>
                  <div className="item__icon">
                    <img src={v.imgurl} width="60" height="60" alt=""/>
                  </div>
                  <div className="item__text">
                    <h2 className="text__name">{v.creator.name}</h2>
                    <p className="text__desc">{v.dissname}</p>
                  </div>
                </li>
              )): null}</ul>
            </div>
          </div>
          {!this.state.discList.length ? <div className="loading-container">
            <Loading></Loading>
          </div> : null}
        </Scroll>
      </div>
    )
  }
}

export default Recommend
