import React, { useState } from "react";

const CategoryModal = ({ isOpen, budget, onClose, onAddCategory }) => {
  const [activeTab, setActiveTab] = useState("current");
  const [newCategory, setNewCategory] = useState("");
  const [subcategories, setSubcategories] = useState([""]);

  if (!isOpen || !budget) return null;

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, ""]);
  };

  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index] = value;
    setSubcategories(updatedSubcategories);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && subcategories.length > 0) {
      onAddCategory(budget._id, newCategory, subcategories);
      setNewCategory("");
      setSubcategories([""]);
      setActiveTab("current");
    } else {
      alert("Please enter both category and at least one subcategory.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 t-[-26px]">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
        <div className="flex mb-4 border-b">
          <button
            className={`p-2 flex-1 text-center ${
              activeTab === "current"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("current")}
          >
            Current Categories
          </button>
          <button
            className={`p-2 flex-1 text-center ${
              activeTab === "add"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("add")}
          >
            Add Category
          </button>
        </div>
        {activeTab === "current" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Categories:</h3>
            <ul className="list-disc pl-5">
              {budget.categories && budget.categories.length > 0 ? (
                budget.categories.map((cat, index) => (
                  <li key={index} className="mb-1">
                    {cat.categoryName}
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <ul className="list-inside pl-5">
                        {cat.subcategories.map((sub, idx) => (
                          <li key={idx}>{sub}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <p>No categories available for this budget.</p>
              )}
            </ul>
          </div>
        )}
        {activeTab === "add" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Add a New Category:</h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Subcategories:</h4>
              {subcategories.map((sub, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={sub}
                    onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                    placeholder={`Subcategory ${index + 1}`}
                    className="w-full p-2 border rounded-md"
                  />
                  {index === subcategories.length - 1 && (
                    <button
                      onClick={handleAddSubcategory}
                      className="ml-2 text-blue-500"
                    >
                      + Add Subcategory
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded-md w-full"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
          </div>
        )}
        <button className="text-red-600 mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
