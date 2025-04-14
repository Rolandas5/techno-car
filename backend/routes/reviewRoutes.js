// reviewRoutes.js - API maršrutai, kurie tvarko užklausas, susijusias su automobiliais/cars
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);
router.post('/', reviewController.createReview);
router.get('/:id', reviewController.getReviewById);

module.exports = router;
