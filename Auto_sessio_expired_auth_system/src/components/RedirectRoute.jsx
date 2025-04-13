import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    // If already logged in, redirect to the home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectRoute;
