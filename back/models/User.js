const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },
})

/**
 * Hashing password before saving
 */
UserSchema.pre('save', function(next) {
  var user = this
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

/**
 * Handler **must** take 3 parameters: the error that occurred, the document in question, and the `next()` function
 */
UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'))
  } else {
    next(error)
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
