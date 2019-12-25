const router = require('express').Router()
const gameController = require('../controllers/gameController')

var gameRoutes = function(passport) {
  router.get('/randomWord', gameController.randomWord)
  router.get('/translate', gameController.translate)
  router.get('/pronounce', gameController.pronounce)

  return router
}

module.exports = gameRoutes
