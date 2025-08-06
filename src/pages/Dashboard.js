import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';

function Dashboard() {
  const { user, setUser } = useContext(AuthContext); // ✅ use context directly
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();

        setUser(data); // ✅ set the user globally
      } catch (err) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, setUser]);

  if (loading) return <p className="dashboard-loading">Loading Dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name || 'Member'} 👋</h1>
      <div className="dashboard-card">
        {/* <p><strong>User ID:</strong> {user?._id}</p> */}
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
      <LogoutButton />
    </div>
  );
}

export default Dashboard;
