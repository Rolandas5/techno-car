import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404</h1>
    <p>Puslapis nerastas!</p>
    <p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Grįžti į pagrindinį puslapį
      </Link>
    </p>
  </div>
);
