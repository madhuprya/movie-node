const mysql = require('mysql');
const movies = require('./movies.json');

// console.log(movies);
const con = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'root',
  database: 'movie',
});
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

function dropMovieTable() {
  return new Promise((resolve, reject) => {
    console.log('drop movie table');
    con.query('DROP TABLE if EXISTS table_movie', (error, table) => {
      if (error) {
        reject(error);
      }
      resolve(table);
    });
  });
}

function dropDirectorTable() {
  return new Promise((resolve, reject) => {
    console.log('drop director table');
    con.query('DROP TABLE if EXISTS table_director', (error, table) => {
      if (error) {
        reject(error);
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


function createDirectorTable() {
  return new Promise((resolve, reject) => {
    console.log('create director table');
    const directortable = `CREATE TABLE if NOT EXISTS table_director(
      director INT PRIMARY KEY AUTO_INCREMENT,
      directorname VARCHAR(20) 
      )`;
    con.query(directortable, (error, table) => {
      if (error) {
        reject(error);
      }
      resolve(table);
    });
  });
}

function createMovieTable() {
  return new Promise((resolve, reject) => {
    console.log('create movie table');
    const movietable = `CREATE TABLE if NOT EXISTS table_movie(
    rank INT PRIMARY KEY,
    title VARCHAR(49) ,
    description VARCHAR(246) ,
    runtime INT ,
    genre VARCHAR(9) ,
    rating FLOAT ,
    metascore INT ,
    votes INT ,
    gross_earning_in_mil FLOAT ,
    director VARCHAR(21) ,
    actor VARCHAR(21) ,
    year INT
    )`;
    con.query(movietable, (error, table) => {
      if (error) {
        reject(error);
      }
      resolve(table);
    });
  });
}


function insertDirectorData(moviesjson) {
  return new Promise((resolve, reject) => {
    console.log('director insert');
    const directorname = [];
    moviesjson.forEach((data) => {
      if (!directorname.includes(data.Director)) {
        directorname.push(data.Director);
        con.query(`INSERT INTO table_director (directorname) VALUES ('${data.Director}') `, (error, tb) => {
          if (error) {
            reject(error);
          }
          resolve(tb);
        });
      }
    });
  });
}

function insertMovieData(moviesjson) {
  return new Promise((resolve, reject) => {
    console.log('movie insert');
    moviesjson.forEach((data) => {
      const name = data.Director;
      con.query('INSERT INTO table_movie SET ?', data);
      con.query('UPDATE table_movie as m SET m.director = ( SELECT d.director FROM table_director as d WHERE d.directorname = ? ) WHERE m.rank= ?', [name, data.Rank], (error, row) => {
        if (error) {
          reject(error);
        }
        resolve(row);
      });
    });
  });
}

/** *************CRUD-DIRECTOR************************ */

function insertDirector(name) {
  // eslint-disable-next-line max-len
  return new Promise((resolve, reject) => {
    console.log('insert director');
    con.query(`INSERT INTO table_director (directorname) VALUES ('${name}')`, (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
  });
}

function deleteDirector(id) {
  return new Promise((resolve, reject) => {
    console.log('delete director');
    con.query(`DELETE FROM table_director WHERE director = ${id}`, (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
  });
}

function updateDirector(director, dirid) {
  return new Promise((resolve, reject) => {
    console.log('update director');
    con.query('UPDATE table_director SET directorname = ? WHERE director = ?', [director, dirid], (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
  });
}

function getDirector(id) {
  return new Promise((resolve, reject) => {
    console.log('fetch director');
    con.query('SELECT directorname FROM table_director WHERE director = ?', [id], (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
  });
}

function getAllDirector() {
  return new Promise((resolve, reject) => {
    console.log('fetch all directors');
    con.query('SELECT directorname FROM table_director', (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
  });
}

/** ****************************CRUD MOVIE*******************8 */
// eslint-disable-next-line max-len
function insertMovie(rank, title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, director, actor, year) {
  // eslint-disable-next-line max-len
  return new Promise((resolve, reject) => {
    console.log('insert movie');
    const data = {
      rank,
      title,
      description,
      runtime,
      genre,
      rating,
      metascore,
      votes,
      gross_earning_in_mil,
      director,
      actor,
      year,
    };
    con.query('INSERT INTO table_movie SET ?', data, (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
  });
}


function getMovie(rank) {
  return new Promise((resolve, reject) => {
    console.log('fetch movie');
    con.query('SELECT title FROM table_movie WHERE rank = ?', [rank], (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
  });
}

function getAllMovie() {
  return new Promise((resolve, reject) => {
    console.log('fetch all movies');
    con.query('SELECT title FROM table_movie', (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
  });
}

function deleteMovie(rank) {
  return new Promise((resolve, reject) => {
    console.log('delete movies');
    con.query(`DELETE FROM table_movie WHERE rank = ${rank}`, (error, row) => {
      if (error) {
        return reject(error);
      }
      return resolve(row);
    });
  });
}


function updateMovie(rating, gross_earning_in_mil, votes, rank) {
  return new Promise((resolve, reject) => {
    console.log('update movie');
    con.query('UPDATE table_movie SET rating = ?, gross_earning_in_mil = ?, votes = ? WHERE rank = ?', [rating, gross_earning_in_mil, votes, rank], (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
  });
}


// eslint-disable-next-line max-len
getConnected().then(() => dropMovieTable())
  .then(() => dropDirectorTable())
  .then(() => createDatabase())
  .then(() => createDirectorTable())
  .then(() => createMovieTable())
  .then(() => insertDirectorData(movies))
  .then(() => insertMovieData(movies))
  .then(() => {
    insertDirector('madhu');
    insertDirector('madhupriya');
    insertMovie(51, 'Harry Potter', 'Harry Potter is a British-American film series based on the eponymous novels by author J. K. Rowling.', 161, 'Witchy', 8.6, 2, 90612, 12.39, '5', 'Daniel', 2002);
    deleteDirector(1);
    deleteMovie(1);
    updateMovie(0, 0, 0, 52);
    updateDirector('madhupriya', 1);
    getMovie(2).then(data => console.log(data));
    getDirector(2).then(data => console.log(data));
    getAllMovie().then(data => console.log(data));
    getAllDirector().then(data => console.log(data));
  })
  .catch(err => setImmediate(() => { throw err; }));

// // eslint-disable-next-line max-len
// async function crudSql() {
//   await dropTable();
//   await createDatabase();
//   await createTable();
//   await insertJsonData(movies);
//   await insertRow(51, 'Dangal', 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.', 161, 'Action', 8.6, 2, 90612, 12.39, 'Nitesh Tiwari', 'Aamir Khan', 2002);
//   await insertRow(52, 'Dangal', 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.', 161, 'Action', 8.6, 2, 90612, 12.39, 'Nitesh Tiwari', 'Aamir Khan', 2002);
//   await deleteRow(52);
//   await updateMovie(12, 0, 111, 51);
// }
// crudSql();
