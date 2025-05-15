import axios from 'axios';
import { API_URL } from '../../../constants/global';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import { AllReservations } from '../../types/AllReservationsTypes';
import { formatDate } from '../../../utils/date';

export const AdminReservationsTab = () => {
  const { access_token } = useContext(AuthContext);
  const [allreservations, setAllReservations] = useState<AllReservations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        const response = await axios.get<AllReservations[]>(
          `${API_URL}/reservations/all`,
          config
        );
        setAllReservations(response.data);
      } catch (error) {
        console.log('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (access_token) {
      fetchAllReservations();
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
            {allreservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.user?.email || reservation.userId}</td>
                <td>
                  {reservation.car?.make} {reservation.car?.model}
                </td>
                <td>{formatDate(reservation.startDate)}</td>
                <td>{formatDate(reservation.endDate)}</td>
                <td>{reservation.totalPrice} €</td>
                <td>{formatDate(reservation.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
