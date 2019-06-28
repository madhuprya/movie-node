const con = require('../utils/database');

const movies = require('../../movies.json');

const directorTable = `CREATE TABLE if NOT EXISTS table_director(
  dirid INT PRIMARY KEY AUTO_INCREMENT,
  dirname VARCHAR(20) 
  )`;

const movieTable = `CREATE TABLE if NOT EXISTS table_movie(
  movid INT PRIMARY KEY AUTO_INCREMENT,
  rank INT ,
  title VARCHAR(49) ,
  description LONGTEXT ,
  runtime INT ,
  genre VARCHAR(9) ,
  rating FLOAT ,
  metascore INT ,
  votes INT ,
  gross_earning_in_mil FLOAT ,
  dirid INT ,
  actor VARCHAR(21) ,
  year INT,
  FOREIGN KEY (dirid) REFERENCES table_director(dirid)
  )`;

function getConnected() {
  return new Promise((resolve, reject) => {
    console.log('connected');
    con.connect((error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

function dropTable(tab) {
  return new Promise((resolve, reject) => {
    console.log('drop movie table');
    con.query(`DROP TABLE if EXISTS ${tab}`, (error, table) => {
      if (error) {
        reject(console.log(error));
      }
      resolve(table);
    });
  });
}

function createDatabase() {
  return new Promise((resolve, reject) => {
    console.log('create db');
    con.query('CREATE DATABASE if NOT EXISTS movie', (error, db) => {
      if (error) {
        reject(error);
      }
      resolve(db);
    });
  });
}

function createTable(table) {
  return new Promise((resolve, reject) => {
    console.log('create movie table');
    con.query(table, (error, tb) => {
      if (error) {
        reject(error);
      }
      resolve(tb);
    });
  });
}

function insertDirectorData(moviesjson) {
  console.log('director insert');
  const directorname = [];
  const promises = moviesjson.map(data => new Promise((resolve, reject) => {
    if (!directorname.includes(data.Director)) {
      directorname.push(data.Director);
      con.query(`INSERT INTO table_director (dirname) VALUES ('${data.Director}') `, (error, tb) => {
        if (error) {
          return reject(error);
        }
        return resolve(tb);
      });
    }
  }));
  return Promise.all(promises);
}

function insertMovieData(moviesjson) {
  console.log('movie insert');
  const promises = moviesjson.map(data => new Promise((resolve, reject) => {
    con.query(`SELECT dirid FROM table_director WHERE dirname = '${data.Director}'`, (error, row) => {
      if (error) {
        throw error;
      } else {
        con.query(`INSERT INTO table_movie (rank, title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, dirid, actor, year) VALUES (${data.Rank}, "${data.Title}", "${data.Description}", ${data.Runtime}, '${data.Genre}', ${data.Rating}, ${data.Metascore}, ${data.Votes}, ${data.Gross_Earning_in_Mil}, ${row[0].dirid}, '${data.Actor}', ${data.Year})`, (e, r) => {
          if (e) {
            console.log(e);
            return reject(e);
          }
          return resolve(r);
        });
      }
    });
  }));
  return Promise.all(promises);
}

getConnected().then(() => dropTable('table_movie'))
  .then(() => dropTable('table_director'))
  .then(() => createDatabase())
  .then(() => createTable(directorTable))
  .then(() => createTable(movieTable))
  .then(() => insertDirectorData(movies))
  .then(() => insertMovieData(movies))
  .catch(err => setImmediate(() => {
    throw err;
  }));
