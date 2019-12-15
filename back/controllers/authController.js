const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const logger = require('../services/logger')

/**
 * The authentication controller
 * @module authController
 */
var authController = {}

/**
 * The register function
 * @member register
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */
authController.register = function (req, res) {
  try {
    const errors = validationResult(req) // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
      return
    }
  } catch (err) {
    logger.error(err)
    res.status(500).json({ error: err })
    return
  }

  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }

  User.create(userData, (err, user) => {
    if (err) {
      logger.error(err)
      res.status(500).json({ error: err })
    } else {
      res.status(201).json({ user: user })
    }
  })
}

/**
 * The login function
 * @member login
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */
authController.login = function (req, res) {
  try {
    const errors = validationResult(req) // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
      return
    }
  } catch (err) {
    logger.error(err)
    res.status(500).json({ error: err })
    return
  }

  res.send('login')
}

/**
 * The logout function
 * @member logout
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */
authController.logout = function (req, res) {
  res.send('logout')
}

authController.validate = method => {
  switch (method) {
    case 'register': {
      return [
        check('username', 'Username missing').exists(),
        check('password', 'Password missing').exists(),
        check('email', 'Email missing').exists(),
        check('email', 'Email format wrong').isEmail()
      ]
    }
    case 'login': {
      return [
        check('username', 'Username missing').exists(),
        check('password', 'Password missing').exists()
      ]
    }
  }
}

module.exports = authController
