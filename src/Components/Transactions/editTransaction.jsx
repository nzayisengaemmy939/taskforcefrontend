import { X } from 'lucide-react';
import React from 'react';

const EditTransactionModal = ({ isOpen, transaction, onClose, onSave }) => {
    const categories = ["food", "salary"];
    const accountTypes = ["Bank", "Mobile money", "Cash"];
  const [formData, setFormData] = React.useState({
    date: transaction.date || '',
    amount: transaction.amount || '',
    category: transaction.category || '',
    subcategory: transaction.subcategory || '',
    account: transaction.account || '',
    type: transaction.type || '',
    description: transaction.description || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData,transaction._id);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black z-50 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Edit Transaction</h2>
            <button onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <select
                required
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
              </select>
            </div>

            <div>
              <select
                required
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={formData.account}
                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
              >
                <option value="">Select Account</option>
                {accountTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={formData.subcategory}
                placeholder="Subcategory"
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              />
            </div>

            <div>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">Select Type</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            <div>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={formData.description}
                placeholder="Description"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default EditTransactionModal;
