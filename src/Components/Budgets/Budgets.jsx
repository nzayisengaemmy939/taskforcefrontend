import { Copy, Edit, Pencil, Trash, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import addCategoryToBudget, {
  deleteBudget,
  getBudgets,
  registerBudget,
} from "../../api service/budget/budget";
import { data } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../Transactions/deleteModel";
import UpdateModel from "./UpdateModel";
import CategoryModal from "./CategoryModal";

const Budgets = () => {
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [recurringType, setRecurringType] = useState("weekly");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [budgetToDelete, setTransactionToDelete] = useState(null);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);

  const [loading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleOpenCategoryModal = (budget) => {
    console.log("Opening Category Modal for Budget:", budget);
    setSelectedBudget(budget);
    setIsCategoryModalOpen(true);
  };
  const catesub = {
    category,
  };

  const formData = {
    amount,
    category,
    startDate,
    endDate,
    recurringType,
  };
  const handleGenerateBudget = async () => {
    if (!amount || !category || !startDate || !endDate) {
      toast.error("Fill all field");
      return 0;
    }
    await registerBudget(formData, setIsLoading);
    setIsModalOpen(false);
  };
  useEffect(() => {
    getBudgets(setData, setIsLoading);
  }, []);
  const copyBudgetIdToClipboard = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        alert(`Budget ID ${id} copied to clipboard!`);
      })
      .catch((error) => {
        alert("Failed to copy budget ID: ", error);
      });
  };

  const handleDeleteClick = (transactionId) => {
    setTransactionToDelete(transactionId, setIsLoading);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (budgetToDelete) {
      const isDeleted = await deleteBudget(budgetToDelete, setIsLoading);

      if (isDeleted) {
        setData((prevTransactions) =>
          prevTransactions.filter((txn) => txn.id !== budgetToDelete)
        );
        toast.success("Budget deleted successfully.");
      } else {
        toast.error("Failed to delete budget.");
      }
      setTransactionToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setTransactionToDelete(null);
    setIsDeleteModalOpen(false);
  };
  const handleEditBudget = (id) => {
    setSelectedBudgetId(id);
    setIsModalOpen2(true);
  };

  return (
    <div className="p-2">
      <ToastContainer></ToastContainer>
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
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Budget"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="w-full text-center py-4">
          {" "}
          <CircularProgress />
        </div>
      ) : data.length > 0 ? (
        <div className="w-full mt-6 overflow-x-auto bg-white rounded-md">
          <table className="w-full">
            <thead>
              <tr className="border-b hover:bg-gray-50">
                <th className="p-2 text-left">Budget ID</th>
                <th className="p-2 text-left">Budget Name</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Spent</th>
                <th className="p-2 text-left">Remaining</th>
                <th className="p-2 text-left">Start</th>
                <th className="p-2 text-left">End</th>
                <th className="p-2 text-left">Recurring Type</th>
                {/* <th className="p-2 text-left">Created At</th> */}
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((budget) => (
                <tr key={budget._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <button
                      className="flex gap-2 items-center"
                      onClick={() => copyBudgetIdToClipboard(budget._id)}
                    >
                      <span>{budget._id}</span>{" "}
                      <Copy className="text-blue-500" size={15} />
                    </button>
                  </td>
                  <td className="p-2">{budget.category}</td>

                  <td className="p-2">{budget.amount}</td>
                  <td className="p-2 text-red-400">{budget.spent}</td>
                  <td className="p-2 text-green-400">{budget.remaining}</td>
                  <td className="p-2">
                    {new Date(budget.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {new Date(budget.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-2">{budget.recurringType}</td>
                  {/* <td className="p-2">
                    {new Date(budget.createdAt).toLocaleDateString()}
                  </td> */}
                  <td className="p-2 flex items-center">
                    <button
                      onClick={() => handleDeleteClick(budget._id)}
                      className="bg-red-200 text-red-500 px-1 py-1 ml-2 text-xs rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      <Trash />
                    </button>
                    <button
                      className="bg-green-200 text-green-500 px-1 py-1 rounded-md mr-2"
                      onClick={() => handleEditBudget(budget._id)}
                    >
                      <Pencil />
                    </button>
                    <button
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md"
                      onClick={() => handleOpenCategoryModal(budget)}
                    >
                      Manage category
                    </button>
                    {isModalOpen2 && (
                      <UpdateModel
                        budgetId={selectedBudgetId}
                        setIsModalOpen={setIsModalOpen2}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full text-center py-4">No budgets available</div>
      )}
      {isCategoryModalOpen && (
        <CategoryModal
          isOpen={isCategoryModalOpen}
          budget={selectedBudget}
          onClose={() => setIsCategoryModalOpen(false)}
          onAddCategory={(budgetId, categoryName, subcategories) => {
            addCategoryToBudget(budgetId, categoryName, subcategories).then(
              () => toast.success("Category added successfully")
            );
            setIsCategoryModalOpen(false).catch((error) => {
              console.error("Error adding category:", error);
              toast.error(error.message);
            });
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default Budgets;
