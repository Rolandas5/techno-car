// server.js visada pagrindinis failas, kuris paleidzia serveri ir nukreipia marsrutus i atitinkamus failus
const express = require('express');
const cors = require('cors'); // leidžia siųsti API užklausas iš kitos domeno vietos (pvz. localhost:3000) į serverį (pvz. localhost:5173).
const carRoutes = require('./routes/carRoutes');
const app = express();
const PORT = 3000;

// Cors - leidžia siųsti API užklausas iš kitos domeno vietos (pvz. localhost:3000) į serverį (pvz. localhost:5173).
app.use(cors());
app.use(express.json());
// Nukreipiam visas API uzklausas, kurios prasideda /api/cars i carRoutes faila, kuris toliau tvarkys uzklausas susijusias su automobiliais
app.use('/api/cars', carRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
