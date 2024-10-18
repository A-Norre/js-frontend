import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Registration.css';

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8080/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // If registration is successful, navigate to the login page
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="register-input"
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="register-input"
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Register;
