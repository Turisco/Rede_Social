const express = require('express');
const router = express.Router();

const chatController = require('../controllers/ChatGroupControllers');

router.get('/mensagens/:grupoId', chatController.getMensagensDoGrupo);
router.post('/mensagens', chatController.enviarMensagem);

module.exports = router;
