
const express = require('express');

const router = express.Router();
const directorCrud = require('../models').Director;
const joi = require('../middleware/joi');

const logger = require('../utils/logging');
const errorHandler = require('../middleware/errorhandling');

// rest api to get director by id

router.get('/:id', (req, res, next) => {
  joi.Joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      directorCrud.findByPk(value.id)
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

// rest api to get all director data

router.get('/', (req, res, next) => {
  directorCrud.findAll()
    .then((resolve) => {
      res.json(resolve);
    })
    .catch((reject) => {
      res.json(reject);
      next(reject);
    });
});

// rest api to create a new director record into mysql database

router.post('/', (req, res, next) => {
  joi.Joi.validate(req.body, joi.dschema, (err, value) => {
    if (!err) {
      directorCrud.create(value)
        .then((resolve) => {
          res.json(resolve);
        })
        .catch((reject) => {
          res.json(reject);
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
      // logger.info(req.header('value.id'));
      directorCrud.destroy({ where: { id: value.id } })
        .then((resolve) => {
          res.json(resolve);
        })
        .catch(() => {
          next();
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
      joi.Joi.validate(req.body, joi.dschema, (error, data) => {
        if (!error) {
          directorCrud.update(data, { where: { id: value.id } })
            .then((resolve) => {
              res.json(resolve);
            })
            .catch(() => {
              next();
            });
        } else {
          res.json(err.details[0].message);
          logger.info(err.details[0].message);
        }
      });
    } else {
      res.json(err.details[0].message);
      logger.info(err.details[0].message);
    }
  });
});
router.use(errorHandler.errorHandler);
module.exports = router;
