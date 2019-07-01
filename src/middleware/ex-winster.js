const {
  errorLogger,
  logger,
} = require('express-winston');

const winston = require('../utils/logging');

module.exports = logger({
  transports: [
    winston.transports,
    winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
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
    winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
});
