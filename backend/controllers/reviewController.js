const Review = require('../models/reviewModel');

const getReviews = (req, res) => {
  res.json(Review.getAllReviews());
};

const getReviewById = (req, res) => {
  const reviewId = req.params.id;
  const review = Review.getReviewById(reviewId);

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }
  res.json(review);
};

module.exports = {
  getReviews,
  getReviewById,
};
