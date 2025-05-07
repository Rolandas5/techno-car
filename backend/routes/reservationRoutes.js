const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, reservationController.createReservation);
router.get('/', authMiddleware, reservationController.getUserReservations); // Gauti user rezervacijas
// router.put('/:id', authMiddleware, reservationController.updateReservation); // Atnaujinti rezervaciją (jei reikia)
router.delete('/:id', authMiddleware, reservationController.deleteReservation); // Ištrinti rezervaciją

module.exports = router;
