import { useState, useEffect } from 'react';
import { CarCard } from '../CarCard/CarCard';
import { Car } from '../types/CarTypes';
import './car-list.css';
import { API_URL } from '../../constants/global';
import axios from 'axios';

export const CarList = () => {
  // useState yra reaktyvi constanta, kuri leidžia stebėti ir atnaujinti komponento būseną
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/cars`);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Automobilių nuomos platforma</h1>
        <p>Atraskite mūsų atrinktų automiblių kolekciją</p>
      </div>
      <div className="section">
        <div className="section-title">
          <h2>Nuomos pasiūlymai</h2>
          <p>Peržiūrėkite mūsų automobilių kolekciją</p>
        </div>
        <div className="car-list">
          {cars.map((car) => (
            // <div>{car.make}</div>
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </>
  );
};
