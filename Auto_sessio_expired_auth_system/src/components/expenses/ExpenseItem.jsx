import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../../redux/expensesSlice';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';

const ExpenseItem = ({ expense, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(deleteExpense(expense.id));
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      <div>
        <h3 className="text-lg font-bold">{expense.title}</h3>
        <p className="text-sm text-gray-300">₹{expense.amount.toFixed(2)}</p>
        <p className="text-sm text-gray-400">{expense.category}</p>
        <p className="text-xs text-gray-500">
          {format(new Date(expense.date), 'dd MMM yyyy')}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(expense)}
          className="text-blue-400 hover:text-blue-600"
        >
          <Pencil size={20} />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-600"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
