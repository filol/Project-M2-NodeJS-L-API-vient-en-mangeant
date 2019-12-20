// services/logger.js

'use strict'

const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'L\'api vient en mangeant' },
  transports: [
    //
    // - Write all logs error (and below) to `phacil-error.log`.
    // - Write to all logs with level `info` and below to `phacil-combined.log`.
    //
    new transports.File({
      filename: './services/logs/phacil-error.log',
      level: 'error'
    }),
    new transports.File({ filename: './services/logs/phacil-combined.log' })
  ]
})

logger.exceptions.handle(
  new transports.File({ filename: './services/logs/exceptions.log' })
)

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  )
}

module.exports = logger
