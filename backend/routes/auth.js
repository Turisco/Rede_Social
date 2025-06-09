const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', (req, res) => {
  const { username, email, password, birthdate, profile_picture } = req.body;

  User.create({ username, email, password, birthdate, profile_picture }, (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao cadastrar usuário.');
    }
    res.status(201).send('Usuário cadastrado com sucesso!');
  });
});

module.exports = router;
