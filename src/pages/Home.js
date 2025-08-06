import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Galaxy Gym</h1>
          <p>Your destination for strength, sweat, and self-improvement.</p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">Join Now</Link>
            <Link to="/login" className="btn btn-outline">Member Login</Link>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>Why Choose Galaxy Gym?</h2>
        <p>We offer the best combination of equipment, community, and coaching. Whether you're a beginner or a seasoned athlete, you'll find your space here.</p>
      </section>

      <section className="services">
        <h2>Our Programs</h2>
        <div className="service-grid">
          <div className="service-card">
            <h3>🏋️ Gym</h3>
            <p>Modern equipment and 24/7 access for all members.</p>
          </div>
          <div className="service-card">
            <h3>💃 Aerobics (Ladies Only)</h3>
            <p>Fun and energetic sessions designed for women.</p>
          </div>
          <div className="service-card">
            <h3>🥊 Thai Boxing</h3>
            <p>All-age combat classes for strength and confidence.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
