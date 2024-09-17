import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UpdateDocument from './UpdateDocument';
import NewDocument from './NewDocument';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="document-list">
                <h3>
                  <Link to="/document/1">Sample Document 1</Link>
                </h3>
                <h3>
                  <Link to="/document/2">Sample Document 2</Link>
                </h3>

                <Link to="/document/new">
                  <button className="add-document-button"><b>+</b> Dokument</button>
                </Link>
              </div>
            }
          />
          <Route path="/document/:id" element={<UpdateDocument />} />
          <Route path="/document/new" element={<NewDocument />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
