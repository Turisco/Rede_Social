const express = require('express');
const router = express.Router();
const createGroupControllers = require('../controllers/CreateGroupControllers');

router.post('/', createGroupControllers.createGroup);

module.exports = router;
