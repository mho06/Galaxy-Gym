import React, { useState, useContext } from 'react';
import '../styles/Auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
  const data = await res.json();
  console.log('LOGIN RESPONSE:', data); // debug check
  setUser(data.user);

  // ✅ Redirect based on role
  if (data.user.role && data.user.role.toLowerCase() === 'admin') {
    navigate('/admin');
  } else {
    navigate('/dashboard');
  }
}
 else {
      const errorText = await res.text();
      throw new Error(
        res.status === 404
          ? 'Server not found. Are you connected to the right network?'
          : `Login failed: ${errorText.includes('<!DOCTYPE') ? 'Unexpected server response' : errorText}`
      );
    }
  } catch (err) {
    setError(err.message || 'Login failed. Please try again.');
  }
};


  return (
    <div className="auth-page">
      <div className="auth-left login-bg"></div>
      <div className="auth-right">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to your Galaxy Gym account</p>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button className="auth-btn" type="submit">Login</button>

          <p className="switch-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
