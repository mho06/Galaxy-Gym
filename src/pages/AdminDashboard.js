import React, { useState } from 'react';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>👤 Users</li>
          <li onClick={() => setActiveTab('bookings')} className={activeTab === 'bookings' ? 'active' : ''}>📅 Bookings</li>
          <li onClick={() => setActiveTab('classes')} className={activeTab === 'classes' ? 'active' : ''}>🏋️ Classes</li>
        </ul>
      </aside>

      <main className="admin-content">
        {activeTab === 'users' && (
          <>
            <h3>Manage Users</h3>
            <p>[Placeholder] List of all registered users with roles and actions</p>
          </>
        )}

        {activeTab === 'bookings' && (
          <>
            <h3>View Bookings</h3>
            <p>[Placeholder] All user bookings will be displayed here</p>
          </>
        )}

        {activeTab === 'classes' && (
          <>
            <h3>Manage Classes</h3>
            <p>[Placeholder] Admin can add/edit/delete class listings</p>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
