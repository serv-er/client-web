import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();

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
        margin: '0 auto'
      }}
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}
      >
        Auto Session Expiring Auth System
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
        This app demonstrates login authentication with a 10-minute auto session timeout.
        A countdown timer runs live on the Dashboard page.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ fontWeight: 'bold', fontSize: '1.1rem' }}
      >
        Wanna have a look? Go and Signup now!
      </motion.p>

      <motion.button
        onClick={() => navigate('/signup')}
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
        Go to Signup
      </motion.button>
    </motion.section>
  );
};

export default HeroSection;
