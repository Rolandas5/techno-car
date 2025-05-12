// Controller - valdo logiką kaip reaguoti i API uzklausas/request'us ir kreipiasi i Model jeigu atitinka business logika
const Car = require('../models/carModel');

// Gauti visus automobilius
exports.getAllCars = async (req, res) => {
  try {
    const allCars = await Car.find();
    res.status(200).json(allCars);
  } catch (error) {
    res.status(500).json({ error: 'Klaida gaunant automobilius' });
  }
};

// Gauti konkretų automobilį pagal ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Automobilis nerastas' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Klaida gaunant automobilį' });
  }
};

// ADMIN ONLY Sukuria naują automobilį
exports.createCar = async (req, res) => {
  try {
    // authMiddleware atiduoda mums users objekta
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Neturite teisių sukurti automobilio' });
    }
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json({ message: 'Automobilis sukurtas sėkmingai' });
  } catch (error) {
    res.status(500).json({ message: 'Klaida kuriant automobilį' });
  }
};

// Patch Atnaujinti automobilį pagal ID
exports.updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const updateCar = req.body;
    const newCar = await Car.findByIdAndUpdate(carId, updateCar, {
      new: true,
    });
    if (!newCar) {
      return res.status(404).json({ error: 'Automobilis nerastas' });
    }
    res.status(200).json({ message: 'Automobilis atnaujintas', newCar });
  } catch (error) {
    res.status(500).json({ error: 'Klaida atnaujinant automobilį' });
  }
};

// Ištrinti automobilį pagal ID
exports.deleteCar = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Neturite teisių ištrinti automobilio' });
    }
    const carId = req.params.id;
    const deletedCar = await Car.findByIdAndDelete(carId);
    if (!deletedCar) {
      return res.status(404).json({ error: 'Automobilis nerastas' });
    }
    res.status(200).json({ message: 'Automobilis ištrintas' });
  } catch (error) {
    res.status(500).json({ error: 'Klaida trinant automobilį' });
  }
};
