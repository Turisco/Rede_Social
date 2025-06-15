const db = require('../db');

exports.getAllGroups = (req, res) => {
  const sql = `
    SELECT g.id, g.nome, g.descricao, g.data_criacao, g.administrador_id, u.nome AS administrador_nome
    FROM grupos g
    LEFT JOIN usuarios u ON g.administrador_id = u.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });

    res.status(200).json(results);
  });
};


exports.entrarNoGrupo = (req, res) => {
  const { usuario_id, grupo_id } = req.body;

  if (!usuario_id || !grupo_id) {
    return res.status(400).json({ mensagem: "Usuário e grupo são obrigatórios." });
  }

  const checkSql = 'SELECT * FROM usuarios_grupos WHERE usuario_id = ? AND grupo_id = ?';
  db.query(checkSql, [usuario_id, grupo_id], (checkErr, checkResult) => {
    if (checkErr) return res.status(500).json({ erro: checkErr.message });

    if (checkResult.length > 0) {
      return res.status(400).json({ mensagem: "Usuário já está no grupo." });
    }

    const insertSql = 'INSERT INTO usuarios_grupos (usuario_id, grupo_id) VALUES (?, ?)';
    db.query(insertSql, [usuario_id, grupo_id], (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });

      res.status(201).json({ mensagem: "Usuário entrou no grupo com sucesso!" });
    });
  });
};

exports.getUsuariosDoGrupo = (req, res) => {
  const grupoId = req.params.grupoId;

  const sql = `
    SELECT u.id, u.nome
    FROM usuarios_grupos ug
    JOIN usuarios u ON ug.usuario_id = u.id
    WHERE ug.grupo_id = ?
  `;

  db.query(sql, [grupoId], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });

    res.status(200).json(results);
  });
};

exports.getGroupsWithUsers = (req, res) => {
  const sql = `
    SELECT g.id AS grupo_id, g.nome AS grupo_nome, g.descricao, g.data_criacao,
           u.id AS usuario_id, u.nome AS usuario_nome
    FROM grupos g
    LEFT JOIN usuarios_grupos ug ON g.id = ug.grupo_id
    LEFT JOIN usuarios u ON ug.usuario_id = u.id
    ORDER BY g.id;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });

    const gruposMap = new Map();

    results.forEach(row => {
      if (!gruposMap.has(row.grupo_id)) {
        gruposMap.set(row.grupo_id, {
          id: row.grupo_id,
          nome: row.grupo_nome,
          descricao: row.descricao,
          data_criacao: row.data_criacao,
          usuarios: [],
        });
      }

      if (row.usuario_id) {
        gruposMap.get(row.grupo_id).usuarios.push({
          id: row.usuario_id,
          nome: row.usuario_nome,
        });
      }
    });

    const grupos = Array.from(gruposMap.values());

    res.status(200).json(grupos);
  });
};

exports.getGruposDoUsuario = (req, res) => {
  const usuarioId = req.params.usuarioId;

  if (!usuarioId) {
    return res.status(400).json({ erro: "ID do usuário é obrigatório." });
  }

  const sql = `
    SELECT g.id, g.nome, g.descricao, g.data_criacao, g.administrador_id
    FROM grupos g
    JOIN usuarios_grupos ug ON g.id = ug.grupo_id
    WHERE ug.usuario_id = ?
  `;

  db.query(sql, [usuarioId], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });

    res.status(200).json(results);
  });
};

