const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());

// coneção Banco de Dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'M05011997m#',
  database: 'rede_social'
});

// Cadastro
app.post('/cadastro', (req, res) => {
  const { nome, email, senha, dataNascimento } = req.body;
  const sql = 'INSERT INTO usuarios (nome, email, senha, data_nascimento) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, email, senha, dataNascimento], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Usuário cadastrado com sucesso!');
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.query(sql, [email, senha], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) {
      res.status(200).json({ mensagem: 'Login OK', usuario: result[0] });
    } else {
      res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando');
});
