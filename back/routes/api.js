const router = require('express').Router()

var api = function(passport) {
  router.use('/users', require('./authRoutes')(passport))
  router.use('/game', require('./gameRoutes')(passport))
  router.use('/user', require('./userRoutes')(passport))

  return router
}

module.exports = api
