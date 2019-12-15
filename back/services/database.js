// Import the mongoose module
const mongoose = require('mongoose')

const user = 'heroku_v5rfr8w3'
const password = 's3m6t7jp1145n17pviesp4t0cv'
const host = 'ds115653.mlab.com'
const port = 15653
const dbname = 'heroku_v5rfr8w3'

// const uri = 'mongodb://heroku_v5rfr8w3:pass@host:port/dbname'
const uri = `mongodb://${user}:${password}@${host}:${port}/${dbname}`

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
