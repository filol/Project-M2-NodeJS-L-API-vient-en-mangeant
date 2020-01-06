const router = require('express').Router()
const gameController = require('../controllers/gameController')

var gameRoutes = function (passport) {
  router.get('/newGame', gameController.newGame)
  router.get('/randomWord', gameController.randomWord)
  router.get('/translate', gameController.translate)
  router.get('/pronounce', gameController.pronounce)
  router.post('/verify', gameController.verify)
  router.get('/skip', gameController.skip)
  router.get('/answer', gameController.answer)
  router.get('/score', gameController.score)
  return router
}

module.exports = gameRoutes
