import React, { useState } from 'react';
import '../styles/Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
    // TODO: Send to backend
  };

  return (
    <div className="auth-container">
      <h2>Member Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          type="email" 
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label>Password</label>
        <input 
          type="password" 
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit" className="auth-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
