const express = require('express')
const Router = express.Router()
const axios = require('axios')

Router.get('/list', function(req, res) {
  let me = res
  axios.get('http://vuemusic.t.imooc.io/api/getDiscList', {
    headers: {
      Host: 'vuemusic.t.imooc.io',
      Referer: 'http://vuemusic.t.imooc.io/'
    },
    params: {
      g_tk: '1928093487',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: '0',
      format: 'json',
      platform: 'yqq',
      hostUin: '0',
      sin: '0',
      ein: '29',
      sortId: '5',
      needNewCode: '0',
      categoryId: '10000000',
      rnd: '0.36014272788046786'
    }
  }).then(res => {
    // console.log(res.data)
    me.json({
      status: 200,
      data: res.data
    })
  })
  // res.json({
  //   status: 200,
  //   data: "你好啊"
  // })
})

Router.get('/api/lyric', function(req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      Referer: 'https://c.y.qq.com/',
      Host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    let ret = response.data
    if (typeof ret === 'string') {
      const reg = /^\w+\(({.+})\)$/
      const matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  })
  // res.json({
  //   status: 200,
  //   data: "你好啊"
  // })
})

module.exports = Router
