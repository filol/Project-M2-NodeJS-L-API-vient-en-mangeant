const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  idUser: {
    type: String,
    required: true,
    trim: true
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
  },
  language: {
    type: String,
    required: true,
    trim: true
  }
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question
