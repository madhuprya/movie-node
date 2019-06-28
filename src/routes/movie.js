
const express = require('express');
const movieCrud = require('../models/movie');

const router = express.Router();

// rest api to get all movie data
router.get('/:id?', (req, res) => {
  if (req.params.id) {
    movieCrud.getMovie(req.params.id, (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    movieCrud.getAllMovie((err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

// rest api to create a new movie record into mysql database
router.post('/', (req, res) => {
  // console.log(req.body)
  movieCrud.insertMovie(req.body, (err, results) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ id: results.insertId, values: req.body });
    }
  });
});

// rest api to delete record from mysql database
router.delete('/:id', (req, res) => {
  movieCrud.deleteMovie(req.params.id, (err, count) => {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// rest api to update record into mysql database

router.put('/:id', (req, res) => {
  movieCrud.updateMovie(req.body, req.params.id, (err, rows) => {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
