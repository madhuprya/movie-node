const con = require('../../database');

const directorCrud = {
  insertDirector: (values, cb) => {
    // eslint-disable-next-line max-len
    console.log('insert director');
    return new Promise((resolve, reject) => {
      con.query('INSERT INTO table_director SET ?', values, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row, cb);
      });
    });
  },

  deleteDirector: (id, cb) => {
    console.log('delete director');
    return new Promise((resolve, reject) => {
      con.query(`DELETE FROM table_director WHERE dirid = ${id}`, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row, cb);
      });
    });
  },

  updateDirector: (values, dirid, cb) => {
    console.log('update director');
    return new Promise((resolve, reject) => {
      con.query(`UPDATE table_director SET ? WHERE dirid = ${dirid}`, values, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row, cb);
      });
    });
  },

  getDirector: (id) => {
    console.log('fetch director');
    return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM table_director WHERE dirid = ${id}`, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row);
      });
    });
  },

  getAllDirector: (cb) => {
    console.log('fetch all directors');
    return new Promise((resolve, reject) => {
      con.query('SELECT * FROM table_director', (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row, cb);
      });
    });
  },
};

module.exports = directorCrud;
