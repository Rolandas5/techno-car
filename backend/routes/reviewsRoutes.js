// carRoutes.js - API maršrutai, kurie tvarko užklausas, susijusias su automobiliais/cars
const express = require('express');
const { getReviews, createReview } = require('../controllers/reviewController');
// Nurodom kad naudosim Express router'i kuris nukreips API requestus i atitinkama controller'i
const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);

//
// Gauti visus atsiliepimus
router.get('/reviews', (req, res) => {
  const reviews = getAllReviews();
  res.json(reviews);
});

// Sukurti naują atsiliepimą
router.post('/reviews', (req, res) => {
  const review = req.body;
  const createdReview = createReview(review);
  res.status(201).json(createdReview);
});

module.exports = router;
