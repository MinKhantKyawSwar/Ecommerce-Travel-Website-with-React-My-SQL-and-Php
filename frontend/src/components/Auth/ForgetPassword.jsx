import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format.";
    }

    if (step === 2) {
      if (!resetCode) {
        errors.resetCode = "Reset code is required.";
      }
      if (!password) {
        errors.password = "Password is required.";
      } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      }
    }
    return errors;
  };

  const handleRequestResetCode = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/backend/forgetpassword.php",
        {
          action: "forgotPassword",
          email,
        }
      );

      if (response.data.status === 1) {
        toast.success("Reset code sent to your email.");
        setStep(2);
      } else {
        toast.error(response.data.message || "Failed to send reset code.");
      }
    } catch (error) {
      toast.error("Error requesting reset code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/backend/forgetpassword.php",
        {
          action: "resetPassword",
          email,
          resetCode,
          newPassword: password,
        }
      );

      if (response.data.status === 1) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("Error resetting password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBackHandler=()=>{
    navigate(-1)
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="min-h-screen flex flex-col items-center pt-36 px-4">
        <div className="bg-white shadow-lg p-8 w-full border border-gray-800 max-w-md rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {step === 1 ? "Request Reset Code" : "Reset Your Password"}
          </h2>

          {step === 1 ? (
            <form onSubmit={handleRequestResetCode} noValidate>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-500" : "focus:ring-black"
                    }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Reset Code"}
              </button>
              <div className="mt-4 text-center">
                <button onClick={goBackHandler} className="text-black hover:underline">
                  Go Back
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} noValidate>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Reset Code
                </label>
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="Enter the reset code..."
                  className={`w-full px-4 py-2 border ${errors.resetCode ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 ${errors.resetCode ? "focus:ring-red-500" : "focus:ring-black"
                    }`}
                />
                {errors.resetCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.resetCode}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a new password..."
                  className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 ${errors.password
                      ? "focus:ring-red-500"
                      : "focus:ring-black"
                    }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password..."
                  className={`w-full px-4 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 ${errors.confirmPassword
                      ? "focus:ring-red-500"
                      : "focus:ring-black"
                    }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-2 rounded hover:bg-black transition disabled:opacity-50"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
