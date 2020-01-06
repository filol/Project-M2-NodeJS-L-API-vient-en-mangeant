// les strats passport
const JWTStrategy = require('passport-jwt').Strategy
const { keys } = require('../config/config')
const User = require('../models/User')

const cookieExtractor = function (req) {
  var token = null
  if (req && req.cookies) {
    token = req.cookies.token
  }
  return token
}

/**
 * Hooks the JWT Strategy.
 * @param {Object} passport - the passport instance
 */
function hookJWTStrategy (passport) {
  var options = {}

  options.secretOrKey = keys.secretJWT
  options.jwtFromRequest = cookieExtractor
  options.ignoreExpiration = false

  // Strategy for guests
  passport.use(
    'connected',
    new JWTStrategy(options, function (JWTPayload, callback) {
      console.log('JWTPayload: ', JWTPayload)
      User.findOne({ _id: JWTPayload.id }, function (err, user) {
        if (err) {
          return callback(err, false)
        }
        if (user) {
          return callback(null, user)
        } else {
          return callback(null, false)
        }
      })
    })
  )
}
module.exports = hookJWTStrategy
