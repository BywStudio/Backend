const express = require('express')
const router = express.Router()

// 导入路由处理函数
const userHandler = require('../router_handler/user')

// 验证表单的中间件
const expressJoi = require('@escook/express-joi')
// 验证表单的规则对象
const { reg_loin_schema, reg_login_schema } = require('../schema/user')



router.all('/', (req, res) => {
  res.send('用户管理模块 API')
})

// 注册新用户
/* 
注册用户需要验证表单:
  使用验证中间件 expressJi
  验证规则对象 reg_login_schema
  注册处理函数 regUser 
*/
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)

// 登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router