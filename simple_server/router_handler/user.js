const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const token = require('../token')

// 用户注册路由处理函数
exports.registerUser = (req, res) => {
  // 表单验证已经通过 joi 实现
  // 通过后开始写入数据库
  let userInfo = req.body
  // 检测用户名、手机号是否被占用
  const sqlStr = 'select * from user where phone=? and username=?'
  db.query(sqlStr,[userInfo.phone, userInfo.username], (err, results) => {
    if(err) return res.cc(err)
    if(results.length > 0) return res.cc('用户已存在, 请修改手机号和用户名!')
    const sql = 'insert into user set ?'
    // 写入数据库，对密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    db.query(sql, {username: userInfo.username, phone: userInfo.phone, password: userInfo.password}, (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !==1) return res.cc('用户注册失败, 请稍后再试!')
      res.cc('用户注册成功!', 0)
    })
  })
}

// 用户登录路由处理函数
exports.loginUser = (req, res) => {
  let userInfo = req.body
  // 验证表单数据
  // 查找用户是否存在
  const sqlStr = `select * from user where phone=?`
  db.query(sqlStr, userInfo.phone, (err, results) => {
    console.log(results)
    if(err) return res.cc(err)
    if(results.length === 0) return res.cc('用户不存在, 请先注册!')
    // 找到了用户，需要比对密码, 需要使用 加密工具进行比对
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    if(!compareResult) return res.cc('用户密码错误, 请重新输入密码！')
    // 登录成功之后生成 Token 字符串，不能包含密码、头像等敏感信息
    const user = {...results[0], password: '', avatar: ''}
    const tokenStr = jwt.sign(user, token.jwtSecretKey, {expiresIn: token.expiresIn})
    res.send({
      status: 0,
      message: '用户登录成功',
      token: 'Bearer' + tokenStr
    })
   })
}