const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/user', UserController.showRegisterPage);
router.post('/api/users/register', UserController.register);

module.exports = router;
