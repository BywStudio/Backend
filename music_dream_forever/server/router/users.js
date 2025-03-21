const express = require('express')
const router = express.Router()

const encrypt  = require('../utils/crypto')

const usersModel = require('../model/users')

router.all('/', (req, res) => {
  res.send('用户管理 API')
})
// 用户注册
router.post('/create', async (req, res, next) => {
  let body = req.body
  try{
    // 判断用户是否存在
    const user = await usersModel.findOne({ phone: body.phone});
    if(user === null) {
      body.password = encrypt(body.password)
      let result = await usersModel.create(body)
      res.send(result)
    }else{
      res.send('用户已存在')
    }

  }catch(err){
    next(err)
  }
})
// 用户登录
router.post('/login', async (req, res, next) => {
  let body = req.body
  try{
    let { phone, password } = body
    let user_phone = await usersModel.findOne({ phone })
    // res.send(user_phone === null)
    if(user_phone === null){
      return res.send({
        code: 400,
        message: '还没有账号'
      })
    }
    password = encrypt(password)
    let result = await usersModel.findOne({ phone, password })
    if(result) {
      res.send({
        code: 200,
        data: result,
        message: '用户名密码正确'
      })
    }else{
      res.send({
        code: 20001,
        message: '用户名或密码错误'
      })
    }
  }catch(err){
    next(err)
  }
})


module.exports = router