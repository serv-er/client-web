import React from 'react';
import Navbar from '../sections/Navbar';
import HeroSection from '../sections/HeroSection';

const Home = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Home;
