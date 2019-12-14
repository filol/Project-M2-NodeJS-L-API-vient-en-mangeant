const router = require('express').Router()
const authController = require('../controllers/authController')

var authRoutes = function (passport) {
  router.get('/signup', authController.signUp)

  return router
}

module.exports = authRoutes
