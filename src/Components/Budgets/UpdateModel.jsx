import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { X } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateModel = ({ budgetId, setIsModalOpen }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recurringType, setRecurringType] = useState('weekly');
  
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const frontend = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${frontend}/budget/single/${budgetId}`);
        const budget = response.data.budget;
        setCategory(budget.category);
        setAmount(budget.amount);
        setStartDate(budget.startDate.split('T')[0]); 
        setEndDate(budget.endDate.split('T')[0]); 
        setRecurringType(budget.recurringType);
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };

    if (budgetId) {
      fetchBudget();
    }
  }, [budgetId]);

 
  const handleUpdateBudget = async () => {
   

    setLoading(true);
    try {
        const frontend = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.put(`${frontend}/budget/update/${budgetId}`, {
        category,
        amount,
        startDate,
        endDate,
        recurringType,
      });

      toast.success(response.data.message);
      setIsModalOpen2(false); 
    } catch (error) {
      console.error('Error updating budget:', error);
      toast.error('Failed to update the budget.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal=()=>{
    setIsModalOpen(false)
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center h-screen z-50">
        <ToastContainer></ToastContainer>
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Update Budget</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-red-600"
          >
            <X onClick={closeModal}/>
          </button>
        </div>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full p-2 border rounded-md mb-2"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount of budget"
          className="w-full p-2 border rounded-md mb-2"
        />
        <label className="text-gray-600">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <label className="text-gray-600">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <select
          value={recurringType}
          onChange={(e) => setRecurringType(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button
          onClick={handleUpdateBudget}
          className="w-full bg-blue-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Budget'}
        </button>
      </div>
    </div>
  );
};

export default UpdateModel;
