// carRoutes.js - API marsrutai, kurie tvarko uzklausas, susijusias su automobiliais/cars
const express = require('express');
const carController = require('../controllers/carController');
// Nurodom kad naudosim Express router'i kuris nukreips API requestus i atitinkama controller'i
const router = express.Router();

router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.post('/', carController.createCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;
