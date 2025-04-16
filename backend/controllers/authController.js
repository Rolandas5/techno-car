const User = require('../models/userModel'); // Importuojame User modelį

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Patikriname, ar visis laukai užpildyti
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    // 2. Patikriname ar email jau toks egzistuoja mūsų duomenų bazėje
    if (existingUser) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = new User({
      name,
      email,
      password,
    });
    // 3. Išsaugome naują vartotoją duomenų bazėje

    user.save();
    // 4. Jei viskas gerai, grąžiname sėkmingą atsakymą

    res.status(201).json({ message: 'Registracija teisinga' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
