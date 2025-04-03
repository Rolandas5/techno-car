import React from 'react';
import { Review } from '../types/review';
import './review-card.css';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { name, description, date, rating } = review;

  const renderStars = (count: number) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="review-card">
      <div className="review-card-content">
        <h3>{name}</h3>
        <div className="review-meta">
          <span>{new Date(date).toLocaleDateString()}</span>
          {/* toLocaleDateString - formatuoja datą pagal vartotojo regioną */}
          <span className="review-rating">{renderStars(rating)}</span>
          {/* renderStars - sukuria žvaigždutes pagal reitingą */}
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};
