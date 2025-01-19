import React, { useEffect, useState } from "react";
import { getProfile } from "../../api service/auth/auth";
import { updateProfile } from "../../api service/auth/auth";
import ProfileBar from "../../assets/bar/profileBar";
import Topbar from "../../assets/bar/topbar";
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({
  currentUser = { firstName: "", lastName: "", email: "", emailAlerts: false },
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
  });
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handlePasswordChange = (field, value) => {
    setPassword({ ...password, [field]: value });
  };

  useEffect(() => {
    getProfile(setProfile, setIsLoading);
  }, []);

  const handleSaveChanges = async () => {
    try {
      await updateProfile(profile, setIsLoading);

      toast.success("Profile updated successfully!");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  return (
    <>

    <div className="p-6 max-w-4xl mx-auto">
      <ToastContainer></ToastContainer>
      <h1 className="text-2xl font-bold mb-6">Profiles</h1>

      <div>
        <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg text-sm"
              value={profile.firstName}
              onChange={(e) => handleProfileChange("firstName", e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg text-sm"
              value={profile.lastName}
              onChange={(e) => handleProfileChange("lastName", e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg text-sm"
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
    </div>
    </>
  );

};

export default Profile;
