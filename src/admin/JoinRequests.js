import React, { useEffect, useState } from 'react';
import '../styles/AdminStyles.css';

function JoinRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/admin/requests');
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error('Failed to load requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await fetch(`/api/admin/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action }),
      });

      // Update UI
      setRequests(prev =>
        prev.map(r =>
          r._id === id ? { ...r, status: action } : r
        )
      );
    } catch (err) {
      console.error(`Failed to ${action} request:`, err);
    }
  };

  if (loading) return <p>Loading join requests...</p>;

  return (
    <div className="admin-section">
      <h3>📩 Join Requests</h3>
      {requests.length === 0 ? (
        <p>No join requests found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Requested Class</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.userName || 'Unknown'}</td>
                <td>{req.requestedClass}</td>
                <td>{req.status}</td>
                <td>
                  {req.status === 'pending' ? (
                    <>
                      <button onClick={() => handleAction(req._id, 'approved')}>
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleAction(req._id, 'denied')}
                        className="danger-btn"
                      >
                        ❌ Deny
                      </button>
                    </>
                  ) : (
                    <span style={{ fontStyle: 'italic', color: 'gray' }}>{req.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default JoinRequests;
