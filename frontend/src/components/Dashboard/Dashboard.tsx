import { useContext, useState, useEffect } from 'react';
import './dashboard.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { AccountInfo } from './components/AccountInfo';
import { ReservationList } from './components/ReservationList';
import { Reservation } from '../types/ReservationTypes';
import { API_URL } from '../../constants/global';
import { AdminCarsTab } from './components/AdminCarsTab';
import { AdminReservationsTab } from './components/AdminReservationsTab';

// 0. Susikuriame API Interface
// 1. Pasifetchinam rezervacijas panaudojam useEffect
// 2. Perduodam rezervacijas i ReservationList komponenta
// 3. ReservationList komponentas atvaizduoja rezervacijas

type Tab = 'user' | 'admin-cars' | 'admin-reservations';

export const Dashboard = () => {
  const { user, access_token } = useContext(AuthContext);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('user'); // Default to 'user' tab
  const isAdmin = user?.role === 'admin';

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.get<Reservation[]>(
        `${API_URL}/reservations`,
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

  // Handle reservation deletion
  const handleDelete = async (reservationId: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;

    try {
      setDeleteLoading(reservationId);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      await axios.delete(`${API_URL}/reservations/${reservationId}`, config);

      // Update the reservations list
      setReservations((prev) =>
        prev.filter((res) => res._id !== reservationId)
      );
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Failed to delete reservation. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="welcome-text">Welcome back, {user?.name}!</p>
      </div>
      {isAdmin && (
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            My Reservations
          </button>
          <button
            className={`tab-button ${
              activeTab === 'admin-cars' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('admin-cars')}
          >
            Manage Cars
          </button>
          <button
            className={`tab-button ${
              activeTab === 'admin-reservations' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('admin-reservations')}
          >
            All Reservations
          </button>
        </div>
      )}

      <div className="dashboard-content">
        {activeTab === 'user' && (
          <>
            <AccountInfo user={user} />
            <ReservationList
              reservations={reservations}
              loading={loading}
              deleteLoading={deleteLoading}
              onDelete={handleDelete}
            />
          </>
        )}
        {activeTab === 'admin-cars' && <AdminCarsTab />}
        {activeTab === 'admin-reservations' && <AdminReservationsTab />}
      </div>
    </div>
  );
};
