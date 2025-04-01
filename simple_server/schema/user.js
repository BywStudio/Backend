const joi = require('joi')

const id = joi.number().integer().min(1).required()
const username = joi.string().alphanum().min(1).max(12).required()
const phone = joi.string().pattern(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).min(11).max(11).required()
const password = joi.string().pattern(/^[\S]{6,15}$/).required()
const email = joi.string().email()
const intro = joi.string()

// 用户注册表单验证对象
exports.reg_user_schema = {
  body: { username, phone, password }
}

// 用户登录表单验证对象
exports.login_user_schema = {
  body: { phone, password }
}

// 更新用户基本信息表单验证对象
exports.update_user_schema = {
  body: {
    phone, email, intro,
    username: joi.string().alphanum().min(1).max(12)
  }
}