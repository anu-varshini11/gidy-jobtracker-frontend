import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // Base API (do NOT include /api here)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid credentials');
      } else {
        // Save token and userName
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user?.name || data.user?.username || '');

        // Hard reload so top-level App sees updated localStorage and routes to Home
        window.location.href = '/';
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {error && <small style={{ color: 'red' }}>{error}</small>}
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
