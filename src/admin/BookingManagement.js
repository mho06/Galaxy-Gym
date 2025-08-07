import React, { useEffect, useState } from 'react';
import '../styles/AdminStyles.css';


function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/admin/bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      setBookings(prev => prev.filter(b => b._id !== bookingId));
    } catch (err) {
      console.error('Failed to cancel booking:', err);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="admin-section">
      <h3>📅 Manage Bookings</h3>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Class</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.userName || 'Unknown'}</td>
                <td>{booking.className}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="danger-btn"
                  >
                    🗑 Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingManagement;
