const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const movie = require('./routes/movie');
const director = require('./routes/director');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use('/movie', movie);
app.use('/director', director);

app.listen(3000, () => {
  console.log('Server running at port 3000');
});

module.exports = app;
