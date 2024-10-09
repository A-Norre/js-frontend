import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simulate login request (replace with actual API call)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
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
    <div>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>

    <div>
        <p>Don't have an account? <Link to="/registration">Register here</Link></p> {/* Link to Register */}
    </div>
  </div>
  );
};

export default Login;
