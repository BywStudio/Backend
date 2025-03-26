const express = require('express')
const router = express.Router()

const ArtcateHandler = require('../router_handler/artcate')

router.all('/', (req, res) => {
  res.send('文章分类 API')
})

// 获取文章分类列表
router.get('/cates', ArtcateHandler.getArtcates)

module.exports = router