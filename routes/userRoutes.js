const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Routes publiques
router.post('/register', userController.register);
router.post('/login', userController.login);

// Routes protégées
router.get('/profile', authMiddleware, userController.getProfile);
router.post('/activate-account', authMiddleware, userController.activateAccount);
router.post('/request-withdrawal', authMiddleware, userController.requestWithdrawal);

// Routes administrateur (optionnel)
router.get('/admin/users', authMiddleware, userController.adminGetUsers);

module.exports = router;
