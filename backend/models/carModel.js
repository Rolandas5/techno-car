// Model - atsakiongas uz duomenu bazes operacijas, kaip select, insert, update, delete
const fs = require('fs');
const filePath = './database/cars.json';

const getAllCars = () => {
  const data = fs.readFileSync(filePath);

  // JSON.parse() - konvertuoja JSON stringa i JavaScript objekta
  return JSON.parse(data);
};

const getCarById = (id) => {
  const cars = getAllCars();
  return cars.find((car) => car.id === id);
};

module.exports = {
  getAllCars,
  getCarById,
};
