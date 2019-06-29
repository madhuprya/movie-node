const express = require('express');

const movieCrud = require('../models/movie');

const router = express.Router();

const joi = require('../middleware/joi');
// middleware
router.get('/error', (req, res, next) => next(new Error('This is an error and it should be logged to the console')));


// rest api to get movie by id
router.get('/:id', (req, res, next) => {
  joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      movieCrud.getMovie(value.id)
        .then((resolve) => {
          res.json(resolve);
        })
        .catch((reject) => {
          res.json(reject);
        });
    } else {
      res.json(err);
    }
  });
});

// rest api to get all movie data

router.get('/', (req, res) => {
  movieCrud.getAllMovie()
    .then((resolve) => {
      res.json(resolve);
    })
    .catch((reject) => {
      res.json(reject);
    });
});

// rest api to create a new movie record into mysql database
router.post('/', (req, res) => {
  // console.log(req.body)
  joi.validate(req.body, joi.mschema, (err, value) => {
    if (!err) {
      movieCrud.insertMovie(value)
        .then((resolve) => {
          res.json(resolve);
        })
        .catch((reject) => {
          res.json(reject);
        });
    } else {
      res.json(err);
    }
  });
});

// rest api to delete record from mysql database
router.delete('/:id', (req, res) => {
  joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      movieCrud.deleteMovie(value.id)
        .then((resolve) => {
          res.json(resolve);
        })
        .catch((reject) => {
          res.json(reject);
        });
    } else {
      res.json(err);
    }
  });
});

// rest api to update record into mysql database

router.put('/:id', (req, res) => {
  joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      joi.validate(req.body, joi.mschema, (error, data) => {
        if (!error) {
          movieCrud.updateMovie(data, value.id)
            .then((resolve) => {
              res.json(resolve);
            })
            .catch((reject) => {
              res.json(reject);
            });
        } else {
          res.json(err);
        }
      });
    } else {
      res.json(err);
    }
  });
});

module.exports = router;
