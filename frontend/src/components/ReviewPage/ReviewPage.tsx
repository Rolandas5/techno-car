import { useEffect, useState } from 'react';
import axios from 'axios';
import { Review } from '../types/ReviewTypes';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import './review-page.css';
import { API_URL } from '../../constants/global';
import { ReviewModal } from '../ReviewModal/ReviewModal';

export const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error('Klaida trinant atsiliepimą:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <section className="review-section">
        <div className="review-section-title">
          <h2>Atsiliepimai</h2>
          <p>Ką sako mūsų klientai apie automobilius?</p>
          <button
            className="add-review-button"
            onClick={() => setIsModalVisible(true)}
          >
            Palikite atsiliepimą
          </button>
        </div>
        <div className="review-list">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </section>
      {isModalVisible && (
        <ReviewModal
          onModalClose={() => setIsModalVisible(false)}
          onSubmitSuccess={fetchReviews}
        />
      )}
    </>
  );
};
