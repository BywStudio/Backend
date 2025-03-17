const express = require('express')
const app = express()

const mongoose = require('mongoose')
const routerInit = require('./config/router')

const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())

// mongoDB
mongoose.connect('mongodb://localhost:27017/Music_Dream_Forever', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

routerInit(app)

app.all('/', (req, res) => {
  res.send('后端 API')
})

// 统一错误处理
app.use((req, res, next) => {
  res.status(404).send('Not Found')
})
app.use((err, req, res, next) => {
  let err400 = ['ValidationError', 'CastError', 'BSONError', 'MulterError']
  let code = err400.includes(err.name) ? 400 : err.status || 500
  if(err.name == 'BSONError') {
    err.message = 'ID错误'
  }
  res.status(code).send({
    name: err.name,
    message: err.message
  })
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})