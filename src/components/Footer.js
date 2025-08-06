// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '1rem',
      textAlign: 'center',
      marginTop: '2rem'
    }}>
      <p>&copy; {new Date().getFullYear()} Galaxy Gym. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
