import React from 'react';
import '../styles/Classes.css';

function Classes() {
  return (
    <div className="classes-page">
      <h1 className="classes-title">Explore Our Classes</h1>
      <div className="class-grid">

        <div className="class-card">
          <img src="https://images.unsplash.com/photo-1599058917212-d750089bcad6" alt="Gym" />
          <h2>🏋️ Gym</h2>
          <p>Access our premium equipment and free weight zones, suitable for beginners and pros.</p>
          <button className="btn-card">Join Gym</button>
        </div>

        <div className="class-card">
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" alt="Aerobics" />
          <h2>💃 Aerobics (Ladies Only)</h2>
          <p>Fun, energetic dance cardio classes — exclusively designed for women.</p>
          <button className="btn-card">Join Aerobics</button>
        </div>

        <div className="class-card">
          <img src="https://images.unsplash.com/photo-1606166325683-3c44c0e04955" alt="Thai Boxing" />
          <h2>🥊 Thai Boxing</h2>
          <p>All ages welcome! Learn discipline, defense, and conditioning in our Thai Boxing program.</p>
          <button className="btn-card">Join Thai Boxing</button>
        </div>

      </div>
    </div>
  );
}

export default Classes;
