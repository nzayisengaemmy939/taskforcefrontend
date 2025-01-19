import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword } from '../../api service/auth/auth';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateEmail()) {
      const formData={'email':email}
     await resetPassword(formData,setLoading)
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 flex flex-col justify-center sm:py-12">
      <ToastContainer></ToastContainer>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
      
        <div className="relative bg-white shadow-lg sm:rounded-md  px-4 py-10 sm:p-4">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="text-center pb-4">
                <div className="mb-4 text-blue-600 font-bold text-4xl">🔄</div>
                <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                <p className="text-gray-600">Enter your email to receive a password reset link</p>
              </div>

              <form onSubmit={handleSubmit} className="py-8 space-y-6">
                <div>
                  <label className="text-sm font-bold text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-base px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-gray-300"
                  />
                  {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-blue-600 text-white p-3 rounded-lg tracking-wide font-semibold focus:outline-none hover:bg-blue-700 transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Reset password'}
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
}

export default ForgotPassword;
