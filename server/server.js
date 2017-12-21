const express = require('express')
const userRouter = require('./user')

// 新建app
const app = express()

// socket.io 与 express 相配合

app.use('/music', userRouter)

app.get('/', function (req, res) {
  res.send('<h1>Hello World</h1>')
})

app.listen(9099, function () {
  console.log('Node app start at port 9099')
})
