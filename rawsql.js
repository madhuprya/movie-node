const mysql = require('mysql');

const con = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'root',
});


con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  con.query('CREATE DATABASE movies', (error, result) => {
    if (error) throw error;
    console.log('Database created');
  });
});
