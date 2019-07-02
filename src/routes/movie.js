const express = require('express');

const movieCrud = require('../models').Movie;
const Director = require('../models').Director;

const logger = require('../utils/logging');
const errorHandler = require('../middleware/errorhandling');

const router = express.Router();

const joi = require('../middleware/joi');


// rest api to get movie by id
router.get('/:id', (req, res, next) => {
  joi.Joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      movieCrud.findByPk(value.id)
        .then((resolve) => {
          res.json(resolve);
        })
        .catch((reject) => {
          next(reject);
        });
    } else {
      res.json(err.details[0].message);
      logger.info(err.details[0].message);
    }
  });
});

// rest api to get all movie data

router.get('/', async (req, res, next) => {
  try {
    const resp = await movieCrud.findAll({ include: [Director] });
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

// rest api to create a new movie record into mysql database
router.post('/', (req, res, next) => {
  // console.log(req.body)
  joi.Joi.validate(req.body, joi.mschema, (err, value) => {
    if (!err) {
      movieCrud.create(value)
        .then((resolve) => {
          res.json(resolve);
        })
        .catch((reject) => {
          next(reject);
        });
    } else {
      res.json(err.details[0].message);
      logger.info(err.details[0].message);
    }
  });
});

// rest api to delete record from mysql database
router.delete('/:id', (req, res, next) => {
  joi.Joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      movieCrud.destroy({ where: { id: value.id } })
        .then((resolve) => {
          res.json(resolve);
        })
        .catch((reject) => {
          next(reject);
        });
    } else {
      res.json(err.details[0].message);
      logger.info(err.details[0].message);
    }
  });
});

// rest api to update record into mysql database

router.put('/:id', (req, res, next) => {
  joi.Joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      joi.Joi.validate(req.body, joi.mschema, (error, data) => {
        if (!error) {
          movieCrud.update(data, { where: { id: value.id } })
            .then((resolve) => {
              res.json(resolve);
            })
            .catch((reject) => {
              next(reject);
            });
        } else {
          res.json(err.details[0].message);
          logger.info(err.details[0].message);
        }
      });
    } else {
      res.send(err.details[0].message);
      logger.info(err.details[0].message);
    }
  });
});

router.use(errorHandler.errorHandler);
module.exports = router;
