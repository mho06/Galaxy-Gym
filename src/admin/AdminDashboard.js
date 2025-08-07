import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import UserManagement from './UserManagement';
import ClassManagement from './ClassManagement';
import BookingManagement from './BookingManagement';
import JoinRequests from './JoinRequests';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const { user } = useContext(AuthContext);
    const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>👤 Users</li>
          <li onClick={() => setActiveTab('requests')} className={activeTab === 'requests' ? 'active' : ''}>📩 Join Requests</li>
          <li onClick={() => setActiveTab('bookings')} className={activeTab === 'bookings' ? 'active' : ''}>📅 Bookings</li>
          <li onClick={() => setActiveTab('classes')} className={activeTab === 'classes' ? 'active' : ''}>🏋️ Classes</li>
        </ul>
      </aside>

      <main className="admin-content">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'requests' && <JoinRequests />}
        {activeTab === 'bookings' && <BookingManagement />}
        {activeTab === 'classes' && <ClassManagement />}
      </main>
    </div>
  );
}

export default AdminDashboard;
