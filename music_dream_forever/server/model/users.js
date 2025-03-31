const mongoose = require('mongoose')

const usersRegModel = new mongoose.Schema({
  user_name: {type: String, required: true},
  phone: {type: String, required: true},
  password: {type: String, required: true}
})

const Model = mongoose.model('users', usersRegModel)
module.exports = Model