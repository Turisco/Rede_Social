const db = require("../db");

exports.getMensagensDoGrupo = (req, res) => {
  const grupoId = req.params.grupoId;

  if (!grupoId) {
    return res.status(400).json({ erro: "ID do grupo é obrigatório." });
  }

  const sql = `
    SELECT usuario_nome AS nome, mensagem, DATE_FORMAT(hora, '%H:%i') AS hora
    FROM mensagens
    WHERE grupo_id = ?
    ORDER BY hora ASC
  `;

  db.query(sql, [grupoId], (err, results) => {
    if (err) {
      console.error("Erro ao buscar mensagens:", err);
      return res.status(500).json({ erro: "Erro ao buscar mensagens." });
    }

    res.status(200).json(results);
  });
};

exports.enviarMensagem = (req, res) => {
  console.log('Corpo recebido:', req.body);

  const { groupId, nome, mensagem } = req.body;

  if (!groupId || !nome || !mensagem) {
    return res.status(400).json({ erro: "Dados incompletos." });
  }

  const sql = `
    INSERT INTO mensagens (grupo_id, usuario_nome, mensagem, hora)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(sql, [groupId, nome, mensagem], (err, result) => {
    if (err) {
      console.error("Erro ao salvar mensagem:", err);
      return res.status(500).json({ erro: "Erro ao salvar mensagem." });
    }

    res.status(201).json({ mensagem: "Mensagem salva com sucesso." });
  });
};
