import React, { useState } from 'react';
import '../styles/Auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
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
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        credentials: 'include', // ✅ Send cookies
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw Error(data.error || 'Login failed');
      setUser(data.user); // 👈 set user immediately
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button className="auth-btn" type="submit">Login</button>

          <p className="switch-text">Don’t have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
