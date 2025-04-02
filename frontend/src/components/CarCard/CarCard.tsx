import { useNavigate } from 'react-router-dom';
import { Car } from '../types/car';
import './car-card.css';

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // navogate - nuveda pagal jo ID į kitą puslapį jo neperkraunant
    navigate(`/cars/${car.id}`);
  };

  return (
    <div className="car-card" onClick={handleClick}>
      {/* <img src="" alt="Car" className="car-card-image" /> */}
      <img
        src={car.image}
        alt={`${car.make} ${car.model}`}
        className="car-card-image"
      />
      <div className="car-card-content">
        <h3>
          {car.make} {car.model} ({car.year})
        </h3>
        <p>{car.description}</p>
        <p>
          <strong>Kaina:</strong> €{car.price}
        </p>
        <p>
          <strong>Pavarų dėžė:</strong> {car.transmission}
        </p>
        <p>
          <strong>Kuras:</strong> {car.fuelType}
        </p>
        <p>
          <strong>Vietų:</strong> {car.seats}
        </p>
      </div>
    </div>
  );
};
