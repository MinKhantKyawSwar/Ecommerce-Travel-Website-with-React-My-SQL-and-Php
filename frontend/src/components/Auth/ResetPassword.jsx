import React, { useContext, useState } from "react";
import { UserContext } from "../../providers/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";

const ResetPassword = () => {
  const { isEmail, setIsEmail } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRules.test(password)) {
      setError(
        "Password must be at least 5 characters long, include one uppercase letter, one lowercase letter, and one number."
      );
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    } else if (!passwordRules.test(confirmPassword)) {
      setError(
        "Password must be at least 5 characters long, include one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    setError("");

    const url = "http://localhost:3000/backend/resetPassword.php";
    const data = { email: isEmail, password };

    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status === 1) {
        toast.success("Password Reset Successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
        setIsEmail("");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Failed to reset password.", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error during reset password request:", error.message);
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

  return (
    <div className="reset-password-container flex flex-col justify-center items-center max-w-md mx-auto p-6 border-gray-900 border bg-white rounded-lg shadow-md my-20">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p>
          <b>Email</b>: {isEmail}
        </p>
        <label className="text-sm relative">
          New Password
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full mt-2"
            placeholder="Enter new password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 pt-7 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
          >
            {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </button>
        </label>

        <label className="text-sm relative">
          Confirm New Password
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full mt-2"
            placeholder="Confirm new password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 pt-7 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
          >
            {showConfirmPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </button>
          
        </label>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-3"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
