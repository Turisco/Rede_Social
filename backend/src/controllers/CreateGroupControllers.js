const db = require('../db');

exports.createGroup = (req, res) => {
  const { nome, descricao, administrador_id } = req.body;

  const checkSql = 'SELECT * FROM grupos WHERE administrador_id = ?';
  db.query(checkSql, [administrador_id], (checkErr, checkResult) => {
    if (checkErr) return res.status(500).json({ erro: checkErr.message });

    if (checkResult.length > 0) {
      return res.status(400).json({ mensagem: "Usuário já possui um grupo." });
    }

    const insertSql = 'INSERT INTO grupos (nome, descricao, administrador_id) VALUES (?, ?, ?)';
    db.query(insertSql, [nome, descricao, administrador_id], (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });

      return res.status(201).json({ mensagem: 'Grupo criado com sucesso', grupoId: result.insertId });
    });
  });
};
