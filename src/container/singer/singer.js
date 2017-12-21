/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

class Singer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      singers: []
    }
  }
  componentDidMount() {
    this._getSingerList()
  }
  _getSingerList() {
    getSingerList().then(res => {
      if (res.code === ERR_OK) {
        this.setState({
          singers: res.data.list
        })
        console.log(this._normalizeSinger(res.data.list))
      }
    })
  }
  _normalizeSinger(list) {
    let map = {
      hot: {
        title: HOT_NAME,
        items: []
      }
    }
    list.forEach((item, index) => {
      // 热门数据
      if (index < HOT_SINGER_LEN) {
        map.hot.items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      }
      // 普通数据
      const key = item.Findex
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(new Singer({
        id: item.Fsinger_mid,
        name: item.Fsinger_name
      }))
    })

    // 处理下map
    let hot = []
    let ret = []
    for (let key in map) {
      let val = map[key]
      // 过滤掉那些不是 英文字母的歌手了
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val)
      } else if (val.title === HOT_NAME) {
        hot.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(ret)
  }
  render() {
    return (
      <div className="o-singer">Singer-页面</div>
    )
  }
}

export default Singer
