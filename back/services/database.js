// Import the mongoose module
const mongoose = require('mongoose')

const uri =
  process.env.MONGO_URI ||
  'mongodb://heroku_g4k6sn1l:tpj1grg07ldrlbutch7oo279gs@ds131546.mlab.com:31546/heroku_g4k6sn1l'

// Set up default mongoose connection
const mongoDB = uri

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

// Get the default connection
const db = mongoose.connection

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

db.once('open', function () {
  console.log('mongo connected')
})

module.exports = db
