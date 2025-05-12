// carRoutes.js - API marsrutai, kurie tvarko uzklausas, susijusias su automobiliais/cars
const express = require('express');
const carController = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');
// Nurodom kad naudosim Express router'i kuris nukreips API requestus i atitinkama controller'i
const router = express.Router();

router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.post('/', authMiddleware, carController.createCar);
router.patch('/:id', authMiddleware, carController.updateCar);
router.delete('/:id', authMiddleware, carController.deleteCar);

module.exports = router;
