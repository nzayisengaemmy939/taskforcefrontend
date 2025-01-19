import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import { getTransactions, updateTransaction } from "../../api service/transactions/transaction";
import { CircularProgress } from "@mui/material";
import { registerTransactions } from "../../api service/transactions/transaction";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../../api service/auth/auth";
import { toast, ToastContainer } from "react-toastify";
import EditTransactionModal from "./editTransaction";
import { deleteTransaction } from "../../api service/transactions/transaction";
import DeleteModal from "./deleteModel";

const TransactionManagement = () => {
 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  

  useEffect(() => {
    getTransactions(setTransactions, setIsLoading);
  }, []);

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "",
    subcategory: "",
    account: "",
    description: "",
    type: "",
  });
  const [, setErrors] = useState({
    date: "",
    amount: "",
    category: "",
    subcategory: "",
    account: "",
    description: "",
    type: "",
  });
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.date) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required.";
      isValid = false;
    } else if (isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = "Amount must be a positive number.";
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
      isValid = false;
    }
    if (!formData.subcategory) {
      newErrors.category = "subcategory is required.";
      isValid = false;
    }

    if (!formData.account) {
      newErrors.account = "Account is required.";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const categories = ["food", "salary"];
  const accountTypes = ["Bank", "Mobile money", "Cash"];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      await registerTransactions(formData, setIsLoading);
      setIsFormOpen(false);
      setEditingTransaction(null);
      setFormData({
        date: "",
        amount: "",
        category: "",
        accountType: "",
        description: "",
      });
    }
  };



  const handleEdit = async(transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };

  const handleSaveEdit = async(updatedTransactionData,transactionId) => {
 
    console.log('Updated transaction:',updatedTransactionData);
const isUpdated = await updateTransaction(transactionId, updatedTransactionData, setIsLoading);

    if (isUpdated) {
   
      toast.success("Transaction updated successfully.");
    } else {
   
      toast.error("Failed to update transaction.");
    }
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };

  const handleDeleteClick = (transactionId) => {
    setTransactionToDelete(transactionId);
    setIsDeleteModalOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (transactionToDelete) {
      const isDeleted = await deleteTransaction(transactionToDelete, setIsLoading);
  
      if (isDeleted) {
        setTransactions((prevTransactions) =>
          prevTransactions.filter((txn) => txn.id !== transactionToDelete)
        );
        toast.success("Transaction deleted successfully.");
      } else {
        toast.error("Failed to delete transaction.");
      }
      setTransactionToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };
  
  const handleCloseDeleteModal = () => {
    setTransactionToDelete(null);
    setIsDeleteModalOpen(false);
  };
  
  return (
    <div className="p-4 min-h-screen mx-auto">
      <ToastContainer></ToastContainer>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Transaction Management</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center text-sm"
          >
            <Plus size={16} className="mr-2" />
            Add Transaction
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full px-8 py-2 border rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-2 top-2.5 text-gray-400"
              size={16}
            />
          </div>

          <div className="flex gap-2">
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg text-sm"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
            {/* <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg text-sm"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            /> */}
          </div>

          <select
            className="w-full px-3 py-2 border rounded-lg text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="w-full px-3 py-2 border rounded-lg text-sm"
            value={selectedAccountType}
            onChange={(e) => setSelectedAccountType(e.target.value)}
          >
            <option value="all">All Accounts</option>
            {accountTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="text-xl font-bold px-2">Transactions</h2>
            <table className="min-w-full table-auto mt-4">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Description</th>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Subcategory</th>
                  <th className="py-2 px-4 text-left">Type</th>
                  <th className="py-2 px-4 text-left">Account Type</th>
                  <th className="py-2 px-4 text-center">Amount</th>
                  <th className="py-2 px-4 text-center">Created at</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-4 text-center text-gray-500">
                      No transactions available.
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-1 px-2">
                        {format(new Date(transaction.date), "MM/dd/yy")}
                      </td>
                      <td className="py-1 px-2">{transaction.description}</td>
                      <td className="py-1 px-2">
                        <span
                          className={`px-1 py-0.5 rounded-full text-xs ${
                            transaction.category === "Income"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {transaction.category}
                        </span>
                      </td>
                      <td className="py-1 px-2">{transaction.subcategory}</td>
                      <td className="py-1 px-2">{transaction.type}</td>
                      <td className="py-1 px-2 text-center">
                        {transaction.account}
                      </td>
                      <td
                        className={`py-1 px-2 text-center ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        ${Math.abs(transaction.amount).toLocaleString()}
                      </td>
                      <td
                        className={`py-1 px-2 text-center `}
                      >
                     {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-1 px-2 text-center">
                        <button onClick={() => handleEdit(transaction)} className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs hover:bg-green-600 focus:outline-none">
                          Edit
                        </button>
                        <button    onClick={() => handleDeleteClick(transaction._id)} className="bg-red-500 text-white px-2 py-1 ml-2  text-xs rounded-lg hover:bg-red-600 focus:outline-none">
                          Delete
                        </button>
                      </td>
                    </tr>
                    
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isEditModalOpen && editingTransaction && (
  <EditTransactionModal
    isOpen={isEditModalOpen}
    transaction={editingTransaction}
    onClose={handleCloseEditModal}
    onSave={handleSaveEdit}
  />
)}
{
  isDeleteModalOpen&&(
    <DeleteModal
    open={isDeleteModalOpen}
    onClose={handleCloseDeleteModal}
    onDelete={handleDeleteConfirm}
  />
  )
}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black z-50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {editingTransaction ? "Edit Transaction" : "Add Transaction"}
              </h2>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingTransaction(null);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-2">
              <div>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  type="number"
                  required
                  step="0.01"
                  min={1}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={formData.amount}
                  placeholder="Amount"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <select
                  required
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div>
                  <select
                    required
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    value={formData.account}
                    onChange={(e) =>
                      setFormData({ ...formData, account: e.target.value })
                    }
                  >
                    <option value="">Select Account</option>
                    {accountTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={formData.subcategory}
                  placeholder="Subcategory"
                  onChange={(e) =>
                    setFormData({ ...formData, subcategory: e.target.value })
                  }
                />
              </div>

              <div>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Select Type</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expenses</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={formData.description}
                  placeholder="Description"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                {editingTransaction ? "Update Transaction" : "Add Transaction"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
