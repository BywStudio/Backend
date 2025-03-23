// 用来定义验证规则
const Joi = require('joi')
/* 
hapi/ji 提供的一些验证规则
  string(): 值必须是字符串
  alphanum()： 值只能是包含 a-zA-Z0-9 的字符串
  min/max(len): 最小长度/最大长度
  required(): 值必填，不能为 undefined
  pattern(): 正则表达式，值必须符合正则表达式的规则
*/

// 定义用户名和密码的验证规则
const username = Joi.string().alphanum().min(3).max(12).required()
const password = Joi.string().pattern(/^[\S]{6,15}$/).required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = { 
  /* 
  hapi/joi 提供三个参数对象
    1. body：req.body
    2. query: req.query
    3. params: req.params
  */
  body: { username, password }
}