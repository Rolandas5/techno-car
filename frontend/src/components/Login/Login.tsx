import { useState } from 'react';
import './Register/register.css';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

         alert('Bandoma prisijiungti!');
    }
  };

  return (
    <div className="register-contaioner">
      <div className="register-form-wrapper">
        <h2>Prisijungimas</h2>

    <form onSubmit={handleSubmit} className="regsiter-form">
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
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
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
