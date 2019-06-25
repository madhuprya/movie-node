const mysql = require('mysql');
const movies = require('./movies.json');

console.log(movies);

const con = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'root',
  database: 'movie',
});


con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  con.query('CREATE DATABASE if NOT EXISTS movie', (error, result) => {
    if (error) throw error;
    console.log('Database created');
  });
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
  con.query(movietable, (error, result)=> {
    if (error) throw error;
    console.log('Table created');
  });
});

movies.forEach((data) => {
  con.query('INSERT INTO table_movie SET ?', data, (error, fields)=> {
    if (error) throw error;
  });
});
