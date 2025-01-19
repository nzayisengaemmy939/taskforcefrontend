import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api service/auth/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { KeyRound } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await loginUser(formData, navigate, setLoading);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        <ToastContainer></ToastContainer>

        <div className="relative bg-white shadow-lg sm:rounded-xl px-4 py-10 sm:p-4">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="text-center pb-8 flex justify-center items-center flex-col">
                <div className="mb-4 text-blue-600 font-bold text-4xl"><KeyRound  className="text-blue-500"/></div>
                <h2 className="text-3xl font-bold text-gray-700">Sign In</h2>
              </div>

              <form onSubmit={handleSubmit} className="py-8 space-y-6">
                <div>
                  <label className="text-sm font-bold text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    className="w-full text-base px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-gray-300"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full text-base px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-gray-300"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-blue-600 text-white p-3 rounded-lg tracking-wide font-semibold focus:outline-none hover:bg-blue-700 transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="pt-6 text-center flex  justify-between items-center">
                <p> <span>If you haven't an account</span>
                <Link   to="/register"
               
                  className="text-blue-600 hover:text-blue-500 ml-2"
                >
                   Register
             
                </Link></p>
               
                <Link
                   to="/forgot-password"
                  className="text-blue-600 hover:text-blue-500 block mt-2"
                >
                      Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
