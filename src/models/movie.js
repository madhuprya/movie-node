const con = require('../utils/database');
const logger = require('../utils/logging');


const movieCrud = {

  insertMovie(values) {
    return new Promise((resolve, reject) => {
      con.query('INSERT INTO table_movie SET ?', values, (error, row) => {
        if (error) {
          reject(logger.info(error));
        }
        logger.info('movie inserted');
        resolve(row);
      });
    });
  },


  getMovie(id) {
    return new Promise((resolve, reject) => {
      con.query('SELECT * FROM table_movie WHERE movid = ?', [id], (error, row) => {
        if (error) {
          logger.info('movie notinserted');
          reject(logger.info(error));
        }
        resolve(row);
      });
    });
  },

  getAllMovie() {
    return new Promise((resolve, reject) => {
      con.query('SELECT * FROM table_movie', (error, row) => {
        if (error) {
          reject(logger.info(error));
        }
        resolve(row);
      });
    });
  },

  deleteMovie(id) {
    return new Promise((resolve, reject) => {
      con.query(`DELETE FROM table_movie WHERE movid = ${id}`, (error, row) => {
        if (error) {
          reject(logger.info(error));
        }
        resolve(row);
      });
    });
  },

  updateMovie(values, id) {
    return new Promise((resolve, reject) => {
      con.query(`UPDATE table_movie SET ? WHERE movid = ${id}`, values, (error, row) => {
        if (error) {
          reject(logger.info(error));
        }
        resolve(row);
      });
    });
  },
};

module.exports = movieCrud;
