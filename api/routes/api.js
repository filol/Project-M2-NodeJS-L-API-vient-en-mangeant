const router = require('express').Router()

var api = function (passport) {
  router.use('/users', require('./authRoutes')(passport))
  router.use('/game', passport.authenticate('connected', { session: false }), require('./gameRoutes')(passport))
  router.use('/user', require('./userRoutes')(passport))

  return router
}

module.exports = api
