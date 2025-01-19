import { Copy, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getBudgets, registerBudget } from "../../api service/budget/budget";
import { data } from "react-router-dom";
import { CircularProgress } from "@mui/material";


const Budgets = () => {
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [recurringType, setRecurringType] = useState("weekly");
  const [budget, setBudget] = useState([]); 
 const [loading, setIsLoading] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false); 


  const formData = {
    amount,
    category,
    startDate,
    endDate,
    recurringType,
  };
  const handleGenerateBudget = async() => {
    if (!amount || !category || !startDate || !endDate) {
     
    }
    await registerBudget(formData,setIsLoading)
    

  }
  useEffect(()=>{
    getBudgets(setData,setIsLoading)
  },[])
  const copyBudgetIdToClipboard = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      alert(`Budget ID ${id} copied to clipboard!`);
    }).catch((error) => {
      alert("Failed to copy budget ID: ", error);
    });
  };
 
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Budgets</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Add Budget
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center top-[-24px] h-screen z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96 float-none">
            <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Generate Budget</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-red-600"
            >
              <X></X>
            </button>
              </div>
           
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="category"
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount of budget"
              className="w-full p-2 border rounded-md mb-2"
            />
            <label className="text-gray-600">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="start date"
              className="w-full p-2 border rounded-md mb-2"
            />
               <label className="text-gray-600">End date</label>
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
              onClick={handleGenerateBudget}
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            disabled={loading}>
              {loading ? "Generating..." : "Generate Budget"}
            </button>
           
          </div>
        </div>
      )}

{loading ? (
        <div className="w-full text-center py-4"> <CircularProgress /></div>
      ) : data.length > 0 ? (
        <table className="w-full mt-6 bg-white rounded-md">
          <thead>
            <tr className="border-b hover:bg-gray-50">
              <th className="p-2 text-left">Budget ID</th>
              <th className="p-2 text-left">category</th>
              <th className="p-2 text-left">Total Income</th>
              <th className="p-2 text-left">Start Date</th>
              <th className="p-2 text-left">End Date</th>
              <th className="p-2 text-left">Recurring Type</th>
              <th className="p-2 text-left">Created At</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((budget) => (
              <tr key={budget._id} className="border-b hover:bg-gray-50">
                <td className="p-2"> <td className="p-2">
               
                  <button
                    className="flex gap-2 items-center"
                    onClick={() => copyBudgetIdToClipboard(budget._id)}
                  >
                    <span>{budget._id}</span> <Copy className="text-blue-500" size={15}/>
                  </button>
                </td></td> 
                <td className="p-2">{budget.category}</td>
                <td className="p-2">{budget.amount}</td>
                <td className="p-2">{new Date(budget.startDate).toLocaleDateString()}</td>
                <td className="p-2">{new Date(budget.endDate).toLocaleDateString()}</td>
                <td className="p-2">{budget.recurringType}</td>
                <td className="p-2">{new Date(budget.createdAt).toLocaleDateString()}</td> {/* Display createdAt */}
                <td className="p-2">
                  <button
                    
                    className="bg-red-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                    onClick={() => alert("Edit functionality not implemented yet!")}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full text-center py-4">No budgets available</div>
      )}
    </div>
  );
};

export default Budgets;
