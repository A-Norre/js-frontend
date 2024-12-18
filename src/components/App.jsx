import React from 'react';
import { useState, useEffect } from 'react';
import '../style/App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, json } from 'react-router-dom';
import { VITE_BACKEND_URL as backendURL } from "../../url.json";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login');
        }

        const response = await fetch(`${backendURL}/data/${localStorage.getItem('username')}`, {
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
        <button onClick={handleLogout} className="logout-button">Logout</button>
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
