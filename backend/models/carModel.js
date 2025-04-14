// Model - atsakiongas uz duomenu bazes operacijas, kaip select, insert, update, delete
const mongoose = require('mongoose');

// Sukuriame automobilio schemą
const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true, // pvz. „Toyota“
    },
    model: {
      type: String,
      required: true, // pvz. „Corolla“
    },
    year: {
      type: Number,
      required: true, // pvz. 2020
    },
    price: {
      type: Number,
      required: true, // pvz. 15000
    },
    fuelType: {
      type: String,
      required: false, // pvz. „Benzinas“, neprivaloma
    },
    mileage: {
      type: Number,
      required: false, // pvz. 120000
    },
    image: {
      type: String,
      required: false, // paveikslėlio URL (jei naudosite)
    },
  },
  {
    timestamps: true, // prideda createdAt ir updatedAt automatiškai
  }
);

// Eksportuojame modelį
module.exports = mongoose.model('Car', carSchema);
