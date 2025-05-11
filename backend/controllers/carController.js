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

// ADMIN ONLY Sukurti naują automobilį
exports.createCar = async (req, res) => {
  try {
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

// Atnaujinti automobilį pagal ID
exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCar) {
      return res.status(404).json({ error: 'Automobilis nerastas' });
    }
    res.status(200).json({ message: 'Automobilis atnaujintas', updatedCar });
  } catch (error) {
    res.status(500).json({ error: 'Klaida atnaujinant automobilį' });
  }
};

// Ištrinti automobilį pagal ID
exports.deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ error: 'Automobilis nerastas' });
    }
    res.status(200).json({ message: 'Automobilis ištrintas' });
  } catch (error) {
    res.status(500).json({ error: 'Klaida trinant automobilį' });
  }
};
