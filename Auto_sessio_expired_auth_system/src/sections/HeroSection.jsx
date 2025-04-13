import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setShowGreeting(true);
      const timer = setTimeout(() => {
        setShowGreeting(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '700px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Greeting Card */}
      {showGreeting && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: '20%',
            // left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            backgroundColor: '#1e1e2f',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            textAlign: 'center',
            color: '#ffffff',
            maxWidth: '90%',
            width: '400px',
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
            💰 Welcome back, {user?.name || 'Saver'}!
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Ready to take control of your finances? Let's track those expenses, manage your budget, and build a smarter money habit—one step at a time!
          </p>
          <p style={{ fontSize: '1rem', marginTop: '1rem', fontStyle: 'italic' }}>
            "Every penny tracked is a step toward freedom 💸"
          </p>
          <button
            onClick={() => setShowGreeting(false)}
            style={{
              marginTop: '1.5rem',
              padding: '0.6rem 1.2rem',
              backgroundColor: '#00BFFF',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Start Managing 🚀
          </button>
        </motion.div>
      )}

      {/* Dynamic Hero Content */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}
      >
        {isAuthenticated
          ? 'Great to see you again!'
          : 'Auto Session Expiring Auth System'}
      </motion.h1>

      <motion.p
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          fontSize: '1.2rem',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}
      >
        {isAuthenticated
          ? "You received a warm greeting — now it's time to conquer your expenses like a pro! 💼💸"
          : "This app demonstrates login authentication with a 10-minute auto session timeout. A countdown timer runs live on the Dashboard page."}
      </motion.p>

      {!isAuthenticated && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ fontWeight: 'bold', fontSize: '1.1rem' }}
        >
          Wanna have a look? Go and Signup now!
        </motion.p>
      )}

      <motion.button
        onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}
      >
        {isAuthenticated ? 'Go to Dashboard' : 'Sign Up'}
      </motion.button>
    </motion.section>
  );
};

export default HeroSection;
