const db = require('../db');

exports.cadastrarUsuario = (req, res) => {
  const { nome, email, senha, dataNascimento } = req.body;
  const sql = 'INSERT INTO usuarios (nome, email, senha, data_nascimento) VALUES (?, ?, ?, ?)';

  db.query(sql, [nome, email, senha, dataNascimento], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Usuário cadastrado com sucesso!');
  });
};

exports.loginUsuario = (req, res) => {
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
};
