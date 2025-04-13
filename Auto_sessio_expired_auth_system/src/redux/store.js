// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expensesReducer from './expensesSlice';
import syncReducer from './syncSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    sync:syncReducer

  }
});
