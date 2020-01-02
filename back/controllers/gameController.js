const utilsReq = require('../utils/VerifyRequest')
const Question = require('../models/Question')
const logger = require('../services/logger')
const gameService = require('../services/gameService')
const AWSService = require('../services/AWSService')

const { param } = require('express-validator')

/**
 * The game controller
 * @module gameController
 */
var gameController = {}

/**
 * Starts a new game
 * @member newGame
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */
gameController.newGame = function (req, res) {
  const { questionsMaxCount } = require('../config/config')
  req.session.questionsMaxCount = questionsMaxCount
  req.session.gameScore = 0
  res.send('Game start')
}

/**
 *  choose a random english word and give us the prounonciation url
 * @member randomWord
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */
gameController.randomWord = async function (req, res) {
  // Vérification des toutes les données requises
  utilsReq.verify(req)

  const randomWord = gameService.getRandomWord()
  console.log('random word : ', randomWord)

  gameService.getRemainingTrial(req.session.difficulty, (err, remainingTrial) => {
    if (err) {
      res.status(422).json({ error: 'La difficulté doit être easy, medium, hard ou sandbox' })
    }

    // On crée un enregistrement en bdd
    const questionData = {
      idUser: req.session.userId,
      remainingTrial: remainingTrial,
      difficulty: req.session.difficulty,
      language: req.session.language
    }

    AWSService.translate(req.session.language, randomWord, (err, wordTranslated) => {
      console.log('wordtranslated', wordTranslated)
      if (err) { res.status(500).json({ error: err.message }) } else {
        questionData.wordToFind = wordTranslated

        Question.create(questionData, (err, question) => {
          if (err) {
            logger.error(err)
            res.status(500).json({ error: err.message })
          } else {
            let langAWS
            switch (req.session.language) {
              case 'fr':
                langAWS = 'fr-FR'
                break
              case 'es':
                langAWS = 'es-ES'
                break
              case 'it':
                langAWS = 'it-IT'
                break
              case 'de':
                langAWS = 'de-DE'
                break
              case 'en':
                langAWS = 'en-US'
                break
            }
            console.log('langAWS: ', langAWS)
            AWSService.pronounce(langAWS, wordTranslated, (err, url) => {
              if (err) res.status(500).json({ error: err.message })
              else res.status(200).json({ pronunciation: url })
            })
          }
        })
      }
    })
  })
}

/**
 * translate a given word (in english) in a given language
 * @member translate
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */
gameController.translate = async function (req, res) {
  AWSService.translate(req.query.language, req.query.word, (err, wordTranslated) => {
    if (err) {
      res.status(400).json({ error: 'error' })
      console.log(err, err.stack)
    } else {
      res.status(200).json({ translation: wordTranslated })
    }
  })
}

/**
 * return pronunciation of word in a specific language
 * @member translate
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */
gameController.pronounce = async function (req, res) {
  AWSService.pronounce(req.query.language, req.query.word, (err, url) => {
    if (err) {
      res.status(500).json({ message: err })
    } else {
      // return a mp3 URL that can be used on the client side (with an HTML audio player) to read the word
      res.status(200).json({ pronunciation: url })
    }
  })
}

/**
 * Permet à l'utilisateur de vérifier s'il a trouvé le bon mot
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
gameController.verify = async function (req, res) {
  console.log('req.session.questionsMaxCount: ', req.session.questionsMaxCount)
  const idUser = req.session.userId
  const wordUser = req.body.word

  Question.findOne(
    { idUser: idUser },
    undefined,
    {
      sort: {
        createdAt: -1 // Sort by Date DESC
      }
    },
    (err, question) => {
      if (err) {
        res.status(500).json({ message: err })
        console.error(err)
      }

      if (question.find) {
        res.status(403).json({ message: 'You have already found the last word' })
        return
      }

      if (question.remainingTrial !== -1) {
        question.remainingTrial -= 1
      }

      if (wordUser === question.wordToFind) {
        req.session.questionsMaxCount--
        req.session.gameScore++

        if (req.session.questionsMaxCount <= 0) {
          res.status(200).json({ message: 'WELL DONE', gameOver: true })
        } else {
          res.status(200).json({ message: 'WELL DONE', gameOver: false })
        }
        question.find = true
      } else if (question.remainingTrial !== -1 && question.remainingTrial <= 0) {
        req.session.questionsMaxCount--

        if (req.session.questionsMaxCount <= 0) {
          res.status(403).json({ message: 'No more trial remaining', gameOver: true })
        } else {
          res.status(403).json({ message: 'No more trial remaining', gameOver: false })
        }
      } else {
        res.status(418).json({ message: 'Nope, it was not this' })
      }

      question.save(function (err) {
        if (!err) {
          console.log('question ' + question._id + ' created at ' + question.createdAt + ' updated at ' + question.updatedAt)
        } else {
          console.log('Error: could not save question ' + question._id)
          console.error(err)
          res.status(500).json({ message: err })
        }
      })
    })
}

/**
 * Permet a l'utilisateur de passer un mot et de passer au suivant
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
gameController.skip = async function (req, res) {
  const idUser = req.session.userId

  Question.findOne(
    { idUser: idUser },
    undefined,
    {
      sort: {
        createdAt: -1 // Sort by Date DESC
      }
    },
    (err, question) => {
      if (err) {
        res.status(500).json({ message: err })
        console.error(err)
      }

      if (question.find) {
        res.status(403).json({ message: 'You have already found the last word' })
        return
      }

      req.session.questionsMaxCount--
      question.find = true

      if (req.session.questionsMaxCount <= 0) {
        res.status(200).json({ message: 'WORD SKIPPED', gameOver: true })
      } else {
        res.status(200).json({ message: 'WORD SKIPPED', gameOver: false })
      }

      question.save(function (err) {
        if (!err) {
          console.log('question ' + question._id + ' created at ' + question.createdAt + ' updated at ' + question.updatedAt)
        } else {
          console.log('Error: could not save question ' + question._id)
          console.error(err)
          res.status(500).json({ message: err })
        }
      })
    }
  )
}

/**
 * Donne à l'utilisateur le mot qu'il recherchait
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
gameController.answer = async function (req, res) {
  const idUser = req.session.userId
  Question.findOne(
    { idUser: idUser },
    undefined,
    {
      sort: {
        createdAt: -1 // Sort by Date DESC
      }
    },
    (err, question) => {
      if (err) { res.status(500).json({ message: err }) }
      res.status(200).json({ word: question.wordToFind })
      if (question.remainingTrial !== -1) {
        question.remainingTrial = 0
        question.save(function (err) {
          if (!err) {
            console.log('question ' + question._id + ' created at ' + question.createdAt + ' updated at ' + question.updatedAt)
          } else {
            console.log('Error: could not save question ' + question._id)
            console.error(err)
            res.status(500).json({ message: err })
          }
        })
      }
    })
}

/**
 * Retourne le score final
 * @member score
 * @function
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
gameController.score = function (req, res) {
  res.json({ score: req.session.gameScore })
}

gameController.validate = method => {
  switch (method) {
    case 'randomWord': {
      return [
        param('difficulty', 'difficulty missing').exists()
      ]
    }
  }
}

module.exports = gameController
