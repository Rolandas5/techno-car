const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

// POST - SUKURTI REZERVACIJĄ
router.post('/', authMiddleware, reservationController.createReservation);
// GET - user rezervacijas pagal vartotoją
router.get('/', authMiddleware, reservationController.getUserReservations); // Gauti user rezervacijas
// DELETE - Ištrinti rezervaciją pagal ID
router.delete('/:id', authMiddleware, reservationController.deleteReservation); // Ištrinti rezervaciją
// GET ALL RESERVATIONS ADMIN ONLY
router.get('/all', authMiddleware, reservationController.getAllReservations); // Gauti visas rezervacijas

module.exports = router;
