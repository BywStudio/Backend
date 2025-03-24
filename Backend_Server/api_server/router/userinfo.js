const express = require('express')
const router = express.Router()

// 路由处理函数
const UserInfoHandler  = require('../router_handler//userinfo')

// 导入 @escook/express-joi 中间件
const expressJoi = require('@escook/express-joi')

// 更新用户表单的验证规则对象
const { update_userinfo_schema, update_pwd_schema, updata_avatar_schema } = require('../schema/user')

router.all('/', (req, res) => {
  res.send('个人中心 API')
})

// 获取用户基本信息
router.get('/userinfo', UserInfoHandler.getUserInfo)

// 更新用户基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), UserInfoHandler.updateUserInfo)

// 更新用户密码
router.post('/updatepwd', expressJoi(update_pwd_schema), UserInfoHandler.updatePassword)

// 更新头像
router.post('/update/avatar', expressJoi(updata_avatar_schema), UserInfoHandler.updateAvatar)

module.exports = router