// 用来定义验证规则
const Joi = require('joi')
/* 
hapi/ji 提供的一些验证规则
  string(): 值必须是字符串
  alphanum()： 值只能是包含 a-zA-Z0-9 的字符串
  min/max(len): 最小长度/最大长度
  required(): 值必填，不能为 undefined
  pattern(): 正则表达式，值必须符合正则表达式的规则
  number(): 值必须是数字
  integer()：值必须是整数值
  email(): 值必须是邮箱格式的
*/

// 定义用户名和密码的验证规则
const username = Joi.string().alphanum().min(3).max(12).required()
const password = Joi.string().pattern(/^[\S]{6,15}$/).required()

// 更新用户基本信息的验证规则
const nickname = Joi.string().required()
const email = Joi.string().email().required()




// 向外共享定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = { 
  /* 
  hapi/joi 提供三个参数对象
    1. body：req.body
    2. query: req.query
    3. params: req.params
  */
  body: { username, password }
}

// 向外共享定义更新用户基本信息表单数据的规则对象
exports.update_userinfo_schema = {
  body: { nickname, email}
}

// 向外共享更新密码表单数据的规则对象
exports.update_pwd_schema = {
  body: {
    // 使用之前已经定义过的 password 这个规则，验证 req.body.password
    oldPwd: password, 
    // newPwd: 新密码的值不能和原密码的值一样
    /* 
    joi 方法：
      .ref(‘str’)：该值的值必须和 str 的值保持一致
      .not(): 该值的值不能和 .ref('str') 的值一致
      .concat()：将两条规则合并
    */
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(password)
  }
}