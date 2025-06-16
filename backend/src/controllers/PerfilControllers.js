const db = require('../db');
const fs = require('fs');

exports.getPerfilUsuario = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, nome, email, data_nascimento, foto_perfil
    FROM usuarios
    WHERE id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  });
};

exports.getGruposDoUsuario = (req, res) => {
  const usuarioId = req.params.usuarioId;

  const sql = `
    SELECT DISTINCT g.id, g.nome, g.descricao, g.data_criacao, g.administrador_id, u.nome AS nome_administrador
    FROM grupos g
    LEFT JOIN usuarios_grupos ug ON g.id = ug.grupo_id
    JOIN usuarios u ON g.administrador_id = u.id
    WHERE ug.usuario_id = ? OR g.administrador_id = ?
  `;

  db.query(sql, [usuarioId, usuarioId], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });

    res.status(200).json(results);
  });
};

exports.atualizarFotoPerfil = (req, res) => {
  const { id } = req.params;
  const { fotoPerfil } = req.body;

  if (!fotoPerfil) {
    return res.status(400).json({ erro: "Foto de perfil não enviada." });
  }

  const sql = `
    UPDATE usuarios
    SET foto_perfil = ?
    WHERE id = ?
  `;

  db.query(sql, [fotoPerfil, id], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (result.affectedRows > 0) {
      res.status(200).json({ mensagem: "Foto de perfil atualizada com sucesso." });
    } else {
      res.status(404).json({ erro: "Usuário não encontrado." });
    }
  });
};