/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
import { ERR_OK } from 'api/config'
import { getRecommend, getDiscList } from 'api/recommend'
/******* 本地 公用组件 *****/
import Slider from 'component/slider/slider'
/**** 当前组件的 子组件等 ***/

class Recommend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recommend: []
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
        console.log(res)
      }
    })
  }
  render() {
    return (
      <div className="c-recommend">
        <div className="recommend--content">
          {this.state.recommend.length ? <div className="recommend__slider">
            <Slider>{
              this.state.recommend.map((v, i) => (
                <a key={v.id} href={v.linkUrl}>
                  <img src={v.picUrl} alt="" />
                </a>
              ))
            }</Slider>
          </div> : null}
          <div className="recommend__list">
            <div className="list__title">热门歌单推荐</div>
            <ul></ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Recommend
