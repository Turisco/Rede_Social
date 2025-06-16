const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/PerfilControllers');

router.get('/:id', perfilController.getPerfilUsuario);

router.get('/grupos/:usuarioId', perfilController.getGruposDoUsuario);

router.post('/foto/:id', perfilController.atualizarFotoPerfil);

module.exports = router;
