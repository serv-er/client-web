import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense, editExpense, deleteExpense, loadExpenses } from '../../redux/expensesSlice';
import ExpenseItem from './ExpenseItem';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
  const dispatch = useDispatch();

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    dispatch(loadExpenses(savedExpenses));
  }, [dispatch]);

  const expenses = useSelector((state) => state.expenses); // Fixed state access
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleAddExpense = (expense) => {
    dispatch(addExpense(expense)); // Dispatch add action
  };

  const handleEditExpense = (updatedExpense) => {
    dispatch(editExpense(updatedExpense)); // Dispatch edit action
  };

  const handleDeleteExpense = (expenseId) => {
    dispatch(deleteExpense(expenseId)); // Dispatch delete action
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">My Expenses</h2>
        <button
          onClick={() => {
            setEditingExpense(null);
            setIsFormOpen(!isFormOpen);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
        >
             {isFormOpen ? 'Close' : 'Add Expense'}
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-6">
          <ExpenseForm
            editingExpense={editingExpense}
            onClose={() => setIsFormOpen(false)}
            onSave={editingExpense ? handleEditExpense : handleAddExpense} // Add or edit expense
          />
        </div>
      )}

      {expenses.length === 0 ? (
        <p className="text-gray-400">No expenses found. Add one above!</p>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={handleDeleteExpense} // Handle delete action
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
