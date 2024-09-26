import { useState, useEffect } from 'react';
import '../style/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Document from './document.jsx';
import NewDocument from './NewDocument';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch('https://jsramverk-eafmccbgceegf9bt.northeurope-01.azurewebsites.net/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
  }, []);

  if (loading) {
    return <div className="loading">Loading document...</div>;
  }

  return (
    <Router basename="/editor">
      <div>
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
          <Route path="/document/:id" element={<Document data={data} />} />
          <Route path="/document/new" element={<NewDocument />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
