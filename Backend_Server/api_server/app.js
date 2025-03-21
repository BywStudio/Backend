const express = require('express')
const app = express()

// cors 、解析数据
const cors = require('cors')
const bodyParser = require('body-parser')

// 一定要在路由之前使用
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 响应数据的中间件，一定要在路由之前封装这个 res.cc 错误级别处理中间件，路由就可以使用这个函数
app.use((req, res, next) => {
  // status = 0 成功
  // 1 为失败，默认设置为1，方便处理失败的情况
  res.cc = function(err, status = 1) {
    res.send({
      status,
      // 状态描述，判断 err 是错误对象还是字符串, instanceof 判断是否为 Error 构造函数的实例
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 用户管理路由模块
const UserRouter = require('./router/user')
app.use('/user', UserRouter)

app.all('/', (req, res) => {
  res.send('Express + MySQL API')
})

const db = require('./db/index')

db.query('SELECT 1', (err, result) => {
  if(err) return err.message
  console.log('Mysql is Connecting...')
})


app.listen(3007, () => {
  console.log('http://127.0.0.1:3007')
})