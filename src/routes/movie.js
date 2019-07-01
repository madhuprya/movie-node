const express = require('express');

const movieCrud = require('../models/Movie');

const router = express.Router();

const joi = require('../middleware/joi');
// middleware
router.get('/error', (req, res, next) => next(new Error('This is an error and it should be logged to the console')));


// rest api to get movie by id
router.get('/:id', (req, res) => {
  joi.Joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      movieCrud.findByPk(value.id)
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
  movieCrud.findAll()
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
  joi.Joi.validate(req.body, joi.mschema, (err, value) => {
    if (!err) {
      movieCrud.create(value)
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
  joi.Joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      movieCrud.destroy({ where: { id: value.id } })
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
  joi.Joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      joi.Joi.validate(req.body, joi.mschema, (error, data) => {
        if (!error) {
          movieCrud.update(data, { where: { id: value.id } })
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
