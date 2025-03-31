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

// 解析 token 字符串
const expressJWT = require('express-jwt')
const token = require('./token')
// 配置解析 Token 字符串中间件，.unless({ path: [/^\/user/]}) 用来指定哪些路由不需要身份认证
app.use(expressJWT({secret: token.jwtSecretKey}).unless({ path: [/^\/user/]}))

// 验证表单数据错误中间件，错误中间件 err 一定要参数一定要在最前面
const joi = require('joi')
app.use((err, req, res, next) => {
  // 如果是 Joi 的 ValidationError 错误实例，并终止代码运行
  if(err instanceof joi.ValidationError) return res.cc(err)
  // Token 身份认证失败错误
  if(err.name === 'UnauthorizedError') return res.cc('Token 身份认证失败')
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