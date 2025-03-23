const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// 生成 Token 的密钥
const config = require('../config.js')

// 用户注册处理函数
exports.regUser = (req, res) => {
  let userInfo = req.body
  // 检测表单数据是否合法，代码删除，已经使用了新的验证规则对象 schema/user.js

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
      if(results.affectedRows !== 1) return res.cc('注册用户失败, 请稍后重试!')
      // 注册用户成功
      res.cc('注册用户成功', 0)
    })
  })
}

// 用户登录处理函数
exports.login = (req, res) => {
  const userInfo = req.body
  const sqlStr = `select * from ev_users where username=?`

  db.query(sqlStr, userInfo.username, (err, results) => {
    // 执行 sql 语句失败
    if(err) return res.cc(err)
    // 在数据库中没有查询到该用户，未注册
    if(results.length !== 1) return res.cc('用户未注册')
    // 找到了该用户，需要进行密码判断, results 数组里面存放的是根据用户名查询到的结果，第一项是 RowDataPacket 这个对象
    /* 
    results: [
      RowDataPacket {
        id: 3,
        username: 'BywStudio',
        password: '$2a$10$uEN8UQlcxoKaNCMW1X.sfOTqfdjGhYGj6wgHckDapNCr/59CKumFC',
        nickname: null,
        email: null,
        user_pic: null
      }
    ]
    */
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    // 密码错误
    if(!compareResult) return res.cc('用户密码错误')
    // 密码正确，登录成功，需要生成 Token 字符串
    const user = {...results[0], password: '', user_pic: ''}
    /*
    新的 results, password、user_pic 的新值覆盖了旧值
    {
      id: 3,
      username: 'BywStudio',
      password: '',
      nickname: null,
      email: null,
      user_pic: ''
    }
    */
    // 对用户的信息进行加密，生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    // console.log(tokenStr); 调用 res.send() 将 tokenStr 响应给客户端
    res.send({
      status: 0,
      message: '用户登录成功',
      token: 'Bearer' + tokenStr
    })
  })
  // res.send('login Ok')
}