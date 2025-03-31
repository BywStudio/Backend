const bcrypt = require('bcryptjs')
const db = require('../db/index')

// 获取用户信息处理函数
exports.getUserInfo = (req, res) => {
  const sqlStr = `select id, username, nickname, email, user_pic from ev_users where id=?`

  // req 的 user 属性是 Token 解析成功之后，express-jwt 中间件帮我们挂载上去的，.user 是固定写法
  db.query(sqlStr, req.user.id, (err, results) => {
    // 执行 sql 语句失败
    if(err) return res.cc(err)
    // 如果没有查询到
    if(results.length !== 1) return res.cc('获取用户信息失败!')
    // 获取用户信息成功，将数据响应给客户端，真实的用户数据存在 data 属性对象中
    res.send({
      status: 0,
      message: '获取用户基本信息成功!',
      data: results[0]
    })
  })
}

// 更新用户基本信息
exports.updateUserInfo = (req, res) => {
  const sqlStr = `update ev_users set ? where id=?`
  db.query(sqlStr, [req.body, req.user.id], (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('更新用户基本信息失败')
    res.cc('更新用户基本信息成功', 0)
  })
}

// 更新密码
exports.updatePassword = (req, res) => {
  // 1. 判断用户是否存在
  const sqlStr = `select * from ev_users where id=?`
  db.query(sqlStr, req.user.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.length !== 1) return res.cc('用户不存在')
    // console.log(results[0].password)

    // 2. 判断原密码是否正确, 数据库中查询到的密码, 与用户输入的原密码 req.body.oldPwd 进行比较，需要加密
    let resultPassword = results[0].password
    let comparePwd = bcrypt.compareSync(req.body.oldPwd, resultPassword)
    // console.log(comparePwd)
    // 原密码错误
    if(!comparePwd) return res.cc('原密码输入错误, 请重新输入!')

    // 3. 原密码输入正确
    const sql = `update ev_users set password=? where id=?`
    // 一定要对新密码加密之后再存储
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

    db.query(sql, [newPwd, req.user.id], (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('重置密码失败!')
      // console.log(results)
      res.cc('重置密码成功!', 0)
    })
  })
}

// 更新头像
exports.updateAvatar = (req, res) => {
  const sqlStr = `update ev_users set user_pic=? where id=?`
  db.query(sqlStr, [req.body.avatar, req.user.id], (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('更新头像失败, 请稍后再试!')
    res.cc('更新用户头像成功!', 0)
  })
}