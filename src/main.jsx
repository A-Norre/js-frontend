import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App.jsx';
import Document from './components//document.jsx';
import NewDocument from './components/NewDocument.jsx';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Header from './views/Header.jsx';
import Footer from './views/Footer.jsx';
import './style/index.css';

const productionMode = import.meta.env.MODE === 'production' ? '/~susm20/editor' : '/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={productionMode}>
      <Header />
      
      <Routes>
        {/* Public route: Login page */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Protected routes: only accessible if authenticated */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route
          path="/document/:id"
          element={
            <ProtectedRoute>
              <Document />
            </ProtectedRoute>
          }
        />
        <Route
          path="/document/new"
          element={
            <ProtectedRoute>
              <NewDocument />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  </StrictMode>
);
