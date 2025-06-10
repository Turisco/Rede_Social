const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authenticateToken = require('../middlewares/auth');

// Rotas protegidas por autenticação
router.post('/groups', authenticateToken, groupController.createGroup);
router.get('/groups', groupController.listGroups);
router.post('/groups/:id/join', authenticateToken, groupController.joinGroup);
router.delete('/groups/:id/leave', authenticateToken, groupController.leaveGroup);
router.get('/groups/:id/members', groupController.getGroupMembers);
router.delete('/groups/:id', authenticateToken, groupController.deleteGroup);
router.post('/groups/:id/remove-member', authenticateToken, groupController.removeMember);

module.exports = router;
