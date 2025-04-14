// Controller - valdo logikam kaip reaguoti i API uzklausas/requestus ir kreipiasi i Model jeigu atitinka business logika
const Review = require('../models/reviewModel');

// Gauti visus atsiliepimus
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Klaida gaunant atsiliepimus' });
  }
};

// Sukurti naują atsiliepimą
exports.createReview = async (req, res) => {
  try {
    const { name, rating, description } = req.body;

    if (!name || !rating || !description) {
      return res.status(400).json({
        error: 'Name, description and rating are required',
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: 'Reitingas turi būti tarp 1 ir 5',
      });
    }

    const newReview = new Review({ name, rating, description });
    await newReview.save();

    res.status(201).json({ message: 'Atsiliepimas sėkmingai sukurtas' });
  } catch (error) {
    res.status(500).json({ error: 'Klaida kuriant atsiliepimą' });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Atsiliepimas nerastas' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Klaida gaunant atsiliepimą' });
  }
};
