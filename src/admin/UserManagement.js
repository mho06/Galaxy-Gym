import React, { useEffect, useState, useMemo } from 'react';
import '../styles/AdminStyles.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  useEffect(() => {
    fetch('/api/admin/users', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return users;
    return users.filter(u =>
      (u.name || '').toLowerCase().includes(term) ||
      (u.email || '').toLowerCase().includes(term) ||
      (u.role || '').toLowerCase().includes(term)
    );
  }, [q, users]);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="admin-section">
      <div className="admin-toolbar">
        <h3>👤 Manage Users</h3>
        <input
          className="admin-search"
          type="text"
          placeholder="Search by name, email, or role…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="admin-table pretty">
          <thead>
            <tr>
              <th style={{width: '28%'}}>Name</th>
              <th style={{width: '36%'}}>Email</th>
              <th style={{width: '16%'}}>Role</th>
              <th style={{width: '20%'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u._id}>
                <td>{u.name || '—'}</td>
                <td className="mono">{u.email || '—'}</td>
                <td>
                  <span className={`badge ${u.role === 'admin' ? 'badge-admin' : 'badge-member'}`}>
                    {u.role}
                  </span>
                </td>
                <td>
                  <button className="btn sm">Promote</button>
                  <button className="btn sm danger">Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#777' }}>
                  No users match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
