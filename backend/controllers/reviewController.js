// Controller - valdo logikam kaip reaguoti i API uzklausas/requestus ir kreipiasi i Model jeigu atitinka business logika
const Review = require('../models/reviewModel');

const getReviews = (req, res) => {
  res.status(201).json(Review.getAllReviews());
};

const createReview = (req, res) => {
  try {
    const { name, rating, description } = req.body;

    if (!name || !rating || !description) {
      return res
        .status(400)
        .json({ error: 'Name, description and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Įvyko klaida' });
    }

    Review.createReview({ name, rating, description });
    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getReviews,
  createReview,
};
