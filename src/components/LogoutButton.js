import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LogoutButton() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!res.ok) throw new Error('Logout failed');

      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err.message);
      alert('Logout failed');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
