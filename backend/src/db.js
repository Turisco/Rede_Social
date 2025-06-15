const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'M05011997m#',
    database: 'rede_social'
  });

  db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao MySQL');
  });

  module.exports = db;