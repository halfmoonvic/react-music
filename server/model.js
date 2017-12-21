const mongoose = require('mongoose')
  // 链接mongo 并且使用 imooc 这个集合
const DB_URL = 'mongodb://localhost:27017/react-music'
mongoose.connect(DB_URL)

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String, },
    desc: { type: String },
    title: { type: String },
    // 如果你是boss
    company: { type: String },
    money: { type: String }
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}
