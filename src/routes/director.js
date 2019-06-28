
const express = require('express');

const router = express.Router();
const directorCrud = require('../models/director');

// rest api to get all director data

router.get('/:id?', (req, res) => {
  if (req.params.id) {
    directorCrud.getDirector(req.params.id, (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    directorCrud.getAllDirector((err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});


// rest api to create a new director record into mysql database

router.post('/', (req, res) => {
  directorCrud.insertDirector(req.body, (err, results) => {
    console.log(req.body);
    if (err) {
      res.json(err);
    } else {
      res.json({ id: results.insertId, values: req.body });
    }
  });
});

// rest api to delete record from mysql database

router.delete('/:id', (req, res) => {
  directorCrud.deleteDirector(req.params.id, (err, count) => {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// rest api to update record into mysql database

router.put('/:id', (req, res) => {
  directorCrud.updateDirector(req.body, req.params.id, (err, rows) => {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
