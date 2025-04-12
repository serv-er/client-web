import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import ExpenseDashboard from './pages/ExpenseDashboard';
import ExpenseForm from './components/expenses/ExpenseForm';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
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
