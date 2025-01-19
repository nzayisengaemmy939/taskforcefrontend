import { User } from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfileBar =
  () =>
  ({ isModalOpen, toggle }) => {
    return (
      <div className="flex flex-col flex-grow pl-64">
        <div className="sticky top-0 w-full flex justify-between items-center bg-gray-100 shadow px-6 py-4 z-10 border-b-1 border-gray-300">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg  text-gray-500">Manage profile</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center hover:cursor-pointer">
              <span className="mr-3 text-sm text-blue-500">
                {localStorage.getItem("name")}
              </span>
              <button onClick={toggle}>
                <User className="text-blue-500" />
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="bg-white rounded shadow-lg w-[100px] h-7 text-center absolute right-5 z-50 top-10">
            <NavLink to="dashboard/profile" className="text-gray-700 ">
              Profile
            </NavLink>
          </div>
        )}
        <div className="">
          <Outlet />
        </div>
      </div>
    );
  };

export default ProfileBar;
