const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const passport = require('passport')
const db = require('./services/database')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const hookJWTStrategy = require('./services/passportStrategy')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

/**
 *  Passport : Express-compatible authentication middleware for Node.js.
 */
app.use(passport.initialize())
hookJWTStrategy(passport)

// use sessions for tracking logins
app.use(
  session({
    secret: 'wxs1drf§tè!çok3l,nbvfr§è41!yiujhgh9f',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
)

app.use('/', require('./routes/api')(passport))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send('Page not found')
})

module.exports = app
