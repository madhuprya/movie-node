const con = require('../utils/database');
const logger = require('../utils/logging');

const directorCrud = {
  insertDirector: values => new Promise((resolve, reject) => {
    logger.info('director data inserted');
    con.query('INSERT INTO table_director SET ?', values, (error, row) => {
      if (error) {
        reject(logger.info(error));
      }
      resolve(row);
    });
  }),

  deleteDirector: id => new Promise((resolve, reject) => {
    con.query(`DELETE FROM table_director WHERE dirid = ${id}`, (error, row) => {
      if (error) {
        reject(logger.info(error));
      }
      resolve(row);
    });
  }),

  updateDirector: (values, dirid) => new Promise((resolve, reject) => {
    con.query(`UPDATE table_director SET ? WHERE dirid = ${dirid}`, values, (error, row) => {
      if (error) {
        reject(logger.info(error));
      }
      resolve(row);
    });
  }),

  getDirector: id => new Promise((resolve, reject) => {
    con.query(`SELECT * FROM table_director WHERE dirid = ${id}`, (error, row) => {
      if (error) {
        reject(logger.info(error));
      }
      resolve(row);
    });
  }),

  getAllDirector: () => new Promise((resolve, reject) => {
    con.query('SELECT * FROM table_director', (error, row) => {
      if (error) {
        reject(logger.info(error));
      }
      resolve(row);
    });
  }),
};

module.exports = directorCrud;
