const {
  errorLogger,
  logger,
  transports,
  format,
} = require('express-winston');


module.exports = logger({
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/applog.log`,
    }),
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
    new transports.File({
      maxsize: 5120000,
      maxFiles: 6,
      filename: `${__dirname}/../logs/applog.log`,
    }),
    new transports.Console(),
  ],
  format: format.combine(
    format.colorize(),
    format.json(),
  ),
});
