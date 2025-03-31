const usersRouter = require('../router/users')

const router = app => {
  app.use('/users', usersRouter)
}

module.exports = router