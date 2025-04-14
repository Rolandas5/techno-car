const mongoose = require('mongoose');

// Apibrėžiame atsiliepimo schemą
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatiškai prideda createdAt ir updatedAt
    collection: 'reviews', // Nurodo kolekcijos pavadinimą MongoDB
  }
);

// Naudojame bendrą `mongoose` prisijungimą
module.exports = mongoose.model('Review', reviewSchema);
