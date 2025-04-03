const fs = require('fs');
const filePath = './database/reviews.json';

const getAllReviews = () => {
  const data = fs.readFileSync(filePath, 'utf-8');

  // JSON.parse() - konvertuoja JSON stringą į JavaScript objektą
  return JSON.parse(data);
};

const getReviewById = (id) => {
  const reviews = getAllReviews();
  return reviews.find((review) => review.id === Number(id)); // užtikrinam, kad abu būtų skaičiai
};

module.exports = {
  getAllReviews,
  getReviewById,
};
