const db = require('../db/index')

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
    // 写入数据库
    db.query(sql, userInfo, (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !==1) return res.cc('用户注册失败, 请稍后再试!')
      res.cc('用户注册成功!', 0)
    })
  })
}

// 用户登录路由处理函数
exports.loginUser = (req, res) => {
  res.send('用户登录')
}