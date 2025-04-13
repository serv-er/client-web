import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../redux/authSlice'; 

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        <Link to="/"> 🔐 MyExpenses</Link>
      </div>
      <div style={{ fontSize: '1.1rem', marginTop: '0.5rem', cursor: 'pointer' }}>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <button
        onClick={isAuthenticated ? handleLogout : () => navigate('/signup')}
        style={{
          padding: '0.5rem 1.2rem',
          cursor: 'pointer',
          backgroundColor: '#00BFFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          marginTop: '0.5rem',
        }}
      >
        {isAuthenticated ? 'Logout' : 'Signup'}
      </button>
    </nav>
  );
};

export default Navbar;
