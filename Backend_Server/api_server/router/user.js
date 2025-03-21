const express = require('express')
const router = express.Router()

// 导入路由处理函数
const userHandler = require('../router_handler/user')

router.all('/', (req, res) => {
  res.send('用户管理模块')
})

// 注册新用户
router.post('/reguser', userHandler.regUser)

// 登录
router.post('/login', userHandler.login)

module.exports = router