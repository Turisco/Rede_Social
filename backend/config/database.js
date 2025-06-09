const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rede_social'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

module.exports = db;
