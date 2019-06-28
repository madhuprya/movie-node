const con = require('../../database');

const directorCrud = {
  insertDirector: (values, cb) => {
    // eslint-disable-next-line max-len
    console.log('insert director');
    return new Promise((resolve, reject) => {
      con.query('INSERT INTO table_director SET ?', values, cb, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row);
      });
    });
  },

  deleteDirector: (id, cb) => {
    console.log('delete director');
    return new Promise((resolve, reject) => {
      con.query(`DELETE FROM table_director WHERE dirid = ${id}`, cb, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row);
      });
    });
  },

  updateDirector: (values, dirid, cb) => {
    console.log('update director');
    return new Promise((resolve, reject) => {
      con.query(`UPDATE table_director SET ? WHERE dirid = ${dirid}`, values, cb, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row);
      });
    });
  },

  getDirector: (id, cb) => {
    console.log('fetch director');
    return new Promise((resolve, reject) => {
      con.query('SELECT * FROM table_director WHERE dirid = ?', [id], cb, (error, row) => {
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
      con.query('SELECT * FROM table_director', cb, (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row);
      });
    });
  },
};

module.exports = directorCrud;
