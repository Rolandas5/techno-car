// Componentas į 404 Not Found page
import { Link } from 'react-router-dom';
import './not-found.css';

export const NotFound = () => (
  <div className="notfound-container">
    <h1 className="notfound-title">404</h1>
    <p className="notfound-subtitle">Puslapis nerastas!</p>
    <Link to="/" className="notfound-button">
      Eiti į titulinį
    </Link>
  </div>
);
