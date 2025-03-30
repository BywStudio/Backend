const mysql = require('mysql')

const db = mysql.createPool({
  hostname: 'http://127.0.0.1:3306',
  user: 'root',
  password: 'biyiwei0408',
  database: 'simple_server'
})

module.exports = db