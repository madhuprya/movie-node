const logger = require('../utils/logging');

function errorHandler(err, req, res, next) {
  logger.info(err.name);
  res.sendStatus(500);
}
module.exports = {
  errorHandler,
};
