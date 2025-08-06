import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Galaxy Gym</div>

      <div className={`navbar-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/classes" onClick={toggleMenu}>Classes</Link></li>
        <li><Link to="/pricing" onClick={toggleMenu}>Pricing</Link></li>
        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
