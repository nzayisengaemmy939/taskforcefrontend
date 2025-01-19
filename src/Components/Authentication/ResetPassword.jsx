import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Lock } from "lucide-react";
const PasswordResetForm = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError({ confirmPassword: "Passwords do not match!" });
      return;
    }

    try {
      setLoading(true);
    
      console.log(token,'await token')
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/reset/password/${token}`,
        {password }
      );
      setTimeout(() => {
        navigate("/");
        console.log("Navigating to dashboard");
      }, 1000);

      toast.success(response.data.message || "Password reset successful!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
     <ToastContainer></ToastContainer>
        <div className="relative bg-white shadow-lg sm:rounded-md px-4 py-10 sm:p-4">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="text-center pb-8 flex flex-col items-center">
                {/* <div className="mb-4 text-blue-600 font-bold text-4xl">   <Lock /></div> */}
                <h2 className="text-3xl font-bold text-gray-900">Enter New Password</h2>
              </div>

              <form onSubmit={handleSubmit} className="py-8 space-y-6">
                <div>
                  <label className="text-sm font-bold text-gray-700 tracking-wide">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={handleChange}
                    className="w-full text-base px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-gray-300"
                  />
                  {error.password && (
                    <p className="text-red-500 text-xs mt-2">{error.password}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 tracking-wide">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={handleChange}
                    className="w-full text-base px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-gray-300"
                  />
                  {error.confirmPassword && (
                    <p className="text-red-500 text-xs mt-2">{error.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-blue-600 text-white p-3 rounded-lg tracking-wide font-semibold focus:outline-none hover:bg-blue-700 transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>

              <div className="pt-6 text-center">
                <Link to="/" className="text-blue-600 hover:text-blue-500">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
