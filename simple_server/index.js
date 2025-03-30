const express = require('express')
const app = express()

// MySQL
const db = require('./db/index')
db.query('SELECT 1', (err, results) => {
  if(err) return res.send(err.message)
  console.log('MySQL is Connecting...')
})

// 跨域，数据解析
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))

// 统一错误处理中间件
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 验证表单数据错误中间件
const joi = require('joi')
app.use((req, res, err, next) => {
  // 如果是 Joi 的 ValidationError 错误实例，并终止代码运行
  if(err instanceof Joi.ValidationError) return res.cc(err)
  // 如果是未知的错误
  res.cc(err)
})

// 后台 API 路由
app.all('/', (req, res) => {
  res.send('Simple Server API')
})

// 用户管理路由模块
const UserRouter = require('./router//user')
const { extend } = require('joi')
app.use('/user', UserRouter)

app.listen(9000, () => {
  console.log('http://127.0.0.1:9000')
})