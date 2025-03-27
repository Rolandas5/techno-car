// Controller - valdo logikam kaip reaguoti i API uzklausas/request'us ir kreipiasi i Model jeigu atitinka business logika
const Car = require('../models/carModel');

const getCars = (req, res) => {
  res.json(Car.getAllCars());
};

const getCarById = (req, res) => {
  const carId = req.params.id;
  const car = Car.getCarById(carId);

  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }
  res.json(car);
};

// Iseksportuojame sia funkciją, kad galėtume ją naudoti kitur
module.exports = {
  getCars,
  getCarById,
};
