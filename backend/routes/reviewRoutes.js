const express = require('express');
const {
  getReviews,
  getReviewById,
} = require('../controllers/reviewController');

// Nurodome, kad naudosime Express router'į, kuris nukreips API request'us į atitinkamą controller'į
const router = express.Router();

router.get('/', getReviews);
router.get('/:id', getReviewById);

// Išeksportuojame router'į, kad galėtume jį naudoti kitur
module.exports = router;
