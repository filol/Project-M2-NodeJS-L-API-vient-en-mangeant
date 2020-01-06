const router = require('express').Router()
const userController = require('../controllers/userController')

var userRoutes = function (passport) {
  router.get('/history', passport.authenticate('connected', { session: false }), userController.history)

  return router
}

module.exports = userRoutes
