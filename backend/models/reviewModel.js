const mongoose = require('mongoose');

// Apibrėžiame atsiliepimo schemą
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    },
  },
  {
    timestamps: true, // Automatiškai prideda createdAt ir updatedAt
  }
);

// Naudojame bendrą `mongoose` prisijungimą
module.exports = mongoose.model('Review', reviewSchema);
