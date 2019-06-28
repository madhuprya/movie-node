const mysql = require('mysql');

const con = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'root',
  database: 'movie',
});

module.exports = con;
