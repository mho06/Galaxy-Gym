import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'darkred',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '1rem'
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
