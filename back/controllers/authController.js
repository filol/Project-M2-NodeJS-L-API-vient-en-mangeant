const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const logger = require('../services/logger')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { keys } = require('../config/config')

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
authController.register = async function (req, res) {
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
      res.status(500).json({ error: err.message })
    } else {
      // Create the JWT token for the passport JWT authentication
      const token = jwt.sign({ id: user._id }, keys.secretJWT, { expiresIn: '30m' })

      // Save user info in session & cookies
      req.session.userId = user._id
      req.session.username = user.username
      res.cookie('token', token)
      res.cookie('username', user.username)

      res.status(201).json({ username: user.username })
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
authController.login = async function (req, res) {
  try {
    const errors = validationResult(req) // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
      return
    }

    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({ username: username })
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        // Create the JWT token for the passport JWT authentication
        const token = jwt.sign({ id: user._id }, keys.secretJWT, { expiresIn: '30m' })

        // Save user info in session
        req.session.userId = user._id
        req.session.username = user.username
        req.session.email = user.email
        req.session.language = user.language
        req.session.difficulty = user.difficulty
        res.cookie('token', token)
        res.cookie('username', user.username)

        res
          .status(200)
          .json({ success: true, user: { username: user.username } })
      } else {
        res.status(401).json({ success: false, message: 'Wrong password' })
      }
    } else {
      res
        .status(404)
        .json({ success: false, message: 'Wrong email and/or password' })
    }
  } catch (err) {
    logger.error(err)
    res.status(500).json({ error: err })
  }
}

/**
 * The logout function
 * @member logout
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */
authController.logout = async function (req, res, next) {
  req.session.regenerate(function (err) {
    if (err) {
      next(err)
    } else {
      res.clearCookie('username')
      res.clearCookie('token')
      res.json({ success: true })
    }
  })
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

/**
 * The delete function
 * @member delete
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */

authController.delete = async function (req, res, next) {
  const user = await User.findOne({ username: req.session.username })
  if (user) {
    User.findOneAndDelete({ _id: req.session.userId }, function (err) {
      if (err) {
        console.log(err)
      } else {
        req.session.regenerate(function (err) {
          if (err) {
            next(err)
          } else {
            res.clearCookie('username')
            res.clearCookie('token')
            res
              .status(200)
              .json({ success: true, message: 'User has been removed' })
          }
        })
      }
    })
  } else {
    res.status(401).json({
      success: false,
      message:
        'An unexpected error occured while trying to remove the account !'
    })
  }
}

/**
 * The myAccount function
 * @member myAccount
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */

authController.account = async function (req, res, next) {
  if (req.session.userId) {
    const user = await User.findOne({ _id: req.session.userId })
    if (user) {
      res.status(200).json({
        success: true,
        user: {
          username: req.session.username,
          email: req.session.email,
          language: user.language,
          difficulty: user.difficulty
        }
      })
    } else {
      res
        .status(401)
        .json({ success: false, message: "session doesn't exist !" })
    }
  }
}

/**
 * The changePassword function
 * @member changePassword
 * @function
 * @param {Object} req - the request
 * @param {Object} res - the response
 */

authController.changePassword = async function (req, res, next) {
  const newPassword = req.body.password

  const user = await User.findOne({ _id: req.session.userId })
  if (user && newPassword.length > 2 && newPassword.length < 400) {
    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) {
        console.log(err)
      } else {
        User.update(
          { _id: req.session.userId },
          {
            password: hash
          },
          function (err) {
            console.log(err)
          }
        )
        res.status(200).json({
          success: true,
          message: 'Password has been succesfully modified !'
        })
      }
    })
  } else {
    res.status(401).json({
      success: false,
      message: 'Error. The password length or current session is wrong'
    })
  }
}

authController.changeDifficulty = async function (req, res, next) {
  const newDifficulty = req.body.difficulty

  const user = await User.findOne({ _id: req.session.userId })
  if (
    user &&
    (newDifficulty === 'easy' ||
      newDifficulty === 'medium' ||
      newDifficulty === 'hard')
  ) {
    User.updateOne(
      { _id: req.session.userId },
      {
        difficulty: newDifficulty
      },
      function (err) {
        console.log(err)
      }
    )
    res.status(200).json({
      success: true,
      message: 'Difficulty has been successfully changed !'
    })
  } else {
    res.status(401).json({
      success: false,
      message: 'Error. The session and/or new difficulty is wrong'
    })
  }
}

authController.changeLanguage = async function (req, res, next) {
  const newLanguage = req.body.language

  const user = await User.findOne({ _id: req.session.userId })
  if (
    user &&
    (newLanguage === 'fr' ||
      newLanguage === 'en' ||
      newLanguage === 'es' ||
      newLanguage === 'it' ||
      newLanguage === 'de')
  ) {
    User.updateOne(
      { _id: req.session.userId },
      {
        language: newLanguage
      },
      function (err) {
        console.log(err)
      }
    )
    res.status(200).json({
      success: true,
      message: 'Language has been successfully changed !'
    })
  } else {
    res.status(401).json({
      success: false,
      message: 'Error. The session and/or new difficulty is wrong'
    })
  }
}

module.exports = authController
