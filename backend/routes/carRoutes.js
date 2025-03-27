// carRoutes.js - API marsrutai, kurie tvarko uzklausas, susijusias su automobiliais/cars
const express = require('express');
const { getCars, getCarById } = require('../controllers/carController');
// Nurodom, kad naudosime Express router'i kuris nukreips API request'us i atitinkama controller'i
const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);

// Išeksportuojame router'į, kad galėtume jį naudoti kitur
module.exports = router;
