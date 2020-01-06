const router = require('express').Router()
const authController = require('../controllers/authController')

var authRoutes = function (passport) {
  router.post(
    '/register',
    authController.validate('register'),
    authController.register
  )

  router.post('/login', authController.validate('login'), authController.login)

  router.post('/logout', authController.logout)

  router.get('/account', passport.authenticate('connected', { session: false }), authController.account)
  router.get('/delete', passport.authenticate('connected', { session: false }), authController.delete)
  router.post('/changePassword', passport.authenticate('connected', { session: false }), authController.changePassword)
  router.post('/changeDifficulty', passport.authenticate('connected', { session: false }), authController.changeDifficulty)
  router.post('/changeLanguage', passport.authenticate('connected', { session: false }), authController.changeLanguage)

  return router
}

module.exports = authRoutes
