import React, { useState, useEffect } from 'react';

interface UserRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: string;
  onSave: (newRole: string) => void;
}

export const UserRoleModal: React.FC<UserRoleModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSave,
}) => {
  const [role, setRole] = useState(currentRole);

  useEffect(() => {
    setRole(currentRole);
  }, [currentRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(role);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Keisti vartotojo rolę</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Išsaugoti
          </button>
        </form>
      </div>
    </div>
  );
};
