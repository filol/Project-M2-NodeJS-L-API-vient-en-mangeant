const router = require('express').Router()
const gameController = require('../controllers/gameController')

var gameRoutes = function (passport) {
  router.post('/randomWord', passport.authenticate('connected', { session: false }), gameController.randomWord)
  router.post('/translate', passport.authenticate('connected', { session: false }), gameController.translate)
  router.post('/pronounce', passport.authenticate('connected', { session: false }), gameController.pronounce)
  router.post('/verify', passport.authenticate('connected', { session: false }), gameController.verify)

  return router
}

module.exports = gameRoutes
