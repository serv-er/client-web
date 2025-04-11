import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Login | MyAuth ✨";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      const session = {
        timestamp: Date.now(),
        expiresIn: 10 * 60 * 1000,
      };
      localStorage.setItem('session', JSON.stringify(session));

      dispatch(login(user));
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
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
          Welcome Back 👋
        </h2>
        {error && (
          <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </motion.button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{ color: '#00BFFF', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
