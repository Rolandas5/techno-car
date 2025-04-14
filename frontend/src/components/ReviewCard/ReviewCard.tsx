import React from 'react';
import { Review } from '../types/review';
import './review-card.css';
import { useState } from 'react';

interface ReviewCardProps {
  review: Review;
  onDelete: (id: string) => void; // pridėtas propsas
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { _id, name, description, createdAt, rating } = review;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(_id);
    }, 300);
  };

  const renderStars = (count: number) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className={`review-card ${isDeleting ? 'fade-out' : ''}`}>
      <h3>{name}</h3>
      <div className="review-meta">
        <span>{new Date(createdAt).toLocaleDateString('lt-LT')}</span>
        <span className="review-rating">{renderStars(rating)}</span>
      </div>
      <p>{description}</p>
      <button className="delete-button" onClick={handleDelete}>
        🗑️ Ištrinti
      </button>
    </div>
  );
};
