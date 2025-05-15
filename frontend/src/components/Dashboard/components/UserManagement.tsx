import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants/global';
import { formatDate } from '../../../utils/date';
import { UserRoleModal } from './UserRoleModal';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('user');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('access_token');

  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/users`, config);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenModal = (userId: string, currentRole: string) => {
    setSelectedUserId(userId);
    setSelectedRole(currentRole);
    setIsModalOpen(true);
  };

  const handleSaveRole = async (newRole: string) => {
    if (!selectedUserId) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        `${API_URL}/users/${selectedUserId}/role`,
        { role: newRole },
        config
      );
      fetchUsers(); // reload after update
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className="admin-tab">
      <h2>All Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleOpenModal(user._id, user.role)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <UserRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentRole={selectedRole}
        onSave={handleSaveRole}
      />
    </div>
  );
};
