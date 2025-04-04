const db = require('../db/index')

// 获取用户的基本信息
exports.getUserRouter = (req, res) => {
  // 根据用户 id 查找
  const sqlStr = `select id,  username, phone, intro, avatar from user where id=?`
  db.query(sqlStr, req.user.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.length !== 1 ) return res.cc('获取用户信息失败, 请稍后再试!')
    res.send({
      status: 0,
      message: '获取用户信息成功!',
      data: results[0]
    })
  })
}

// 更新用户的基本信息
exports.updateUserInfo = (req, res) => {
  let userInfo = req.body
  const sqlStr = `update user set ? where id=?`
  db.query(sqlStr, [userInfo, req.user.id], (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('更新用户信息失败， 请稍后再试!')
    res.cc('更新用户信息成功!', 0)
  })
}