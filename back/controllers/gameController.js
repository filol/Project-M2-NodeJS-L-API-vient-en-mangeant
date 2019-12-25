const utilsReq = require('../utils/VerifyRequest')
const Question = require('../models/Question')
const logger = require('../services/logger')
const { check, param, validationResult } = require('express-validator')

/**
 * The game controller
 * @module gameController
 */
var gameController = {}

// Importing the AWS SDK (for translation or pronunciation)
var AWS = require('aws-sdk')
AWS.config.region = 'us-east-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:d5beba94-b05a-49ce-b90c-a2c2ad452e44',
})

/**
 *  choose a random english word
 * @member randomWord
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */
gameController.randomWord = async function(req, res) {
  // Vérification des toutes les données requises
  utilsReq.verify(req)

  // Lecture du fichier JSON contenant les mots
  let jsonData = require('../ressources/words_dictionary.json')
  // Génération d'un nombre random en fct de la taille du fichier
  let random = Math.floor(Math.random() * Object.keys(jsonData).length)
  // On récupère la clé du json à l'aide du nombre random
  let randomWord = Object.keys(jsonData)[random]
  console.log('random word : ', randomWord)

  // On créé un enregistrement en bdd
  const questionData = {
    idUser: 3, //req.query.token, // TODO recuperer l'id de l'utilisateur à l'aide de son token
    wordToFind: randomWord,
    remainingTrial: 3, // TODO A changer en fct de la difficulté
    difficulty: req.query.difficulty, // TODO Vérifier que la difficulté existe bien
  }

  Question.create(questionData, (err, question) => {
    if (err) {
      logger.error(err)
      res.status(500).json({ error: err.message })
    } else {
      res.status(200).json({ word: randomWord })
    }
  })
}

/**
 * translate a given word (in english) in a given language
 * @member translate
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */

gameController.translate = async function(req, res) {
  var translate = new AWS.Translate({ apiVersion: '2017-07-01' })
  var params = {
    SourceLanguageCode: 'en' /* required */,
    TargetLanguageCode: req.query.language /* required */,
    Text: req.query.word /* required */,
  }
  await translate.translateText(params, function(err, data) {
    if (err) {
      res.status(400).json({ error: 'error' })
      console.log(err, err.stack)
    } else {
      res.status(200).json({ translation: data.TranslatedText })
    }
  })
}

gameController.verify = async function(req, res) {
  const tokenUser = req.query.token
  const idUser = tokenUser // TODO
  const wordUser = req.body.word
  // Ici on fait une recherche dans la bdd par l'id de l'utilisateur en prenant le dernier élément (en se servant du champs created_at)
  // On check s'il lui reste des essai sauf si mode bac a sable (voir difficulty) puis on décrémente de 1
  // On récupere ensuite le mot et on vérifie si c'est le bon
}

gameController.validate = method => {
  switch (method) {
    case 'randomWord': {
      return [
        param('token', 'Username missing').exists(),
        param('difficulty', 'Password missing').exists(),
      ]
    }
  }
}

module.exports = gameController
