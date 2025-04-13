import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addExpense,editExpense,deleteExpense,loadExpenses,} from '../../redux/expensesSlice';
import {addToQueue,clearQueue,setStatus,} from '../../redux/syncSlice';
import useSyncListener from '../../hooks/useSyncListener';
import ExpenseItem from './ExpenseItem';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
  const dispatch = useDispatch();
  useSyncListener();

  const expenses = useSelector((state) => state.expenses);
  const { isOnline, syncQueue, status } = useSelector((state) => state.sync);
 

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    dispatch(loadExpenses(savedExpenses));
  }, [dispatch]);

  useEffect(() => {
    if (isOnline && syncQueue.length > 0) {
      dispatch(setStatus('Syncing...'));
  
      setTimeout(() => {
        syncQueue.forEach((action) => {
          if (action.type === 'add') dispatch(addExpense(action.data));
          else if (action.type === 'edit') dispatch(editExpense(action.data));
          else if (action.type === 'delete') dispatch(deleteExpense(action.data));
        });
  
        dispatch(clearQueue());
  
     
        setTimeout(() => {
          dispatch(setStatus('Synced'));
        }, 500); // slight delay to avoid instant switch from Syncing to Synced
      }, 1500);
    }
  }, [isOnline, syncQueue, dispatch]);
  

  const handleAddExpense = (expense) => {
    console.log(isOnline)
    if (isOnline) {
        console.log('Online, adding to mainExpense:', expense);
      dispatch(addExpense(expense));
    } else {
      console.log(isOnline)
       console.log('Offline, adding to queue:', expense);
      dispatch(addToQueue({ type: 'add', data: expense }));
    }
  };

  const handleEditExpense = (updatedExpense) => {
    if (isOnline) {
      dispatch(editExpense(updatedExpense));
    } else {
      dispatch(addToQueue({ type: 'edit', data: updatedExpense }));
    }
  };

  const handleDeleteExpense = (expenseId) => {
    if (isOnline) {
      dispatch(deleteExpense(expenseId));
    } else {
      dispatch(addToQueue({ type: 'delete', data: expenseId }));
    }
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
            onSave={editingExpense ? handleEditExpense : handleAddExpense}
          />
        </div>
      )}

    
      {status === 'Syncing...' && (
  <div className="text-yellow-400 text-center my-2">
    Syncing pending changes...
  </div>
)}
{status === 'Synced' && (
  <div className="text-green-400 text-center my-2">
    All changes synced successfully.
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
              onDelete={handleDeleteExpense}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
