const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Gauti visus vartotojus (tik admin)
router.get('/', authMiddleware, userController.getAllUsers);

// Pakeisti vartotojo rolę (tik admin)
router.put('/role/:id', authMiddleware, userController.updateUserRole);

// Ištrinti vartotoją (tik admin)
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
