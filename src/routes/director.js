
const express = require('express');

const Joi = require('@hapi/joi');

const router = express.Router();
const directorCrud = require('../models/director');


const schema = Joi.object().keys({
  id: Joi.number().min(0).max(50).required(),
});
const pschema = Joi.object().keys({
  dirname: Joi.string().min(3).max(30)
    .required(),
});
// rest api to get director by id

router.get('/:id', (req, res) => {
  Joi.validate(req.params, schema, (err, value) => {
    if (!err) {
      directorCrud.getDirector(value.id)
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

// rest api to get all director data

router.get('/', (req, res) => {
  directorCrud.getAllDirector()
    .then((resolve) => {
      res.json(resolve);
    })
    .catch((reject) => {
      res.json(reject);
    });
});

// rest api to create a new director record into mysql database

router.post('/', (req, res) => {
  Joi.validate(req.body, pschema, (err, value) => {
    if (!err) {
      directorCrud.insertDirector(value)
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
      directorCrud.deleteDirector(value.id)
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
          directorCrud.updateDirector(data, value.id)
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
