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
import MusicList from 'component/music-list/music-list'
/**** 当前组件的 子组件等 ***/

@connect(
  state => ({ states: state })
)
class SingerDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: [],
      title: '',
      bgImage: ''
    }

    this._normalizeSongs = this._normalizeSongs.bind(this)
  }
  componentWillMount() {
    this._getDeatil()
  }
  _getDeatil() {
    const { singer } = this.props.states
    if (!singer.id) {
      console.log(singer)
      this.props.history.goBack()
      return
    }

    this.setState({
      title: singer.name,
      bgImage: singer.avatar
    })
    getSingerDeatil(singer.id).then(res => {
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
      <div className="c-singer-detailt">
        <MusicList songs={this.state.songs} title={this.state.title} bgImage={this.state.bgImage}></MusicList>
      </div>
    )
  }
}

export default SingerDetail
