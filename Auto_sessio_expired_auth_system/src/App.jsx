import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectRoute from './components/RedirectRoute';
import Home from './components/Home';
import ExpenseDashboard from './pages/ExpenseDashboard';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signup" element={<RedirectRoute><SignupForm /></RedirectRoute>} />
        <Route path="/login" element={<RedirectRoute><LoginForm /></RedirectRoute>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route
          path="/expensesDashboard"
          element={
            <ProtectedRoute>
              <ExpenseDashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
