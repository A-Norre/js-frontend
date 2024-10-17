import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import '../style/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simulate login request (replace with actual API call)
    const response = await fetch(`http://localhost:8080/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token) {
      // Save the token to local storage
      localStorage.setItem('token', data.token);

      // Redirect to the protected route (main app)
      navigate('/');
    } else {
      // Handle login failure (e.g., show an error message)
      console.error('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">Login</button>
      </form>

      <div className="login-footer">
        <p>
          Don't have an account? <Link to="/registration" className="register-link">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
