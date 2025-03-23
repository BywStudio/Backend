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