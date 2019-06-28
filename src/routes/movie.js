const express = require('express');
const Joi = require('@hapi/joi');

const movieCrud = require('../models/movie');

const router = express.Router();


const schema = Joi.object().keys({
  id: Joi.number().min(0).max(50).required(),
});
const pschema = Joi.object().keys({
  rank: Joi.number().min(0).max(100).required(),
  title: Joi.string().min(3).max(30)
    .required(),
  description: Joi.string().min(3).max(1000)
    .required(),

  runtime: Joi.number().min(0).max(10000).required(),
  genre: Joi.string().min(3).max(30)
    .required(),

  rating: Joi.number().min(0).max(100).required(),
  metascore: Joi.number().min(0).max(100000).required(),
  votes: Joi.number().min(0).max(10000000).required(),
  gross_earning_in_mil: Joi.number().min(0).max(10000).required(),
  dirid: Joi.number().min(0).max(100).required(),
  actor: Joi.string().min(3).max(30)
    .required(),
  year: Joi.number().min(1000).max(3000).required(),
});

// rest api to get movie by id
router.get('/:id', (req, res) => {
  Joi.validate(req.params, schema, (err, value) => {
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
  Joi.validate(req.body, pschema, (err, value) => {
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
  Joi.validate(req.params, schema, (err, value) => {
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
  Joi.validate(req.params, schema, (err, value) => {
    if (!err) {
      Joi.validate(req.body, pschema, (error, data) => {
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
