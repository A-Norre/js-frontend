import React from 'react'; // Ensure React is imported
import { useState, useEffect } from 'react';
import '../style/App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token from localStorage
    localStorage.removeItem('username'); // Remove username from localStorage
    navigate('/login'); // Redirect to login page after logout
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login'); // Redirect if no token is found
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading document...</div>;
  }

  return (
      <div>
        {/* Logout button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

        <Routes>
          <Route
            path="/"
            element={
              <div className='document-list'>
                {data.map(item => (
                  <h3 key={item._id}>
                    <Link to={`/document/${item._id}`}>{item.title}</Link>
                  </h3>
                ))}
                <Link to="/document/new">
                  <button className="add-document-button"><b>+</b> Dokument</button>
                </Link>
              </div>
            }
          />
        </Routes>
      </div>
  );
}

export default App;
