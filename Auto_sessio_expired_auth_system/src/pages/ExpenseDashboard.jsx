import React from 'react';
import ExpenseList from '../components/expenses/ExpenseList';


const ExpenseDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">💰 Expense Tracker</h1>
        </div>
        <ExpenseList  />
      </div>
    </div>
  );
};

export default ExpenseDashboard;
