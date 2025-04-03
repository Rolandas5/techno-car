import React from 'react';
import { Review } from '../types/review';
import './review-card.css';

// export const ReviewCard: React.FC<Review> = ({ name, description }) => {
//   return (
//     <div className="review-card">
//       <h3>{name}</h3>
//       <p>{description}</p>
//     </div>
//   );
// };

export const ReviewCard: React.FC<Review> = ({
  name,
  description,
  date,
  rating,
}) => {
  const renderStars = (count: number) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="review-card">
      <div className="review-card-content">
        <h3>{name}</h3>
        <div className="review-meta">
          <span>{new Date(date).toLocaleDateString()}</span>
          {/* toLocaleDateString reiskia, kad data bus formatuojama pagal vartotojo regiono nustatymus */}
          <span className="review-rating">{renderStars(rating)}</span>
          {/* renderStars funkcija sukuria žvaigždutes pagal reitingą */}
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};
