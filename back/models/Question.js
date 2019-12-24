const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  idUser: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  wordToFind: {
    type: String,
    required: true,
    trim: true
  },
  remainingTrial: {
    type: Number,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    required: true,
    trim: true
  },
  find: {
    type: Boolean,
    default: false
  }
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question
