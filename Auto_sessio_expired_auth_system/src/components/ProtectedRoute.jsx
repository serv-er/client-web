import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const sessionExpired = useSelector((state) => state.auth.sessionExpired);

  if (!isAuthenticated || sessionExpired) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
