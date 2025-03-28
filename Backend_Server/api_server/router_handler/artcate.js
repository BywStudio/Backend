const db = require('../db/index')

// 获取文章分类列表
exports.getArtcates = (req, res) => {
  const sqlStr = `select * from ev_article_cate where is_delete=0 order by id asc`
  db.query(sqlStr, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章分类列表成功!',
      data: results
    })
  })
}

// 新增文章分类
exports.addArticleCates = (req, res) => {
  const sqlStr = `select * from ev_article_cate where name=? or alias=?`
  db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
    if(err) return res.cc(err)

    // 分类名称、分类别名都被占用
    if(results.length === 2) return res.cc('分类名称与别名被占用, 请更换后尝试!')

    // length === 1 的三种情况
    if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用, 请更换后尝试!')
    if(results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用, 请更换后尝试!')
    if(results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用, 请更换后尝试!')
    
    // 都没有被占用，添加数据到数据库
    const sqlInsert = `insert into ev_article_cate set ?`
    db.query(sqlInsert, req.body, (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('新增文章分类失败, 请稍后再试!')
      
      // 成功
      res.cc('新增文章分类成功!', 0)
    })
  })
}

// 根据 id 删除文章分类
exports.deleteCateById = (req, res) => {
  const sqlStr = `update ev_article_cate set is_delete=1 where id=?`
  db.query(sqlStr, req.params.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('删除失败!')
    res.cc('删除文章分类成功', 0)
  })
}