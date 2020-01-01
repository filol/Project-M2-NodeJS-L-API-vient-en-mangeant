const Question = require('../models/Question')

var userController = {}

userController.history = async function (req, res) {
  const idUser = req.session.userId
  Question.find(
    { idUser: idUser },
    undefined,
    {
      sort: {
        createdAt: -1 // Sort by Date DESC
      }
    },
    (err, questions) => {
      if (err) {
        res.status(500).json({ message: err })
        console.error(err)
      }
      let response = []
      questions.forEach(function (question) {
        response.push({
          id: question._id,
          wordToFind: question.wordToFind,
          date: question.updatedAt,
          find: question.find,
          language: question.language,
          difficulty: question.difficulty
        })
      })
      res.status(200).json({ history: response })
    })
}

module.exports = userController
