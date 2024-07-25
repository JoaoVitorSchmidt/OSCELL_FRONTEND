import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OSPage from './components/OSPage';
import Footer from './components/Footer';
import ClientPage from './components/ClientPage';
import ServicesPage from './components/ServicesPage.js';
import PartPage from './components/PartPage.js';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/os" element={<OSPage />} />
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/parts" element={<PartPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
