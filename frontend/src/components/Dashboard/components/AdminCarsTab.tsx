import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants/global';
import { Car } from '../../types/CarTypes';
import { CarFormModal } from '../components/CarFormModal';
import { AuthContext } from '../../../context/AuthContext';

export const AdminCarsTab = () => {
  const { access_token } = useContext(AuthContext);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // GET request to fetch cars
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_URL}/cars`);
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCarSubmit = async (formData: Car) => {
    if (!access_token) {
      alert('You are not authorized to perform this action.');
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    };

    try {
      if (selectedCar) {
        await axios.patch(
          `${API_URL}/cars/${selectedCar._id}`,
          formData,
          config
        ); // redagavimas
      } else {
        // POST request to create a new car
        await axios.post(`${API_URL}/cars`, formData, config); // kūrimas
      }

      setIsModalOpen(false);
      setSelectedCar(null);
      fetchCars();
    } catch (error) {
      console.log(error);
      alert('Failed to save car');
    }
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!carToDelete) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      };
      await axios.delete(`${API_URL}/cars/${carToDelete._id}`, config);
      setShowDeleteModal(false);
      setCarToDelete(null);
      fetchCars();
    } catch (error) {
      console.error('Klaida trinant automobilį:', error);
      alert('Nepavyko ištrinti automobilio');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="admin-tab">
      <div className="admin-header">
        <h2>Car Management</h2>
        <button className="btn" onClick={() => setIsModalOpen(true)}>
          Add New Car
        </button>
      </div>

      {isLoading ? (
        <p>Loading cars...</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price/day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>
                  <img src={car.image} alt={car.make} className="car-image" />
                </td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.price}€</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => {
                        handleEditCar(car);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => {
                        setCarToDelete(car);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Ar tikrai norite ištrinti šį automobilį?</h3>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={confirmDelete}>
                Taip
              </button>
              <button
                className="btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setCarToDelete(null);
                }}
              >
                Ne
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <CarFormModal
          onModalClose={() => {
            setIsModalOpen(false);
            setSelectedCar(null);
          }}
          onSubmit={handleCarSubmit}
          selectedCar={selectedCar}
        />
      )}
    </div>
  );
};
