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
        return reject(error);
      }
      return resolve();
    });
  });
}

function dropTable() {
  return new Promise((resolve, reject) => {
    console.log('drop table');
    con.query('DROP TABLE if EXISTS table_movie', (error, table) => {
      if (error) {
        return reject(error);
      }
      return resolve(table);
    });
  });
}

function createDatabase() {
  return new Promise((resolve, reject) => {
    console.log('create db');
    con.query('CREATE DATABASE if NOT EXISTS movie', (error, db) => {
      if (error) {
        return reject(error);
      }
      return resolve(db);
    });
  });
}

function createTable() {
  return new Promise((resolve, reject) => {
    console.log('create table');
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
    director VARCHAR(20) ,
    actor VARCHAR(21) ,
    year INT
    )`;
    con.query(movietable, (error, table) => {
      if (error) {
        return reject(error);
      }
      return resolve(table);
    });
  });
}

function insertJsonData(moviesjson) {
  return new Promise((resolve, reject) => {
    console.log('json insert');
    moviesjson.forEach((data) => {
      con.query('INSERT INTO table_movie SET ?', data, (error, tb) => {
        if (error) {
          return reject(error);
        }
        return resolve(tb);
      });
    });
  });
}
// eslint-disable-next-line max-len
function insertDirector(rank, title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, director, actor, year) {
  // eslint-disable-next-line max-len
  return new Promise((resolve, reject) => {
    console.log('insert');
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
        return reject(error);
      }
      return resolve(row);
    });
  });
}


function deleteDirector(rank) {
  return new Promise((resolve, reject) => {
    console.log('delete');
    con.query(`DELETE FROM table_movie WHERE rank = ${rank}`, (error, row) => {
      if (error) {
        return reject(error);
      }
      return resolve(row);
    });
  });
}

function updateDirector(director, rank) {
  return new Promise((resolve, reject) => {
    console.log('update');
    con.query('UPDATE table_movie SET rating = ?, gross_earning_in_mil = ?, votes = ? WHERE rank = ?', [director, rank], (error, row) => {
      if (error) {
        return reject(error);
      }
      return resolve(row);
    });
  });
}

function getDirector(rank) {
  return new Promise((resolve, reject) => {
    console.log('fetch');
    con.query('SELECT director FROM table_movie WHERE rank = ?', [rank], (error, row) => {
      if (error) {
        return reject(error);
      }
      return resolve(row);
    });
  });
}

function getAllDirector() {
  return new Promise((resolve, reject) => {
    console.log('fetch');
    con.query('SELECT director FROM table_movie', (error, row) => {
      if (error) {
        return reject(error);
      }
      return resolve(row);
    });
  });
}

getConnected().then(() => dropTable()).then(() => {
  createDatabase().then(() => {
    createTable().then(() => {
      insertJsonData(movies).then(() => {
        insertDirector(51, 'Harry Potter', 'Harry Potter is a British-American film series based on the eponymous novels by author J. K. Rowling.', 161, 'Witchy', 8.6, 2, 90612, 12.39, 'cris', 'Daniel', 2002)
          .then(() => insertDirector(52, 'Harry Potter', 'Harry Potter is a British-American film series based on the eponymous novels by author J. K. Rowling. ', 161, 'Witchy', 8.6, 2, 90612, 12.39, 'Nitesh Tiwari', 'Daniel', 2002))
          .then(() => deleteDirector(51)).then(() => updateDirector('Chris Columbus‎', 52))
          .then(() => getDirector(1))
          .then(data => console.log(data))
          .then(() => getAllDirector())
          .then(data => console.log(data));
      });
    });
  });
}).catch(err => setImmediate(() => { throw err; }));

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
