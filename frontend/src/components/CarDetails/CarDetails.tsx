import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { NotFound } from '../NotFound/NotFound';
import axios from 'axios';
import { Car } from '../types/CarTypes';
import { API_URL } from '../../constants/global';
import './car-details.css';
import { AuthContext } from '../../context/AuthContext';
import { ReservationModal } from '../ReservationModal/ReservationModal';

export const CarDetails = () => {
  const navigate = useNavigate();
  // useParams - yra HOOKas, kuris leidžia gauti parametrus iš URL pvz id => /cars/:id
  const { id: carId } = useParams();
  const { user } = useContext(AuthContext);
  const [isReservationModalVisible, setIsReservationModalVisible] =
    useState(false);

  const [car, setCar] = useState<Car | null>(null);
  // useState - yra HOOKas, kuris leidžia stebėti ir atnaujinti komponento būseną
  // Car | null - car gali būti null, kol jis dar nebuvo gautas iš serverio
  const [error, setError] = useState(false);
  // Pafečina useEffect
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/cars/${carId}`);
        setCar(response.data);
        // console.log('Gauti automobilio duomenys:', response.data);
        setError(false); // jei sėkmingai gauti duomenys
      } catch (error) {
        console.error('Klaida gaunant automobilio duomenis:', error);
        setError(true); // nustatom klaidą
      }
    };

    fetchCarDetails();
    // console.log('Car ID:', id);
  }, [carId]);

  // handleBackClick - funkcija, kuri grįžta į pagrindinį puslapį
  const handleBackClick = () => {
    navigate('/');
  };

  // Jei įvyko klaida – rodomas NotFound komponentas
  if (error) {
    return <NotFound />;
  }

  // Jei dar krauna – rodomas loading
  if (!car) {
    return <p>Kraunama...</p>;
  }

  const handleReserveClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsReservationModalVisible(true);
  };

  return (
    <div className="car-detail">
      <div className="car-detail-container">
        {/* Kaire puse */}
        <div className="car-detail-left">
          <img
            src={car?.image}
            alt={`${car?.make} ${car?.model}`}
            className="car-detail-image"
          />
        </div>
        {/* Desine puse */}
        <div className="car-detail-right">
          {/* header */}
          <div className="car-header">
            {/* <h2>{id}</h2> */}
            <h2>
              {car?.make} {car?.model}
            </h2>
            <p className="car-year">{car?.year} m.</p>
          </div>
          {/*  */}
          <div className="car-description">
            <p>{car?.description}</p>
          </div>
          <div className="car-specs">
            <div className="spec-item">
              <span className="spec-label">Pavarų dėžė</span>
              <span className="spec-value">{car?.transmission}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kuro tipas</span>
              <span className="spec-value">{car?.fuelType}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Sėdimų vietų: </span>
              <span className="spec-value">{car?.seats}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kaina per dieną: </span>
              <span className="spec-value">${car?.price}</span>
            </div>
          </div>
          <div className="car-actions">
            <button
              className="button button-primary"
              onClick={handleReserveClick}
            >
              Rezervuoti
            </button>
            <button
              className="button button-secondary"
              onClick={handleBackClick}
            >
              Grįžti į pagrindinį
            </button>
          </div>
        </div>
      </div>
      {isReservationModalVisible && car && (
        <ReservationModal
          onModalClose={() => setIsReservationModalVisible(false)}
          // onSuccess={() => setIsReservationModalVisible(false)}
          car={car}
        />
      )}
    </div>
  );
};
