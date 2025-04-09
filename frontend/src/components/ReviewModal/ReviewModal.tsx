import './review-modal.css';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';

interface ReviewModalProps {
  onModalClose: () => void;
  onSubmitSuccess?: () => void;
  // onSubmitSuccess?: () => void; // tai papildomas props, kad būtų galima atnaujinti sąrašą tėviniame komponente
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  onModalClose,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null); // klaidos pranešimas

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      name,
      description,
      rating,
    };

    try {
      await axios.post(`${API_URL}/reviews`, newReview); // Pateikti atsiliepimą
      onModalClose(); // uždaryti modalą po pateikimo
      onSubmitSuccess?.(); // atnaujina sąrašą tėviniame komponente
      setError(null); // išvalyti klaidos pranešimą
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // patikrinti ar tai axios klaida
        const errorMessage =
          error.response?.data?.error || 'Įvyko klaida siunčiant atsiliepimą';
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Palikite atsiliepima</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Vardas ir Pavarde</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Atsiliepimas</label>
            <textarea
              id="description"
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Įvertinimas</label>
            <input
              type="number"
              id="rating"
              placeholder="nuo 1 iki 5"
              required
              value={rating}
              onChange={(e) => {
                const value = e.target.value;
                setRating(value === '' ? '' : Number(value));
              }}
              // kad būtų galima įvesti tik skaičius nuo 1 iki 5
            />
          </div>

          {error && <div className="error-container">{error}</div>}
          {/* klaidos pranešimas */}
          {/* <div className="error-container">Įvyko klaida</div> */}
          {/* čia galima pridėti daugiau informacijos apie klaidą */}

          <div className="modal-actions">
            <button type="button" onClick={onModalClose}>
              Atsaukti
            </button>
            <button type="submit">Pateikti</button>
          </div>
        </form>
      </div>
    </div>
  );
};
