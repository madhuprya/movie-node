const con = require('../utils/database');
const logger = require('../utils/logging');

const directorCrud = {
  insertDirector: (values, cb) => new Promise((resolve, reject) => {
    logger.info('director data inserted');
    con.query('INSERT INTO table_director SET ?', values, (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row, cb);
    });
  }),

  deleteDirector: (id, cb) => new Promise((resolve, reject) => {
    con.query(`DELETE FROM table_director WHERE dirid = ${id}`, (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row, cb);
    });
  }),

  updateDirector: (values, dirid, cb) => new Promise((resolve, reject) => {
    con.query(`UPDATE table_director SET ? WHERE dirid = ${dirid}`, values, (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row, cb);
    });
  }),

  getDirector: id => new Promise((resolve, reject) => {
    con.query(`SELECT * FROM table_director WHERE dirid = ${id}`, (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
  }),

  getAllDirector: cb => new Promise((resolve, reject) => {
    con.query('SELECT * FROM table_director', (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row, cb);
    });
  }),
};

module.exports = directorCrud;
