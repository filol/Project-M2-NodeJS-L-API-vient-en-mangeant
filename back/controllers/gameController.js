// import json from './dictionary.json'

/**
 * The game controller
 * @module gameController
 */
var gameController = {}
var dictionnary = [
  'machine',
  'hello',
  'computer',
  'pencil',
  'keyboard',
  'hand',
  'thumb',
]

/**
 * The choose a random english word
 * @member randomWord
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */
gameController.randomWord = async function(req, res) {
  res
    .status(200)
    .json({ word: dictionnary[Math.floor(Math.random() * dictionnary.length)] })
}

module.exports = gameController
