import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5001/users', {
        params: { email },
      });
      const existingUser = response.data.find((user) => user.email === email);

      if (existingUser) {
        setErrorMessage('Email already registered. Please use a different email.');
        setSuccessMessage('');
        return;
      }

      const newUser = {
        username,
        email,
        password,
      };

      await axios.post('http://localhost:5001/users', newUser);
      setSuccessMessage('Registration successful!');
      setErrorMessage('');

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrorMessage('Error saving user data. Please try again later.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-container">
      <h5 className="card-title">Register</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">UserName :</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Please Enter UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email ID :</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Please Enter your Email-ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword">Confirm Password :</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        {errorMessage && (
          <div id="errorMessage" className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div id="successMessage" className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}
      </form>
      <div className="mt-3">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default RegistrationForm;