const Reservation = require('../models/reservationModel');
const Car = require('../models/carModel');

// sukuriame rezervacija
exports.createReservation = async (req, res) => {
  try {
    const { carId, totalDays, startDate, endDate } = req.body;

    // 1. Patikrinam ar zmogus yra autentifikuotas
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 2. Patikrinam ar automobilis egzistuoja
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // 3. Patikrinam ar automobilis yra laisvas pasirinktomis dienomis
    const isCarAvailable = await Reservation.findOne({
      carId,
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    });

    if (isCarAvailable) {
      return res
        .status(400)
        .json({ error: 'Automobilis užrezervuotas šiomis dienomis' });
    }

    // 4. Paskaiciuojam kiek kainuos rezervacija
    const totalPrice = car.price * totalDays;

    // 5. Sukuriame rezervacija
    const reservation = new Reservation({
      carId,
      userId,
      startDate,
      endDate,
      totalPrice,
    });
    await reservation.save();

    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
};

// Gaunam vartotojo rezervacijas
exports.getUserReservations = async (req, res) => {
  try {
    const userId = req.user._id;
    const reservations = await Reservation.find({ userId })
      .populate('carId', 'make model image')
      .lean();
    // lean - grazina paprastus JS objektus o ne Mongoose dokumentus

    const formattedReservations = reservations.map((reservation) => ({
      ...reservation,
      car: reservation.carId,
      carId: reservation.carId._id,
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get reservations' });
  }
};

// Deleting reservation
exports.deleteReservation = async (req, res) => {
  try {
    //  SVARBU: req.params.id parasytas be ._id, nes traukiame is url, ne is body (mongodb)
    const reservationId = req.params.id;
    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );

    // galima prideti IF ELSE, pvz negali istrint jei jau prasidejo rezervacijos diena ar jei jau yra apmoketa

    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
};

// AMIN ONLY
exports.getAllReservations = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Not authorized. Admin access required' });
    }
    const allReservations = await Reservation.find()
      .populate('carId', 'make model image')
      .populate('userId', 'name email')
      .lean();

    const formattedReservations = allReservations.map((reservation) => ({
      ...reservation,
      car: reservation.carId,
      carId: reservation.carId._id,
      user: reservation.userId,
      userId: reservation.userId._id,
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get all reservations' });
  }
};
