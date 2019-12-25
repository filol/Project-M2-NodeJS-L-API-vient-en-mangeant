const { validationResult } = require('express-validator')

var utilsReq = {}

utilsReq.verify = function (req) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
      return
    }
  } catch (err) {
    logger.error(err)
    res.status(500).json({ error: err })
    return
  }
}

module.exports = utilsReq

