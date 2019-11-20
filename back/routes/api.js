const router = require('express').Router()

var api = function (passport) {
  router.use('/users', require('./authRoutes')(passport))

  return router
}

module.exports = api
