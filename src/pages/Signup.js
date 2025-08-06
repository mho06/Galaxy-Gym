import React, { useState } from 'react';
import '../styles/Auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);


  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        credentials: 'include', // ✅ Send cookies
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) throw Error(data.error || 'Signup failed');
      setUser(data.user);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left signup-bg"></div>
      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSignup}>
          <h2>Create Account</h2>
          <p className="subtitle">Join Galaxy Gym and start your transformation</p>

          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button className="auth-btn" type="submit">Sign Up</button>

          <p className="switch-text">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
