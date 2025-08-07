import React, { useEffect, useState } from 'react';
import '../styles/AdminStyles.css';

function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ name: '', instructor: '', time: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/admin/classes');
        const data = await res.json();
        setClasses(data);
      } catch (err) {
        console.error('Error fetching classes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Add new class
  const handleAddClass = async () => {
    if (!newClass.name || !newClass.instructor || !newClass.time) return alert("Fill all fields");

    try {
      const res = await fetch('/api/admin/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClass)
      });

      const added = await res.json();
      setClasses(prev => [...prev, added]);
      setNewClass({ name: '', instructor: '', time: '' });
    } catch (err) {
      console.error('Error adding class:', err);
    }
  };

  // Delete class
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;

    try {
      await fetch(`/api/admin/classes/${id}`, { method: 'DELETE' });
      setClasses(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error('Error deleting class:', err);
    }
  };

  // Save edited class
  const handleEditSave = async (id) => {
    const editedClass = classes.find(c => c._id === id);

    try {
      await fetch(`/api/admin/classes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedClass)
      });

      setEditingId(null);
    } catch (err) {
      console.error('Error updating class:', err);
    }
  };

  // Handle inline field change
  const handleChange = (id, field, value) => {
    setClasses(prev =>
      prev.map(c => c._id === id ? { ...c, [field]: value } : c)
    );
  };

  if (loading) return <p>Loading classes...</p>;

  return (
    <div className="admin-section">
      <h3>🏋️ Manage Classes</h3>

      {/* Add new class */}
      <div className="admin-form">
        <input
          type="text"
          placeholder="Class Name"
          value={newClass.name}
          onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Instructor"
          value={newClass.instructor}
          onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
        />
        <input
          type="text"
          placeholder="Time (e.g., Mon 5PM)"
          value={newClass.time}
          onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
        />
        <button onClick={handleAddClass}>➕ Add Class</button>
      </div>

      {/* Class list */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Instructor</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(cls => (
            <tr key={cls._id}>
              <td>
                {editingId === cls._id ? (
                  <input
                    value={cls.name}
                    onChange={(e) => handleChange(cls._id, 'name', e.target.value)}
                  />
                ) : cls.name}
              </td>
              <td>
                {editingId === cls._id ? (
                  <input
                    value={cls.instructor}
                    onChange={(e) => handleChange(cls._id, 'instructor', e.target.value)}
                  />
                ) : cls.instructor}
              </td>
              <td>
                {editingId === cls._id ? (
                  <input
                    value={cls.time}
                    onChange={(e) => handleChange(cls._id, 'time', e.target.value)}
                  />
                ) : cls.time}
              </td>
              <td>
                {editingId === cls._id ? (
                  <button onClick={() => handleEditSave(cls._id)}>💾 Save</button>
                ) : (
                  <button onClick={() => setEditingId(cls._id)}>✏️ Edit</button>
                )}
                <button onClick={() => handleDelete(cls._id)} className="danger-btn">🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassManagement;
