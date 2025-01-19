import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {
  Home,
  CreditCard,
  BarChart,
  Settings,
  LogOut,
  Bell,
  Search,
  Banknote,
  User,
  Link,
} from "lucide-react";
import Topbar from "../../assets/bar/topbar";

function DashboardHome() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    toast.success("Account removed successfully");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <ToastContainer></ToastContainer>
      <div className="w-64 bg-gray-200 text-blue-500 fixed h-full flex flex-col justify-between">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6 px-4">Dashboard</h1>
          <nav className="space-y-4">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex py-2 px-4 rounded text-sm ${
                  isActive ? "hover:bg-blue-200" : "hover:bg-blue-200"
                }`
              }
            >
              <Home size={16} className="mr-3" />
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/transactions"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-sm ${
                  isActive ? "bg-blue-200" : "hover:bg-blue-200"
                }`
              }
            >
              <CreditCard size={16} className="mr-3" />
              Transaction
            </NavLink>
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-sm ${
                  isActive ? "bg-blue-200" : "hover:bg-blue-200"
                }`
              }
            >
              <BarChart size={16} className="mr-3" />
              Reports
            </NavLink>
            <NavLink
              to="/dashboard/budgets"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-sm ${
                  isActive ? "bg-blue-200" : "hover:bg-blue-200"
                }`
              }
            >
              <Banknote size={16} className="mr-3" />
              Budgets
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded text-sm ${
                  isActive ? "bg-blue-200" : "hover:bg-blue-200"
                }`
              }
            >
              <Settings size={16} className="mr-3" />
              Settings
            </NavLink>
          </nav>
        </div>
        <div className="p-4 mb-4" onClick={handleLogout}>
          <NavLink className="flex items-center py-2 px-4 hover:bg-gray-700 hover:text-red-400 rounded text-sm">
            <LogOut size={16} className="mr-3" />
            Logout
          </NavLink>
        </div>
      </div>
<Topbar  isModalOpen={isModalOpen} toggle={toggleModal}  text={"Account"}/>
     
    </div>
  );
}

export default DashboardHome;
