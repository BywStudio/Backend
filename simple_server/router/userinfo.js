// 个人中心
const express = require('express')
const router = express.Router()

const UserInfoHandler = require('../router_handler/userinfo')

router.all('/', (req, res) => {
  res.send('个人中心 API')
})

// 获取用户基本信息
router.get('/userinfo', UserInfoHandler.getUserRouter)

module.exports = router