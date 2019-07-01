const express = require('express');

// const winston = require('winston');
// const expressWinston = require('express-winston');
const bodyParser = require('body-parser');
const logger = require('../src/utils/logging');

const app = express();
const seed = require('../src/scripts/seedData');
//const movie = require('./routes/movie');
//const director = require('./routes/director');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
// middleware

app.use((req, res, next) => {
  logger.info('Request ip', req.ip);
  next();
});

//app.use('/movie', movie);
//app.use('/director', director);


app.listen(3000, () => {
  logger.info('Server running at port 3000');
});

module.exports = app;
