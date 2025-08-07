import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <p className="dashboard-loading">Loading Dashboard...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.name || 'Member'} 👋</h1>

      {/* Membership + Role */}
      <div className="dashboard-card">
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Membership Plan:</strong> Gold Membership</p>
        <p><strong>Valid Until:</strong> Oct 15, 2025</p>
        <p><strong>Status:</strong> Active ✅</p>
      </div>

      {/* Upcoming Classes */}
      <div className="dashboard-section">
        <h2>📅 Upcoming Classes</h2>
        <ul>
          <li>Thai Boxing – Friday @ 6PM</li>
          <li>Aerobics – Sunday @ 10AM</li>
        </ul>
      </div>

      {/* Progress */}
      <div className="dashboard-section">
        <h2>📊 Progress</h2>
        <p>You’ve attended <strong>28 classes</strong> this month 👏</p>
      </div>

      {/* Announcement */}
      <div className="dashboard-section dashboard-alert">
        <h2>📢 Announcement</h2>
        <p>New HIIT class starts next Monday at 5PM! Don’t miss it!</p>
      </div>

      {/* Buttons */}
      <div className="dashboard-buttons">
        <button className="dashboard-btn" onClick={() => navigate('/profile')}>
          Manage Profile
        </button>
        <LogoutButton />
      </div>

      {/* Admin Tools */}
      {user.role === 'admin' && (
        <div className="dashboard-section dashboard-admin-panel">
          <h2>🛠️ Admin Tools</h2>
          <ul>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/classes">Manage Classes</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
