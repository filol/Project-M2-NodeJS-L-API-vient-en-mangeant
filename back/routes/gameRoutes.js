const router = require('express').Router()
const gameController = require('../controllers/gameController')

var gameRoutes = function (passport) {
  router.get('/randomWord', gameController.randomWord)
  router.get('/translate', gameController.translate)
  router.get('/pronounce', gameController.pronounce)
  router.post('/verify', gameController.verify)
  router.get('/answer', gameController.answer)

  return router
}

module.exports = gameRoutes
