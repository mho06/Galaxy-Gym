import React, { useState } from 'react';
import '../styles/Auth.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup:', { name, email, password });
    // TODO: Send to backend
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type="text" 
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          required 
        />

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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit" className="auth-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
