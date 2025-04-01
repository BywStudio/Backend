// 用户管理
const express = require('express')
const router = express.Router()

// 验证对象，使用 express-joi 中间件
const expressJoi = require('@escook/express-joi')
const { reg_user_schema, login_user_schema } = require('../schema/user')

router.all('/', (req, res) => {
  res.send('用户管理 API')
})

const UserRouterHandler = require('../router_handler/user')

// 用户注册路由
router.post('/register', expressJoi(reg_user_schema), UserRouterHandler.registerUser)

// 用户登录路由
router.post('/login', expressJoi(login_user_schema), UserRouterHandler.loginUser)

module.exports =  router