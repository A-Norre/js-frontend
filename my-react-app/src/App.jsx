import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Document from './document';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <div className='document-list'>
                <h3>
                  <Link to="/document/1">Sample Document 1</Link>
                </h3>
                <h3>
                  <Link to="/document/2">Sample Document 2</Link>
                </h3>
              </div>
            }
          />
          <Route path="/document/:id" element={<Document />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
