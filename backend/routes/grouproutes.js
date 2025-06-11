const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Criar grupo
router.post('/', groupController.createGroup);

// Listar todos os grupos
router.get('/', groupController.getAllGroups);

// Buscar grupo por ID
router.get('/:id', groupController.getGroupById);

// Atualizar grupo
router.put('/:id', groupController.updateGroup);

// Deletar grupo
router.delete('/:id', groupController.deleteGroup);

module.exports = router;
