// 个人中心
const express = require('express')
const router = express.Router()

const expressJoi = require('@escook/express-joi')

const { update_user_schema } = require('../schema/user')

const UserInfoHandler = require('../router_handler/userinfo')

router.all('/', (req, res) => {
  res.send('个人中心 API')
})

// 获取用户基本信息
router.get('/userinfo', UserInfoHandler.getUserRouter)

// 修改用户基本信息
router.post('/userinfo', expressJoi(update_user_schema),  UserInfoHandler.updateUserInfo)

module.exports = router