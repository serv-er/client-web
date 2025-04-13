import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, expireSession } from '../redux/authSlice';
import { useNavigate,Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ExpenseDashboard from '../pages/ExpenseDashboard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, sessionExpired } = useSelector((state) => state.auth);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showToast, setShowToast] = useState(false);


   useEffect(() => {
      document.title = "Session Dashboard | MyAuth ✨";
    }, []);

  const getRemainingTime = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) return 0;
    return Math.max(0, session.expiresIn - (Date.now() - session.timestamp));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const remaining = getRemainingTime();
    if (remaining <= 0) {
      dispatch(expireSession());
      localStorage.removeItem('session');
      setShowToast(true);
      return;
    }

    setTimeLeft(remaining);

    const timeout = setTimeout(() => {
      dispatch(expireSession());
      localStorage.removeItem('session');
      setShowToast(true);
    }, remaining);

    const interval = setInterval(() => {
      const updated = getRemainingTime();
      setTimeLeft(updated);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [dispatch, user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('session');
    navigate('/login');
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const radius = 60;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = timeLeft / (10 * 60 * 1000); // 10 minutes

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-900 flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black bg-opacity-10 text-white backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-semibold mb-2">Welcome, {user.name} 👋</h2>
        <p className="mb-6 text-sm">Session expires in:</p>

        {/* Animated circular timer */}
        <motion.div className="mx-auto mb-6 relative w-[140px] h-[140px]">
          <svg height="140" width="140">
            <circle
              stroke="#ccc"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="70"
              cy="70"
            />
            <motion.circle
              stroke="#00BFFF"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              r={normalizedRadius}
              cx="70"
              cy="70"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress * circumference}
              initial={false}
              animate={{ strokeDashoffset: circumference - progress * circumference }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex justify-center items-center text-xl font-bold">
            {formatTime(timeLeft)}
          </div>
        </motion.div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition px-6 py-2 rounded-full text-white font-semibold"
        >
          Logout
        </button>
        <button onClick={() => navigate('/expensesDashboard')} style={{ marginTop: '1rem' }}  className="bg-red-500 hover:bg-red-600 transition px-6 py-2 rounded-full text-white font-semibold">
  Manage Expenses 💼
</button>
      </motion.div>

      {/* Toast on session expiration */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            Session expired. Please log in again.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
