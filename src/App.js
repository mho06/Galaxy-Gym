// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import Classes from './pages/Classes';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './admin/AdminDashboard';
import Dashboard from './pages/Dashboard';


import './styles/App.css';

function AppLayout() {
  const { user } = useContext(AuthContext); // ✅ moved inside here
  const location = useLocation();
  const hideNavbarFooter = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!hideNavbarFooter && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route
  path="/admin"
  element={
    user?.role?.toLowerCase() === 'admin'
      ? <AdminDashboard />
      : <Navigate to="/login" replace />
  }
/>


          <Route
  path="/dashboard"
  element={
    user?.role?.toLowerCase() !== 'admin'
      ? <Dashboard />
      : <Navigate to="/admin" replace />
  }
/>

        </Routes>
      </main>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
