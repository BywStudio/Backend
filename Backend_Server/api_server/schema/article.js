// 用来定义验证规则
const Joi = require('joi')

// 新增文章分类的验证规则
const name = Joi.string().required()
const alias = Joi.string().alphanum().required()

// 新增文章分类的验证规则对象
exports.add_cate_schema = {
  body: {
    name, alias
  }
}