
const express = require('express');

const router = express.Router();
const directorCrud = require('../models/Director');
const joi = require('../middleware/joi');


// middleware
router.get('/error', (req, res, next) => next(new Error('This is an error and it should be logged to the console')));
// const requireJsonContent = () => (req, res, next) => {
//   if (req.headers['content-type'] !== 'application/json') {
//     res.status(400).send('Server requires application/json');
//   } else {
//     next();
//   }
// };
// rest api to get director by id

router.get('/:id', (req, res, next) => {
  joi.Joi.validate(req.params, joi.schema, (err, value) => {
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
  joi.Joi.validate(req.body, joi.dschema, (err, value) => {
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
  joi.Joi.validate(req.params, joi.schema, (err, value) => {
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

router.put('/:id', (req, res, next) => {
  joi.Joi.validate(req.params, joi.schema, (err, value) => {
    if (!err) {
      joi.Joi.validate(req.body, joi.dschema, (error, data) => {
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
