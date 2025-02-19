import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <p>Oops...!!!! The PAGE you are looking for doesn&apos;t exist.</p>
      <Link to="/" className="go-home-btn">Go Back to Home</Link>
    </div>
  );
};

export default NotFound;
