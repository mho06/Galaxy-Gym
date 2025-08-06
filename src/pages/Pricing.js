import React from 'react';
import '../styles/Pricing.css';

function Pricing() {
  return (
    <div className="pricing-page">
      <h1 className="pricing-title">Membership Plans</h1>
      <div className="pricing-grid">

        <div className="pricing-card">
          <h2>Daily Pass</h2>
          <p className="price">$5</p>
          <ul>
            <li>Gym Access</li>
            <li>One Day Only</li>
            <li>No Booking Access</li>
          </ul>
          <button className="btn-pricing">Get Started</button>
        </div>

        <div className="pricing-card highlight">
          <h2>Monthly Membership</h2>
          <p className="price">$50</p>
          <ul>
            <li>Full Gym Access</li>
            <li>Class Booking Enabled</li>
            <li>Unlimited Visits</li>
          </ul>
          <button className="btn-pricing">Join Monthly</button>
        </div>

        <div className="pricing-card">
          <h2>22-Session Pack</h2>
          <p className="price">$180</p>
          <ul>
            <li>Includes Monthly Membership</li>
            <li>22 Personal Sessions</li>
            <li>All Class Access</li>
          </ul>
          <button className="btn-pricing">Buy Package</button>
        </div>

        <div className="pricing-card">
          <h2>Aerobics (Ladies)</h2>
          <p className="price">$30/month</p>
          <ul>
            <li>3 Sessions/Week</li>
            <li>Group Class Only</li>
            <li>Women Only</li>
          </ul>
          <button className="btn-pricing">Join Aerobics</button>
        </div>

        <div className="pricing-card">
          <h2>Thai Boxing</h2>
          <p className="price">$60/month</p>
          <ul>
            <li>All Ages Welcome</li>
            <li>Qualified Instructors</li>
            <li>Weekly Classes</li>
          </ul>
          <button className="btn-pricing">Join Thai Boxing</button>
        </div>

      </div>
    </div>
  );
}

export default Pricing;
