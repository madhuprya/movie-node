const sequelize = require('../utils/database');

const movies = require('../../movies');

const Director = require('../models/Director');

const Movie = require('../models/Movie');

Director.hasMany(Movie);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }).catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


sequelize.sync({
  logging: console.log,
  force: true,
})
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => {
    movies.forEach((movie) => {
      const director = movie.Director;
      Director.findOrCreate({
        where: {
          Director: director,
        },
      }).then((data) => {
        movie.directorId = data[0].id;
        Movie.create(movie);
      });
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
