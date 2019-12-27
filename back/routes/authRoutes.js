const router = require('express').Router()
const authController = require('../controllers/authController')

var authRoutes = function(passport) {
  router.post(
    '/register',
    authController.validate('register'),
    authController.register
  )

  router.post('/login', authController.validate('login'), authController.login)

  router.post('/logout', authController.logout)

  router.get('/account', authController.account)

  return router
}

module.exports = authRoutes
