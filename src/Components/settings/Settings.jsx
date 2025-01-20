import React, { useEffect, useState } from "react";
import {
  getProfile,
  updatePassword,
  updateProfile,
} from "../../api service/auth/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Settings = ({
  currentUser = { firstName: "", lastName: "", email: "", emailAlerts: false },
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
  });
  const [loading, setIsLoading] = useState(false);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
 

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handlePasswordChange = (field, value) => {
    setPassword({ ...password, [field]: value });
  };

  useEffect(() => {
    getProfile(setProfile, setIsLoading);
  }, []);
  const data = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
  };

  console.log(password, "password from setting");
  const handleSaveChanges = async () => {
    try {
     const response= await updateProfile(data, setIsLoading);

     toast.success("Profile updated successfully!");

    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  const handlePasswordUpdate = async () => {
    try {
      if (password.newPassword !== password.confirmPassword) {
     
   toast.error("Passwords do not match");
        return;
      }

      await updatePassword(password, setIsLoading);

      toast.success("Password updated successfull");
    } catch (error) {
      setIsLoading(false);
      toast.error('Old password not valid');
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ToastContainer></ToastContainer>

      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="flex border-b mb-6">
        {["profile", "password"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div>
          {/* <h2 className="text-lg font-semibold mb-4">Update Profile</h2> */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border-b-[1px] border-gray-300  text-sm bg-gray-100"
                value={profile.firstName}
                onChange={(e) =>
                  handleProfileChange("firstName", e.target.value)
                }
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border-b-[1px] border-gray-300  text-sm bg-gray-100"
                value={profile.lastName}
                onChange={(e) =>
                  handleProfileChange("lastName", e.target.value)
                }
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border-b-[1px] border-gray-300  text-sm bg-gray-100"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={handleSaveChanges}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {activeTab === "password" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={password.oldPassword}
                onChange={(e) =>
                  handlePasswordChange("oldPassword", e.target.value)
                }
                placeholder="Enter your current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={password.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                placeholder="Enter a new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg text-sm"
                value={password.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm your new password"
              />
            </div>
            <button
              onClick={handlePasswordUpdate}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
