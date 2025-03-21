const db = require('../db/index')
const bcrypt = require('bcryptjs')
// 用户注册处理函数
exports.regUser = (req, res) => {
  let userInfo = req.body
  // 检测表单数据是否合法
  if(!userInfo.username || !userInfo.password) {
    return res.cc(err)
  }
  // 检测用户名是否被占用
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userInfo.username, (err, results) => {
    if(err) return res.cc(err)
    if(results.length > 0) {
      return res.cc('用户名已存在, 请更换其他的用户名!')
    }
    // 用户名可用，加密存储密码
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    // 插入新用户
    const sqlInsert = 'insert into ev_users set ?'
    db.query(sqlInsert,{username: userInfo.username, password: userInfo.password}, (err, results) => {
      if(err) return res.cc(err)
      // 判断影响行数affectedRows是否为1，是则成功，不是则失败 res.send({status: 1, message: '注册用户失败, 请稍后重试!'})
      if(results.affectedRows !=1) return res.cc('注册用户失败, 请稍后重试!')
      // 注册用户成功
      res.cc('注册用户成功', 0)
    })
  })
}

// 用户登录处理函数
exports.login = (req, res) => {
  res.send('login Ok')
}