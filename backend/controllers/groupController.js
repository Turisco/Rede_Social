const db = require('../database');

exports.createGroup = (req, res) => {
  const { name, description } = req.body;
  db.query('INSERT INTO groups (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, name, description });
  });
};

exports.getAllGroups = (req, res) => {
  db.query('SELECT * FROM groups', (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};

exports.getGroupById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM groups WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send("Grupo não encontrado");
    res.status(200).json(results[0]);
  });
};

exports.updateGroup = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.query('UPDATE groups SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("Grupo atualizado com sucesso");
  });
};

exports.deleteGroup = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM groups WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("Grupo deletado com sucesso");
  });
};
