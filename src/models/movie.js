const con = require('../../database');


const movieCrud = {

  insertMovie(values, cb) {
    console.log('insert movie');
    return new Promise((resolve, reject) => {
      const query = con.query('INSERT INTO table_movie SET ?', values, cb, (error, row) => {
        if (error) {
          reject(error);
        }
        console.log(query.sql);
        resolve(row);
      });
    });
  },


  getMovie(id, cb) {
    console.log('fetch movie');
    return new Promise((resolve, reject) => {
      con.query('SELECT * FROM table_movie WHERE movid = ?', [id], cb, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row);
      });
    });
  },

  getAllMovie(cb) {
    console.log('fetch all movies');
    return new Promise((resolve, reject) => {
      con.query('SELECT * FROM table_movie', cb, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row);
      });
    });
  },

  deleteMovie(id, cb) {
    console.log(`delete movies${id}`);
    return new Promise((resolve, reject) => {
      con.query(`DELETE FROM table_movie WHERE movid = ${id}`, cb, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row);
      });
    });
  },

  updateMovie(values, id, cb) {
    console.log(values);
    console.log('update movie');
    return new Promise((resolve, reject) => {
      const query = con.query(`UPDATE table_movie SET ? WHERE movid = ${id}`, values, cb, (error, row) => {
        if (error) {
          reject(error);
        }
        console.log(query.sql);
        resolve(row);
      });
    });
  },
};

module.exports = movieCrud;
