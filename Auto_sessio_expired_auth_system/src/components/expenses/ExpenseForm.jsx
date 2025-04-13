import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const categories = ['Food', 'Transport', 'Shopping', 'Health', 'Bills', 'Other'];

const ExpenseForm = ({ editingExpense, onClose,onSave }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date.split('T')[0]
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, amount, category, date } = form;
    if (!title || !amount || !category || !date) return;

    const expense = {
      id: editingExpense ? editingExpense.id : uuidv4(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date(date).toISOString()
    };

    onSave(expense);

    setForm({ title: '', amount: '', category: '', date: '' });
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-700 p-6 rounded-md shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold mb-2">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <div>
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
      </div>

      <div>
        <label>Amount</label>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
      </div>

      <div>
        <label>Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        >
          <option value="">-- Select --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Date</label>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded font-bold"
      >
        {editingExpense ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
