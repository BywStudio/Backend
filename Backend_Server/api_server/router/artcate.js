const express = require('express')
const router = express.Router()

const ArtcateHandler = require('../router_handler/artcate')

// 导入 @escook/express-joi 中间件
const expressJoi = require('@escook/express-joi')

// 导入验证规则对象
const { add_cate_schema } = require('../schema/article')

router.all('/', (req, res) => {
  res.send('文章分类 API')
})

// 获取文章分类列表
router.get('/cates', ArtcateHandler.getArtcates)

// 新增文章分类
router.post('/addcates',expressJoi(add_cate_schema), ArtcateHandler.addArticleCates)

module.exports = router