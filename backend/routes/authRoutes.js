const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Naujo naudotojo rgistracija
router.post('/register', authController.register);

module.exports = router;
