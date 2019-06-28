const con = require('../utils/database');
const logger = require('../utils/logging');


const movieCrud = {

  insertMovie(values, cb) {
    return new Promise((resolve, reject) => {
      con.query('INSERT INTO table_movie SET ?', values, (error, row) => {
        if (error) {
          reject(error);
        }
        logger.info('movie inserted');
        resolve(row, cb);
      });
    });
  },


  getMovie(id, cb) {
    return new Promise((resolve, reject) => {
      con.query('SELECT * FROM table_movie WHERE movid = ?', [id], (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row, cb);
      });
    });
  },

  getAllMovie(cb) {
    return new Promise((resolve, reject) => {
      con.query('SELECT * FROM table_movie', (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row, cb);
      });
    });
  },

  deleteMovie(id, cb) {
    return new Promise((resolve, reject) => {
      con.query(`DELETE FROM table_movie WHERE movid = ${id}`, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row, cb);
      });
    });
  },

  updateMovie(values, id, cb) {
    return new Promise((resolve, reject) => {
      con.query(`UPDATE table_movie SET ? WHERE movid = ${id}`, values, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row, cb);
      });
    });
  },
};

module.exports = movieCrud;
