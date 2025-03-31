const mysql = require('mysql')

const db = mysql.createPool({
  hostname: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'biyiwei0408',
  database: 'my_db_01'
})

// 如果需要使用，那就导入使用 db 中的方法即可
module.exports = db