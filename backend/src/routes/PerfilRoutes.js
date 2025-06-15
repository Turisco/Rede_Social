const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/PerfilControllers');

router.get('/:id', perfilController.getPerfilUsuario);

router.get('/grupos/:usuarioId', perfilController.getGruposDoUsuario);

module.exports = router;
