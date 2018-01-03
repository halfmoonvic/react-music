import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
// import axios from 'axios'

export function getSingerList() {
  // const url = 'https://shc.y.qq.com/v8/fcg-bin/v8.fcg'
  // const data = {
  //   ...commonParams,
  //   channel: 'singer',
  //   page: 'list',
  //   key: 'all_all_all',
  //   pagesize: '100',
  //   pagenum: '1',
  //   g_tk: '5381',
  //   jsonpCallback: 'GetSingerListCallback',
  //   loginUin: '0',
  //   hostUin: '0',
  //   format: 'jsonp',
  //   inCharset: 'utf8',
  //   outCharset: 'utf-8',
  //   notice: '0',
  //   platform: 'yqq',
  //   needNewCode: '0'
  // }

  // return jsonp(url, data, options)
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}


export function getSingerDeatil(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: '5381',
    // jsonpCallback: 'MusicJsonCallbacksinger_track', 此项既是定义后端返回的 函数名称
    loginUin: '0',
    hostUin: '0',
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: '0',
    platform: 'yqq',
    needNewCode: '0',
    singermid: singerId,
    order: 'listen',
    begin: '0',
    num: '30',
    songstatus: '1',
  })

  return jsonp(url, data, options)
}

