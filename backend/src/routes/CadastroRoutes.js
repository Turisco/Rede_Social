const express = require('express');
const router = express.Router();
const cadastroControllers = require('../controllers/CadastroControllers');

router.post('/', cadastroControllers.cadastrarUsuario);

router.post('/login', cadastroControllers.loginUsuario);

module.exports = router;
