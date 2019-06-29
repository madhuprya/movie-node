const {
  errorLogger,
  logger,
  transports,
  format,
} = require('express-winston');

const winston = require('../utils/logging');

module.exports = logger({
  transports: [
    winston.transports,
    new transports.Console(),
  ],
  format: format.combine(
    format.colorize(),
    format.json(),
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  ignoreRoute(req, res) { return false; },
});

module.exports = errorLogger({
  transports: [
    winston.transports,
    new transports.Console(),
  ],
  format: format.combine(
    format.colorize(),
    format.json(),
  ),
});
