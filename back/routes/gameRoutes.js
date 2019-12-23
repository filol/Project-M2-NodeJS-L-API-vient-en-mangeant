const router = require('express').Router()
const gameController = require('../controllers/gameController')

var gameRoutes = function(passport) {
  router.get('/randomWord', gameController.randomWord)

  return router
}

module.exports = gameRoutes
