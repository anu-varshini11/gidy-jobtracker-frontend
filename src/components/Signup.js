import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null); // null, true, false

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });

    if (name === 'username' && value.length >= 3) checkUsername(value);
    else if (name === 'username') setUsernameAvailable(null);
  };

  const checkUsername = async username => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/check-username/${username}`);
    const data = await res.json();
    setUsernameAvailable(data.available);
  } catch (err) {
    console.error(err);
    setUsernameAvailable(null);
  }
};

const handleSubmit = async e => {
  e.preventDefault();
  let tempErrors = {};
  if (!form.name.trim()) tempErrors.name = 'Name cannot be empty';
  if (!form.username) tempErrors.username = 'Username required';
  else if (!/^[A-Za-z][A-Za-z0-9]{2,}$/.test(form.username))
    tempErrors.username = 'Username must start with a letter and have at least 3 characters';
  if (!form.password) tempErrors.password = 'Password required';
  else if (form.password.length < 6) tempErrors.password = 'Password must be at least 6 characters';

  if (Object.keys(tempErrors).length > 0) {
    setErrors(tempErrors);
    return;
  }

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setErrors({ general: data.message || 'Signup failed' });
    } else {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user.name);
      navigate('/'); // Redirect to Home
    }
  } catch (err) {
    console.error(err);
    setErrors({ general: 'Server error' });
  }
};


  return (
    <div className="form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}

        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <small>Must start with a letter, minimum 3 characters, letters/numbers allowed.</small>
        {usernameAvailable === true && <span style={{ color: 'green' }}>✔ Username available</span>}
        {usernameAvailable === false && <span style={{ color: 'red' }}>❌ Username taken</span>}
        {errors.username && <small style={{ color: 'red' }}>{errors.username}</small>}

        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <small>Minimum 6 characters</small>
        {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}

        {errors.general && <small style={{ color: 'red' }}>{errors.general}</small>}

        <button type="submit">Sign Up</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default Signup;
