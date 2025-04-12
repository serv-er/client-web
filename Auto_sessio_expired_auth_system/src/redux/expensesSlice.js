import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: savedExpenses,
  reducers: {
    addExpense: (state, action) => {
      const newExpense = { ...action.payload, id: uuidv4() };
      state.push(newExpense);
      localStorage.setItem('expenses', JSON.stringify(state));
    },
    editExpense: (state, action) => {
      const index = state.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...action.payload };
        localStorage.setItem('expenses', JSON.stringify(state));
      }
    },
    deleteExpense: (state, action) => {
      const filtered = state.filter(exp => exp.id !== action.payload);
      localStorage.setItem('expenses', JSON.stringify(filtered));
      return filtered;
    },
    loadExpenses: (state, action) => {
      return action.payload;
    }
  }
});

export const { addExpense, editExpense, deleteExpense, loadExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
