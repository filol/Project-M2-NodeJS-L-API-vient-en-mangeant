const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')

app.use(bodyParser.json())

/**
 *  Passport : Express-compatible authentication middleware for Node.js.
 */
app.use(passport.initialize())

app.use('/', require('./routes/api')(passport))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send('Page not found')
})

module.exports = app
