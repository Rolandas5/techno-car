import { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import { Register } from './Register';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { register } = useContext(AuthContext);

  const validateForm = () => {
    setPasswordError('');

    // patikriname ar slaptažodžiai sutampa
    if (password !== confirmPassword) {
      setPasswordError('Slaptažodžiai nesutampa!');
      return false;
    }

    // Tikrianme ar slaptažodis yra bent 6 simbolių ilgio
    if (password.length < 6) {
      setPasswordError('Slaptažodis yra per trumpas!');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      await register(name, email, password);
    }
  };

  return (
    <div className="register-contaioner">
      <div className="register-form-wrapper">
        <h2>Registracija</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Pilnas vardas ir pavardė</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Confim Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordError && <p className="field-error">{passwordError}</p>}
          </div>

          <button type="submit" className="register-button">
            {'Registruotis'}
          </button>
        </form>

        <div className="login-link">
          Ar jau turite paskyrą? <Link to="/login">Prisijunkite</Link>
        </div>
      </div>
    </div>
  );
};
