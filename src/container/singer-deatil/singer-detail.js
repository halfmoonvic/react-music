/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
import { connect } from 'react-redux'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
import { getSingerDeatil } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

@connect(
  state => ({ states: state })
)
class SingerDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: []
    }

    this._normalizeSongs = this._normalizeSongs.bind(this)
  }
  componentWillMount() {
    this._getDeatil()
  }
  _getDeatil() {
    const { singer } = this.props.states
    if (!singer.id) return
    getSingerDeatil(singer.id).then(res => {
      console.log(this._normalizeSongs(res.data.list))
      if (res.code === ERR_OK) {
        this.setState({
          songs: this._normalizeSongs(res.data.list)
        })
      }
    })
  }
  _normalizeSongs(list) {
    let ret = []
    list.forEach((item, index) => {
      let { musicData } = item
      if (musicData.songid && musicData.albumid) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }
  render() {
    return (
      <div className="c-singer-detailt">SingerDetail-页面</div>
    )
  }
}

export default SingerDetail
