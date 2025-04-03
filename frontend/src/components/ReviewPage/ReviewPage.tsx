import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Review } from '../types/review';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import './review-page.css';

export const ReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>(
          'http://localhost:3000/api/reviews'
        );
        setReviews(response.data);
      } catch (error) {
        console.error('Klaida gaunant atsiliepimus:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="review-section">
      <div className="review-section-title">
        <h2>Atsiliepimai</h2>
        <p>Ką sako mūsų klientai apie automobilius?</p>
      </div>
      <div className="review-list">
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </section>
  );
};
