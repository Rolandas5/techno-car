const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, reservationController.createReservation);
router.get('/', authMiddleware, reservationController.getUserReservations); // Gauti user rezervacijas
router.delete('/:id', authMiddleware, reservationController.deleteReservation); // Ištrinti rezervaciją
// router.get('/:id', reservationController.getReservationById); // Gauti rezervaciją pagal ID (jei reikia) 


module.exports = router;
