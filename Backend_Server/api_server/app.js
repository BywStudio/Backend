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
  // 1 为失败，默认设置为1，方便处理失败的情况，如果是成功的情况，只需要在使用的时候传入 0
  res.cc = function(err, status = 1) {
    res.send({
      status,
      // 状态描述，判断 err 是错误对象还是字符串, instanceof 判断是否为 Error 构造函数的实例
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 一定要在路由之前，解析 Token 字符串的中间件
const expressJWT = require('express-jwt')
const config = require('./config.js')
// 配置解析 Token 字符串中间件，.unless({ path: [/^\/user/]}) 用来指定哪些路由不需要身份认证
app.use(expressJWT({secret: config.jwtSecretKey}).unless({ path: [/^\/user/]}))

app.all('/', (req, res) => {
  res.send('Express + MySQL API')
})

// 用户管理路由模块
const UserRouter = require('./router/user')
app.use('/user', UserRouter)

// 用户注册的全局错误级别中间件，用来捕获 Joi 验证失败后的错误
const Joi = require('joi')
app.use((err, req, res, next) => {
  // 验证用户提交表单：如果是 Joi 的 ValidationError 错误实例，并终止代码运行
  if(err instanceof Joi.ValidationError) return res.cc(err)
  // Token 身份认证失败错误
  if(err.name === 'UnauthorizedError') return res.cc('Token 身份认证失败')
  // 如果是未知的错误
  res.cc(err)
})

// 个人中心路由模块
const UserinfoRouter = require('./router/userinfo.js')
app.use('/my', UserinfoRouter)

// 连接 mysql 数据库
const db = require('./db/index')

db.query('SELECT 1', (err, result) => {
  if(err) return err.message
  console.log('Mysql is Connecting...')
})


app.listen(3007, () => {
  console.log('http://127.0.0.1:3007')
})