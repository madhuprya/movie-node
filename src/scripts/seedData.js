

const movies = require('../../movies');
const db = require('../models');
const Director = require('../models').Director;

const Movie = require('../models').Movie;
const logger = require('../utils/logging');


// Director.hasMany(Movie);
// Movie.belongsTo(Director, { foreignKey: 'directorId'  });

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   }).catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });


db.sequelize.sync({
  logging: console.log,
  force: true,
})
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => {
    movies.forEach((movie) => {
      // console.log(movie)
      const director = movie.Director;
      Director.findOrCreate({
        where: {
          Director: director,
        },
      }).then((data) => {
        movie.DirectorId = data[0].id;
        delete movie.Director;
        Movie.create(movie);
        // console.log(movie)
      });
    });
  })
  .catch((err, res) => {
    logger.info("db not connected");
  });
