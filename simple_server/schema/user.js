const joi = require('joi')

const username = joi.string().alphanum().min(1).max(12).required()
const phone = joi.string().pattern(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).min(11).max(11).required()
const password = joi.string().pattern(/^[\S]{6,15}$/).required()

exports.reg_user_schema = {
  body: { username, phone, password }
}

exports.login_user_schema = {
  body: { phone, password}
}