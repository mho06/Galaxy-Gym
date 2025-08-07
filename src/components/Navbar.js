import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { AuthContext } from '../context/AuthContext';
import GalaxyLogo from "../assets/Galaxy-Logo.png"; // adjust the path as needed

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
  <img
    src={GalaxyLogo}
    alt="Galaxy Gym Logo"
    className="navbar-logo-img"
  />
</Link>



      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {user ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            {/* <li className="navbar-user">Hi, {user.name || 'Member'}</li> */}
          </>
        ) : (
          <>
            {/* <li><Link to="/login">Login</Link></li> */}
            {/* <li><Link to="/signup" className="join-btn">Join Now</Link></li> */}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
