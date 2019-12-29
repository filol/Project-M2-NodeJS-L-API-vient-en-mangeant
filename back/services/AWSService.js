var AWSService = {}

// Importing the AWS SDK (for translation or pronunciation)
var AWS = require('aws-sdk')
AWS.config.region = 'us-east-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:d5beba94-b05a-49ce-b90c-a2c2ad452e44'
})

AWSService.translate = function (language, word, next) {
  var translate = new AWS.Translate({ apiVersion: '2017-07-01' })
  var params = {
    SourceLanguageCode: 'en' /* required */,
    TargetLanguageCode: language /* required */,
    Text: word /* required */
  }

  translate.translateText(params, function (err, data) {
    if (err) {
      console.log(err, err.stack)
      next(err)
    } else {
      next(null, data.TranslatedText)
    }
  })
}

AWSService.pronounce = function (language, word, next) {
  // available languages and speaker names associated with them
  var languageIds = ['fr-FR', 'es-ES', 'it-IT', 'de-DE', 'en-US']
  var voiceIds = ['Mathieu', 'Enrique', 'Giorgio', 'Hans', 'Matthew']

  // Create the JSON parameters for getSynthesizeSpeechUrl
  var speechParams = {
    OutputFormat: 'mp3',
    SampleRate: '16000',
    Text: '',
    TextType: 'text',
    LanguageCode: language, // language code (eg. 'it-IT') passed as GET param
    VoiceId: voiceIds[languageIds.indexOf(language)] // auto selection of voice for this language code
  }
  // word to pronounce
  speechParams.Text = word

  // Create the Polly service object and presigner object
  var polly = new AWS.Polly({ apiVersion: '2016-06-10' })
  var signer = new AWS.Polly.Presigner(speechParams, polly)
  signer.getSynthesizeSpeechUrl(speechParams, function (error, url) {
    if (error) {
      console.log(error)
      next(error)
    } else {
      next(null, url)
    }
  })
}

module.exports = AWSService
