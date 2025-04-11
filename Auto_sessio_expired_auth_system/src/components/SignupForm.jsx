import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignupForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Signup | MyAuth ✨";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password) {
      setError('All fields are required!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find((user) => user.email === email)) {
      setError('User already exists with this email.');
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #232526, #414345)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: '#1c1c1c',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 0 30px rgba(0, 191, 255, 0.3)',
          width: '100%',
          maxWidth: '400px',
          color: '#fff'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
          Create Account ✨
        </h2>
        {error && (
          <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginTop: '0.3rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginTop: '0.3rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginTop: '0.3rem'
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#00BFFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </motion.button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: '#00BFFF', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupForm;
