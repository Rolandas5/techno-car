const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // importuojame autentifikacijos middleware

// Naujo naudotojo rgistracija
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', authMiddleware, authController.getCurrentUser); // gauname prisijungusio vartotojo duomenis

module.exports = router;
