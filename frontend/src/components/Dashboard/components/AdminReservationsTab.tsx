import axios from 'axios';
import { API_URL } from '../../../constants/global';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import { Reservation } from '../../types/ReservationTypes';

export const AdminReservationsTab = () => {
  const { access_token } = useContext(AuthContext);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.get<Reservation[]>(
        `${API_URL}/reservations/all`,
        config
      );
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchReservations();
    }
  }, [access_token]);

  return (
    <div className="admin-tab">
      <h2>All Reservations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.user?.email || reservation.userId}</td>
                <td>
                  {reservation.car?.make} {reservation.car?.model}
                </td>
                <td>{new Date(reservation.startDate).toLocaleDateString()}</td>
                <td>{new Date(reservation.endDate).toLocaleDateString()}</td>
                <td>{reservation.totalPrice} €</td>
                <td>{new Date(reservation.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
