import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import axios from "axios";
import { FaRegBookmark } from "react-icons/fa";

const Nav = () => {
  const { token, updateToken, userInfo, setUserInfo, deleteToken } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [cartItem, setCartItem] = useState(0);

  const logoutHandler = () => {
    updateToken(null);
    localStorage.removeItem("token", "user_id", "username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    setUserInfo("");
    navigate("/login");
  };

  const getUserId = async () => {
    try {
      if (!token) {
        console.error("No token found, user may not be logged in.");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/backend/login.php",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 1 && response.data.customer) {
        // Set username in state and localStorage
        const customer = response.data.customer;
        localStorage.setItem("user_id", customer.user_id);
        localStorage.setItem("username", customer.username);
        setUserInfo(customer); // Optionally, update userInfo if needed
      } else {
        console.error("Failed to fetch user ID:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error.message);
    }
  };

  const getSavedItems = async () => {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getCartInfo.php",
        data
      );

      if (response.data.status === 1) {
        setCartItem(response.data.data);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      // Fetch user ID only if the token exists
      getUserId();
    }
  }, [token]); // Run effect when token changes

  return (
    <div className="navbar bg-white text-gray-900 rounded-2xl border border-gray-400 shadow-md fixed top-0 left-0 max-w-[95%] ml-[3%] pt-2 mt-2 z-50">
      <div className="navbar-start px-4">
        <Link
          to="/Explore"
          className="btn btn-ghost text-lg font-medium hover:bg-gray-100"
        >
          Explore
        </Link>
      </div>
      <div className="navbar-center">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-semibold hover:text-gray-900"
        >
          Trailblazers
        </Link>
      </div>
      {token ? (
        <div className="navbar-end px-4 flex items-center space-x-3">
          <div className="dropdown dropdown-end">
            <Link to="/saved-packages">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle hover:bg-gray-100"
              >
                <div className="indicator text-lg">
                  <FaRegBookmark />
                  {/* Uncomment and use cart item count if needed */}
                  {/* <span className="badge badge-sm indicator-item bg-red-500 text-white">
                  {cartItem}
                </span> */}
                </div>
              </div>
            </Link>
          </div>

          {userInfo && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-gray-100"
              >
                <div className="w-8 rounded-full">
                  <img
                    alt="User Avatar"
                    src={`http://localhost:3000/backend/${userInfo.profile_image}`}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-md z-10 mt-2 w-52 p-2"
              >
                <li>
                  <Link
                    to="/profile"
                    className="flex justify-between items-center hover:bg-gray-100"
                  >
                    Profile
                    <span className="badge text-pink-600">New</span>
                  </Link>
                </li>
                {userInfo.role === "admin" && (
                  <li>
                    <Link
                      to="/admin"
                      className="text-blue-600 font-medium hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar-end px-4 flex space-x-3">
          <Link
            to="/register"
            className="btn btn-outline border-gray-300 hover:border-blue-600 hover:text-blue-600"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="btn btn-primary bg-blue-600 text-white hover:bg-blue-700 rounded-xl"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
