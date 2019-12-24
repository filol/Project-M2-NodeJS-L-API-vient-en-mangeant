// import json from './dictionary.json'

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
 *  choose a random english word
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

module.exports = gameController
