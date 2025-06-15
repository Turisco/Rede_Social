const express = require('express');
const router = express.Router();
const joinGroupControllers = require('../controllers/JoinGroupControllers');

router.get('/getGroups', joinGroupControllers.getAllGroups);
router.post('/joinGroup', joinGroupControllers.entrarNoGrupo);

router.get('/usuarios/:grupoId', joinGroupControllers.getUsuariosDoGrupo);

router.get('/grupos/usuario/:usuarioId', joinGroupControllers.getGruposDoUsuario);

module.exports = router;
